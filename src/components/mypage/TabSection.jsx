import UserReview from "../user-detail-components/userReview";
import FollowButton from "../follow/followButton"; // 🎯 팀원분이 만든 주황색 버튼 소환!

const TabSection = ({
  activeTab,
  setActiveTab,
  isTabLoading,
  tabData,
  handleToggleFollow,
  userId,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
      <div className="flex border-b border-gray-200">
        {["reviews", "followers", "followings"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 font-bold text-sm transition-colors ${
              activeTab === tab
                ? "text-[#ee5a6f] border-b-2 border-[#ee5a6f] bg-red-50/10"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "reviews" && "내 리뷰"}
            {tab === "followers" && "팔로워"}
            {tab === "followings" && "팔로잉"}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "reviews" ? (
          <div className="pt-2">
            <UserReview userId={userId} />
          </div>
        ) : (
          <>
            {isTabLoading ? (
              <div className="text-center py-10 text-gray-400">
                데이터 로딩 중...
              </div>
            ) : Array.isArray(tabData) && tabData.length > 0 ? (
              <ul className="space-y-3">
                {tabData.map((item, index) => {
                  const currentIsFollowing = !item.isCanceled;

                  return (
                    <li
                      key={item.id || index}
                      className="p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition-shadow flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.profileImage ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          alt="프로필"
                          onError={(e) => {
                            e.target.src =
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                          }}
                          className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                        />
                        <span className="font-bold text-gray-700">
                          {item.nickname}
                        </span>
                      </div>

                      {activeTab === "followings" && (
                        <FollowButton
                          isFollowing={currentIsFollowing}
                          onToggle={() =>
                            handleToggleFollow(item.id, currentIsFollowing)
                          }
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-16 text-gray-300">
                기록이 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TabSection;
