import { useNavigate, Link } from "react-router";
import imgEndlessScroll from "../assets/landing/index-card1-endless-scroll.png";
import imgInfiniteTabs from "../assets/landing/index-card2-infinite-tabs.png";
import imgExhaustion from "../assets/landing/index-card3-exhaustion.png";
import useExampleVideo from "../assets/landing/use-example.webm";

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center min-h-[70vh] px-5 text-center">
        <h1 className="text-[#ee5a6f] text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
          맛집 고르기,
          <br />
          이제 고수와 함께
          <br />
          <span className="text-gray-800">한 번에 끝내보세요</span>
        </h1>
        <button
          onClick={() => navigate("/map")}
          className="mt-6 px-8 py-4 bg-[#ee5a6f] text-white text-lg font-bold rounded-xl shadow-lg hover:bg-[#d6455b] transition-all hover:-translate-y-0.5"
        >
          설레는 맛집 탐방 시작하기
        </button>
      </header>

      {/* Product usage preview video */}
      <section className="px-5 pb-4">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-white/50 aspect-video bg-[#f8f9fa]">
          <video
            src={useExampleVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Pain points - "맛집 고를 때, 이런 경험 없으셨나요?" */}
      <section className="py-16 px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
          맛집 고를 때,
          <br />
          이런 경험 없으셨나요?
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col p-5 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-[#ee5a6f] mb-3">끝없는 스크롤</h3>
            <img
              src={imgEndlessScroll}
              alt="SNS·블로그에 쏟아지는 맛집 링크"
              className="w-full aspect-video object-cover rounded-xl mb-3"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              SNS·블로그에 쏟아지는 맛집 링크. “여긴 어때?” “여기 별로래” 비교하다 보면 어느새 머릿속은
              뒤죽박죽.
            </p>
          </div>

          <div className="flex flex-col p-5 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-[#ee5a6f] mb-3">사이트 무한 접속</h3>
            <img
              src={imgInfiniteTabs}
              alt="지도·리뷰·예약 창을 반복해 보는 모습"
              className="w-full aspect-video object-cover rounded-xl mb-3"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              지도·리뷰·예약 창을 열었다 닫았다 반복하며 위치·평점 확인. 비교하다 보면 결국 피곤해요.
            </p>
          </div>

          <div className="flex flex-col p-5 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-[#ee5a6f] mb-3">결국, 설렘이 아닌 피곤함으로</h3>
            <img
              src={imgExhaustion}
              alt="늦어지는 결정과 피로"
              className="w-full aspect-video object-cover rounded-xl mb-3"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              늦어지는 결정, 가고 싶던 맛집은 이미 예약만 가득. 결국 누군가 나서서 정리해야 하는 상황.
            </p>
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-4">
            귀찮음은
            <br />
            <span className="text-[#ee5a6f]">고수가</span> 대신할게요
          </h2>
          <p className="text-lg text-gray-600">여러분은 먹기만 하세요.</p>
        </div>
      </section>

      {/* Features - 피드·지도·고수 */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex gap-4 p-5 rounded-2xl bg-white/80 shadow-sm border-l-4 border-[#ee5a6f]">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ee5a6f]/15 text-[#ee5a6f] font-bold text-lg flex items-center justify-center">
              1
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                흩어진 맛집 리뷰, <span className="text-[#ee5a6f]">한 곳에서</span> 모아보세요
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                지도·피드에서 고수들의 리뷰를 한 번에 모아줘요.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl bg-white/80 shadow-sm border-l-4 border-[#ee5a6f]">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ee5a6f]/15 text-[#ee5a6f] font-bold text-lg flex items-center justify-center">
              2
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                고수·맛집·경로까지, <span className="text-[#ee5a6f]">한 눈에</span> 비교해보세요
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                “여긴 고수들이 인정했대”, “이 경로로 다니면 편해” 복잡한 선택지가 한 장에 쏙 정리돼요.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl bg-white/80 shadow-sm border-l-4 border-[#ee5a6f]">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ee5a6f]/15 text-[#ee5a6f] font-bold text-lg flex items-center justify-center">
              3
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                혼자 고민은 그만, <span className="text-[#ee5a6f]">고수 따라가</span> 보세요
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                관심 고수를 팔로우하고, 그들이 추천한 맛집으로 설렘만 남기면 돼요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;