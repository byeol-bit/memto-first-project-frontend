const TabSection = ({
  activeTab,
  setActiveTab,
  isTabLoading,
  tabData,
  handleUnfollow,
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
        {isTabLoading ? (
          <div className="text-center py-10 text-gray-400">
            데이터 로딩 중...
          </div>
        ) : Array.isArray(tabData) && tabData.length > 0 ? (
          <ul className="space-y-3">
            {tabData.map((item, index) => (
              <li
                key={item.id || index}
                className="p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition-shadow flex justify-between items-center"
              >
                {activeTab === "reviews" ? (
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-gray-800">
                        {item.restaurant?.name || "식당명 없음"}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                        {item.visit_date}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.review}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.profileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt="프사"
                        className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                      />
                      <span className="font-bold text-gray-700">
                        {item.nickname}
                      </span>
                    </div>
                    {activeTab === "followings" && (
                      <button
                        onClick={() => handleUnfollow(item.id)}
                        className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded hover:text-red-500 hover:border-red-200 transition-colors"
                      >
                        언팔로우
                      </button>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-16 text-gray-300">
            기록이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
};
export default TabSection;
