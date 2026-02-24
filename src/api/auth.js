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
export const loginUser = async (data) => {
  return await api.post("/users/login", data);
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
 * 6. 프로필 수정 (PUT /users)
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
 * 7. 비밀번호 변경 (현재 비번 + 새 비번)
 */
export const updatePassword = async (currentPassword, newPassword) => {
  return await api.patch("/users/password", {
    password: currentPassword, // 현재 비밀번호
    newPassword: newPassword, // 바꿀 새 비밀번호
  });
};

/**
 * 8. 회원 탈퇴 (DELETE /users)
 */
export const deleteAccount = async () => {
  return await api.delete("/users");
};

/**
 * 9. 프로필 이미지 등록/수정 (PUT /users/{id}/image)
 */
export const updateUserImage = async (id, formData) => {
  return await api.put(`/users/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 10. 프로필 이미지 URL 생성 함수 (조회용)
 * 이 API는 axios로 호출하는 게 아니라, <img> 태그의 src에 바로 넣는 주소를 만듭니다.
 */
export const getUserImageUrl = (id) => {
  if (!id) return "/default-profile.png"; // ID가 없으면 기본 이미지
  return `${api.defaults.baseURL}/users/${id}/image`;
};

/**
 * 11. 내 정보 조회 (GET /users/me)
 * 로그인 직후, 또는 마이페이지 진입 시 내 정보를 가져옵니다.
 */
export const getMyProfile = async () => {
  return await api.get("/users/me");
};
