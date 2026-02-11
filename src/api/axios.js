import axios from "axios";

const api = axios.create({
  baseURL: "https://hidden-master-server.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
