import React from "react";

const RestaurantDetailCard = ({ restaurant, isLike, onLike }) => {
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
            <button
              onClick={onLike}
              className="ml-2 transition-transform transform hover:scale-110"
              aria-label="좋아요"
            >
              {isLike ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-red-500"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </button>
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
                  총 {restaurant.visitCount}명 방문
                </span>
              </li>
            </ul>
          </div>

          <div className="px-6 pb-6">
            {restaurant.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600 mr-2"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetailCard;
