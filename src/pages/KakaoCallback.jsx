import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 주소창에서 code 뽑기

    if (code) {
      sendCodeToBackend(code);
    } else {
      alert("카카오 로그인 코드를 찾을 수 없습니다.");
      navigate("/sign-in");
    }
  }, [location, navigate]);

  const sendCodeToBackend = async (code) => {
    try {
      // ⚠️ 백엔드의 소셜 로그인 API 주소로 변경하세요!
      // 예: POST 방식이면 axios.post('/users/kakao/login', { code })
      const response = await axios.get(
        `http://localhost:8080/users/kakao/login?code=${code}`,
      );

      // 우리가 겪었던 '헤더 토큰' 이슈 반영 (소문자 token으로 해야함)
      const token = response.headers["token"];

      if (token) {
        localStorage.setItem("accessToken", token);
        alert("카카오 로그인 성공!");
        navigate("/");
      } else {
        alert(
          "로그인은 성공했으나 토큰이 없습니다. 백엔드 CORS 설정을 확인해주세요.",
        );
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      alert("로그인 처리 중 오류가 발생했습니다.");
      navigate("/sign-in");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f8f9fa]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FEE500] mb-4"></div>
      <h2 className="text-xl font-bold text-gray-700">
        카카오 로그인 처리 중입니다... 🔄
      </h2>
      <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
    </div>
  );
};

export default KakaoCallback;
