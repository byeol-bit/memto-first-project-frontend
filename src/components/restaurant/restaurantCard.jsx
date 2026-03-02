import React from "react";
import { Link } from "react-router";

import { useContext } from "react";
import { DetailStateContext } from "../layout/map-layout";

const RestaurantCard = ({ restaurant }) => {
  const context = useContext(DetailStateContext);
  console.log("레스토랑 : ", restaurant);
  const { id, name, category, thumbnail, expertCount, address } = restaurant;

  const onRestaurantDetailClick = () => {
    context.setSelectedRestaurant(restaurant);
  };

  const Res_card = (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
      {/* 썸네일 */}
      {thumbnail ? (
        <img className="w-full h-40 object-cover" src={thumbnail} alt={name} />
      ) : (
        <div className="w-full h-40 bg-gray-100 shrink-0" aria-hidden />
      )}

      {/* 내용 */}
      <div className="px-8 pt-6 pb-5">
        {/* 맛집 카테고리 */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="text-sm text-red-400 font-bold">{category}</div>
        </div>
        {/* 맛집 이름 */}
        <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>

        {/* 주소, 고수 추천수 */}
        <p className="text-gray-700 text-base">
          📍 {address} <br />
          <span className="mt-1 inline-block text-sm text-gray-500">
            🏆 고수 <b>{expertCount}명</b>이 인정했어요!
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="block w-full mb-6">
      <div onClick={onRestaurantDetailClick} className="cursor-pointer">
        {Res_card}
      </div>
    </div>
  );
};

export default RestaurantCard;
