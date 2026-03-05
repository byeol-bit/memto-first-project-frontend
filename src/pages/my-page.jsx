import { useEffect, useState } from "react";
import { useLoginState } from "../components/loginstate";
import { useMyPage } from "../hooks/useMypage";
import { getMyProfile } from "../api/auth";
import ProfileSection from "../components/mypage/ProfileSection";
import TabSection from "../components/mypage/TabSection";
import {
  NicknameModal,
  PasswordModal,
} from "../components/mypage/MyPageModals";

const MyPage = () => {
  const { isLoggedIn, isLoading: isAuthLoading } = useLoginState();
  const logic = useMyPage();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (isAuthLoading) return;
      if (!isLoggedIn) {
        logic.navigate("/sign-in", { replace: true });
        return;
      }

      try {
        await getMyProfile();
        setIsVerifying(false);
      } catch (error) {
        if (error.response?.status === 401) {
          logic.navigate("/sign-in", { replace: true });
        }
      }
    };

    verifySession();
  }, [isLoggedIn, isAuthLoading, logic]);

  if (isAuthLoading || isVerifying || logic.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee5a6f] mb-4"></div>
        <p className="text-gray-600 font-bold">
          보안 확인 및 정보 로딩 중... 🔐
        </p>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4 flex flex-col items-center relative">
      <div className="w-full max-w-[600px] flex items-center justify-between mb-6">
        <button
          onClick={() => logic.navigate(-1)}
          className="text-gray-500 hover:text-gray-800 font-bold"
        >
          ← 뒤로가기
        </button>
        <h1 className="text-2xl font-black text-[#ee5a6f]">마이페이지</h1>
        <div className="w-16"></div>
      </div>

      <div className="w-full max-w-[600px] space-y-4">
        {/* 1. 프로필 카드 */}
        <ProfileSection
          userInfo={logic.userInfo}
          stats={logic.stats}
          isEditingPhoto={logic.isEditingPhoto}
          setIsEditingPhoto={logic.setIsEditingPhoto}
          previewImage={logic.previewImage}
          selectedColor={logic.selectedColor}
          selectedIdx={logic.selectedIdx}
          defaultOptions={logic.defaultOptions}
          handleSelectDefault={logic.handleSelectDefault}
          fileInputRef={logic.fileInputRef}
          handleFileChange={logic.handleFileChange}
          saveProfileImage={logic.saveProfileImage}
          handleCancelEdit={logic.handleCancelEdit}
        />

        {/* 2. 탭 기능 (리뷰 데이터 전달 추가) */}
        <TabSection
          activeTab={logic.activeTab}
          setActiveTab={logic.setActiveTab}
          // ✅ 리뷰 전용 데이터 추가
          myReviews={logic.myReviews}
          fetchNextReviews={logic.fetchNextReviews}
          hasNextReviews={logic.hasNextReviews}
          isFetchingNextReviews={logic.isFetchingNextReviews}
          isReviewsLoading={logic.isReviewsLoading}
          // ✅ 팔로우 데이터
          isTabLoading={logic.isTabLoading}
          tabData={logic.tabData}
          handleToggleFollow={logic.handleToggleFollow}
          userId={logic.userInfo?.id}
        />

        {/* 3. 메뉴 버튼들 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
          <button
            onClick={() => logic.setIsNicknameModalOpen(true)}
            className="w-full py-3 bg-gray-50 rounded-lg font-bold text-gray-700 hover:bg-gray-100 text-sm transition-colors text-left px-4 flex justify-between items-center"
          >
            <span>✏️ 닉네임 변경하기</span>
            <span className="text-gray-400">ᐳ</span>
          </button>
          <button
            onClick={() => logic.setIsPasswordModalOpen(true)}
            className="w-full py-3 bg-gray-50 rounded-lg font-bold text-gray-700 hover:bg-gray-100 text-sm transition-colors text-left px-4 flex justify-between items-center"
          >
            <span>🔒 비밀번호 변경하기</span>
            <span className="text-gray-400">ᐳ</span>
          </button>
          <button
            onClick={logic.handleLogout}
            className="w-full py-3 border border-gray-200 rounded-lg font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 text-sm transition-colors mt-2"
          >
            로그아웃
          </button>
          <button
            onClick={logic.handleDeleteAccount}
            className="text-xs text-red-500 underline hover:text-red-700 text-center mt-1 font-medium"
          >
            회원 탈퇴하기
          </button>
        </section>
      </div>

      {/* 모달 */}
      <NicknameModal
        isOpen={logic.isNicknameModalOpen}
        onClose={logic.setIsNicknameModalOpen}
        nicknameInput={logic.nicknameInput}
        setNicknameInput={logic.setNicknameInput}
        handleCheckNickname={logic.handleCheckNickname}
        isNicknameChecked={logic.isNicknameChecked}
        saveNickname={logic.saveNickname}
        currentNickname={logic.userInfo?.nickname}
        setIsNicknameChecked={logic.setIsNicknameChecked}
      />
      <PasswordModal
        isOpen={logic.isPasswordModalOpen}
        onClose={logic.setIsPasswordModalOpen}
        currentPassword={logic.currentPassword}
        setCurrentPassword={logic.setCurrentPassword}
        newPassword={logic.newPassword}
        setNewPassword={logic.setNewPassword}
        confirmPassword={logic.confirmPassword}
        setConfirmPassword={logic.setConfirmPassword}
        handleUpdatePassword={logic.handleUpdatePassword}
        handleCancelEdit={logic.handleCancelEdit}
      />
    </div>
  );
};

export default MyPage;
