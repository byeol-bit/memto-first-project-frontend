import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScrollTrigger = ({
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { ref, inView } = useInView({
    rootMargin: "300px",
  });

  useEffect(() => {
    // 화면에 보이고, 다음 페이지가 있고, 현재 로딩 중이 아닐 때만 실행
    if (inView && hasNextPage && !isFetchingNextPage) {
      onIntersect();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onIntersect]);

  return (
    <div ref={ref} className="w-full h-10 flex justify-center items-center">
      {isFetchingNextPage && (
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
