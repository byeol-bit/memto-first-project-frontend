/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  // ✅ 2. 기본 초기화 끄기 (Preflight)
  // 팀원들이 만들어둔 제목 폰트, 마진 설정을 Tailwind가 멋대로 초기화하지 않도록 막습니다.
  corePlugins: {
    preflight: false,
  },

  plugins: [],
};
