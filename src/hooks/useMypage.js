import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  getUserProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
  logoutUser,
  checkNicknameDuplicate,
} from "../api/auth";

export const useMyPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- State ---
  const [userInfo, setUserInfo] = useState(null);
  const [stats, setStats] = useState({ followerCount: 0, followingCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("reviews");
  const [tabData, setTabData] = useState([]);
  const [isTabLoading, setIsTabLoading] = useState(false);

  // 사진 수정
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedIdx, setSelectedIdx] = useState(null);

  // 모달 상태
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const rawSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
  const silhouetteIcon = encodeURIComponent(rawSvgString);
  const defaultOptions = [
    {
      color: "#FFB6B9",
      img: `data:image/svg+xml;charset=utf-8,${silhouetteIcon}`,
    },
    {
      color: "#8AC6D1",
      img: `data:image/svg+xml;charset=utf-8,${silhouetteIcon}`,
    },
    {
      color: "#BBDED6",
      img: `data:image/svg+xml;charset=utf-8,${silhouetteIcon}`,
    },
    {
      color: "#FAE3D9",
      img: `data:image/svg+xml;charset=utf-8,${silhouetteIcon}`,
    },
  ];

  // --- API Effects ---
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserProfile();

        if (res.status === 200 && res.data) {
          setUserInfo(res.data);
          setNicknameInput(res.data.nickname);
          setPreviewImage(res.data.profileImage);
          setSelectedColor("#ffffff");

          if (res.data.id) {
            const [fRes, ingRes] = await Promise.all([
              axios.get(`/follows/${res.data.id}/follower-count`),
              axios.get(`/follows/${res.data.id}/following-count`),
            ]);
            setStats({
              followerCount: fRes.data?.count || 0,
              followingCount: ingRes.data?.count || 0,
            });
          }
        }
      } catch (e) {
        if (e.response && e.response.status === 401) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/sign-in");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchTabData = async () => {
      if (!userInfo?.id) return;
      setIsTabLoading(true);
      try {
        let res;
        if (activeTab === "reviews")
          res = await axios.get(`/visits?userId=${userInfo.id}`);
        else if (activeTab === "followers")
          res = await axios.get(`/follows/followers/${userInfo.id}`);
        else if (activeTab === "followings")
          res = await axios.get(`/follows/followings/${userInfo.id}`);
        setTabData(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        setTabData([]);
      } finally {
        setIsTabLoading(false);
      }
    };
    fetchTabData();
  }, [activeTab, userInfo?.id]);

  // --- Handlers ---
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

  const createSvgFile = (color) => {
    const coloredSvgString = rawSvgString.replace(
      'fill="#ffffff">',
      `fill="#ffffff"><rect width="100%" height="100%" fill="${color}" />`,
    );
    const blob = new Blob([coloredSvgString], { type: "image/svg+xml" });
    return new File([blob], "default_profile.svg", { type: "image/svg+xml" });
  };

  const saveProfileImage = async () => {
    if (selectedIdx === null && !selectedFile)
      return alert("이미지를 선택해주세요.");
    try {
      const formData = new FormData();
      formData.append("nickname", userInfo.nickname);

      // ⭐ [수정] 스웨거 명세서에 맞춰 profileImage -> image 로 이름 변경!
      if (selectedIdx === "upload" && selectedFile)
        formData.append("image", selectedFile);
      else formData.append("image", createSvgFile(selectedColor));

      await updateProfile(formData);
      alert("프로필 사진 변경 완료!");
      window.location.reload();
    } catch (e) {
      alert("오류 발생");
    }
  };

  const handleCheckNickname = async () => {
    try {
      await checkNicknameDuplicate(nicknameInput);
      alert("사용 가능합니다.");
      setIsNicknameChecked(true);
    } catch (e) {
      alert("중복되거나 오류가 있습니다.");
      setIsNicknameChecked(false);
    }
  };

  const saveNickname = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nicknameInput);
      await updateProfile(formData);
      alert("닉네임 변경 완료!");
      window.location.reload();
    } catch (e) {
      alert("오류 발생");
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) return alert("현재 비밀번호를 입력해주세요.");
    if (newPassword !== confirmPassword)
      return alert("새 비밀번호가 일치하지 않습니다.");

    try {
      await updatePassword(currentPassword, newPassword);
      alert("변경 완료. 다시 로그인해주세요.");

      await logoutUser();

      navigate("/sign-in");
    } catch (e) {
      const errorMsg =
        e.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다.";
      alert(errorMsg);
    }
  };

  const handleUnfollow = async (targetId) => {
    if (!window.confirm("언팔로우 하시겠습니까?")) return;
    try {
      await axios.delete(`/follows/${targetId}`);
      alert("취소되었습니다.");
      setTabData((prev) => prev.filter((item) => item.id !== targetId));
      setStats((prev) => ({
        ...prev,
        followingCount: prev.followingCount - 1,
      }));
    } catch (e) {
      alert("오류 발생");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    } finally {
      alert("로그아웃 되었습니다.");
      navigate("/sign-in");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await deleteAccount();
        alert("탈퇴 완료");
        navigate("/");
      } catch (e) {
        alert("오류 발생");
      }
    }
  };

  return {
    navigate,
    fileInputRef,
    userInfo,
    stats,
    isLoading,
    activeTab,
    setActiveTab,
    tabData,
    isTabLoading,
    isEditingPhoto,
    setIsEditingPhoto,
    previewImage,
    handleSelectDefault,
    handleFileChange,
    saveProfileImage,
    isNicknameModalOpen,
    setIsNicknameModalOpen,
    nicknameInput,
    setNicknameInput,
    isNicknameChecked,
    setIsNicknameChecked,
    handleCheckNickname,
    saveNickname,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    handleUnfollow,
    handleLogout,
    handleDeleteAccount,
    defaultOptions,
    selectedIdx,
    selectedColor,
  };
};
