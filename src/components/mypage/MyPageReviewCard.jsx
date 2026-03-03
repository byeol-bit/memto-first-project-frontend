import React, { useMemo } from "react";
import { useReviewImages } from "../../hooks/queries/use-reviews-data";

const MyPageReviewCard = ({ reviewData }) => {
  if (!reviewData) return null;

  const restaurant = reviewData.restaurant || {};
  const visitId = reviewData.id;

  const { data: imagesFromApi } = useReviewImages(visitId);

  const rawImages =
    imagesFromApi || reviewData.reviewImages || reviewData.images || [];

  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

  const imageUrl = useMemo(() => {
    if (!Array.isArray(rawImages) || rawImages.length === 0) return null;

    const firstImg = rawImages[0];
    const rawUrl =
      typeof firstImg === "string"
        ? firstImg
        : firstImg?.url || firstImg?.imageUrl || firstImg?.image_url;

    if (!rawUrl) return null;

    return rawUrl.startsWith("http")
      ? rawUrl
      : `${baseUrl}/${rawUrl.replace(/^\//, "")}`;
  }, [rawImages, baseUrl]);

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
            {restaurant.name || "맛집"}
          </h3>
          <span className="text-[10px] bg-red-50 text-[#ee5a6f] px-2 py-0.5 rounded-full font-bold">
            {restaurant.category || reviewData.category || "식당"}
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
              alt="review"
            />
          ) : (
            <div className="text-gray-400 text-sm">사진 없음</div>
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
