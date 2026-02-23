// src/components/KakaoLoginButton.jsx
import React from "react";

const KakaoLoginButton = () => {
  const REST_API_KEY = "7a25acf2fc2728248a42c745ac4f12bf";
  const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      type="button" // form 전송을 막기 위해 type="button" 사용
      onClick={handleLogin}
      className="w-full py-3 rounded-lg font-bold text-black bg-[#FEE500] hover:bg-[#FDD800] transition-colors flex items-center justify-center gap-2 mt-4"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg"
        alt="kakao"
        className="w-5 h-5"
      />
      카카오로 3초 만에 시작하기
    </button>
  );
};

export default KakaoLoginButton;
