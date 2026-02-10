import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/users'로 시작하는 요청을 백엔드 서버로 전달
      "/users": {
        target: "https://hidden-master-server.fly.dev", // 진짜 서버 주소
        changeOrigin: true, // 호스트 헤더를 타겟 URL로 변경 (CORS 우회 핵심)
        secure: false,
      },
    },
  },
});
