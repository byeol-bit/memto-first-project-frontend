import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginState } from "../components/loginstate";
import { loginUser } from "../api/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useLoginState();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id) return alert("아이디를 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    // --- 관리자 계정 하드코딩 (테스트용) ---
    if (id === "admin" && password === "1234") {
      const mockToken = "admin-super-pass-token";
      const mockUser = {
        nickname: "administor",
        profileImage: null,
        introduction: "개발자 계정",
      };
      login(mockToken, mockUser);
      navigate("/");
      return;
    }

    // --- 실제 로그인 로직 ---
    try {
      // 🚨 [수정됨] 기존 코드에선 loginData가 없어서 에러가 났습니다.
      // id와 password를 직접 넘겨줍니다.
      const response = await loginUser(id, password);

      // 응답에서 토큰과 유저 정보 추출 (백엔드 응답 구조에 따라 다를 수 있음)
      // 보통 response.data 안에 들어있습니다.
      const data = response.data;
      const token = data.accessToken || data.token;

      if (token) {
        const userInfo = data.user || {
          nickname: "고수님",
          profileImage: null,
        };

        // Context 업데이트 및 이동
        login(token, userInfo);
        alert("환영합니다!");
        navigate("/");
      } else {
        alert("로그인에 실패했습니다. (토큰 없음)");
      }
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "아이디 또는 비밀번호를 확인해주세요.";
      alert(message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f8f9fa] overflow-hidden">
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-8 cursor-pointer tracking-tighter hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      >
        숨은 고수 찾기
      </h1>

      <div className="w-full max-w-[400px] bg-white p-10 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-center mb-8 text-[#333] text-2xl font-bold">
          로그인
        </h2>

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
            className="absolute left-4 top-3 text-gray-400 text-base transition-all duration-200 pointer-events-none bg-white px-1 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#ee5a6f] peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-500"
          >
            아이디
          </label>
        </div>

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
            className="absolute left-4 top-3 text-gray-400 text-base transition-all duration-200 pointer-events-none bg-white px-1 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#ee5a6f] peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-500"
          >
            비밀번호
          </label>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 bg-[#ee5a6f] text-white rounded-xl text-lg font-bold hover:bg-[#d6455b] transition-all shadow-sm cursor-pointer active:scale-[0.98]"
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
