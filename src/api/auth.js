import axios from "./axios"; // 우리가 설정한 axios 인스턴스(기본 주소 포함)를 가져옵니다.

/**
 * 1. 회원가입 요청 함수 (고수 등록)
 * - 사용자가 입력한 정보를 서버의 데이터베이스에 저장해달라고 요청합니다.
 * - method: POST (정보 생성)
 * - url: /api/users
 */
export const registerUser = async (userData) => {
  try {
    // axios.post(주소, 보낼데이터) 형식입니다.
    // userData 안에는 { loginId, password, nickname... } 정보가 들어있습니다.
    const response = await axios.post("/api/users", userData);

    // 요청이 성공하면 서버에서 보내준 결과값(response.data)을 반환합니다.
    return response.data;
  } catch (error) {
    // 요청이 실패하면(예: 서버 오류, 400 에러 등)
    // 에러 정보를 호출한 곳(페이지)으로 던져서 그쪽에서 alert를 띄우게 합니다.
    throw error.response ? error.response.data : error;
  }
};

/**
 * 2. 로그인 요청 함수
 * - 아이디와 비밀번호를 서버에 보내고, 인증 토큰(Token)을 받아옵니다.
 * - method: POST
 * - url: /api/login (새로 요청한 주소)
 */
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post("/api/login", loginData);
    // 성공 시, 이 response.data 안에 'accessToken'이 들어있어야 합니다.
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * 3. 아이디 중복 확인 함수
 * - 가입하려는 아이디가 이미 서버에 있는지 확인합니다.
 * - method: POST
 * - url: /api/check-id
 */
export const checkIdDuplicate = async (id) => {
  try {
    // 서버가 { loginId: "..." } 형태의 JSON을 원한다고 가정하고 보냅니다.
    const response = await axios.post("/api/check-id", { loginId: id });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * 4. 닉네임 중복 확인 함수
 * - 가입하려는 닉네임이 이미 존재하는지 확인합니다.
 * - method: POST
 * - url: /api/check-nickname
 */
export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await axios.post("/api/check-nickname", {
      nickname: nickname,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
