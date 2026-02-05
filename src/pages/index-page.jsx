import { useNavigate } from "react-router";

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    // 배경: 회색, 중앙 정렬
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa] px-5">
      {/* 타이틀: 분홍색, 굵게 */}
      <h1 className="text-[#ee5a6f] text-[40px] font-black mb-4 tracking-[-1px]">
        숨은 고수 찾기
      </h1>

      {/* 부제: 회색 텍스트 */}
      <p className="text-gray-600 text-lg mb-10 text-center">
        환영합니다! 숨은 맛집 고수입니다 🍽️
      </p>

      {/* 버튼 그룹 */}
      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        {/* 로그인 버튼: 그림자, 둥근 모서리, 평면 스타일 */}
        <button
          onClick={() => navigate("/sign-in")}
          className="w-full py-4 bg-[#ee5a6f] text-white text-xl font-bold rounded-xl shadow-md hover:bg-[#d6455b] transition-all transform hover:-translate-y-1"
        >
          로그인 하러가기 →
        </button>

        {/* 회원가입 버튼 */}
        <button
          onClick={() => navigate("/sign-up")}
          className="w-full py-3 bg-[#ff8e8e] text-white text-lg font-semibold rounded-xl hover:bg-[#ff7676] transition-colors"
        >
          아직 계정이 없으신가요?
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
