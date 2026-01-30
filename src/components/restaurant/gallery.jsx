import React from "react";

const Gallery = ({ images = [] }) => {
  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 6);
  const hasMore = images.length > 6;
  const moreCount = images.length - 6;

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full h-64 md:h-80 rounded-lg overflow-hidden mt-4">
      {displayImages.map((imgUrl, index) => {
        const isLastImage = index === 5 && hasMore;

        return (
          <div
            key={index}
            className="relative w-full h-full cursor-pointer group"
          >
            {isLastImage && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <span className="text-white text-xl md:text-2xl font-semibold">
                  +{moreCount}
                </span>
              </div>
            )}

            <img
              src={imgUrl}
              alt={index}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
