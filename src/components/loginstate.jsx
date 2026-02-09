import { createContext, useState, useEffect, useContext } from "react";

// 1. 컨텍스트 생성 (데이터 보관함)
const LoginStateContext = createContext();

// 2. Provider 컴포넌트 (앱 전체에 로그인 기능을 공급하는 껍데기)
export const LoginStateProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 유저 정보 (닉네임, 프사 등)
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 (새로고침 깜빡임 방지)

  // 앱 실행 시 딱 한 번 실행: "나 아까 로그인했었나?" (로컬스토리지 확인)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      // 저장된 정보가 있으면 복구
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // 확인 끝났으니 로딩 해제
  }, []);

  // 로그인 함수 (로그인 페이지에서 사용)
  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData)); // 객체는 문자열로 저장
    setUser(userData);
  };

  // 로그아웃 함수 (헤더, 마이페이지에서 사용)
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    alert("로그아웃 되었습니다.");
    window.location.href = "/"; // 메인으로 강제 이동 (새로고침 효과)
  };

  return (
    <LoginStateContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout, isLoading }}
    >
      {children}
    </LoginStateContext.Provider>
  );
};

// 3. 커스텀 훅 (다른 파일에서 쉽게 불러다 쓰기 위함)
// 사용법: const { login, logout, user } = useLoginState();
export const useLoginState = () => useContext(LoginStateContext);
