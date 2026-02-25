import React, { useState, useMemo, useEffect } from "react";
import Button from "../common/button";
import Like from "../common/like";
import {
  Bookmark,
  Calendar,
  MessageCircle,
  Plus,
  MapPinHouse,
} from "lucide-react";

import { useReviewLikeStatus } from "../../hooks/queries/use-reviews-data";
import {
  useLikeReviewMutation,
  useUnlikeReviewMutation,
} from "../../hooks/mutations/use-create-review-mutation";

const Review = ({ reviewData }) => {
  // userId 가져오기 (localStorage에서만)
  const userId = useMemo(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return user?.id ?? null;
      }
    } catch (e) {
      console.error("userId 파싱 실패:", e);
    }
    return null;
  }, []);

  // 리뷰 ID (visitId)
  const visitId = reviewData?.id;

  // 좋아요 상태 조회
  const { data: isLikedFromApi = false } = useReviewLikeStatus({
    userId: userId ?? 0,
    visitId: visitId ?? 0,
  });

  // 좋아요 mutation 훅들
  const { mutate: likeReview } = useLikeReviewMutation();
  const { mutate: unlikeReview } = useUnlikeReviewMutation();

  // 리뷰 좋아요 & 좋아요 수
  const [isLike, setIsLike] = useState(isLikedFromApi);
  const [likeCount, setLikeCount] = useState(reviewData.likeCount ?? 0); // 옵셔널 체이닝 + 널 병합

  useEffect(() => {
    setIsLike(isLikedFromApi);
  }, [isLikedFromApi]);

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
  const onLike = () => {
    if (!userId || !visitId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // Optimistic 업데이트
    const newIsLike = !isLike;
    setIsLike(newIsLike);
    setLikeCount((prev) => (newIsLike ? prev + 1 : prev - 1));

    if (newIsLike) {
      likeReview(
        { userId, visitId },
        {
          onError: (error) => {
            setIsLike(!newIsLike);
            setLikeCount((prev) => (newIsLike ? prev - 1 : prev + 1));
            console.error("리뷰 좋아요 등록 실패:", error);
            alert("좋아요 등록에 실패했습니다.");
          },
        },
      );
    } else {
      unlikeReview(
        { userId, visitId },
        {
          onError: (error) => {
            setIsLike(!newIsLike);
            setLikeCount((prev) => (newIsLike ? prev - 1 : prev + 1));
            console.error("리뷰 좋아요 취소 실패:", error);
            alert("좋아요 취소에 실패했습니다.");
          },
        },
      );
    }
  };

  const getRegionName = (address) => {
    if (!address) return "";
    const splitAddress = address.split(" ");
    return splitAddress[1];
  };

  if (!reviewData || !reviewData.restaurant) return null;
  // 사용
  const region = getRegionName(reviewData?.restaurant?.address);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
      <div className="py-8 mx-6">
        {/* 작성자 정보 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-3 object-cover"
              src="https://v1.tailwindcss.com/img/jonathan.jpg"
              alt="홍길동"
            />
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-bold text-sm">
                    홍길동
                  </span>
                  <span className="bg-gray-100 rounded-full px-2 py-0.5 text-[10px] text-gray-500 font-medium">
                    먹고수
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  리뷰 39 팔로워 5
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="py-1.5 px-3 text-xs">팔로우</Button>
          </div>
        </div>

        <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 border border-gray-50">
          <img
            src="https://v1.tailwindcss.com/img/card-left.jpg"
            alt="리뷰 사진"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          {/* 지역 + 맛집 이름 */}
          <div className="flex items-center gap-2">
            <div className="w-fit bg-red-400 rounded-full px-2.5 py-0.5 text-xs text-white font-medium">
              {region}
            </div>
            <span className="text-sm text-gray-800">
              {reviewData?.restaurant.name}
            </span>
          </div>

          {/* 좋아요 + 개수 */}
          <div className="flex items-center gap-1.5 cursor-pointer transition-colors group">
            <Like isLike={isLike} onLike={onLike} />
            <span className="text-xm text-gray-500 font-medium group-active:scale-95 transition-transform">
              {likeCount}
            </span>
          </div>
        </div>

        {/* 본문 */}
        <div className="mt-3">
          <p className="text-gray-800 text-xm leading-relaxed mb-3">
            {reviewData?.review}
          </p>
          <span className="text-[11px] text-gray-400 flex">{displayDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
