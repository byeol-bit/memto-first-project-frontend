import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, logoutUser, getMyProfile } from "../api/auth";

const LoginStateContext = createContext();

export const LoginStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedId = localStorage.getItem("userId");
    const savedNickname = localStorage.getItem("userNickname");

    if (savedId && savedNickname) {
      setUser({ id: savedId, nickname: savedNickname });
    }
    setIsLoading(false);
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
      console.error("로그인 및 정보 획득 실패 :", error);
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
      setUser(null);
      alert("로그아웃 되었습니다.");
      window.location.href = "/";
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
