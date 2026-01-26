import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { mockRestaurants } from "../data/restaurants.mock";
import RestaurantCard  from "../components/restaurant/restaurantCard";
import SearchBar from '../components/restaurant/searchBar';
import Button from '../components/restaurant/button'

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
    if(keyword.trim() === ""){
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
        const tagMatch = r.tags?.some((tag) => tag.toLowerCase().includes(query));
        return nameMatch || addressMatch || tagMatch;
      });
    }

    return filtered;
  }, [searchQuery]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col items-center">
        {/* 헤더 */}
        <div className="grid grid-cols-7 gap-4 w-full max-w-6xl">
          <h1 className="text-3xl font-bold">맛집목록</h1>
          <p className="text-gray-500 col-start-1 col-end-3">
            등록된 모든 맛집을 확인해보세요.
          </p>

          <Link to="/restaurants/new">
            <Button className="col-span-2 col-end-7">+ 새 맛집 등록</Button>
          </Link>
        </div>

        {/* 검색 */}
        <SearchBar 
        value={keyword} 
        onChange={handleKeywordChange} 
        onSearch={handleSearch}
        placeholder="어떤 맛집을 찾으시나요?"
        />

        {restaurants.length > 0 ? (
          /* 레스토랑 카드 그리드*/
          <div className="grid grid-cols-3 gap-10">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          /* 결과가 없을 때 : 안내 메시지와 등록 버튼 보여줌 */
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              검색된 맛집이 없습니다 😭
            </p>
            <Link to="/restaurants/new" > 
              <Button>
                새로운 맛집 등록하러 가기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default RestaurantListPage