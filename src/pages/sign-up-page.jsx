import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  registerUser,
  checkIdDuplicate,
  checkNicknameDuplicate,
} from "../api/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- 상태 관리 ---
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

  // 중복 확인 상태
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // 프로필 이미지 관련 상태
  const [previewImage, setPreviewImage] = useState(null); // 보여지는 이미지 주소
  const [selectedFile, setSelectedFile] = useState(null); // 실제 서버로 보낼 파일 객체
  const [selectedColor, setSelectedColor] = useState("#f0f0f0"); // 배경색
  const [selectedIdx, setSelectedIdx] = useState(null); // 초기값 null -> 선택안함 상태

  // --- SVG 관련 리소스 ---
  const rawSvgString = `<svg xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" fill="#ffffff">
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 
  2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

  const silhouetteIcon = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 
    4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  );

  const defaultOptions = [
    { color: "#FFB6B9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#8AC6D1", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#BBDED6", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
    { color: "#FAE3D9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  ];

  const handleCheckId = async () => {
    if (!id) return alert("아이디를 입력해주세요.");

    try {
      const response = await checkIdDuplicate(id);

      if (response.data.isAvailable === true) {
        alert("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else {
        alert("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
      }
    } catch (error) {
      console.error("아이디 중복 검사 에러:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
      setIsIdChecked(false);
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) return alert("닉네임을 입력해주세요.");

    try {
      const response = await checkNicknameDuplicate(nickname);

      if (response.data.isAvailable === true) {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      console.error("닉네임 중복 검사 에러:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
      setIsNicknameChecked(false);
    }
  };

  const handleSelectDefault = (option, index) => {
    setPreviewImage(option.img);
    setSelectedColor(option.color);
    setSelectedIdx(index);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setSelectedColor("#ffffff");
      setSelectedIdx("upload");
    }
  };

  // ⭐ [핵심 수정] SVG를 PNG 파일로 변환하는 함수 (비동기)
  const createPngFileFromSvg = (color) => {
    return new Promise((resolve, reject) => {
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="500" height="500">
        <rect width="100%" height="100%" fill="${color}" />
        <path fill="#ffffff" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>`;

      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, 500, 500);

        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const pngFile = new File([pngBlob], "default_profile.png", {
              type: "image/png",
            });
            resolve(pngFile);
          } else {
            reject(new Error("이미지 변환 실패"));
          }
          URL.revokeObjectURL(url);
        }, "image/png");
      };

      img.onerror = (e) => reject(new Error("SVG 로드 실패"));
      img.src = url;
    });
  };

  // 5. 회원가입 요청 핸들러
  const handleSignUp = async (e) => {
    e.preventDefault();

    // 1. 유효성 검사 (질문자님이 선언한 변수명 id, nickname 등을 정확히 사용!)
    if (!id) return alert("아이디를 입력해주세요.");
    if (!isIdChecked) return alert("아이디 중복확인을 완료해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");
    if (password !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다.");
    if (!nickname) return alert("닉네임을 입력해주세요.");
    if (!isNicknameChecked) return alert("닉네임 중복확인을 완료해주세요.");

    try {
      const formData = new FormData();

      formData.append("loginId", id);
      formData.append("nickname", nickname);
      formData.append("password", password);
      formData.append("introduction", introduction || "");

      if (selectedIdx === "upload" && selectedFile) {
        formData.append("image", selectedFile);
      } else if (selectedIdx !== null) {
        const generatedPngFile = await createPngFileFromSvg(selectedColor);
        formData.append("image", generatedPngFile);
      }
      const response = await registerUser(formData);

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      const errorMessage =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] py-10 px-4">
      <h1
        className="text-[#ee5a6f] text-4xl font-black mb-8 cursor-pointer tracking-tighter hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      >
        숨은 고수 찾기
      </h1>

      <div className="w-full max-w-[500px] bg-white px-8 py-10 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center mb-6 transition-all"
            style={{ backgroundColor: selectedColor }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-3xl">？</span>
            )}
          </div>

          <div className="flex gap-3">
            {defaultOptions.map((opt, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full cursor-pointer transition-transform flex items-center 
                  justify-center shadow-sm hover:scale-110 
                  ${selectedIdx === i ? "ring-2 ring-[#ee5a6f] scale-110" : ""}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => handleSelectDefault(opt, i)}
              >
                <img src={opt.img} alt="icon" className="w-6 opacity-80" />
              </div>
            ))}

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <button
              className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center 
                justify-center transition-colors 
                ${
                  selectedIdx === "upload"
                    ? "border-[#ee5a6f] text-[#ee5a6f] bg-red-50"
                    : "border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500"
                }`}
              onClick={() => fileInputRef.current.click()}
            >
              +
            </button>
          </div>
          {selectedIdx === null && (
            <p className="text-xs text-[#ee5a6f] mt-2 font-bold animate-pulse">
              프로필 이미지를 선택해주세요!
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 
              rounded-lg outline-none focus:bg-white focus:border-[#ee5a6f] 
              focus:ring-1 focus:ring-[#ee5a6f] transition-all"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIsIdChecked(false);
              }}
              placeholder="아이디"
            />
            <button
              onClick={handleCheckId}
              className={`px-4 rounded-lg text-sm font-bold transition-colors shadow-sm whitespace-nowrap 
                ${isIdChecked ? "bg-green-500 text-white" : "bg-gray-700 text-white hover:bg-gray-800"}`}
            >
              {isIdChecked ? "확인됨" : "중복확인"}
            </button>
          </div>

          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
            focus:bg-white focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f] transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />

          <input
            type="password"
            className={`w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none 
              focus:bg-white focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f] transition-all 
              ${
                password && confirmPassword && password !== confirmPassword
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-red-500 ml-1">
              비밀번호가 일치하지 않습니다.
            </p>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
              focus:bg-white focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f] transition-all"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameChecked(false);
              }}
              placeholder="닉네임"
            />
            <button
              onClick={handleCheckNickname}
              className={`px-4 rounded-lg text-sm font-bold transition-colors shadow-sm whitespace-nowrap 
                ${isNicknameChecked ? "bg-green-500 text-white" : "bg-gray-700 text-white hover:bg-gray-800"}`}
            >
              {isNicknameChecked ? "확인됨" : "중복확인"}
            </button>
          </div>

          <textarea
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
            focus:bg-white focus:border-[#ee5a6f] focus:ring-1 focus:ring-[#ee5a6f] transition-all resize-none h-24"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="고수님의 소개를 작성해주세요! (선택)"
          />
        </div>

        <button
          onClick={handleSignUp}
          className="w-full py-4 mt-8 bg-[#ee5a6f] text-white rounded-xl text-lg font-bold hover:bg-[#d6455b] transition-all shadow-md active:scale-[0.98]"
        >
          가입하기
        </button>

        <div className="mt-6 text-center text-gray-500 text-sm">
          이미 계정이 있으신가요?
          <span
            className="ml-2 font-bold text-[#ee5a6f] cursor-pointer hover:underline"
            onClick={() => navigate("/sign-in")}
          >
            로그인 하러가기
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
