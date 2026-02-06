import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { mockRestaurants } from "../data/restaurants.mock";
import RestaurantCard from "../components/restaurant/restaurantCard";
import SearchBar from "../components/restaurant/searchBar";
import Button from "../components/common/button";

const RestaurantListPage = () => {
  const [keyword, setKeyword] = useState(""); // 입력 중인 글자
  const [searchQuery, setSearchQuery] = useState(""); // 검색 실행된 단어

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(keyword);
    }, 500); // 0.5초 대기 후 검색어 업데이트

    return () => clearTimeout(timer); //  타이핑이 계속되면 기존 타이머 취소
  }, [keyword]);

  // 검색어 입력할 때마다 state 업데이트
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 버튼 누르거나 엔터 쳤을 때 실행
  const handleSearch = () => {
    if (keyword.trim() === "") {
      setSearchQuery(""); // 검색어 초기화
      return;
    }
    setSearchQuery(keyword);
  };

  // 이미지가 있는 맛집만 필터링하고, 검색어로 필터링
  const restaurants = useMemo(() => {
    // 사진 있는 것들만 남기기
    let filtered = mockRestaurants.filter((r) => r.thumbnail);

    // 검색어
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((r) => {
        const nameMatch = r.name.toLowerCase().includes(query);
        const addressMatch = r.address?.toLowerCase().includes(query);
        const tagMatch = r.tags?.some((tag) =>
          tag.toLowerCase().includes(query),
        );
        return nameMatch || addressMatch || tagMatch;
      });
    }

    return filtered;
  }, [searchQuery]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 flex flex-col items-center">
        {/* 헤더 */}
        <div className="w-full flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">모든 맛집</h1>
          <p className="text-sm text-gray-500 mt-2">
            고수들이 직접 발굴한 찐 맛집들을 확인해보세요.
          </p>

          {/* 검색 */}
          <SearchBar
            value={keyword}
            onChange={handleKeywordChange}
            onSearch={handleSearch}
            placeholder="어떤 맛집을 찾으시나요?"
          />
        </div>

        {restaurants.length > 0 ? (
          /* 레스토랑 카드 그리드*/
          <div className="grid grid-cols-1 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          /* 결과가 없을 때 : 안내 메시지와 등록 버튼 보여줌 */
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              찾으시는 맛집이 아직 없습니다 😭
            </p>
            <Link to="/restaurants/new">
              <Button>첫 번째 리뷰 달기</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;
