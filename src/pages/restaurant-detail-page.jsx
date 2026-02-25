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
} from "../hooks/queries/use-restaurants-data";
import { useRestaurantReviews } from "../hooks/queries/use-reviews-data";
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

  console.log(restaurantDetailData);

  const { user, isLoggedIn, isMe } = useLoginState();
  const navigate = useNavigate();
  const userId = user?.id ?? null;

  const { data: reviewsData, isLoading: isReviewsLoading } =
    useRestaurantReviews(Number(restaurantDetailData?.id));

  console.log(reviewsData);

  const reviews = useMemo(() => {
    const list = reviewsData ?? [];
    if (!list.length) return [];

    return list.map((raw) => {
      if (!raw || typeof raw !== "object") return raw;

      // 백엔드에서 join 결과가 { 0: {...}, 1: {...}, restaurant: {}, user: {} } 형태로 올 수 있어서
      // 숫자 키(0, 1, 2...) 안에 있는 객체들을 한 번 평탄화해서 꺼낸다.
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
  }, [reviewsData, restaurantDetailData]);

  const { data: isLikedFromApi = false } = useRestaurantLikeStatus({
    userId,
    restaurantId,
  });
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

  // 일단 아직 이미지가 없다는 가정하에
  const displayImages = useMemo(() => {
    if (
      restaurantDetailData?.images &&
      restaurantDetailData.images.length > 0
    ) {
      return restaurantDetailData.images.slice(0, 6); // 최대 6장까지만
    }

    // 6장의 목업 이미지
    return [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80", // 칵테일/분위기
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", // 스테이크
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80", // 파스타
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", // 고기 요리
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", // 샐러드
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", // 피자
    ];
  }, [restaurantDetailData]);

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
    const uniqueUsers = reviews.filter(
      (review, index, self) =>
        index === self.findIndex((r) => r.userId === review.userId),
    );
    return uniqueUsers.length;
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
          <Gallery images={displayImages} layoutType="hero" />
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
                reviews.map((v, index) => (
                  <div
                    key={
                      v.id != null ? `review-${v.id}` : `review-opt-${index}`
                    }
                    className="flex justify-center w-full"
                  >
                    <Review reviewData={v} />
                  </div>
                ))
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
