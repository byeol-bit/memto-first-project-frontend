import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import {
  updateProfile,
  updatePassword,
  deleteAccount,
  checkNicknameDuplicate,
  updateUserImage,
  getUserImageUrl,
} from "../api/auth";
import { useLoginState } from "../components/loginstate";

export const useMyPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, logout, isLoading: isAuthLoading } = useLoginState();

  const [userInfo, setUserInfo] = useState(null);
  const [stats, setStats] = useState({ followerCount: 0, followingCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("reviews");
  const [tabData, setTabData] = useState([]);
  const [isTabLoading, setIsTabLoading] = useState(false);

  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedIdx, setSelectedIdx] = useState(null);

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

  const [imgCacheKey] = useState(new Date().getTime());

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/sign-in");
      return;
    }

    if (user) {
      const fetchUserData = async () => {
        try {
          setUserInfo(user);
          setNicknameInput(user.nickname || "");
          setPreviewImage(`${getUserImageUrl(user.id)}?t=${imgCacheKey}`);

          const [fRes, ingRes] = await Promise.all([
            api.get(`/follows/${user.id}/follower-count`),
            api.get(`/follows/${user.id}/following-count`),
          ]);

          setStats({
            followerCount: fRes.data?.count || 0,
            followingCount: ingRes.data?.count || 0,
          });
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user, isAuthLoading, navigate, imgCacheKey]);

  useEffect(() => {
    const fetchTabData = async () => {
      if (!user?.id || activeTab === "reviews") return;

      setIsTabLoading(true);
      try {
        let res;
        if (activeTab === "followers") {
          res = await api.get(`/follows/followers/${user.id}`);
        } else if (activeTab === "followings") {
          res = await api.get(`/follows/followings/${user.id}`);
        }
        setTabData(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        setTabData([]);
      } finally {
        setIsTabLoading(false);
      }
    };
    fetchTabData();
  }, [activeTab, user?.id]);

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

  const handleCancelEdit = () => {
    setIsEditingPhoto(false);
    setPreviewImage(`${getUserImageUrl(user?.id)}?t=${imgCacheKey}`);
    setSelectedIdx(null);
    setSelectedFile(null);
    setSelectedColor("#ffffff");
  };

  const createPngFileFromSvg = (color) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 500, 500);
      ctx.fillStyle = "#ffffff";
      const scale = 500 / 24;
      ctx.scale(scale, scale);
      const iconPath = new Path2D(
        "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
      );
      ctx.fill(iconPath);
      canvas.toBlob((blob) => {
        if (blob)
          resolve(new File([blob], "profile.png", { type: "image/png" }));
        else reject(new Error("Error"));
      }, "image/png");
    });
  };

  const saveProfileImage = async () => {
    if (selectedIdx === null && !selectedFile) return;
    try {
      const formData = new FormData();
      if (selectedIdx === "upload" && selectedFile) {
        formData.append("image", selectedFile);
      } else {
        const pngFile = await createPngFileFromSvg(selectedColor);
        formData.append("image", pngFile);
      }
      await updateUserImage(user.id, formData);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckNickname = async () => {
    try {
      await checkNicknameDuplicate(nicknameInput);
      setIsNicknameChecked(true);
    } catch (e) {
      setIsNicknameChecked(false);
    }
  };

  const saveNickname = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nicknameInput);
      await updateProfile(formData);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) return;
    try {
      await updatePassword(currentPassword, newPassword);
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFollow = async (targetId, isCurrentlyFollowing) => {
    try {
      if (isCurrentlyFollowing) {
        await api.delete(`/follows/${targetId}`);
        setStats((prev) => ({
          ...prev,
          followingCount: prev.followingCount - 1,
        }));
      } else {
        await api.post(`/follows/${targetId}`);
        setStats((prev) => ({
          ...prev,
          followingCount: prev.followingCount + 1,
        }));
      }
      setTabData((prev) =>
        prev.map((item) =>
          item.id === targetId
            ? { ...item, isCanceled: isCurrentlyFollowing }
            : item,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await deleteAccount();
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.error(e);
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
    handleCancelEdit,
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
    handleToggleFollow,
    handleLogout: logout,
    handleDeleteAccount,
    defaultOptions,
    selectedIdx,
    selectedColor,
  };
};
