import React, { useState } from "react";

const HoneyCombo = ({ combos, setCombos }) => {
  const [inputValue, setInputValue] = useState("");

  // 꿀조합 추가
  const handleAddCombo = (e) => {
    // 한글 조합 중(isComposing)일 때는 로직을 실행하지 않도록 막아
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // 폼 제출 방지

      if (combos.length >= 5) {
        alert("꿀조합은 최대 5개까지만 등록 가능합니다!");
        return;
      }
      if (combos.includes(inputValue.trim())) {
        alert("이미 추가된 메뉴입니다.");
        return;
      }

      setCombos([...combos, inputValue.trim()]);
      setInputValue("");
    }
  };

  // 꿀조합 삭제
  const handleRemoveCombo = (indexToRemove) => {
    setCombos(combos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <section>
      <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        🍯 나만의 꿀조합 레시피
      </h3>
      <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 min-h-[120px]">
        {/* 칩 컴테이너 */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {combos.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-1 px-4 py-2 bg-white border border-red-400 rounded-full text-sm text-red-400 font-bold shadow-sm">
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveCombo(index)}
                  className="ml-1"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {index < combos.length - 1 && (
                <span className="text-red-400 font-extrabold text-lg select-none">
                  +
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 입력창 */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddCombo}
            placeholder={
              combos.length >= 5 ? "최대 개수 도달" : "메뉴 입력 후 Enter!"
            }
            disabled={combos.length >= 5}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all"
          />
          <button
            onClick={() =>
              handleAddCombo({
                key: "Enter",
                preventDefault: () => {},
              })
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-400 hover:bg-orange-50 rounded-lg"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>

        <p className="text-[11px] text-gray-400 mt-2 px-1">
          * 최대 5개까지 입력 가능합니다. (예: 엽떡, 허니콤보)
        </p>
      </div>
    </section>
  );
};

export default HoneyCombo;
