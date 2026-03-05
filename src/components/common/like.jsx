import React from "react";
import { Heart, Star } from "lucide-react";

const Like = ({
  isLike,
  onLike,
  likeCount,
  className = "w-6 h-6",
  direction = "row",
  variant = "heart",
}) => {
  const containerClass =
    direction === "col"
      ? "flex flex-col items-center justify-center"
      : "flex flex-row items-center gap-1";

  const Icon = variant === "star" ? Star : Heart;
  const activeIconClass =
    variant === "star"
      ? "fill-yellow-400 text-yellow-400"
      : "fill-red-500 text-red-500";

  return (
    <div className={containerClass}>
      <button
        onClick={onLike}
        className="transition-transform transform hover:scale-110"
        aria-label="좋아요"
      >
        <Icon
          className={`${className} ${
            isLike ? activeIconClass : "text-gray-300"
          }`}
          fill={isLike ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      </button>

      {likeCount !== undefined && (
        <span
          className={`font-medium text-center ${
            variant === "star"
              ? "text-gray-400"
              : isLike
                ? "text-red-500"
                : "text-gray-400"
          }`}
        >
          {likeCount}
        </span>
      )}
    </div>
  );
};

export default Like;
