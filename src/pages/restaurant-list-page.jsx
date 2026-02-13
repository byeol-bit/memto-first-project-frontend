import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";

import RestaurantCard from "../components/restaurant/restaurantCard";
import RestaurantListCard from "../components/restaurant/restaurantListCard";
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

  // 탭
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredRestaurant = useMemo(() => {
    if (activeTab === "liked") {
      return restaurantsData?.filter((restaurant) => restaurant.isLiked) ?? [];
    }

    return restaurants;
  }, [activeTab, restaurantsData, restaurants]);

  const tabs = [
    { id: "all", label: "모든 맛집" },
    { id: "liked", label: "관심 목록" },
  ];

  if (isLoading) return <div>맛집 정보를 불러오는 중입니다</div>;
  if (isError) return <div>에러가 발생했어요: {error.message}</div>;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 flex flex-col items-center">
        {/* ✅ 탭 메뉴 */}
        <div className="w-full sticky top-0 bg-white border-b border-gray-100 flex z-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ 탭 내용 영역 */}
        <div className="w-full px-5 py-6 pb-24">
          {/* 🔍 검색바 (모든 맛집 탭에서만 노출) */}
          {activeTab === "all" && (
            <SearchBar
              value={keyword}
              onChange={handleKeywordChange}
              onSearch={handleSearch}
              placeholder="어떤 맛집을 찾으시나요?"
            />
          )}
          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              맛집 데이터를 불러오는 중... 😋
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredRestaurant.length > 0 ? (
                filteredRestaurant.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="flex justify-center w-full"
                  >
                    {activeTab === "all" ? (
                      <RestaurantListCard restaurant={restaurant} />
                    ) : (
                      // <RestaurantCard restaurant={restaurant} />
                      <RestaurantListCard restaurant={restaurant} />
                    )}
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-gray-400">
                  {activeTab === "all" ? (
                    <div>
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
                  ) : (
                    <p>
                      아직 좋아요 한 맛집이 없어요. <br />
                      마음에 드는 맛집에 하트를 눌러보세요! ❤️
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListPage;
