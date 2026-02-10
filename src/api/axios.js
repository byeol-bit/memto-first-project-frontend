import axios from "axios";

// 프록시를 사용할 때는 baseURL을 반드시 빈 문자열로 설정해야 합니다.
// 그래야 요청이 http://localhost:5173/users/... 로 날아가고,
// Vite가 그걸 낚아채서 fly.dev로 보내줍니다.
const api = axios.create({
  baseURL: "https://hidden-master-server.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
