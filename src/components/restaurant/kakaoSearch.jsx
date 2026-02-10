import React, { useState } from "react";
import SearchBar from "./searchBar";

const KakaoSearchSection = ({ onSelect }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!keyword.trim()) {
      alert("찾으시는 맛집 이름을 입력해 주세요! 🔍");
      return;
    }

    // 카카오 객체 확인
    const { kakao } = window;
    if (!kakao || !kakao.maps || !kakao.maps.services) {
      alert("카카오맵 로드 중 오류가 발생했습니다.");
      return;
    }

    const ps = new kakao.maps.services.Places();

    // 키워드로 장소검색
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setResults(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다. 정확한 가게명으로 검색해 보세요!");
      } else {
        alert("검색 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={handleSearch}
        placeholder="등록할 맛집 이름을 입력하세요 (예: 성수동 맛집)"
      />

      {/* 검색 결과 리스트 UI */}
      <div className="w-full max-w-md mt-2 space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {results.map((place) => (
          <button
            key={place.id}
            onClick={() => onSelect(place)} // 선택 시 모달의 Step 2로 이동
            className="w-full text-left p-4 border border-gray-100 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all group shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-red-400 transition-colors">
                  {place.place_name}
                </h4>
                <p className="text-sl text-gray-500 mt-1">
                  {place.address_name}
                </p>
                {place.road_address_name && (
                  <p className="text-xm text-gray-500 mt-0.5">
                    [도로명] {place.road_address_name}
                  </p>
                )}
              </div>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                {place.category_group_name || "식당"}
              </span>
            </div>
          </button>
        ))}

        {results.length > 0 && (
          <p className="text-center text-xs text-gray-400 py-4">
            찾으시는 장소가 없다면 더 구체적인 키워드를 입력해 보세요!
          </p>
        )}
      </div>
    </div>
  );
};

export default KakaoSearchSection;
