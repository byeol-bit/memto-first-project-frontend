import React from "react";
import { Heart } from "lucide-react";

const Like = ({
  isLike,
  onLike,
  likeCount,
  className = "w-6 h-6",
  direction = "row",
}) => {
  const containerClass =
    direction === "col"
      ? "flex flex-col items-center justify-center"
      : "flex flex-row items-center gap-1";

  return (
    <div className={containerClass}>
      <button
        onClick={onLike}
        className="transition-transform transform hover:scale-110"
        aria-label="좋아요"
      >
        <Heart
          className={`${className} ${isLike ? "fill-red-500 text-red-500" : "text-gray-300"}`}
          fill={isLike ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      </button>

      {/* 숫자가 넘어왔을 때만 렌더링 */}
      {likeCount !== undefined && (
        <span
          className={`font-medium text-center ${isLike ? "text-red-500" : "text-gray-400"}`}
        >
          {likeCount}
        </span>
      )}
    </div>
  );
};

export default Like;
