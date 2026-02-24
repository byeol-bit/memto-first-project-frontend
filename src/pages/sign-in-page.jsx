import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginState } from "../components/loginstate";
import { loginUser } from "../api/auth";
import KakaoLoginButton from "../components/KakaoLoginButton";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useLoginState();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    // --- 목데이터 시작 (test / 1234) ---
    if (nickname === "test" && password === "1234") {
      const mockUser = {
        nickname: "테스트유저",
        profileImage:
          "https://cdn.pixabay.com/photo/2023/01/28/20/23/ai-generated-7751688_1280.jpg",
        role: "admin", // 전역 상태용 역할 추가
      };
      localStorage.setItem("userRole", "admin");
      login("mock-cookie-session", mockUser);

      alert(
        "🧪 테스트 계정으로 로그인합니다! (새로고침 시 로그아웃될 수 있습니다)",
      );
      navigate("/");
      return;
    }
    // --- 목데이터 종료 ---

    if (!nickname) return alert("아이디(닉네임)를 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    try {
      const response = await loginUser(nickname, password);
      console.log('login response', response)

      if (response.status === 200) {
        login("cookie-session", response.data || { nickname });

        alert("로그인 성공!");
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      const errorMessage =
        error.response?.data?.message || "로그인에 실패했습니다.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] px-4">
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        숨은 고수 찾기
      </h1>
      <div className="w-full max-w-[400px] bg-white px-8 py-10 rounded-2xl shadow-lg border border-gray-100">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              닉네임 (또는 아이디)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#ee5a6f]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-[#ee5a6f] text-white rounded-xl text-lg font-bold hover:bg-[#d6455b] transition-all"
          >
            로그인
          </button>
        </form>
        <KakaoLoginButton />
        <div className="mt-6 text-center text-gray-500 text-sm">
          아직 계정이 없으신가요?
          <span
            className="ml-2 font-bold text-[#ee5a6f] cursor-pointer hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
