import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // 쿠키나 인증 헤더 정보 포함시켜 요청하고 싶을 때 true
  // withCredentials: true
});


// 응답
api.interceptors.response.use(
  // 2xx 상태 코드
  (response) => response.data
  ,
  // 2xx 외 상태 코드
  (error) => {
    const status = error.response?.status
    if(status === 401) {
      // refreshToken()
      console.log('401')
      return api(error.config)
    }
    throw error

  }
)
export default api;
