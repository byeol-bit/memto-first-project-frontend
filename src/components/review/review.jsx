import React, { useState } from "react";
import Button from "./button";
import Like from "./Like";

const Review = () => {
  const [isLike, setIsLike] = useState(false);

  const onLike = () => {
    setIsLike(!isLike);
  };

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex font-sans">
      {/* 좌측 */}
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://v1.tailwindcss.com/img/card-left.jpg')",
        }}
        title="Woman holding a mug"
      ></div>
      {/* 우측 */}
      <div className="border-r border-b border-l border-gray-200 lg:border-l-0 lg:border-t lg:border-gray-200 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal w-full">
        <div className="flex justify-between items-start mb-4">
          {/* 작성자 정보 & 팔로우 */}
          <div className="flex items-center mb-2">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="https://v1.tailwindcss.com/img/jonathan.jpg"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="mr-2">
              <div className="text-gray-900 font-bold text-lg mr-4 mb-1">
                Andrew Wilson
              </div>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600 mr-2">
                먹고수
              </span>
            </div>
            <Button>팔로우</Button>
          </div>

          {/* 북마크 */}
          <button className="text-red-500 hover:text-red-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* 날짜 */}
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
            />
          </svg>
          <span>2026년 2월 1일</span>
        </div>

        {/* 본문 */}
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          이집 너무 맛있어요!!
        </p>

        <p className="text-gray-600 text-base leading-relaxed mb-6">
          추천 먹조합 : 떡볶이 + 김밥
        </p>

        {/* 좋아요 & 댓글 & 플러스 버튼 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-gray-500">
            {/* 좋아요 */}
            <div className="flex items-center gap-2 cursor-pointer transition-colors group">
              <Like isLike={isLike} onLike={onLike} />
              <span className="font-medium">129</span>
            </div>
            {/* 댓글 */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 group-hover:stroke-blue-500 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9m1.5-10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">34</span>
            </div>
          </div>

          {/* 플러스 버튼 */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-md hover:shadow-lg">
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
        </div>
      </div>
    </div>
  );
};

export default Review;
