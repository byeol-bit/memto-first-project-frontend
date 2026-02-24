import { useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, Users, UtensilsCrossed } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const INTRO_BLOCKS = [
  {
    id: "feed",
    icon: LayoutGrid,
    title: "피드",
    description:
      "지도와 함께 고수들이 올린 리뷰와 추천을 한곳에서 모아보세요. 실시간으로 올라오는 맛집 후기를 피드에서 확인할 수 있어요.",
  },
  {
    id: "users",
    icon: Users,
    title: "고수 목록",
    description:
      "맛을 아는 고수들을 만나보세요. 관심 있는 고수를 팔로우하고, 그들이 추천한 맛집과 리뷰를 따라가 보세요.",
  },
  {
    id: "restaurants",
    icon: UtensilsCrossed,
    title: "맛집 목록",
    description:
      "고수들이 인정한 맛집 목록을 탐색하세요. 좋아요와 리뷰로 진짜 맛집만 골라볼 수 있어요.",
  },
];

const IndexPage = () => {
  const navigate = useNavigate();
  const introRef = useRef(null);
  const blocksRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.3 });
  const isBlocksInView = useInView(blocksRef, { once: true, amount: 0.1 });

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f8f9fa] px-5 py-12 pb-16">
      {/* Hero: 타이틀 · 부제 (페이지 로드 시 stagger) */}
      <motion.div
        className="flex flex-col items-center text-center mb-14"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-[#ee5a6f] text-[40px] font-black mb-4 tracking-[-1px]"
          variants={fadeUp}
          transition={fadeUp.transition}
        >
          숨은 고수 찾기
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg mb-4 text-center max-w-md"
          variants={fadeUp}
          transition={fadeUp.transition}
        >
          환영합니다! 숨은 맛집 고수입니다 🍽️
        </motion.p>
        <motion.p
          ref={introRef}
          className="text-gray-500 text-base text-center max-w-lg"
          variants={fadeUp}
          transition={fadeUp.transition}
        >
          지도에서 고수의 리뷰를 보고, 고수와 맛집 목록을 탐색하는 서비스예요.
        </motion.p>
      </motion.div>

      {/* 소개 블록 3개 (스크롤 시 또는 로드 시 부드럽게 등장) */}
      <motion.section
        ref={blocksRef}
        className="w-full max-w-2xl flex flex-col gap-6 mb-14"
        variants={staggerContainer}
        initial="initial"
        animate={isBlocksInView ? "animate" : "initial"}
      >
        {INTRO_BLOCKS.map(({ id, icon: Icon, title, description }) => (
          <motion.article
            key={id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            variants={fadeUp}
            transition={fadeUp.transition}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            initial={{ opacity: 0, y: 24 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ee5a6f]/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#ee5a6f]" aria-hidden />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* CTA 버튼 그룹 */}
      <motion.div
        className="flex flex-col gap-4 w-full max-w-[300px]"
        initial={{ opacity: 0, y: 16 }}
        animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <button
          onClick={() => navigate("/sign-in")}
          className="w-full py-4 bg-[#ee5a6f] text-white text-xl font-bold rounded-xl shadow-md hover:bg-[#d6455b] transition-all transform hover:-translate-y-1"
        >
          로그인 하러가기 →
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="w-full py-3 bg-[#ff8e8e] text-white text-lg font-semibold rounded-xl hover:bg-[#ff7676] transition-colors"
        >
          아직 계정이 없으신가요?
        </button>
      </motion.div>
    </div>
  );
};

export default IndexPage;
