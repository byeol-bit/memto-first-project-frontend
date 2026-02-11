import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginState } from "../components/loginstate";
import { loginUser } from "../api/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useLoginState();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!nickname) return alert("닉네임을 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    try {
      const response = await loginUser(nickname, password);

      const token =
        response.headers["token"] ||
        response.headers["authorization"] ||
        response.data.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
        const userInfo = response.data || { nickname: nickname };

        login(token, userInfo);

        alert("로그인 성공!");
        navigate("/");
      } else {
        alert("로그인 성공했으나 토큰이 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 실패: " + (error.response?.data?.message || "오류 발생"));
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
              닉네임
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
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
