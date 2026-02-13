import { useEffect, useRef } from "react";

/**
 * 무한 스크롤 트리거 컴포넌트
 * 리스트의 맨 아래에 배치하면 화면에 보일 때 fetchNext를 호출합니다.
 */
const InfiniteScrollTrigger = ({ hasNextPage, isLoading, fetchNext }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNext();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isLoading, fetchNext]);

  return (
    <div
      ref={observerRef}
      className="w-full h-20 flex justify-center items-center mt-4"
    >
      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500">
          {/* 로딩 스피너 (간단한 CSS 애니메이션) */}
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-sm">맛집을 더 불러오는 중...</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
