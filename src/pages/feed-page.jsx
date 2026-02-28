import React, { useMemo, useState } from "react";
import Review from "../components/review/review";
import Button from "../components/common/button";
import { useNavigate } from "react-router";

import { InfiniteScrollTrigger } from "../components/common/infiniteScrollTrigger";

import { useInfiniteReviews } from "../hooks/queries/use-reviews-data";

import { useLoginState } from "../components/loginstate";

const FeedPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
    isError,
    error,
  } = useInfiniteReviews();

  const { isLoggedIn } = useLoginState();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("latest");

  const allReviews = useMemo(() => {
    if (!data?.pages) return [];
    const list = data.pages.flatMap((page) => {
      if (page?.list && Array.isArray(page.list)) return page.list;
      if (Array.isArray(page)) return page;
      if (page && Array.isArray(page.data)) return page.data;
      return [];
    });
    return list.filter(Boolean);
  }, [data]);

  const tabs = [
    { id: "latest", label: "최신 리뷰" },
    { id: "liked", label: "좋아요 한 리뷰" },
  ];

  const filteredReviews =
    activeTab === "liked"
      ? allReviews.filter((review) => review.isLiked)
      : allReviews;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md px-2 py-2 flex flex-col items-center">
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
          {activeTab === "liked" && !isLoggedIn ? (
            <div className="py-20 flex flex-col items-center justify-center gap-6 text-center">
              <p className="text-gray-600 text-lg">
                좋아요 한 리뷰를 보려면 로그인이 필요해요.
              </p>
              <Button onClick={() => navigate("/sign-in")}>
                로그인 하러 가기
              </Button>
            </div>
          ) : isReviewsLoading ? (
            <div className="py-20 text-center text-gray-500">
              리뷰를 불러오는 중... 😋
            </div>
          ) : isError ? (
            <div className="py-20 text-center text-gray-500">
              에러가 발생했어요: {error?.message}
            </div>
          ) : (
            <div className="flex flex-col gap-7">
              {filteredReviews.length > 0 ? (
                <>
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="flex justify-center w-full">
                      <Review reviewData={review} />
                    </div>
                  ))}
                  {activeTab === "latest" && (
                    <InfiniteScrollTrigger
                      onIntersect={fetchNextPage}
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  )}
                </>
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
