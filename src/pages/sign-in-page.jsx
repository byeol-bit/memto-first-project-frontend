import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!id) return alert("아이디를 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    try {
      const loginData = { loginId: id, password: password };
      const response = await loginUser(loginData);
      const token = response.accessToken || response.data?.token;

      if (token) {
        localStorage.setItem("accessToken", token);
        alert("로그인 성공!");
        navigate("/");
      } else {
        alert("토큰을 받아오지 못했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    /* 👇 수정된 부분: h-screen으로 높이 고정, py-10 제거, overflow-hidden으로 스크롤 방지 */
    <div className="h-screen flex flex-col items-center justify-center bg-[#f8f9fa] overflow-hidden">
      {/* 로고 */}
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-8 cursor-pointer tracking-tighter"
        onClick={() => navigate("/")}
      >
        숨은 고수 찾기
      </h1>

      <div className="w-full max-w-[400px] bg-white p-10 rounded-xl shadow-md">
        <h2 className="text-center mb-8 text-[#333] text-2xl font-bold">
          로그인
        </h2>

        {/* --- 아이디 입력창 (플로팅 라벨) --- */}
        <div className="relative mb-6">
          <input
            type="text"
            id="loginId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="peer w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#ee5a6f] transition-colors bg-transparent placeholder-transparent text-base z-10"
            placeholder="아이디"
          />
          <label
            htmlFor="loginId"
            className="absolute left-4 top-3 text-gray-400 text-base transition-all duration-200 pointer-events-none bg-white px-1
                       peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#ee5a6f] 
                       peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-500"
          >
            아이디
          </label>
        </div>

        {/* --- 비밀번호 입력창 (플로팅 라벨) --- */}
        <div className="relative mb-8">
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="peer w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#ee5a6f] transition-colors bg-transparent placeholder-transparent text-base z-10"
            placeholder="비밀번호"
          />
          <label
            htmlFor="loginPassword"
            className="absolute left-4 top-3 text-gray-400 text-base transition-all duration-200 pointer-events-none bg-white px-1
                       peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#ee5a6f] 
                       peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-500"
          >
            비밀번호
          </label>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-[#ee5a6f] text-white rounded-xl text-lg font-bold hover:bg-[#d6455b] transition-colors shadow-sm cursor-pointer"
        >
          로그인
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          아직 계정이 없으신가요?
          <span
            className="text-[#ee5a6f] font-bold cursor-pointer ml-2 hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            회원가입 하기
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
