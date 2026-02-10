import React from "react";

const Gallery = ({ images = [] }) => {
  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 5);
  const hasMore = images.length > 5;
  const moreCount = images.length - 5;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-[2px] w-full h-48 sm:h-56 bg-white overflow-hidden">
      {/* 1. 메인 이미지 (왼쪽 절반 차지) */}
      <div className="col-span-2 row-span-2 relative cursor-pointer">
        <img
          src={images[0]}
          alt="메인 전경"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. 나머지 이미지들 (오른쪽 격자) */}
      {displayImages.slice(1).map((imgUrl, index) => {
        const isLast = index === 3;

        return (
          <div key={index} className="relative w-full h-full cursor-pointer">
            <img
              src={imgUrl}
              alt={`상세 사진 ${index}`}
              className="w-full h-full object-cover shadow-sm"
            />

            {isLast && hasMore && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <span className="text-base font-bold">+{moreCount}</span>
                <span className="text-[10px]">전체보기</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
