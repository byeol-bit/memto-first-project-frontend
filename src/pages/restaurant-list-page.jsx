import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";

import RestaurantCard from "../components/restaurant/restaurantCard";
import SearchBar from "../components/restaurant/searchBar";
import Button from "../components/common/button";
import RegisterRestaurantModal from "../components/restaurant/registerRestaurantModal";

import { useRestaurants } from "../hooks/queries/use-restaurants-data";

const RestaurantListPage = () => {
  // Hook 이용 : TanStack Query로 데이터 가져오기
  const { data: restaurantsData, isLoading, isError, error } = useRestaurants();
  console.log(restaurantsData);

  const [keyword, setKeyword] = useState(""); // 입력 중인 글자
  const [searchQuery, setSearchQuery] = useState(""); // 검색 실행된 단어

  const [isModalOpen, setIsModalOpen] = useState(false); // 맛집 등록 모달

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
    const list = restaurantsData ?? [];
    if (!list.length) return [];

    const displayImages = list.map((r) => ({
      ...r,
      thumbnail:
        r.thumbnail ||
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    }));

    let filtered = displayImages.filter((r) => r.thumbnail);

    // 검색어
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((r) => {
        const nameMatch = r.name?.toLowerCase().includes(query) ?? false;
        const addressMatch = r.address?.toLowerCase().includes(query) ?? false;
        const tagMatch =
          r.tags?.some((tag) => tag?.toLowerCase().includes(query)) ?? false;
        return nameMatch || addressMatch || tagMatch;
      });
    }

    return filtered;
  }, [restaurantsData, searchQuery]); // 의존성 배열에 'data'를 추가해야 데이터가 바뀔 때 화면이 갱신됨!!

  if (isLoading) return <div>맛집 정보를 불러오는 중입니다</div>;
  if (isError) return <div>에러가 발생했어요: {error.message}</div>;

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
            <Button onClick={() => setIsModalOpen(true)}>
              첫 번째 리뷰 달기
            </Button>

            {/* 모달 컴포넌트 배치 */}
            <RegisterRestaurantModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;
