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

/**
 * 5. 로그아웃
 * Method: POST
 * Endpoint: /users/logout
 */
export const logoutUser = async () => {
  return await api.post("/users/logout");
};

/**
 * 6. 내 정보 조회 (마이페이지 진입 시)
 * Method: GET
 * Endpoint: /users/me (백엔드 경로 확인 필요)
 */
export const getUserProfile = async () => {
  return await api.get("/users/my-page");
};

/**
 * 7. 프로필 수정 (스웨거 반영: PUT /users)
 * Content-Type: multipart/form-data
 */
export const updateProfile = async (formData) => {
  return await api.put("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 8. 비밀번호 변경 (스웨거 반영: 현재 비번 + 새 비번)
 */
export const updatePassword = async (currentPassword, newPassword) => {
  return await api.patch("/users/password", {
    password: currentPassword, // 현재 비밀번호
    newPassword: newPassword, // 바꿀 새 비밀번호
  });
};

/**
 * 9. 회원 탈퇴 (변경 없음, DELETE /users)
 */
export const deleteAccount = async () => {
  return await api.delete("/users");
};
