import React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import MiniMap from "../components/restaurant/miniMap";
import Gallery from "../components/restaurant/gallery";
import Review from "../components/review/review";
import ReviewBottomSheet from "../components/review/reviewBottomSheet";
import Like from "../components/common/like";

import { MapPin, Phone } from "lucide-react";

import { useContext } from "react";
import { DetailStateContext } from "../components/layout/map-layout";

import {
  useRestaurantDetail,
  useRestaurantLikeStatus,
  useRestaurantImages,
} from "../hooks/queries/use-restaurants-data";
import {
  useInfiniteRestaurantReviews,
  useRestaurantReviewImages,
} from "../hooks/queries/use-reviews-data";
import { InfiniteScrollTrigger } from "../components/common/infiniteScrollTrigger";
import {
  useLikeRestaurantMutation,
  useUnlikeRestaurantMutation,
} from "../hooks/mutations/use-create-restaurant-mutation";

import { useLoginState } from "../components/loginstate";

const RestaurantDetailPage = () => {
  const context = useContext(DetailStateContext);
  const { id } = useParams();
  const reviewTopRef = useRef(null);

  // ID 결정 로직
  const currentId = Number(context?.selectedRestaurant?.id || id);
  const restaurantId = currentId;

  const {
    data: restaurantDetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useRestaurantDetail(currentId);

  const { user, isLoggedIn, isMe } = useLoginState();
  const navigate = useNavigate();
  const userId = user?.id ?? null;

  const restaurantIdForReviews = useMemo(() => {
    if (!restaurantDetailData) return null;

    if (restaurantDetailData.id != null) return Number(restaurantDetailData.id);

    if (restaurantDetailData.restaurant_id != null) {
      return Number(restaurantDetailData.restaurant_id);
    }

    return currentId ? Number(currentId) : null;
  }, [restaurantDetailData, currentId]);

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRestaurantReviews(restaurantIdForReviews);

  const rawReviews = useMemo(() => {
    if (!reviewsData?.pages?.length) return [];
    return reviewsData.pages
      .flatMap((page) => page?.list ?? [])
      .filter(Boolean);
  }, [reviewsData]);

  const reviews = useMemo(() => {
    if (!rawReviews?.length) return [];

    const targetId =
      restaurantIdForReviews != null ? Number(restaurantIdForReviews) : null;

    const mapped = rawReviews.map((raw) => {
      if (!raw || typeof raw !== "object") return raw;

      const mergedFromNumericKeys = Object.entries(raw).reduce(
        (acc, [key, value]) => {
          if (
            !Number.isNaN(Number(key)) &&
            value &&
            typeof value === "object"
          ) {
            return { ...acc, ...value };
          }
          return acc;
        },
        {},
      );

      const base = { ...raw, ...mergedFromNumericKeys };

      const restaurant =
        base.restaurant && Object.keys(base.restaurant).length
          ? base.restaurant
          : (restaurantDetailData ?? null);

      const reviewText = base.review ?? base.rev ?? base.content ?? "";

      return {
        ...base,
        restaurant,
        review: reviewText,
      };
    });

    if (targetId == null) return mapped;
    return mapped.filter((r) => {
      const rid = r.restaurant_id ?? r.restaurant?.id;
      return rid != null && Number(rid) === targetId;
    });
  }, [rawReviews, restaurantDetailData, restaurantIdForReviews]);

  const { data: isLikedFromApi = false } = useRestaurantLikeStatus({
    userId,
    restaurantId,
  });

  // 맛집 이미지
  const restaurantIdForImages =
    restaurantDetailData?.id ??
    restaurantDetailData?.restaurant_id ??
    restaurantIdForReviews ??
    restaurantId;

  const {
    data: restaurantImages = [],
    isLoading: isRestaurantImagesLoading,
    isPending: isRestaurantImagesPending,
  } = useRestaurantImages(restaurantIdForImages);

  // 리뷰(visits) 이미지: GET /visits/{id}/image — 리뷰에 올라온 사진들을 갤러리에 사용
  const visitIds = useMemo(
    () =>
      (reviews ?? [])
        .map((r) => r.id ?? r.visit_id ?? r.visitId)
        .filter((id) => id != null),
    [reviews],
  );
  const {
    data: reviewImagesFromVisits = [],
    isLoading: isReviewImagesLoading,
    isPending: isReviewImagesPending,
  } = useRestaurantReviewImages(visitIds);

  // 좋아요 mutation 훅들
  const { mutate: likeRestaurant } = useLikeRestaurantMutation();
  const { mutate: unlikeRestaurant } = useUnlikeRestaurantMutation();

  // 맛집 디테일 좋아요 & 좋아요 수
  const [isLike, setIsLike] = useState(isLikedFromApi);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setIsLike(isLikedFromApi);
  }, [isLikedFromApi]);

  // 비로그인 시에는 하트를 항상 빈 상태로 표시
  const displayIsLike = isLoggedIn ? isLike : false;

  // 바텀시트 오픈 플러스 버튼
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const [currentReviewUser, setCurrentReviewUser] = useState(null);

  // 탭
  const [activeTab, setActiveTab] = useState("home");

  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  const toFullUrl = (path) =>
    !path
      ? ""
      : path.startsWith("http")
        ? path
        : `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const imagesAreLoading =
    (restaurantIdForImages != null &&
      (isRestaurantImagesLoading || isRestaurantImagesPending)) ||
    (visitIds.length > 0 && (isReviewImagesLoading || isReviewImagesPending));

  const displayImages = useMemo(() => {
    if (reviewImagesFromVisits?.length > 0) {
      return reviewImagesFromVisits.map((url) =>
        typeof url === "string" && url.startsWith("http")
          ? url
          : toFullUrl(url),
      );
    }

    if (restaurantImages?.length > 0) {
      return restaurantImages.map(toFullUrl);
    }
    if (
      restaurantDetailData?.images &&
      restaurantDetailData.images.length > 0
    ) {
      return restaurantDetailData.images.map(toFullUrl).slice(0, 6);
    }

    if (imagesAreLoading) return [];

    return [];
  }, [
    reviewImagesFromVisits,
    restaurantImages,
    restaurantDetailData,
    baseUrl,
    imagesAreLoading,
  ]);

  const onLike = async () => {
    const isUser = await isMe();
    if (!isUser) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }

    const currentUserId = isUser.id;

    // Optimistic 업데이트
    const newIsLike = !isLike;
    setIsLike(newIsLike);
    setLikeCount((prev) => (newIsLike ? prev + 1 : prev - 1));

    // API 호출
    if (newIsLike) {
      likeRestaurant(
        { userId: currentUserId, restaurantId },
        {
          onError: (error) => {
            // 실패 시 롤백
            setIsLike(!newIsLike);
            setLikeCount((prev) => (newIsLike ? prev - 1 : prev + 1));
            console.error("좋아요 등록 실패:", error);
            alert("좋아요 등록에 실패했습니다.");
          },
        },
      );
    } else {
      unlikeRestaurant(
        { userId: currentUserId, restaurantId },
        {
          onError: (error) => {
            // 실패 시 롤백
            setIsLike(!newIsLike);
            setLikeCount((prev) => (newIsLike ? prev - 1 : prev + 1));
            console.error("좋아요 취소 실패:", error);
            alert("좋아요 취소에 실패했습니다.");
          },
        },
      );
    }
  };

  const handleReviewClick = async () => {
    const isUser = await isMe();
    if (!isUser) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    setCurrentReviewUser(isUser);
    setOpenBottomSheet(true);
  };

  const expertsCount = useMemo(() => {
    const getReviewUserId = (r) => {
      const id = r.user_id ?? r.userId ?? r.user?.id;
      return id != null ? String(id) : null;
    };
    const seen = new Set();
    let count = 0;
    for (const r of reviews) {
      const uid = getReviewUserId(r);
      if (uid != null && !seen.has(uid)) {
        seen.add(uid);
        count += 1;
      }
    }
    return count;
  }, [reviews]);

  if (isDetailLoading) {
    return (
      <div className="py-20 text-center">
        맛집 정보를 불러오는 중입니다... 😋
      </div>
    );
  }
  if (isDetailError || !restaurantDetailData) {
    return (
      <div className="py-20 text-center text-red-500">
        삭제 되었거나, 찾을 수 없는 맛집입니다 😭
      </div>
    );
  }

  const handleRoute = () => {
    const { name, latitude, longitude, kakao_place_id, address } =
      restaurantDetailData;

    const routeUrl = `https://dapi.kakao.com/v2/local/search/${address}.process.env.VITE_KAKAO_API_KEY`;

    window.open(routeUrl, "_blank");
  };

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-full max-w-md flex flex-col relative">
        <div className="w-full h-55 relative">
          {displayImages.length === 0 && imagesAreLoading ? (
            <div className="w-full h-48 sm:h-56 bg-gray-100 animate-pulse rounded-xl" />
          ) : displayImages.length > 0 ? (
            <Gallery
              images={displayImages}
              onViewAll={() => setActiveTab("photo")}
            />
          ) : null}
        </div>

        {/* 맛집 기본 정보 */}
        <div className="px-5 py-6 border-b-8 border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {restaurantDetailData.name}
                </h1>
                <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  {restaurantDetailData.category}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">방문자 리뷰</span>
                <span className="text-sm font-semibold">
                  {reviews.length ?? 0}
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-xl mr-1">😋</span>
                <span className="text-2xl font-bold">{expertsCount ?? 0}</span>
                <span className="ml-1 text-xm text-gray-500">
                  명의 고수 인정한 맛집이에요
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Like
                isLike={displayIsLike}
                onLike={onLike}
                likeCount={likeCount}
                className="w-8 h-8"
                direction="col"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleRoute}
              className="flex-1 bg-blue-50 py-3 rounded-xl text-blue-600 font-bold text-sm"
            >
              길찾기
            </button>
            {isLoggedIn && (
              <button
                onClick={handleReviewClick}
                className="flex-1 bg-red-50 py-3 rounded-xl text-red-400 font-bold text-sm"
              >
                리뷰 작성
              </button>
            )}
            <ReviewBottomSheet
              open={openBottomSheet}
              onClose={() => setOpenBottomSheet(false)}
              restaurant={restaurantDetailData}
              currentUser={currentReviewUser}
              restaurantIdForReviews={restaurantIdForReviews}
              onSuccess={() => {
                setActiveTab("review");
                setTimeout(() => {
                  reviewTopRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
            />
          </div>
        </div>

        {/* 탭 메뉴 (홈, 리뷰, 사진) */}
        <div className="sticky top-0 bg-white border-b border-gray-100 flex z-20">
          {["home", "review", "photo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              {tab === "home" ? "홈" : tab === "review" ? "리뷰" : "사진"}
            </button>
          ))}
        </div>

        {/* 탭 내용 */}
        <div className="px-5 py-6 pb-24">
          {activeTab === "home" && (
            <div className="flex flex-col gap-8">
              {/* 상세 정보 */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-sl">
                    {restaurantDetailData.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sl">
                    {restaurantDetailData.phone_number}
                  </span>
                </div>
                <div className="h-48 rounded-xl overflow-hidden border border-gray-100">
                  <MiniMap
                    latitude={restaurantDetailData.latitude}
                    longitude={restaurantDetailData.longitude}
                  />
                </div>
              </section>
            </div>
          )}

          {activeTab === "review" && (
            <div ref={reviewTopRef} className="flex flex-col gap-7">
              {isReviewsLoading ? (
                <div className="py-20 text-center text-gray-500">
                  리뷰를 불러오는 중... 😋
                </div>
              ) : reviews.length > 0 ? (
                <>
                  {reviews.map((v, index) => (
                    <div
                      key={
                        v.id != null ? `review-${v.id}` : `review-opt-${index}`
                      }
                      className="flex justify-center w-full"
                    >
                      <Review reviewData={v} />
                    </div>
                  ))}
                  <InfiniteScrollTrigger
                    onIntersect={fetchNextPage}
                    hasNextPage={hasNextPage ?? false}
                    isFetchingNextPage={isFetchingNextPage ?? false}
                  />
                </>
              ) : (
                <div className="py-20 text-center text-gray-400">
                  아직 등록된 꿀조합이 없어요. <br />첫 번째 고수가 되어보세요!
                  🍯
                </div>
              )}
            </div>
          )}

          {activeTab === "photo" && (
            <div className="grid grid-cols-3 gap-1">
              {displayImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="aspect-square object-cover"
                  alt="맛집 사진"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
