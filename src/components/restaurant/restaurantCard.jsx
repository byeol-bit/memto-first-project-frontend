import React from 'react';
import { Link } from 'react-router';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, thumbnail, category, expertCount, tags, address } = restaurant;

  return (
    <Link to={`/restaurants/${id}`} className="block w-full mb-6">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
        
        {/* 썸네일 */}
        <img 
          className="w-full h-48 object-cover" 
          src={thumbnail} 
          alt={name} 
        />

        {/* 내용 */}
        <div className="px-8 pt-6 pb-5">
          {/* 맛집 카테고리 */}
          <div className="text-sm text-red-400 font-bold mb-1">
            {category}
          </div>

          {/* 맛집 이름 */}
          <div className="font-bold text-xl mb-2 text-gray-900">
            {name}
          </div>

          {/* 주소, 고수 추천수 */}
          <p className="text-gray-700 text-base">
            📍 {address} <br/>
            <span className="mt-1 inline-block text-sm text-gray-500">🏆 고수 <b>{expertCount}명</b>이 인정했어요!</span>
          </p>
        </div>

        {/* 태그 */}
        <div className="px-6 pb-4">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;