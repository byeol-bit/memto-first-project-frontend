import { useEffect } from "react";
import { useLoginState } from "../components/loginstate";
import { useSignUp, defaultOptions } from "../hooks/useSignUp";

const SignUpPage = () => {
  const {
    navigate,
    fileInputRef,
    id,
    setId,
    isIdChecked,
    setIsIdChecked,
    handleCheckId,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    nickname,
    setNickname,
    isNicknameChecked,
    setIsNicknameChecked,
    handleCheckNickname,
    introduction,
    setIntroduction,
    previewImage,
    selectedColor,
    selectedIdx,
    handleSelectDefault,
    handleFileChange,
    handleSignUp,
  } = useSignUp();
  const { isLoggedIn } = useLoginState();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/map", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] py-10 px-4">
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-8 cursor-pointer tracking-tighter hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      >
        숨은 고수 찾기
      </h1>

      <div className="w-full max-w-[500px] bg-white px-8 py-10 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          {/* 프로필 이미지 미리보기 */}
          <div
            className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center mb-6 transition-all"
            style={{ backgroundColor: selectedColor }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-3xl">？</span>
            )}
          </div>

          {/* 프로필 선택 버튼들 */}
          <div className="flex gap-3">
            {defaultOptions.map((opt, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full cursor-pointer transition-transform flex items-center justify-center shadow-sm hover:scale-110 
                  ${selectedIdx === i ? "ring-2 ring-[#ee5a6f] scale-110" : ""}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => handleSelectDefault(opt, i)}
              >
                <img src={opt.img} alt="icon" className="w-6 opacity-80" />
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
              className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-colors 
                ${selectedIdx === "upload" ? "border-[#ee5a6f] text-[#ee5a6f] bg-red-50" : "border-gray-300 text-gray-400"}`}
              onClick={() => fileInputRef.current.click()}
            >
              +
            </button>
          </div>
        </div>

        {/* 입력 폼 영역 */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f]"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIsIdChecked(false);
              }}
              placeholder="아이디"
            />
            <button
              onClick={handleCheckId}
              className={`px-4 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap 
                ${isIdChecked ? "bg-[#ee5a6f] text-white" : "bg-gray-700 text-white hover:bg-gray-800"}`}
            >
              {isIdChecked ? "확인됨" : "중복확인"}
            </button>
          </div>

          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />

          <input
            type="password"
            className={`w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f] 
              ${password && confirmPassword && password !== confirmPassword ? "border-red-500" : "border-gray-200"}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f]"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameChecked(false);
              }}
              placeholder="닉네임"
            />
            <button
              onClick={handleCheckNickname}
              className={`px-4 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap 
                ${isNicknameChecked ? "bg-[#ee5a6f] text-white" : "bg-gray-700 text-white hover:bg-gray-800"}`}
            >
              {isNicknameChecked ? "확인됨" : "중복확인"}
            </button>
          </div>

          <textarea
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f] resize-none h-24"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="고수님의 소개를 작성해주세요! (선택)"
          />
        </div>

        <button
          onClick={handleSignUp}
          className="w-full py-4 mt-8 bg-[#ee5a6f] text-white rounded-xl text-lg font-bold hover:bg-[#d6455b] transition-all"
        >
          가입하기
        </button>

        <div className="mt-6 text-center text-gray-500 text-sm">
          이미 계정이 있으신가요?
          <span
            className="ml-2 font-bold text-[#ee5a6f] cursor-pointer hover:underline"
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
