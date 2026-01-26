import { useState, useRef } from "react";
// useState: 화면에 보여지는 데이터(상태)를 저장하는 통
// useRef: 특정 HTML 요소(여기서는 파일 업로드 창)를 코드로 조작하기 위한 도구

import { useNavigate } from "react-router";
// useNavigate: 회원가입이 끝나면 로그인 페이지로 '이동'시켜주는 네비게이션

import "./sign-up-page.css";
// 디자인 파일 연결

const SignUpPage = () => {
  /* [1] 사용자 입력값 상태 관리 (State)
     - 사용자가 타자 칠 때마다 이 변수들에 값이 저장됩니다. */
  const [id, setId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [nickname, setNickname] = useState(""); // 닉네임
  const [introduction, setIntroduction] = useState(""); // 소개글

  /*  [2] 프로필 사진 관련 설정 */

  // 1. 기본 실루엣 아이콘 (사람 모양 그림)
  // 이미지가 없을 때도 보여주기 위해 SVG 코드를 직접 변수에 담았습니다.
  // SVG 코드 : 벡터 그래픽 형식의 이미지
  const silhouetteIcon = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  `);

  // 2. 기본 선택지 4개 (각각 다른 배경색 + 실루엣 아이콘)
  const defaultOptions = [
    { color: "#FFB6B9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` }, // 0번: 분홍
    { color: "#8AC6D1", img: `data:image/svg+xml;utf8,${silhouetteIcon}` }, // 1번: 하늘
    { color: "#BBDED6", img: `data:image/svg+xml;utf8,${silhouetteIcon}` }, // 2번: 민트
    { color: "#FAE3D9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` }, // 3번: 살구
  ];

  /* [프로필 상태 변수들]
     - previewImage: 현재 화면에 크게 보여줄 이미지 주소 (null이면 빈 카메라 아이콘 뜸)
     - selectedColor: 메인 원의 배경색
     - selectedIdx: 사용자가 몇 번째 걸 선택했는지 기억 (0~3: 기본, 'upload': 직접 올림)
     - uploadFile: 사용자가 직접 올린 파일 객체 (서버 전송용)
  */
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#f0f0f0"); // 기본 회색
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  // 비밀번호 눈알 아이콘(보기/숨기기) 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 페이지 이동 및 파일창 제어 도구
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // <input type="file">에 접근하기 위한 열쇠

  /* [3] 이벤트 핸들러 (기능 함수들)*/

  // 3-1. 아래쪽 작은 동그라미(기본 이미지)를 눌렀을 때
  const handleSelectDefault = (option, index) => {
    setPreviewImage(option.img); // 큰 원에 실루엣 보여주기
    setSelectedColor(option.color); // 배경색 바꾸기
    setSelectedIdx(index); // "나 지금 n번 선택했어!" 라고 표시 (빨간 테두리용)
    setUploadFile(null); // 직접 올린 파일은 지움
  };

  // 3-2. (+) 버튼을 눌러서 내 컴퓨터의 파일을 선택했을 때
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 사용자가 고른 파일 가져오기
    if (file) {
      // 브라우저에서 파일을 미리볼 수 있게 임시 주소를 만듦 (blob:http://...)
      const fileUrl = URL.createObjectURL(file);

      setPreviewImage(fileUrl);
      setSelectedColor("#ffffff"); // 사진이니까 배경은 흰색으로
      setSelectedIdx("upload"); // "나 지금 업로드 버튼 선택했어!" 표시
      setUploadFile(file); // 나중에 서버로 보낼 파일 저장 => 연동시 이름 맞춰서 보내기
    }
  };

  // 3-3. '가입하기' 버튼 눌렀을 때
  const handleSignUp = () => {
    // 필수 입력칸 비어있는지 검사
    if (!id || !password || !confirmPassword || !nickname) {
      alert("필수 정보를 모두 입력해주세요!");
      return;
    }
    // 비밀번호 두 개가 같은지 검사
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // [중요] 사용자가 사진을 안 고르고 가입버튼을 눌렀다면?
    // -> 자동으로 0번(분홍 실루엣)을 선택한 것으로 처리해줍니다.
    let finalProfileType = selectedIdx;
    if (selectedIdx === null) {
      finalProfileType = 0;
    }

    // (확인용 콘솔 출력)
    console.log("--- 회원가입 요청 데이터 ---");
    console.log("ID:", id);
    console.log("닉네임:", nickname);
    console.log("소개글:", introduction);
    console.log(
      "선택한 프로필:",
      finalProfileType === "upload"
        ? "직접 업로드 파일"
        : `기본이미지 ${finalProfileType}번`,
    );

    // 성공 알림 후 로그인 페이지로 이동
    alert(`환영합니다, ${nickname} 고수님! \n회원가입이 완료되었습니다.`);
    navigate("/sign-in");
  };

  /* [4] 화면 그리기 (UI) */
  return (
    <div className="signup-page-container">
      <h1 className="logo">숨은 고수 찾기</h1>

      <div className="signupBox">
        {/* --- [프로필 사진 선택 구역] --- */}
        <div className="profile-section">
          {/* 1. 메인 미리보기 원 (클릭해도 아무 일 안 일어남) */}
          <div
            className="main-profile-preview"
            style={{ backgroundColor: selectedColor }}
          >
            {/* previewImage가 있으면 사진을, 없으면(null) 카메라 아이콘을 보여줌 */}
            {previewImage ? (
              <img src={previewImage} alt="프로필 미리보기" />
            ) : (
              <div style={{ fontSize: "40px" }}>📷</div>
            )}
          </div>

          {/* 2. 안내 문구: 이미지를 선택하면 사라짐 (!previewImage 조건) */}
          {!previewImage && (
            <p className="profile-text">프로필 사진을 선택해주세요</p>
          )}

          {/* 3. 선택지 리스트 (작은 원 5개) */}
          {/* 이미지를 선택해서 문구가 사라지면, 간격을 벌리기 위해 margin 추가 */}
          <div
            className="default-images-list"
            style={{ marginTop: previewImage ? "20px" : "0" }}
          >
            {/* (1~4번) 기본 실루엣 아이템들 반복문으로 생성 */}
            {defaultOptions.map((option, index) => (
              <div
                key={index}
                // 내가 선택한 번호(selectedIdx)랑 같으면 'selected' 클래스 추가 -> 빨간 테두리 생김
                className={`default-img-item ${selectedIdx === index ? "selected" : ""}`}
                style={{ backgroundColor: option.color }}
                onClick={() => handleSelectDefault(option, index)}
              >
                <img
                  src={option.img}
                  alt={`기본${index + 1}`}
                  className="option-icon"
                />
              </div>
            ))}

            {/* (5번) 파일 업로드 버튼 (+) */}
            {/* 실제 파일 선택창(input)은 숨겨두고 버튼을 누르면 클릭되게 함 */}
            <input
              type="file"
              style={{ display: "none" }} // 화면에서 숨김
              ref={fileInputRef} // 리모컨 연결
              onChange={handleFileChange} // 파일 선택하면 실행될 함수
              accept="image/*" // 이미지만 선택 가능
            />

            <div
              // 업로드 상태('upload')일 때 빨간 테두리 추가
              className={`default-img-item upload-btn ${selectedIdx === "upload" ? "selected" : ""}`}
              onClick={() => fileInputRef.current.click()} // 클릭하면 숨겨진 input을 대신 클릭해줌
            >
              <span className="plus-icon">+</span>
            </div>
          </div>
        </div>

        {/* --- [입력창 구역] --- */}
        {/* 닉네임 입력 */}
        <div className="simple-input-group">
          <input
            type="text"
            className="simple-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 (활동명)"
          />
        </div>

        {/* 아이디 입력 (위쪽 테두리 겹침 처리) */}
        <div className="simple-input-group" style={{ marginTop: "-1px" }}>
          <input
            type="text"
            className="simple-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
          />
        </div>

        {/* 비밀번호 입력 (보기/숨기기 버튼 포함) */}
        <div
          className="simple-input-group password-group"
          style={{ marginTop: "-1px" }}
        >
          {/* type이 'password'면 점으로 보이고, 'text'면 글자가 보임 */}
          <input
            type={showPassword ? "text" : "password"}
            className="simple-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>

        {/* 비밀번호 확인 */}
        <div
          className="simple-input-group password-group"
          style={{ marginTop: "-1px" }}
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="simple-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "숨기기" : "보기"}
          </button>
        </div>

        {/* 소개글 (Textarea) */}
        <div
          className="simple-input-group textarea-group"
          style={{ marginTop: "-1px" }}
        >
          <textarea
            className="simple-input simple-textarea"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="고수님의 활동을 소개해주세요 (선택사항)"
          />
        </div>

        {/* 가입하기 버튼 */}
        <button className="primary-btn signup-btn" onClick={handleSignUp}>
          가입하기
        </button>

        {/* 로그인 페이지 이동 링크 */}
        <div className="bottom-links">
          이미 계정이 있으신가요?
          <span className="login-link" onClick={() => navigate("/sign-in")}>
            로그인 하러가기
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
