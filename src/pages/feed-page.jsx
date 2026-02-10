import React from "react";
import Review from "../components/review/review";

import { useReviews } from "../hooks/queries/use-reviews-data";

const FeedPage = () => {
  const { data: reviewsData, isLoading: isReviewsLoading } = useReviews();

  console.log(reviewsData);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 flex flex-col items-center">
        {/* 헤더 */}
        <div className="w-full flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">최신 리뷰 피드</h1>
          <p className="text-sm text-gray-500 mt-2 mb-8">
            고수들이 전하는 생생한 맛집 소식을 확인하세요!
          </p>
        </div>

        <div className="flex flex-col gap-7">
          {reviewsData.length > 0 ? (
            reviewsData.map((review) => (
              <div key={review.id} className="flex justify-center">
                <Review reviewData={review} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400">등록된 리뷰가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
