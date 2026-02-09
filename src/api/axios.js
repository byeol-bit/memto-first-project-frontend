import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // 쿠키나 인증 헤더 정보 포함시켜 요청하고 싶을 때 withCredentials: true
});

// 응답
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.log("인증 실패: 로그인 필요");
    }
    return Promise.reject(error);
  },
);
export default api;
