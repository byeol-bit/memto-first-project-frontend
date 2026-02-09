import React, { useState } from "react";
import Button from "../common/button";
import Like from "../common/like";

const Review = ({ reviewData }) => {
  // 리뷰 좋아요 & 좋아요 수
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(reviewData.likeCount ?? 0); // 옵셔널 체이닝 + 널 병합

  const displayDate = reviewData?.visit_date
    ? new Date(reviewData.visit_date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : reviewData?.created_at
      ? new Date(reviewData.created_at).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  console.log(reviewData);
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

  if (!reviewData) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 py-6">
      {/* 작성자 정보 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-3 object-cover"
            src="https://v1.tailwindcss.com/img/jonathan.jpg"
            alt="Andrew Wilson"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-bold text-sm">
                Andrew Wilson
              </span>
              <span className="bg-gray-100 rounded-full px-2 py-0.5 text-[10px] text-gray-500 font-medium">
                먹고수\\
              </span>
            </div>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {displayDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="py-1.5 px-3 text-xs">팔로우</Button>
        </div>
      </div>

      {/* 2. 중간: 리뷰 이미지 (가로로 꽉 차게) */}
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 border border-gray-50">
        <img
          src="https://v1.tailwindcss.com/img/card-left.jpg"
          alt="리뷰 사진"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. 본문 */}
      <div className="mb-6">
        <p className="text-gray-800 text-sm leading-relaxed mb-2">
          {reviewData?.review}
        </p>
      </div>

      {/* 4. 하단: 좋아요 & 댓글 */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 cursor-pointer transition-colors group">
          <Like isLike={isLike} onLike={onLike} />
          <span className="text-xs text-gray-500 font-medium group-active:scale-95 transition-transform">
            129
          </span>
        </div>

        <div className="flex items-center gap-1.5 cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9m-6 4.5l-3.5 3.5V17.25h-1.5A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25V15a2.25 2.25 0 01-2.25 2.25H15l-3.5 3.5v-3.5H9"
            />
          </svg>
          <span className="text-xs text-gray-500 font-medium group-hover:text-blue-500 transition-colors">
            34
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
