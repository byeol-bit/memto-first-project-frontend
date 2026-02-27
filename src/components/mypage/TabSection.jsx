import MyPageReviewCard from "./MyPageReviewCard";
import FollowButton from "../follow/followButton";
import Loading from "../loading";
import { useUserReviews } from "../../hooks/queries/use-reviews-data";
import { getUserImageUrl } from "../../api/auth";

const TabSection = ({
  activeTab,
  setActiveTab,
  isTabLoading,
  tabData,
  handleToggleFollow,
  userId,
}) => {
  const { data: reviews, isLoading: isReviewLoading } = useUserReviews(userId);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* 탭 헤더 */}
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

      {/* 고정 높이 컨텐츠 영역 */}
      <div className="p-4 bg-gray-50/50 h-[600px] overflow-y-auto">
        {activeTab === "reviews" ? (
          isReviewLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews?.map((review) => (
                <MyPageReviewCard key={review.id} reviewData={review} />
              ))}
            </div>
          )
        ) : isTabLoading ? (
          <Loading />
        ) : (
          <ul className="space-y-3">
            {tabData.map((item) => {
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
                      onToggle={() => handleToggleFollow(item.id, isFollowing)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TabSection;
