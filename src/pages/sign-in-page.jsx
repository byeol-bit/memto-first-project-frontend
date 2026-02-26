import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginState } from "../components/loginstate";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useLoginState();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!loginId) return alert("아이디를 입력해 주세요.");
    if (!password) return alert("비밀번호를 입력해 주세요.");

    try {
      await login(loginId, password);

      alert("로그인에 성공했습니다!");
      window.location.href = "/map";
    } catch (error) {
      console.error("Login Page Error:", error);
      const msg =
        error.response?.data?.message || "아이디 또는 비밀번호가 틀렸습니다.";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] px-4">
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-10 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      >
        숨은 고수찾기
      </h1>

      <div className="w-full max-w-[400px] bg-white px-8 py-10 rounded-2xl shadow-lg border border-gray-100">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              아이디
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#ee5a6f] transition-all"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#ee5a6f] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-[#ee5a6f] text-white rounded-xl text-lg font-bold hover:bg-[#d6455b] transition-all shadow-md active:scale-95"
          >
            로그인
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-400">또는</span>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          아직 계정이 없으신가요?
          <span
            className="ml-2 font-bold text-[#ee5a6f] cursor-pointer hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            회원가입 하러가기
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
