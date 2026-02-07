import React from "react";
import Like from "../common/like";

const RestaurantDetailCard = ({ restaurant, isLike, onLike, likeCount }) => {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-x-0 top-1 flex justify-center z-10">
          <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
            {restaurant.category}
          </span>
        </div>

        <div className="mt-4 rounded-lg border-2 border-gray-800 bg-white shadow-lg relative">
          <div className="border-b px-6 py-4 pt-10 flex justify-between items-start">
            {/* 맛집 정보 */}
            <div>
              <h3 className="text-2xl font-bold leading-tight">
                {restaurant.name}
              </h3>

              <div className="mt-2 flex items-baseline">
                <span className="text-xl mr-1">🏆</span>
                <span className="text-2xl font-bold">
                  {restaurant.expertCount}
                </span>
                <span className="ml-1 text-xm text-gray-500">
                  명의 고수 인정가 인정했어요
                </span>
              </div>
            </div>

            {/* 하트 */}
            <Like
              isLike={isLike}
              onLike={onLike}
              likeCount={likeCount}
              className="w-8 h-8"
              direction="col"
            />
          </div>

          <div className="px-6 py-4">
            <ul className=" text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="text-sm">{restaurant.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span className="text-sm">{restaurant.phoneNumber}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">👍</span>
                <span className="text-sm font-semibold">
                  방문자 리뷰 {restaurant.visitCount}
                </span>
              </li>
            </ul>
          </div>

          {/* <div className="px-6 pb-6">
            {restaurant.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600 mr-2"
              >
                # {tag}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RestaurantDetailCard;
