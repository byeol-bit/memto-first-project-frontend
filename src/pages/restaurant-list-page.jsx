import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";

import RestaurantCard from "../components/restaurant/restaurantCard";
import RestaurantListCard from "../components/restaurant/restaurantListCard";
import SearchBar from "../components/restaurant/searchBar";
import Button from "../components/common/button";
import RegisterRestaurantModal from "../components/restaurant/registerRestaurantModal";

import { InfiniteScrollTrigger } from "../components/common/infiniteScrollTrigger";

import {
  useInfiniteRestaurants,
  useLikedRestaurants,
  useLikedRestaurantsFallback,
} from "../hooks/queries/use-restaurants-data";

import { useLoginState } from "../components/loginstate";

const RestaurantListPage = () => {
  const { isLoggedIn, isMe, user } = useLoginState();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(""); // 입력 중인 글자
  const [searchQuery, setSearchQuery] = useState(""); // 검색 실행된 단어
  const [isModalOpen, setIsModalOpen] = useState(false); // 맛집 등록 모달
  const [activeTab, setActiveTab] = useState("all"); // 탭

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteRestaurants();

  // 여러 페이지로 나뉜 데이터를 하나의 배열로 합치기
  const allRestaurants = useMemo(() => {
    if (!data?.pages) return [];
    const list = data.pages.flatMap((page) => {
      if (page?.list && Array.isArray(page.list)) return page.list;
      if (Array.isArray(page)) return page;
      if (page && Array.isArray(page.data)) return page.data;
      return [];
    });
    return list.filter(Boolean);
  }, [data]);

  const userId = isLoggedIn ? user?.id : null;
  const {
    data: likedRestaurants = [],
    isLoading: isLikedLoading,
    isError: isLikedError,
  } = useLikedRestaurants(userId);

  const { data: likedFallback = [], isLoading: isLikedFallbackLoading } =
    useLikedRestaurantsFallback(
      isLikedError ? userId : null,
      isLikedError ? allRestaurants : [],
    );

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
  const handleSearch = () => setSearchQuery(keyword);

  // 필터링 로직 (allRestaurants를 기준으로 검색/좋아요 필터링)
  const filteredRestaurants = useMemo(() => {
    let list = allRestaurants
      .filter((r) => r != null)
      .map((r) => ({
        ...r,
        thumbnail:
          r.thumbnail ||
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      }));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter((r) => {
        const nameMatch = r.name?.toLowerCase().includes(query);
        const addressMatch = r.address?.toLowerCase().includes(query);
        const tagMatch = r.tags?.some((tag) =>
          tag?.toLowerCase().includes(query),
        );
        return nameMatch || addressMatch || tagMatch;
      });
    }

    return list;
  }, [allRestaurants, searchQuery]);

  // 관심 목록
  const likedListRaw = isLikedError ? likedFallback : likedRestaurants;
  const likedListWithThumbnail = useMemo(
    () =>
      (likedListRaw ?? []).map((r) => ({
        ...r,
        thumbnail:
          r.thumbnail ||
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      })),
    [likedListRaw],
  );
  const isLikedListLoading =
    isLikedLoading || (isLikedError && isLikedFallbackLoading);

  const handleFirstReviewClick = async () => {
    const isUser = await isMe();
    console.log(isUser);
    if (!isUser) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }

    setIsModalOpen(true);
  };

  const tabs = [
    { id: "all", label: "모든 맛집" },
    { id: "liked", label: "관심 목록" },
  ];

  if (isLoading) return <div>맛집 정보를 불러오는 중입니다</div>;
  if (isError) return <div>에러가 발생했어요: {error.message}</div>;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md px-2 py-2 flex flex-col items-center">
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
          {activeTab === "liked" && !isLoggedIn ? (
            <div className="py-20 flex flex-col items-center justify-center gap-6 text-center">
              <p className="text-gray-600 text-lg">
                관심 목록을 보려면 로그인이 필요해요.
              </p>
              <Button onClick={() => navigate("/sign-in")}>
                로그인 하러 가기
              </Button>
            </div>
          ) : (
            <>
              {activeTab === "all" && (
                <SearchBar
                  value={keyword}
                  onChange={handleKeywordChange}
                  onSearch={handleSearch}
                  placeholder="어떤 맛집을 찾으시나요?"
                />
              )}
              {activeTab === "liked" ? (
                isLikedListLoading ? (
                  <div className="py-20 text-center text-gray-500">
                    관심 목록을 불러오는 중... 😋
                  </div>
                ) : likedListWithThumbnail.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {likedListWithThumbnail.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="flex justify-center w-full"
                      >
                        <RestaurantListCard restaurant={restaurant} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center text-gray-400">
                    <p>
                      아직 좋아요 한 맛집이 없어요. <br />
                      마음에 드는 맛집에 하트를 눌러보세요! ❤️
                    </p>
                  </div>
                )
              ) : isLoading ? (
                <div className="py-20 text-center text-gray-500">
                  맛집 데이터를 불러오는 중... 😋
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredRestaurants.length > 0 ? (
                    <>
                      {filteredRestaurants.map((restaurant) => (
                        <div
                          key={restaurant.id}
                          className="flex justify-center w-full"
                        >
                          <RestaurantCard restaurant={restaurant} />
                        </div>
                      ))}
                      <InfiniteScrollTrigger
                        onIntersect={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                      />
                    </>
                  ) : (
                    <div className="py-20 text-center text-gray-400">
                      <p className="text-gray-500 text-lg mb-4">
                        찾으시는 맛집이 아직 없습니다 😭
                      </p>
                      <Button onClick={handleFirstReviewClick}>
                        첫 번째 리뷰 달기
                      </Button>
                      <RegisterRestaurantModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListPage;
