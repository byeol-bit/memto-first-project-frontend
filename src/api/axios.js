import axios from "axios";

const instance = axios.create({
  // 백엔드 서버 주소 (팀원에게 꼭 물어보고 맞추세요! 보통 8080 포트 사용)
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json", // "우린 JSON 데이터만 주고받을 거야"라는 약속
  },
});

export default instance;
