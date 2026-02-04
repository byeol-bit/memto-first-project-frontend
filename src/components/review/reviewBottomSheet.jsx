import React, { useState } from "react";
import HoneyCombo from "./honeyCombo";

const ReviewBottomSheet = ({ open, onClose, restaurant }) => {
  // [State] 꿀조합 배열 관리
  const [combos, setCombos] = useState([]);

  if (!open) return null;

  const restaurantName = restaurant?.name;

  return (
    <>
      {/* 배경 */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* 시트 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50  h-[75vh] flex flex-col">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />

        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 px-41">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {restaurantName || "맛집"} 추천
            </h2>
            <p className="text-xm text-gray-500">
              나만의 꿀조합 레시피를 알려주세요 🍯
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 메인 컨텐츠 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 왼쪽 : 텍스트 & 태그 기반 섹션들 */}
            <div className="space-y-12">
              {/* 감성 태그 (최대 3개 선택) */}
              <section>
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  어떤 점이 좋았나요? (최대 3개)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-400">
                    # 해시태그 선택
                  </div>
                </div>
              </section>

              {/* 꿀조합 메뉴 */}
              <HoneyCombo combos={combos} setCombos={setCombos} />

              {/* 추천 코멘트 */}
              <section>
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  ✍️ 추천 코멘트
                </h3>
                <div className="w-full h-40 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-400">
                  이 곳에 대한 리뷰를 남겨주세요 (최소 10자)
                </div>
              </section>
            </div>

            {/* 오른쪽 : 사진 인증 */}
            <div className="flex flex-col">
              <section className="flex-1 flex flex-col">
                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📸 맛있는 순간 인증샷
                </h3>
                <div className="flex-1 min-h-[350px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">
                    사진 업로드 (필수 1장)
                  </span>
                  <span className="text-xs mt-2">
                    나만의 조합의 인증을 남겨보세요!
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* 등록 */}
        <div className="px-8 py-6 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="max-w-6xl mx-auto">
            <button className="w-full py-5 bg-orange-500 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-orange-100 active:scale-[0.98] transition-all">
              맛집 인증 완료 👍
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewBottomSheet;
