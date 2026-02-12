import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  getUserProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
  logoutUser,
  checkNicknameDuplicate,
} from "../api/auth";

const MyPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#f0f0f0");
  const [selectedIdx, setSelectedIdx] = useState(null);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const rawSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
  const silhouetteIcon = encodeURIComponent(rawSvgString);
  const defaultOptions = [
    { color: "#FFB6B9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#8AC6D1", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#BBDED6", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#FAE3D9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      // 목데이터 전용 코드 시작
      if (token && token === "mock-token-test-1234") {
        console.log("🧪 테스트 계정: 가짜 데이터 로드");
        setUserInfo({
          nickname: "테스트유저",
          profileImage:
            "https://cdn.pixabay.com/photo/2023/01/28/20/23/ai-generated-7751688_1280.jpg",
        });
        setNickname("테스트유저");
        setPreviewImage(
          "https://cdn.pixabay.com/photo/2023/01/28/20/23/ai-generated-7751688_1280.jpg",
        );
        setIsLoading(false);
        return;
      }
      //목데이터 관련 줄
      try {
        const response = await getUserProfile();
        const user = response.data;
        setUserInfo(user);
        setNickname(user.nickname);
        setPreviewImage(user.profileImage);
      } catch (error) {
        console.error("정보 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleSelectDefault = (option, index) => {
    setPreviewImage(option.img);
    setSelectedColor(option.color);
    setSelectedIdx(index);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setSelectedColor("#ffffff");
      setSelectedIdx("upload");
    }
  };

  const createSvgFile = (color) => {
    const coloredSvgString = rawSvgString.replace(
      'fill="#ffffff">',
      `fill="#ffffff"><rect width="100%" height="100%" fill="${color}" />`,
    );
    const blob = new Blob([coloredSvgString], { type: "image/svg+xml" });
    return new File([blob], "default_profile.svg", { type: "image/svg+xml" });
  };

  const saveProfileImage = async () => {
    if (selectedIdx === null && !selectedFile)
      return alert("변경할 이미지를 선택해주세요.");
    try {
      const formData = new FormData();
      formData.append("nickname", userInfo.nickname);
      if (selectedIdx === "upload" && selectedFile) {
        formData.append("profileImage", selectedFile);
      } else {
        const defaultFile = createSvgFile(selectedColor);
        formData.append("profileImage", defaultFile);
      }
      await updateProfile(formData);
      alert("프로필 사진이 변경되었습니다!");
      window.location.reload();
    } catch (error) {
      alert("사진 변경 실패: " + (error.response?.data?.message || "오류"));
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) return alert("닉네임을 입력해주세요.");
    if (nickname === userInfo.nickname)
      return alert("현재 닉네임과 동일합니다.");
    try {
      await checkNicknameDuplicate(nickname);
      alert("사용 가능한 닉네임입니다.");
      setIsNicknameChecked(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("중복 확인 중 오류가 발생했습니다.");
      }
      setIsNicknameChecked(false);
    }
  };

  const saveNickname = async () => {
    if (!isNicknameChecked) return alert("중복 확인을 해주세요.");
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      await updateProfile(formData);
      alert("닉네임이 변경되었습니다!");
      window.location.reload();
    } catch (error) {
      alert("닉네임 변경 실패: " + (error.response?.data?.message || "오류"));
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) return alert("새 비밀번호를 입력해주세요.");
    if (newPassword !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다.");
    try {
      await updatePassword(newPassword);
      alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
      await logoutUser();
      localStorage.removeItem("accessToken");
      navigate("/sign-in");
    } catch (error) {
      alert("비밀번호 변경 실패: " + (error.response?.data?.message || "오류"));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("accessToken");
      alert("로그아웃 되었습니다.");
      navigate("/sign-in");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await deleteAccount();
        localStorage.removeItem("accessToken");
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } catch (error) {
        alert("탈퇴 실패: 오류가 발생했습니다.");
      }
    }
  };

  if (isLoading) return <div className="text-center py-20">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4 flex flex-col items-center relative">
      <div className="w-full max-w-[600px] flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-800 font-bold"
        >
          ← 뒤로가기
        </button>
        <h1 className="text-2xl font-black text-[#ee5a6f]">마이페이지</h1>
        <div className="w-16"></div>
      </div>

      <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-10">
        <section className="flex flex-col items-center">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">프로필 사진</h2>
          </div>

          {!isEditingPhoto ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100">
                    👤
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setIsEditingPhoto(true);
                  setSelectedIdx(null);
                }}
                className="text-sm bg-gray-100 px-4 py-2 rounded-full font-bold text-gray-600 hover:bg-gray-200"
              >
                사진 수정하기
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in-down">
              <div className="flex gap-3 justify-center">
                {defaultOptions.map((opt, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform flex items-center justify-center shadow-sm 
                    ${selectedIdx === i ? "ring-4 ring-[#ee5a6f] scale-110" : "ring-1 ring-gray-200"}`}
                    style={{ backgroundColor: opt.color }}
                    onClick={() => handleSelectDefault(opt, i)}
                  >
                    <img src={opt.img} className="w-8 opacity-80" />
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
                  className={`w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center transition-colors 
                  ${selectedIdx === "upload" ? "border-[#ee5a6f] text-[#ee5a6f] bg-red-50" : "border-gray-300 text-gray-400 hover:border-gray-400"}`}
                  onClick={() => fileInputRef.current.click()}
                >
                  +
                </button>
              </div>
              {selectedIdx !== null && (
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md"
                  style={{ backgroundColor: selectedColor }}
                >
                  <img
                    src={previewImage}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setIsEditingPhoto(false)}
                  className="flex-1 py-2 bg-gray-300 rounded-lg font-bold text-white"
                >
                  취소
                </button>
                <button
                  onClick={saveProfileImage}
                  className="flex-1 py-2 bg-[#ee5a6f] rounded-lg font-bold text-white"
                >
                  저장하기
                </button>
              </div>
            </div>
          )}
        </section>

        <hr className="border-gray-100" />

        <section className="flex flex-col items-center">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">닉네임</h2>
          </div>

          {!isEditingNickname ? (
            <div className="flex flex-row items-center justify-center gap-3">
              <span className="text-xl font-bold border-b-2 border-transparent px-2">
                {userInfo?.nickname}
              </span>
              <button
                onClick={() => {
                  setIsEditingNickname(true);
                  setNickname(userInfo.nickname);
                  setIsNicknameChecked(false);
                }}
                className="text-xs bg-gray-100 px-3 py-1.5 rounded-full font-bold text-gray-600 hover:bg-gray-200"
              >
                수정
              </button>
            </div>
          ) : (
            <div className="w-full bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in-down space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setIsNicknameChecked(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#ee5a6f]"
                  placeholder="새 닉네임"
                />
                <button
                  onClick={handleCheckNickname}
                  className={`px-4 rounded-lg text-sm font-bold text-white transition-colors
                  ${isNicknameChecked ? "bg-green-500" : "bg-gray-700 hover:bg-gray-800"}`}
                >
                  {isNicknameChecked ? "확인됨" : "중복확인"}
                </button>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setIsEditingNickname(false)}
                  className="flex-1 py-2 bg-gray-300 rounded-lg font-bold text-white"
                >
                  취소
                </button>
                <button
                  onClick={saveNickname}
                  disabled={!isNicknameChecked}
                  className={`flex-1 py-2 rounded-lg font-bold text-white transition-colors
                  ${isNicknameChecked ? "bg-[#ee5a6f] hover:bg-[#d6455b]" : "bg-gray-300 cursor-not-allowed"}`}
                >
                  저장하기
                </button>
              </div>
            </div>
          )}
        </section>

        <hr className="border-gray-100" />

        <section>
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <h3 className="text-lg font-bold text-gray-700">
              🔒 비밀번호 변경
            </h3>
            <span className="text-gray-400">ᐳ</span>
          </div>
        </section>

        <hr className="border-gray-100" />

        <section className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full py-4 border border-gray-300 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full py-3 text-sm text-gray-400 underline hover:text-red-500 transition-colors"
          >
            회원 탈퇴하기
          </button>
        </section>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[400px] rounded-2xl p-8 shadow-2xl border border-gray-200 animate-fade-in-up">
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
                  setIsPasswordModalOpen(false);
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
      )}
    </div>
  );
};

export default MyPage;
