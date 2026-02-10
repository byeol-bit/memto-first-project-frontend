import api from "./axios";

/**
 * 1. 고수 등록 (회원가입)
 * Method: POST
 * Endpoint: /users
 * Content-Type: multipart/form-data
 */
export const registerUser = async (formData) => {
  return await api.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 2. 로그인 (아이디 + 비밀번호)
 * Method: POST
 * Endpoint: /users/login
 */
export const loginUser = async (loginId, password) => {
  // 백엔드가 { loginId, password }를 받는다고 가정
  return await api.post("/users/login", { loginId, password });
};

/**
 * 3. 아이디 중복 확인
 * Method: GET
 * Endpoint: /users/check-id
 */
export const checkIdDuplicate = async (loginId) => {
  return await api.get("/users/check-id", {
    params: { loginId }, // ?loginId=... 형태로 전송
  });
};

/**
 * 4. 닉네임 중복 확인
 * Method: GET
 * Endpoint: /users/check-nickname
 */
export const checkNicknameDuplicate = async (nickname) => {
  return await api.get("/users/check-nickname", {
    params: { nickname }, // ?nickname=... 형태로 전송
  });
};
