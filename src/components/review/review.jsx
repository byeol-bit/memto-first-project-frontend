import React, { useState } from "react";
import Like from "../common/like";
import FollowUserCard from "../follow/followUserCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  useReviewLikeStatus,
  useReviewImages,
} from "../../hooks/queries/use-reviews-data";
import {
  useLikeReviewMutation,
  useUnlikeReviewMutation,
} from "../../hooks/mutations/use-create-review-mutation";

import { useLoginState } from "../loginstate";
import { getUserImageUrl } from "../../api/auth";
import { useUserDetail } from "../../hooks/queries/use-users-data";

const Review = ({ reviewData, userData }) => {
  const { user: loginUser, isLoggedIn, isMe } = useLoginState();
  const visitId = reviewData?.id;
  console.log("reviewData : ", reviewData);

  // 리뷰 작성자
  const author = React.useMemo(() => {
    if (!reviewData) return null;
    const u = reviewData.user;
    const id = u?.id ?? reviewData.user_id ?? reviewData.userId ?? null;
    if (id == null) return null;
    return {
      id: Number(id),
      nickname:
        u?.nickname ??
        reviewData.user_nickname ??
        reviewData.nickname ??
        "알 수 없음",
      category:
        u?.category ?? reviewData.user_category ?? reviewData.category ?? "",
      // visitCount:
      //   u?.visit_count ??
      //   u?.visitCount ??
      //   reviewData.visit_count ??
      //   reviewData.visitCount ??
      //   0,
    };
  }, [reviewData]);

  // 작성자에 대한 팔로우 여부
  const isFollowingAuthor =
    reviewData?.user?.is_following ??
    reviewData?.user?.isFollowing ??
    reviewData?.user?.follow ??
    false;

  // 좋아요 상태 조회
  const { data: isLiked = false } = useReviewLikeStatus({
    userId: loginUser?.id ?? 0,
    visitId: visitId ?? 0,
  });

  const { data: reviewImagesFromApi = [] } = useReviewImages(visitId ?? 0);

  // 좋아요 mutation 훅들
  const { mutate: likeReview } = useLikeReviewMutation();
  const { mutate: unlikeReview } = useUnlikeReviewMutation();

  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const likeCount = reviewData.likeCount ?? 0;

  // 🚨 추후에 둘 중 하나만 남기기
  const displayDate = reviewData?.visit_date
    ? new Date(reviewData.visit_date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : reviewData?.created_at
      ? new Date(reviewData.created_at).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const onLike = async () => {
    const me = await isMe();
    if (!me || !visitId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isLiked) {
      unlikeReview(
        { userId: me.id, visitId },
        {
          onError: () => alert("좋아요 취소에 실패했습니다."),
        },
      );
    } else {
      likeReview(
        { userId: me.id, visitId },
        {
          onError: () => alert("좋아요 등록에 실패했습니다."),
        },
      );
    }
  };

  const getRegionName = (address) => {
    if (!address) return "";
    const splitAddress = address.split(" ");
    return splitAddress[1] ?? "";
  };

  if (!reviewData) return null;

  const restaurant = reviewData.restaurant ?? {};
  const region = getRegionName(restaurant?.address);
  const rawRestaurantName = restaurant?.name ?? "맛집";
  const restaurantName =
    rawRestaurantName.length > 10
      ? `${rawRestaurantName.slice(0, 10)}...`
      : rawRestaurantName;
  const reviewText =
    reviewData.review ?? reviewData.rev ?? reviewData.content ?? "";
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  const rawImages =
    reviewImagesFromApi ??
    reviewData.images ??
    reviewData.visit_images ??
    reviewData.visitImages ??
    [];
  const reviewImages = Array.isArray(rawImages)
    ? rawImages
        .map((p) =>
          p && typeof p === "string"
            ? p.startsWith("http")
              ? p
              : `${baseUrl.replace(/\/$/, "")}/${String(p).replace(/^\//, "")}`
            : (p?.url ?? p?.image_url ?? ""),
        )
        .filter(Boolean)
    : [];

  const isLongText = (reviewText ?? "").length > 80;
  const hasImages = reviewImages.length > 0;
  const safeIndex = hasImages
    ? Math.min(Math.max(currentImageIndex, 0), reviewImages.length - 1)
    : 0;
  const currentImageSrc = hasImages ? reviewImages[safeIndex] : null;

  const goPrevImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prev) =>
      prev <= 0 ? reviewImages.length - 1 : prev - 1,
    );
  };

  const goNextImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prev) =>
      prev >= reviewImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="w-full max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
      <div className="pb-6 mx-6">
        {/* 작성자 정보 */}
        <div className="-mx-6 mb-4">
          {author ? (
            <FollowUserCard key={author.id} user={author} />
          ) : (
            <div className="flex items-center gap-4 px-6 py-4 border-y border-gray-100 text-gray-500 text-sm">
              작성자 정보를 불러올 수 없습니다.
            </div>
          )}
        </div>

        {reviewImages.length > 0 && currentImageSrc && (
          <div className="w-full mb-4 rounded-xl overflow-hidden border border-gray-50 relative">
            <img
              src={currentImageSrc}
              alt="리뷰 사진"
              className="w-full h-56 object-cover"
            />

            {reviewImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 text-white rounded-full p-1.5 flex items-center justify-center"
                  aria-label="이전 사진"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 text-white rounded-full p-1.5 flex items-center justify-center"
                  aria-label="다음 사진"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {reviewImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full ${
                        idx === safeIndex ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`${idx + 1}번째 사진 보기`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between w-full">
          {/* 지역 + 맛집 이름 */}
          <div className="flex items-center gap-2">
            <div className="w-fit bg-red-400 rounded-full px-2.5 py-0.5 text-xs text-white font-medium">
              {region}
            </div>
            <span
              className="text-sm text-gray-800"
              title={rawRestaurantName}
            >
              {restaurantName}
            </span>
          </div>

          {/* 좋아요 + 개수 */}
          <div className="flex items-center gap-1.5 cursor-pointer transition-colors group">
            <Like isLike={isLiked} onLike={onLike} />
            <span className="text-xm text-gray-500 font-medium group-active:scale-95 transition-transform">
              {reviewData.visitLikeCount}
            </span>
          </div>
        </div>

        {/* 본문 */}
        <div className="mt-3">
          <p
            className={`text-gray-800 text-xm leading-relaxed mb-2 ${
              !isTextExpanded ? "line-clamp-3" : ""
            }`}
          >
            {reviewText}
          </p>
          {isLongText && (
            <button
              type="button"
              onClick={() => setIsTextExpanded((prev) => !prev)}
              className="text-[11px] text-gray-500 underline underline-offset-2 mb-1"
            >
              {isTextExpanded ? "접기" : "더 보기"}
            </button>
          )}
          <span className="text-[11px] text-gray-400 flex mt-2">
            {displayDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
