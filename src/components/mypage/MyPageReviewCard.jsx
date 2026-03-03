import React, { useState, useEffect } from "react";
import { getVisitImage } from "../../api/auth";

const MyPageReviewCard = ({ reviewData }) => {
  const [imageUrl, setImageUrl] = useState(null);

  if (!reviewData) return null;

  const restaurant = reviewData.restaurant;
  const visitId = reviewData.id;

  useEffect(() => {
    const loadReviewImage = async () => {
      const baseUrl = "https://hidden-master-server.fly.dev";

      try {
        if (visitId) {
          const res = await getVisitImage(visitId);

          const data = res.data;
          const path = data?.images?.[0];

          path && setImageUrl(new URL(path, baseUrl).href);
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
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 text-lg">
            {restaurant.name || reviewData.restaurant_name || "맛집"}
          </h3>
          <span className="text-[10px] bg-red-50 text-[#ee5a6f] px-2 py-0.5 rounded-full font-bold">
            {restaurant.category || "식당"}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{restaurant.address}</p>
      </div>

      <div className="p-4">
        <div className="w-full aspect-video bg-gray-50 rounded-xl mb-3 overflow-hidden border border-gray-100 flex items-center justify-center">
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
