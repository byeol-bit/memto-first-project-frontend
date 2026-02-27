const MyPageReviewCard = ({ reviewData }) => {
  if (!reviewData) return null;
  const restaurant = reviewData.restaurant || {};

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
      <div className="p-4">
        <div className="w-full aspect-video bg-gray-50 rounded-xl mb-3 overflow-hidden border border-gray-100">
          <img
            src="https://v1.tailwindcss.com/img/card-left.jpg"
            className="w-full h-full object-cover"
            alt="review"
          />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {reviewData.review || reviewData.content}
        </p>
        <div className="mt-3 flex justify-between items-center text-[11px] text-gray-400">
          <span>{reviewData.visit_date || reviewData.created_at}</span>
          <span className="font-bold text-gray-500">
            ❤️ {reviewData.likeCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
export default MyPageReviewCard;
