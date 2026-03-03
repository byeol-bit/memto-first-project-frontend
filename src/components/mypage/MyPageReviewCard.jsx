import React, { useState, useEffect } from "react";
import { getVisitImage } from "../../api/auth";

const MyPageReviewCard = ({ reviewData }) => {
  const [imageUrl, setImageUrl] = useState(null);

  if (!reviewData) return null;

  const restaurant = reviewData.restaurant || {};
  const visitId = reviewData.id;

  useEffect(() => {
    const baseUrl = "https://hidden-master-server.fly.dev";

    const loadReviewImage = async () => {
      try {
        if (visitId) {
          const res = await getVisitImage(visitId);
          const data = res.data;

          const path = data?.images?.[0] || data?.imageUrl || data;

          if (path && typeof path === "string") {
            const fullUrl = path.startsWith("http")
              ? path
              : new URL(path, baseUrl).href;
            setImageUrl(fullUrl);
          }
        }
      } catch (e) {
        console.error(`리뷰(${visitId}) 이미지 로드 실패:`, e);
      }
    };

    loadReviewImage();
  }, [visitId]);

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
      <div className="p-4 border-b border-gray-50">
        <h3 className="font-bold text-gray-900 text-lg truncate mb-1.5">
          {restaurant.name || reviewData.restaurant_name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 text-[10px] bg-red-50 text-[#ee5a6f] px-2 py-0.5 rounded-full font-bold">
            {restaurant.category}
          </span>

          <span className="text-gray-300 text-[10px]">|</span>

          <p className="text-xs text-gray-400 truncate">{restaurant.address}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="w-full aspect-video bg-gray-50 rounded-xl mb-3 overflow-hidden border border-gray-100 flex items-center justify-center relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-full h-full object-cover"
              alt="리뷰 사진"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 gap-1">
              <span className="text-2xl">📸</span>
              <span className="text-xs">사진 불러오는 중...</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {reviewData.review || reviewData.content}
        </p>

        <div className="mt-3 text-[11px] text-gray-400">
          <span>{displayDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageReviewCard;
