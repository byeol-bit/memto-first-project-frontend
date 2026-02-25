import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, logoutUser, getMyProfile } from "../api/auth";

const LoginStateContext = createContext();

export const LoginStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentPath = window.location.pathname;
      if (currentPath === "/sign-in" || currentPath === "/sign-up") {
        setIsLoading(false);
        return;
      }
      const savedId = localStorage.getItem("userId");
      const savedNickname = localStorage.getItem("userNickname");

      if (!savedId || !savedNickname) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await getMyProfile();
        setUser({ id: res.data.id, nickname: res.data.nickname });
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const handleStorageChange = (e) => {
      if (
        e.key === "logoutEvent" ||
        (e.key === "userId" && e.newValue === null)
      ) {
        setUser(null);
        alert("다른 탭에서 로그아웃되어 로그인 페이지로 이동합니다.");
        window.location.href = "/sign-in";
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (loginId, password) => {
    try {
      const loginResponse = await loginUser({ loginId, password });
      const realId = loginResponse.data.id;

      const profileResponse = await getMyProfile();
      const realNickname = profileResponse.data.nickname;

      localStorage.setItem("userId", realId);
      localStorage.setItem("userNickname", realNickname);

      setUser({ id: realId, nickname: realNickname });
      return true;
    } catch (error) {
      console.error("로그인 실패 :", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("로그아웃 API 에러 :", error);
    } finally {
      localStorage.clear();
      localStorage.setItem("logoutEvent", Date.now());

      alert("로그아웃 되었습니다.");
      window.location.href = "/sign-in";
    }
  };

  return (
    <LoginStateContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout, isLoading }}
    >
      {children}
    </LoginStateContext.Provider>
  );
};

export const useLoginState = () => useContext(LoginStateContext);
