import React from "react";
import { Link } from "react-router";

import { useContext } from "react";
import { DetailStateContext } from "../layout/map-layout";

const RestaurantCard = ({ restaurant }) => {
  const context = useContext(DetailStateContext);

  const { id, name, thumbnail, category, expertCount, address } = restaurant;

  const onRestaurantDetailClick = () => {
    context.setSelectedRestaurant(restaurant);
  };

  const Res_card = (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
      {/* 썸네일 */}
      <img className="w-full h-40 object-cover" src={thumbnail} alt={name} />

      {/* 내용 */}
      <div className="px-8 pt-6 pb-5">
        {/* 맛집 카테고리 */}
        <div className="text-sm text-red-400 font-bold mb-1">{category}</div>

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
      {!context ? (
        /* context가 없을 때: 상세 페이지로 이동하는 Link 사용 */
        <Link to={`/restaurants/${id}`} className="block w-full">
          {Res_card}
        </Link>
      ) : (
        /* context가 있을 때: 클릭 시 상태만 변경하는 div 사용 */
        <div onClick={onRestaurantDetailClick} className="cursor-pointer">
          {Res_card}
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
