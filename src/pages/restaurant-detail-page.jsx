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
import Review from "../components/review/review";
import PlusBtn from "../components/review/plusBtn";
import ReviewBottomSheet from "../components/review/reviewBottomSheet";
import Like from "../components/common/like";
import { MapPin, Phone } from "lucide-react";

import { useContext } from "react";
import { DetailStateContext } from "../components/layout/map-layout";

import { useQuery } from "@tanstack/react-query";
import { apiRestaurants } from "../api/restaurant";

const RestaurantDetailPage = () => {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants"], // 쿼리 키
    queryFn: apiRestaurants, // 우리가 만든 함수
  });

  const context = useContext(DetailStateContext);
  const { id } = useParams();

  // const currentId = parseInt(context.selectedRestaurant.id);
  let currentId;
  if (context?.selectedRestaurant?.id) {
    // 맵 레이아웃 안에서 카드를 클릭해 들어온 경우
    currentId = parseInt(context.selectedRestaurant.id);
  } else {
    // 리스트 페이지에서 링크를 타고 직접 들어온 경우
    currentId = parseInt(id);
  }

  // ID에 맞는 맛집 찾기
  const restaurant = mockRestaurants.find((r) => r.id === currentId);

  // ID에 맞는 리뷰 찾기
  const reviews = mockVisits.filter((v) => v.restaurantId === currentId);

  // 맛집 디테일 좋아요 & 좋아요 수
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(restaurant?.likeCount || 0); // 옵셔널 체이닝 + 널 병합
  // 바텀시트 오픈 플러스 버튼
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  // 탭
  const [activeTab, setActiveTab] = useState("home");

  const onLike = () => {
    if (isLike) {
      // 이미 좋아요 상태라면? -> 취소 (-1)
      setLikeCount((prev) => prev - 1);
    } else {
      // 좋아요가 아니라면? -> 추가 (+1)
      setLikeCount((prev) => prev + 1);
    }
    // 상태 반전 (T/F)
    setIsLike(!isLike);
  };

  // 일단 그냥 이미지 가져오기
  const displayImages = mockRestaurantImages
    .filter((img) => img.restaurantId === currentId) // 이 가게의 사진만 찾아서
    .map((img) => img.imageUrl); // 이미지 주소만 꺼냄

  if (!restaurant) {
    return <div>삭제 되었거나, 찾을 수 없는 맛집입니다 😭</div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-white">
      {/* 너비를 max-w-md로 고정하여 모바일 뷰 느낌 강조 */}
      <div className="w-full max-w-md flex flex-col relative">
        {/* 1. 상단 이미지 갤러리 (시안처럼 크게 배치) */}
        <div className="w-full h-55 relative">
          <Gallery images={displayImages} layoutType="hero" />
          {/* Gallery 내부에서 첫 이미지를 크게 보여주는 hero 모드라고 가정 */}
        </div>

        {/* 2. 맛집 기본 정보 (카드 형태가 아닌 페이지 일체형) */}
        <div className="px-5 py-6 border-b-8 border-gray-100">
          <div className="flex justify-between items-start">
            {/* 이름과 카테고리를 한 묶음으로 결합 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {restaurant.name}
                </h1>
                {/* 카테고리 배지 */}
                <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  {restaurant.category}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">방문자 리뷰</span>
                <span className="text-sm font-semibold">
                  {restaurant.visitCount}
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-xl mr-1">😋</span>
                <span className="text-2xl font-bold">
                  {restaurant.expertCount}
                </span>
                <span className="ml-1 text-xm text-gray-500">
                  명의 고수 인정한 맛집이에요
                </span>
              </div>
            </div>

            {/* 좋아요 버튼 영역은 우측 상단 고정 */}
            <div className="flex flex-col items-center gap-1">
              <Like
                isLike={isLike}
                onLike={onLike}
                likeCount={likeCount}
                className="w-8 h-8"
                direction="col"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {/* 시안의 '출발', '도착' 같은 버튼 스타일 */}
            <button className="flex-1 bg-blue-50 py-3 rounded-xl text-blue-600 font-bold text-sm">
              길찾기
            </button>
            <button className="flex-1 bg-blue-600 py-3 rounded-xl text-white font-bold text-sm">
              전화하기
            </button>
          </div>
        </div>

        {/* 3. 탭 메뉴 (홈, 리뷰, 사진) */}
        <div className="sticky top-0 bg-white border-b border-gray-100 flex z-20">
          {["home", "review", "photo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              {tab === "home" ? "홈" : tab === "review" ? "리뷰" : "사진"}
            </button>
          ))}
        </div>

        {/* 4. 탭 내용 영역 */}
        <div className="px-5 py-6 pb-24">
          {activeTab === "home" && (
            <div className="flex flex-col gap-8">
              {/* 상세 정보 (주소, 영업시간 등) */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-sl">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sl">{restaurant.phoneNumber}</span>
                </div>
                <div className="h-48 rounded-xl overflow-hidden border border-gray-100">
                  <MiniMap
                    latitude={restaurant.latitude}
                    longitude={restaurant.longitude}
                  />
                </div>
              </section>
            </div>
          )}

          {activeTab === "review" && (
            <Review restaurant={restaurant} reviews={reviews} />
          )}

          {activeTab === "photo" && (
            <div className="grid grid-cols-3 gap-1">
              {displayImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="aspect-square object-cover"
                  alt="맛집 사진"
                />
              ))}
            </div>
          )}
        </div>

        {/* 리뷰 작성 버튼 */}
        <PlusBtn onClick={() => setOpenBottomSheet(true)} />
        <ReviewBottomSheet
          open={openBottomSheet}
          onClose={() => setOpenBottomSheet(false)}
          restaurant={restaurant}
        />
      </div>
    </div>
    // <div className="flex justify-center min-h-scree">
    //   <div className="w-full max-w-md px-4 py-8 flex flex-col gap-8">
    //     {/* 상단 카드 영역: 최상단에 배치 */}
    //     <RestaurantDetailCard
    //       restaurant={restaurant}
    //       isLike={isLike}
    //       onLike={onLike}
    //       likeCount={likeCount}
    //     />

    //     {/* 지도 영역: 너비를 꽉 채우고 높이를 적절히 조절 */}
    //     <div className="flex flex-col w-full">
    //       <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden h-[200px] w-full">
    //         <MiniMap
    //           latitude={restaurant.latitude}
    //           longitude={restaurant.longitude}
    //         />
    //       </div>
    //       <a
    //         href={`https://map.kakao.com/link/map/${restaurant.name},${restaurant.latitude},${restaurant.longitude}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="w-full mt-3 bg-[#FAE100] hover:bg-[#EAC100] text-[#3C1E1E] font-bold py-3 rounded-xl text-center text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
    //       >
    //         <span>카카오맵으로 길찾기</span>
    //       </a>
    //     </div>

    //     {/* 리뷰 영역: 하단 배치 */}
    //     <div className="pb-20">
    //       {" "}
    //       {/* 플러스 버튼 공간 확보를 위한 하단 패딩 */}
    //       <Review
    //         restaurant={restaurant}
    //         likeCount={likeCount}
    //         reviews={reviews}
    //       />
    //     </div>

    //     {/* 리뷰 추가 버튼 & 바텀시트 */}
    //     <PlusBtn onClick={() => setOpenBottomSheet(true)} />
    //     <ReviewBottomSheet
    //       open={openBottomSheet}
    //       onClose={() => setOpenBottomSheet(false)}
    //       restaurant={restaurant}
    //     />
    //   </div>
    // </div>
  );
};

export default RestaurantDetailPage;
