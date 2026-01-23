import { useState } from "react";
// 입력창에 타자를 칠 때마다 그 글자가 저장됨
// 아이디와 비밀번호 입력 안하면 버튼 활성화 안되게 할 수 있음
import { useNavigate } from "react-router-dom";
// '회원가입' 버튼을 누르면 회원가입 페이지로 이동
// 부드럽게 이동하고, 로그인 정보가 안전하게 유지됨
import "./sign-in-page.css";

const SignInPage = () => {
  //변수를 바꾸고 싶을 땐 setId, setPassword 함수를 사용
  //useState()로 비워두면 undefined상태가 되어 오류남
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 페이지 이동을 도와주는 도구(navigate)를 준비
  const navigate = useNavigate();

  // 버튼 눌렀을 때
  const handleLogin = () => {
    // 개발자 도구(F12) 콘솔창에 현재 입력된 값을 출력해봅니다. (확인용)
    console.log("현재 입력된 값:", id, password);

    // 유효성 검사: 만약 아이디나 비밀번호 중 하나라도 비어있다면 경고창 띄우고 함수 종료
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요!");
      return;
    }

    // 나중에 여기에 '서버로 로그인 요청 보내는 코드'
    // 지금은 테스트용 알림창만 띄웁니다.
    alert(`[테스트] 로그인 시도! \nID: ${id} \nPW: ${password}`);

    // 로그인이 성공했다고 가정하고 마이페이지로 이동 -> navigate('/mypage');
  };

  // UI
  return (
    <div className="login-page-container">
      {/* 1. 상단 로고 영역 (이미지나 텍스트로 교체 가능) */}
      <h1 className="logo">숨은 고수 찾기</h1>

      <div className="loginBox">
        {/* 2. 아이디 입력창 (플로팅 라벨 구조) */}
        <div className="input-group">
          <input
            type="text"
            id="id-input"
            className="floating-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder=" " /* placeholder를 공백으로 둬야 CSS 트릭이 작동함 */
          />
          <label htmlFor="id-input" className="floating-label">
            아이디
          </label>
        </div>

        {/* 3. 비밀번호 입력창 */}
        <div className="input-group" style={{ marginTop: "-1px" }}>
          {" "}
          {/* 테두리 겹침 처리 */}
          <input
            type="password"
            id="password-input"
            className="floating-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            placeholder=" "
          />
          <label htmlFor="password-input" className="floating-label">
            비밀번호
          </label>
        </div>
        {/* 4. 로그인 버튼 */}
        <button className="primary-btn login-btn" onClick={handleLogin}>
          로그인
        </button>

        {/* 5. 하단 링크 영역 (아이디 찾기 | 비밀번호 찾기 | 회원가입) */}
        <div className="bottom-links">
          <span>아이디 찾기</span>
          <span className="separator">|</span>
          <span>비밀번호 찾기</span>
          <span className="separator">|</span>
          {/* 회원가입만 클릭 기능 연결 */}
          <span className="signup-link" onClick={() => navigate("/sign-up")}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
