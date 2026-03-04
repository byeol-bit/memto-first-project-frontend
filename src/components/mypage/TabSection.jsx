import MyPageReviewCard from "./MyPageReviewCard";
import FollowButton from "../follow/followButton";
import Loading from "../loading";
import { getUserImageUrl } from "../../api/auth";
import InfiniteScrollTrigger from "../common/infiniteScrollTrigger";

const TabSection = ({
  activeTab,
  setActiveTab,
  isTabLoading,
  tabData,
  handleToggleFollow,
  myReviews,
  isReviewsLoading,
  fetchNextReviews,
  hasNextReviews,
  isFetchingNextReviews,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="flex border-b border-gray-200">
        {["reviews", "followers", "followings"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 font-bold text-sm transition-colors ${
              activeTab === tab
                ? "text-[#ee5a6f] border-b-2 border-[#ee5a6f] bg-red-50/10"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "reviews"
              ? "내 리뷰"
              : tab === "followers"
                ? "팔로워"
                : "팔로잉"}
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-50/50 h-[360px] overflow-y-auto">
        {activeTab === "reviews" ? (
          isReviewsLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col gap-4">
              {myReviews && myReviews.length > 0 ? (
                <>
                  {/* 🎯 Grid 레이아웃 복구: 카드가 다시 원래 크기로 돌아옵니다 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myReviews.map((review) => (
                      <MyPageReviewCard key={review.id} reviewData={review} />
                    ))}
                  </div>

                  {/* 🎯 그리드 밖에서 무한 스크롤을 감지합니다 */}
                  <InfiniteScrollTrigger
                    onIntersect={fetchNextReviews}
                    hasNextPage={hasNextReviews}
                    isFetchingNextPage={isFetchingNextReviews}
                  />
                </>
              ) : (
                <div className="py-20 text-center text-gray-400 text-sm">
                  작성된 리뷰가 없습니다.
                </div>
              )}
            </div>
          )
        ) : isTabLoading ? (
          <Loading />
        ) : (
          <ul className="space-y-3">
            {tabData.length > 0 ? (
              tabData.map((item) => {
                const isFollowing = !item.isCanceled;
                return (
                  <li
                    key={item.id}
                    className="p-4 border border-gray-100 rounded-xl bg-white flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getUserImageUrl(item.id || item.user_id)}
                        className="w-11 h-11 rounded-full object-cover border border-gray-100"
                        alt="profile"
                      />
                      <span className="font-bold text-gray-700">
                        {item.nickname || item.user?.nickname}
                      </span>
                    </div>
                    {activeTab === "followings" && (
                      <FollowButton
                        isFollowing={isFollowing}
                        onToggle={() =>
                          handleToggleFollow(item.id, isFollowing)
                        }
                      />
                    )}
                  </li>
                );
              })
            ) : (
              <div className="py-20 text-center text-gray-400 text-sm">
                목록이 비어 있습니다.
              </div>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TabSection;
