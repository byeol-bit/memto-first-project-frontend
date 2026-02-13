export const NicknameModal = ({
  isOpen,
  onClose,
  nicknameInput,
  setNicknameInput,
  handleCheckNickname,
  isNicknameChecked,
  saveNickname,
  currentNickname,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[400px] rounded-2xl p-8 shadow-2xl animate-fade-in-up">
        <h2 className="text-xl font-black text-gray-800 mb-6 text-center">
          닉네임 변경
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="새 닉네임"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
            />
            <button
              onClick={handleCheckNickname}
              className={`px-4 rounded-lg text-sm font-bold text-white whitespace-nowrap transition-colors ${isNicknameChecked ? "bg-green-500" : "bg-gray-700 hover:bg-gray-800"}`}
            >
              {isNicknameChecked ? "확인됨" : "중복확인"}
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            중복 확인 후 변경하기를 눌러주세요.
          </p>
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => {
              onClose(false);
              setNicknameInput(currentNickname);
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={saveNickname}
            disabled={!isNicknameChecked}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-colors ${isNicknameChecked ? "bg-[#ee5a6f] hover:bg-[#d6455b]" : "bg-gray-300"}`}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export const PasswordModal = ({
  isOpen,
  onClose,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleUpdatePassword,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[400px] rounded-2xl p-8 shadow-2xl animate-fade-in-up">
        <h2 className="text-xl font-black text-gray-800 mb-6 text-center">
          비밀번호 변경
        </h2>
        <div className="space-y-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호 확인"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
          />
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => {
              onClose(false);
              setNewPassword("");
              setConfirmPassword("");
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleUpdatePassword}
            className="flex-1 py-3 bg-[#ee5a6f] text-white rounded-xl font-bold hover:bg-[#d6455b]"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};
