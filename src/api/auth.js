import api from "./axios";

/**
 * 1. 고수 등록 (회원가입)
 * POST /users
 */
export const registerUser = async (formData) => {
  const response = await api.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

/**
 * 2. 로그인
 * POST /users/login
 */
export const loginUser = async (loginData) => {
  const response = await api.post("/users/login", loginData);
  return response;
};

/**
 * 3. 닉네임 중복 확인
 * GET /users/check-nickname
 */
export const checkNicknameDuplicate = async (nickname) => {
  const response = await api.get("/users/check-nickname", {
    params: { nickname },
  });
  return response;
};

/**
 * 4. 아이디 중복 확인
 */
export const checkIdDuplicate = async (id) => {
  const response = await api.get("/users/check-id", {
    params: { loginId: id },
  });
  return response;
};
