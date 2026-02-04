import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  registerUser,
  checkIdDuplicate,
  checkNicknameDuplicate,
} from "../api/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 상태 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // 프로필 이미지 관련
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#f0f0f0");
  const [selectedIdx, setSelectedIdx] = useState(null);

  // 기본 프로필 아이콘 (SVG)
  const silhouetteIcon = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  );
  const defaultOptions = [
    { color: "#FFB6B9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#8AC6D1", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#BBDED6", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#FAE3D9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  ];

  // 핸들러 함수들
  const handleCheckId = async () => {
    if (!id) return alert("아이디를 입력해주세요.");
    try {
      await checkIdDuplicate(id);
      alert("사용 가능한 아이디입니다.");
      setIsIdChecked(true);
    } catch {
      alert("이미 사용 중인 아이디입니다.");
      setIsIdChecked(false);
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) return alert("닉네임을 입력해주세요.");
    try {
      await checkNicknameDuplicate(nickname);
      alert("사용 가능한 닉네임입니다.");
      setIsNicknameChecked(true);
    } catch {
      alert("이미 사용 중인 닉네임입니다.");
      setIsNicknameChecked(false);
    }
  };

  const handleSelectDefault = (option, index) => {
    setPreviewImage(option.img);
    setSelectedColor(option.color);
    setSelectedIdx(index);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedColor("#ffffff");
      setSelectedIdx("upload");
    }
  };

  const handleSignUp = async () => {
    if (!nickname || !id || !password)
      return alert("필수 정보를 입력해주세요.");
    if (password !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다.");
    if (!isNicknameChecked || !isIdChecked)
      return alert("중복 확인을 해주세요.");

    try {
      await registerUser({ loginId: id, password, nickname, introduction });
      alert(`환영합니다, ${nickname} 고수님!`);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f8f9fa] py-16">
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-8 cursor-pointer tracking-tighter"
        onClick={() => navigate("/")}
      >
        숨은 고수 찾기
      </h1>

      {/* 회원가입 카드 */}
      <div className="w-full max-w-[500px] bg-white px-8 py-10 rounded-xl shadow-md">
        {/* 프로필 선택 영역 */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-24 h-24 rounded-full border-2 border-gray-100 overflow-hidden flex items-center justify-center mb-4 shadow-sm"
            style={{ backgroundColor: selectedColor }}
          >
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex gap-3">
            {defaultOptions.map((opt, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full cursor-pointer transition-transform flex items-center justify-center ${selectedIdx === i ? "ring-2 ring-[#ee5a6f] scale-110" : ""}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => handleSelectDefault(opt, i)}
              >
                <img src={opt.img} alt="icon" className="w-6 opacity-90" />
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
              className={`w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-400 ${selectedIdx === "upload" ? "border-[#ee5a6f] text-[#ee5a6f]" : ""}`}
              onClick={() => fileInputRef.current.click()}
            >
              +
            </button>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-4">
          {/* 닉네임 + 중복확인 */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameChecked(false);
              }}
              placeholder="닉네임"
            />
            <button
              onClick={handleCheckNickname}
              className="bg-gray-600 text-white px-4 rounded-lg text-sm font-bold hover:bg-[#ee5a6f] transition-colors whitespace-nowrap"
            >
              중복확인
            </button>
          </div>

          {/* 아이디 + 중복확인 */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIsIdChecked(false);
              }}
              placeholder="아이디"
            />
            <button
              onClick={handleCheckId}
              className="bg-gray-600 text-white px-4 rounded-lg text-sm font-bold hover:bg-[#ee5a6f] transition-colors whitespace-nowrap"
            >
              중복확인
            </button>
          </div>

          {/* 비밀번호 */}
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />

          {/* 자기소개 */}
          <textarea
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f] resize-none h-24"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="고수님의 소개를 작성해주세요! (선택)"
          />
        </div>

        {/* 가입하기 버튼 */}
        <button
          onClick={handleSignUp}
          className="w-full py-4 mt-8 bg-[#ee5a6f] text-white rounded-xl text-xl font-bold hover:bg-[#d6455b] transition-colors shadow-md"
        >
          가입하기
        </button>

        {/* 하단 링크 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          이미 계정이 있으신가요?
          <span
            className="ml-2 font-bold text-gray-800 cursor-pointer hover:text-[#ee5a6f] hover:underline"
            onClick={() => navigate("/sign-in")}
          >
            로그인 하러가기
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
