import api from "./axios";

// 1. 회원가입 요청
// - 사용자가 입력한 정보를 서버의 데이터베이스에 저장
// - method: POST, - url: /api/users

export const registerUser = async (userData) => {
  const response = await api.post("/api/register", userData);
  return response;
};

// 2. 로그인 요청 함수
// 아이디와 비밀번호를 서버에 보내고, 인증 토큰(Token)을 받아옵니다.
// method: POST, url: /api/login (새로 요청한 주소)

export const loginUser = async (loginData) => {
  const response = await api.post("/api/login", loginData);
  return response;
};

//  3. 아이디 중복 확인 함수
// - method: POST, url: /api/check-id

export const checkIdDuplicate = async (id) => {
  const response = await api.post("/api/check-id", { loginId: id });
  return response;
};

// 4. 닉네임 중복 확인 함수
// - method: POST, url: /api/check-nickname
export const checkNicknameDuplicate = async (nickname) => {
  const response = await api.post("/api/check-nickname", { nickname });
  return response;
};
