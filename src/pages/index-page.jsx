import { useNavigate } from "react-router";

const IndexPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>메인 페이지</h1>
      <p>환영합니다! 숨은 맛집 고수입니다</p>
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/sign-in")}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            backgroundColor: "#ee5a6f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          로그인 하러가기 →
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => navigate("/sign-up")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ff8e8e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          아직 계정이 없으신가요?
        </button>
      </div>
    </div>
  );
};
export default IndexPage;
