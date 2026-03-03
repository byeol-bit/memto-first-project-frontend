const ProfileSection = ({
  userInfo,
  stats,
  isEditingPhoto,
  setIsEditingPhoto,
  previewImage,
  selectedColor,
  defaultOptions,
  selectedIdx,
  handleSelectDefault,
  fileInputRef,
  handleFileChange,
  saveProfileImage,
  handleCancelEdit,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm bg-white"
            style={{ backgroundColor: selectedColor }}
          >
            <img
              src={previewImage}
              alt="프로필"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {userInfo?.nickname}
            </h2>
            {userInfo?.category && (
              <span className="px-3 py-1 border-2 border-red-400 rounded-full text-sm text-red-400 w-fit font-bold flex-shrink-0 leading-none">
                {userInfo?.category}
              </span>
            )}
          </div>
          <div className="flex gap-4 text-sm mb-4">
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-lg">
                {stats.followerCount}
              </span>
              <span className="text-gray-400">팔로워</span>
            </div>
            <div className="w-[1px] h-10 bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-lg">
                {stats.followingCount}
              </span>
              <span className="text-gray-400">팔로잉</span>
            </div>
          </div>

          {!isEditingPhoto && (
            <button
              onClick={() => setIsEditingPhoto(true)}
              className="px-4 py-2 text-sm font-bold text-[#ee5a6f] bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
            >
              프로필 사진 변경하기
            </button>
          )}
        </div>
      </div>

      {isEditingPhoto && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in-down">
          <h3 className="font-bold text-sm text-gray-600 mb-3">
            프로필 사진 변경
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 justify-start overflow-x-auto p-2">
              {defaultOptions.map((opt, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 flex-shrink-0 rounded-full cursor-pointer flex items-center justify-center shadow-sm transition-all
                  ${selectedIdx === i ? "ring-4 ring-[#ee5a6f] scale-110" : "ring-1 ring-gray-200"}`}
                  style={{ backgroundColor: opt.color }}
                  onClick={() => handleSelectDefault(opt, i)}
                >
                  <img src={opt.img} className="w-8 opacity-80" alt="옵션" />
                </div>
              ))}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                className={`w-12 h-12 flex-shrink-0 rounded-full border-2 border-dashed flex items-center justify-center transition-colors 
                ${selectedIdx === "upload" ? "border-[#ee5a6f] text-[#ee5a6f] bg-red-50" : "border-gray-300 text-gray-400 hover:border-gray-400"}`}
                onClick={() => fileInputRef.current.click()}
              >
                +
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="flex-1 py-2 bg-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={saveProfileImage}
                className="flex-1 py-2 bg-[#ee5a6f] rounded-lg text-sm font-bold text-white hover:bg-[#d6455b] transition-colors"
              >
                사진 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default ProfileSection;
