import React, { useState, useEffect } from "react";
import { getVisitImage } from "../../api/auth";

const MyPageReviewCard = ({ reviewData }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const visitId = reviewData?.id;

  // 🎯 리뷰 이미지 불러오기 (이 기능은 유지합니다!)
  useEffect(() => {
    const fetchImage = async () => {
      if (!visitId) return;
      try {
        const res = await getVisitImage(visitId);
        const fetchedUrl =
          res.data?.imageUrl ||
          res.data?.url ||
          res.data?.image ||
          (typeof res.data === "string" ? res.data : null);

        if (fetchedUrl) {
          const baseUrl =
            import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
          const cleanPath = fetchedUrl.replace(/^\//, "");
          setImageUrl(
            fetchedUrl.startsWith("http")
              ? fetchedUrl
              : `${baseUrl}/${cleanPath}`,
          );
        }
      } catch (e) {
        console.error("리뷰 이미지 호출 에러:", e.response?.status);
      }
    };
    fetchImage();
  }, [visitId]);

  if (!reviewData) return null;
  const restaurant = reviewData.restaurant || {};

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayDate = formatDate(
    reviewData.visit_date || reviewData.created_at,
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* 🎯 식당 정보 영역 */}
      <div className="p-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 text-lg">
            {restaurant.name || "맛집"}
          </h3>
          <span className="text-[10px] bg-red-50 text-[#ee5a6f] px-2 py-0.5 rounded-full font-bold">
            {restaurant.category || "식당"}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{restaurant.address}</p>
      </div>

      {/* 🎯 리뷰 사진 및 본문 영역 */}
      <div className="p-4">
        <div className="w-full aspect-video bg-gray-50 rounded-xl mb-3 overflow-hidden border border-gray-100 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-full h-full object-cover"
              alt="review"
            />
          ) : (
            <div className="text-gray-400 text-sm">사진 없음</div>
          )}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {reviewData.review || reviewData.content}
        </p>

        {/* 🎯 하단 날짜 영역 (좋아요 UI 삭제됨) */}
        <div className="mt-3 text-[11px] text-gray-400">
          <span>{displayDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageReviewCard;
