import React, { useState } from "react";

const PlusBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-8
        right-8
        bg-red-400
        hover:bg-red-500
        text-white
        rounded-full
        w-12
        h-12
        flex
        items-center
        justify-center
        transition-colors
        shadow-lg
        hover:shadow-xl
        z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export default PlusBtn;
