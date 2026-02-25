import axios from "axios";

const api = axios.create({
  baseURL: "https://hidden-master-server.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("로그인 세션이 만료되었습니다.");

      localStorage.clear();

      alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  },
);
export default api;
