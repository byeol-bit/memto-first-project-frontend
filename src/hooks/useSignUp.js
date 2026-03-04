import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  registerUser,
  checkIdDuplicate,
  checkNicknameDuplicate,
} from "../api/auth";

const silhouetteIcon = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 
  4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
);

export const defaultOptions = [
  { color: "#FFB6B9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  { color: "#8AC6D1", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  { color: "#BBDED6", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
  { color: "#FAE3D9", img: `data:image/svg+xml;utf8,${silhouetteIcon}` },
];

export const useSignUp = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [previewImage, setPreviewImage] = useState(defaultOptions[0].img);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedColor, setSelectedColor] = useState(defaultOptions[0].color);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleCheckId = async () => {
    if (!id) return alert("아이디를 입력해주세요.");

    const idRegex = /^[a-z0-9]+$/;
    if (!idRegex.test(id)) {
      return alert(
        "아이디는 영문 소문자와 숫자만 사용 가능합니다. (한글, 대문자, 특수문자 불가)",
      );
    }

    try {
      const response = await checkIdDuplicate(id);
      if (response.data.isAvailable) {
        alert("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else {
        alert("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
      }
    } catch (error) {
      alert("서버와 통신 중 문제가 발생했습니다.");
      setIsIdChecked(false);
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) return alert("닉네임을 입력해주세요.");
    try {
      const response = await checkNicknameDuplicate(nickname);
      if (response.data.isAvailable) {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
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
          if (pngBlob)
            resolve(
              new File([pngBlob], "default_profile.png", { type: "image/png" }),
            );
          else reject(new Error("이미지 변환 실패"));
          URL.revokeObjectURL(url);
        }, "image/png");
      };
      img.onerror = () => reject(new Error("SVG 로드 실패"));
      img.src = url;
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!id || !isIdChecked) return alert("아이디 중복확인을 완료해주세요.");

    if (!password) return alert("비밀번호를 입력해주세요.");
    if (!confirmPassword) return alert("비밀번호 확인을 입력해주세요.");
    if (password !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다.");

    if (!nickname || !isNicknameChecked)
      return alert("닉네임 중복확인을 완료해주세요.");

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
        alert("회원가입이 완료되었습니다!");
        navigate("/sign-in");
      }
    } catch (error) {
      alert(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  return {
    navigate,
    fileInputRef,
    id,
    setId,
    isIdChecked,
    setIsIdChecked,
    handleCheckId,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    nickname,
    setNickname,
    isNicknameChecked,
    setIsNicknameChecked,
    handleCheckNickname,
    introduction,
    setIntroduction,
    previewImage,
    selectedColor,
    selectedIdx,
    handleSelectDefault,
    handleFileChange,
    handleSignUp,
  };
};
