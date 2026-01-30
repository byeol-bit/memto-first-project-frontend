import { useState, useRef } from "react";
import { useNavigate } from "react-router"; // 페이지 이동을 도와주는 훅
// 위에서 만든 API 함수들을 불러옵니다.
import {
  registerUser,
  checkIdDuplicate,
  checkNicknameDuplicate,
} from "../api/auth";
import "./sign-up-page.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  // 파일 업로드 버튼을 꾸미기 위해, 실제 <input type="file">을 숨기고 조작할 때 사용합니다.
  const fileInputRef = useRef(null);

  /* 상태(State) 관리: 사용자의 입력값을 저장하는 변수들 */
  const [id, setId] = useState(""); // 로그인용 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인(일치 여부용)
  const [nickname, setNickname] = useState(""); // 활동명
  const [introduction, setIntroduction] = useState(""); // 자기소개

  // 중복 확인을 통과했는지 여부 (true여야 가입 가능)
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // 프로필 이미지 관련 상태 (보여줄 이미지 주소, 배경색, 선택된 옵션 번호)
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#f0f0f0");
  const [selectedIdx, setSelectedIdx] = useState(null);

  // 비밀번호를 점(●)으로 보여줄지, 텍스트로 보여줄지 결정
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* 프로필 아이콘 */
  const silhouetteIcon = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  );

  const defaultOptions = [
    { color: "#FFB6B9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#8AC6D1", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#BBDED6", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#FAE3D9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  ];

  /* 이벤트 핸들러: 사용자의 행동에 반응하는 함수 */

  // 입력값이 바뀌면 중복확인 상태를 초기화(false)
  const handleIdChange = (e) => {
    setId(e.target.value);
    setIsIdChecked(false);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChecked(false);
  };

  // [아이디 중복확인] 버튼 클릭 시 실행
  const handleCheckId = async () => {
    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }
    try {
      // 서버에 물어봅니다. 에러가 안 나면 사용 가능한 것!
      await checkIdDuplicate(id);
      alert("사용 가능한 아이디입니다.");
      setIsIdChecked(true); // 통과 체크!
    } catch (error) {
      alert("이미 사용 중인 아이디입니다.");
      setIsIdChecked(false);
    }
  };

  // [닉네임 중복확인] 버튼 클릭 시 실행
  const handleCheckNickname = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      await checkNicknameDuplicate(nickname);
      alert("사용 가능한 닉네임입니다.");
      setIsNicknameChecked(true); // 통과 체크!
    } catch (error) {
      alert("이미 사용 중인 닉네임입니다.");
      setIsNicknameChecked(false);
    }
  };

  // [기본 프로필 선택] 동그라미 색깔 클릭 시
  const handleSelectDefault = (option, index) => {
    setPreviewImage(option.img);
    setSelectedColor(option.color);
    setSelectedIdx(index);
  };

  // [파일 업로드] + 버튼 눌러서 사진 골랐을 때
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 첫 번째 파일
    if (file) {
      // 브라우저에서 볼 수 있는 임시 URL 생성
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setSelectedColor("#ffffff");
      setSelectedIdx("upload");
    }
  };

  // [회원가입 하기] 버튼 클릭 시 실행
  const handleSignUp = async () => {
    // 빈칸이 없는지 (유효성 검사)
    if (!nickname) return alert("닉네임을 입력해주세요.");
    if (!id) return alert("아이디를 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");
    if (password !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다.");

    // 중복 확인을 수행했는지
    if (!isNicknameChecked) return alert("닉네임 중복 확인을 해주세요.");
    if (!isIdChecked) return alert("아이디 중복 확인을 해주세요.");

    // 서버로 보낼 데이터
    const requestData = {
      loginId: id,
      password: password,
      nickname: nickname,
      introduction: introduction,
    };

    // API
    try {
      await registerUser(requestData); // 전송
      alert(`환영합니다, ${nickname} 고수님! 가입이 완료되었습니다.`);
      navigate("/sign-in"); // 성공하면 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 에러:", error);
      // 서버가 보내준 에러 메시지가 있으면 그걸 보여주고, 없으면 기본 메시지 출력
      alert(error.message || "회원가입 실패 (관리자에게 문의하세요)");
    }
  };

  /* 화면 UI*/
  return (
    <div className="signup-page-container">
      <h1 className="logo" onClick={() => navigate("/")}>
        숨은 고수 찾기
      </h1>
      <div className="signup-box">
        {/* 프로필 사진 */}
        <div className="profile-section">
          <div
            className="main-profile-preview"
            style={{ backgroundColor: selectedColor }}
          >
            {/* 이미지가 있으면 이미지 태그, 없으면 비워두기 */}
            {previewImage ? <img src={previewImage} alt="미리보기" /> : null}
          </div>
          {!previewImage && (
            <p className="profile-text">프로필 사진을 선택해주세요</p>
          )}

          {/* 선택지 리스트 */}
          <div
            className={`default-images-list ${previewImage ? "has-preview" : ""}`}
          >
            {defaultOptions.map((opt, i) => (
              <div
                key={i}
                className={`default-img-item ${selectedIdx === i ? "selected" : ""}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => handleSelectDefault(opt, i)}
              >
                <img src={opt.img} alt="opt" className="option-icon" />
              </div>
            ))}
            {/* 숨겨진 실제 파일 입력창 (ref로 연결) */}
            <input
              type="file"
              className="hidden-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            {/* 업로드 버튼 */}
            <div
              className={`default-img-item upload-btn ${selectedIdx === "upload" ? "selected" : ""}`}
              onClick={() => fileInputRef.current.click()}
            >
              <span className="plus-icon">+</span>
            </div>
          </div>
        </div>

        {/* --- 입력 폼 섹션 --- */}
        {/* 닉네임 + 중복확인 버튼 */}
        <div className="simple-input-group group-top">
          <input
            type="text"
            className="simple-input"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임 (활동명)"
          />
          <button className="check-btn" onClick={handleCheckNickname}>
            중복확인
          </button>
        </div>

        {/* 아이디 + 중복확인 버튼 */}
        <div className="simple-input-group group-middle">
          <input
            type="text"
            className="simple-input"
            value={id}
            onChange={handleIdChange}
            placeholder="아이디"
          />
          <button className="check-btn" onClick={handleCheckId}>
            중복확인
          </button>
        </div>

        {/* 비밀번호 */}
        <div className="simple-input-group group-middle password-group">
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
        <div className="simple-input-group group-middle password-group">
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

        {/* 자기소개 (여러 줄 입력 가능하게) */}
        <div className="simple-input-group group-bottom textarea-group">
          <textarea
            className="simple-input simple-textarea"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="고수님의 소개를 작성해주세요! (선택)"
          />
        </div>

        <button className="primary-btn signup-btn" onClick={handleSignUp}>
          가입하기
        </button>
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
