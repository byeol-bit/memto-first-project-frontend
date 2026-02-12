import React, { useState } from "react";
import Review from "../components/review/review";

import { useReviews } from "../hooks/queries/use-reviews-data";

const FeedPage = () => {
  const { data: reviewsData, isLoading: isReviewsLoading } = useReviews();

  const [activeTab, setActiveTab] = useState("latest");
  console.log(reviewsData);

  const tabs = [
    { id: "latest", label: "최신 리뷰" },
    { id: "liked", label: "좋아요 한 리뷰" },
  ];

  const filteredReviews =
    activeTab === "liked"
      ? (reviewsData?.filter((review) => review.isLiked) ?? [])
      : (reviewsData ?? []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 flex flex-col items-center">
        {/* ✅ 탭 메뉴 */}
        <div className="w-full sticky top-0 bg-white border-b border-gray-100 flex z-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ 탭 내용 영역 */}
        <div className="w-full px-5 py-6 pb-24">
          {isReviewsLoading ? (
            <div className="py-20 text-center text-gray-500">
              맛집 데이터를 불러오는 중... 😋
            </div>
          ) : (
            <div className="flex flex-col gap-7">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} className="flex justify-center w-full">
                    {/* Review 컴포넌트 렌더링 */}
                    <Review reviewData={review} />
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-gray-400">
                  {activeTab === "liked" ? (
                    <p>
                      아직 좋아요 한 리뷰가 없어요. <br />
                      마음에 드는 리뷰에 하트를 눌러보세요! ❤️
                    </p>
                  ) : (
                    <p>등록된 리뷰가 없습니다.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
