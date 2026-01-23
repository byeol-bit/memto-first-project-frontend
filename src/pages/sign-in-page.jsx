import { useState } from "react";
// 입력창에 타자를 칠 때마다 그 글자가 저장됨
// 아이디와 비밀번호를 입력 안하면 나중에 버튼을 못 누르게 막을 수도 있음

import { useNavigate } from "react-router-dom";
// '회원가입' 버튼을 누르면 페이지를 이동시켜주는 도구
// 새로고침 없이 부드럽게 넘어가서 앱처럼 느껴지게 함

import "./sign-in-page.css";

const SignInPage = () => {
  // [변수 저장소]
  // 리액트에서는 변수를 그냥 만들면 안 되고 useState를 써야 화면이 바뀜
  // setId, setPassword 함수를 써야만 값이 안전하게 변경됨
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // [페이지 이동 리모컨]
  // navigate('/주소') 이렇게 쓰면 그 페이지로 이동함
  const navigate = useNavigate();

  // [로그인 버튼 클릭 시 실행되는 함수]
  const handleLogin = () => {
    // 개발자 도구(F12) - 콘솔(Console) 탭에서 값이 잘 들어왔나 확인용
    console.log("현재 입력된 값:", id, password);

    // 만약(!id) 아이디가 없거나, 또는(!password) 비밀번호가 없다면 문구 출력
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요!");
      return;
    }

    // 나중에 여기에 '백엔드 서버로 로그인 요청 보내는 코드'가 들어갈 자리
    // 지금은 테스트용으로 알림창만 띄워서 성공한 척 보여줌
    alert(`[테스트] 로그인 시도! \nID: ${id} \nPW: ${password}`);

    // 로그인이 진짜 성공하면 메인 페이지로 보낼 예정 -> navigate('/');
  };

  // UI
  return (
    <div className="login-page-container">
      {/* 1. 상단 로고 영역 */}
      <h1 className="logo">숨은 고수 찾기</h1>

      {/* 2. 하얀색 로그인 박스 시작 */}
      <div className="loginBox">
        {/* [아이디 입력 칸] 
            input과 label을 묶어서 디자인(위치)을 잡기 위해 div로 감쌈 
        */}
        <div className="input-group">
          <input
            type="text"
            id="id-input"
            className="floating-input"
            /* [중요] 리액트가 기억하는 값(id)을 화면에 보여줌 */
            value={id}
            /* [중요] 타자를 칠 때마다 setId로 값을 업데이트함 (안 하면 글씨 안 써짐) */
            onChange={(e) => setId(e.target.value)}
            /* [디자인 트릭] placeholder에 공백(" ")을 넣어줘야 함!
               CSS가 "어? 빈 칸이네?" 하고 알아채서 라벨을 크게 보여줄 수 있음
               이게 없으면 라벨이 움직이는 마법이 작동 안 함 */
            placeholder=" "
          />
          {/* htmlFor는 input의 id랑 연결해줌 (라벨 눌러도 입력창 선택됨) */}
          <label htmlFor="id-input" className="floating-label">
            아이디
          </label>
        </div>

        {/* [비밀번호 입력 칸]
            style={{ marginTop: "-1px" }} -> 위쪽 아이디 칸 테두리랑 겹치게 함
            안 그러면 테두리가 두 줄이 돼서 두꺼워 보이기 때문
        */}
        <div className="input-group" style={{ marginTop: "-1px" }}>
          <input
            type="password" // 글자를 점(●●●)으로 숨겨줌
            id="password-input"
            className="floating-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /* [엔터키 기능] 비밀번호 다 치고 '엔터' 딱 누르면 바로 로그인 함수 실행 */
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            placeholder=" "
          />
          <label htmlFor="password-input" className="floating-label">
            비밀번호
          </label>
        </div>

        {/* 4. 로그인 버튼 (클릭하면 handleLogin 함수 실행) */}
        <button className="primary-btn login-btn" onClick={handleLogin}>
          로그인
        </button>

        {/* 5. 하단 링크 영역 (아이디/비번 찾기, 회원가입) */}
        <div className="bottom-links">
          {/* 모양만 있음 */}
          <span>아이디 찾기</span>
          <span className="separator">|</span>
          <span>비밀번호 찾기</span>
          <span className="separator">|</span>

          {/* [페이지 이동] 회원가입 글씨를 누르면 '/sign-up' 주소로 이동! */}
          <span className="signup-link" onClick={() => navigate("/sign-up")}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
