import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api/auth";
import "./sign-in-page.css";

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
    <div className="signin-container">
      <h1 className="logo" onClick={() => navigate("/")}>
        숨은 고수 찾기
      </h1>

      <div className="signin-box">
        <h2 className="signin-title">로그인</h2>

        {/* 아이디 입력창*/}
        <div className="input-group">
          <input
            type="text"
            id="loginId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="loginId" className="floating-label">
            아이디
          </label>
        </div>

        {/*비밀번호 입력창*/}
        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            placeholder=" "
          />
          <label htmlFor="password" className="floating-label">
            비밀번호
          </label>
        </div>

        <button className="primary-btn login-btn" onClick={handleLogin}>
          로그인
        </button>

        <div className="bottom-link">
          아직 계정이 없으신가요?
          <span onClick={() => navigate("/sign-up")}> 회원가입 하기</span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
