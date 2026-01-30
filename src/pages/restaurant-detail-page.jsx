import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";
import {
  mockRestaurants,
  mockRestaurantImages,
  mockVisits,
} from "../data/restaurants.mock";
import MiniMap from "../components/restaurant/miniMap";
import RestaurantDetailCard from "../components/restaurant/restaurantDetailCard";
import Gallery from "../components/restaurant/gallery";
import Review from "../components/restaurant/review";

const RestaurantDetailPage = () => {
  // 좋아요
  const [isLike, setIsLike] = useState(false);

  const onLike = () => {
    setIsLike(!isLike); // true면 false로, false면 true로 뒤집어라!
  };

  const { id } = useParams(); // 예: /restaurants/1
  console.log(id);
  const currentId = parseInt(id);

  // ID에 맞는 맛집 찾기
  const restaurant = mockRestaurants.find((r) => r.id === currentId);

  // 일단 그냥 이미지 가져오기
  const displayImages = mockRestaurantImages
    .filter((img) => img.restaurantId === currentId) // 이 가게의 사진만 찾아서
    .map((img) => img.imageUrl); // 이미지 주소만 꺼냄

  if (!restaurant) {
    return <div>삭제 되었거나, 찾을 수 없는 맛집입니다 😭</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 min-h-screen mt-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* 왼쪽 고정 */}
        <div className="md:col-span-1 sticky top-25 h-fit flex flex-col gap-6">
          <RestaurantDetailCard
            restaurant={restaurant}
            isLike={isLike}
            onLike={onLike}
          />

          <div className="flex flex-col items-center w-full">
            <div className="relative w-full mt-3">
              <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-lg overflow-hidden h-[250px] w-full">
                <MiniMap
                  latitude={restaurant.latitude}
                  longitude={restaurant.longitude}
                />
              </div>
            </div>
            <a
              href={`https://map.kakao.com/link/map/${restaurant.name},${restaurant.latitude},${restaurant.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 bg-[#FAE100] hover:bg-[#EAC100] text-[#3C1E1E] font-bold py-3 px-4 rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C5.925 3 1 6.925 1 11.775C1 14.866 3.033 17.583 6.075 19.167C5.908 20.083 5.375 22.15 5.333 22.317C5.3 22.567 5.567 22.75 5.792 22.608C5.992 22.483 8.7 20.625 9.775 19.892C10.5 19.983 11.242 20.033 12 20.033C18.075 20.033 23 16.108 23 11.258C23 6.408 18.075 3 12 3Z" />
              </svg>
              <span className="text-sm">카카오맵 보기</span>
            </a>
          </div>
        </div>

        {/* 오른쪽 스크롤 */}
        <div className="md:col-span-2 flex flex-col gap-10">
          <Gallery images={displayImages} />

          <Review />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
