import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchReviews,
  fetchUserReviews,
  fetchRestaurantReviews,
  fetchReviewLikeStatus,
} from "../../api/axios-review";

const normalizeList = (res) =>
  Array.isArray(res) ? res : ((res && res?.data) ?? []);

const toReviewList = (res) => {
  if (!res || typeof res !== "object") return [];
  if (Array.isArray(res)) return res;
  const raw =
    res.data ?? res.content ?? res.items ?? res.list ?? res.results ?? [];
  return Array.isArray(raw) ? raw : [];
};

// 유저 리뷰
export const useUserReviews = (userId) =>
  useQuery({
    queryKey: ["reviews", "user", userId],
    queryFn: () => fetchUserReviews(userId),
    select: normalizeList,
    enabled: !!userId,
  });

// 식당 리뷰 (404면 리뷰 없음으로 처리 → 빈 배열 반환)
export const useRestaurantReviews = (restaurantId) =>
  useQuery({
    queryKey: ["reviews", "restaurant", restaurantId],
    queryFn: async () => {
      try {
        return await fetchRestaurantReviews(restaurantId);
      } catch (err) {
        if (err?.response?.status === 404) return [];
        throw err;
      }
    },
    select: normalizeList,
    enabled: !!restaurantId,
  });

// 리뷰 좋아요 상태
export const useReviewLikeStatus = ({ userId, visitId }) =>
  useQuery({
    queryKey: ["reviews", visitId, "like-status", userId],
    queryFn: async () => {
      const res = await fetchReviewLikeStatus({ userId, visitId });
      // 응답: { isLiked: true } 형태
      const normalized = res?.data ?? res;
      return normalized?.isLiked ?? false;
    },
    enabled: !!userId && !!visitId,
  });

// 리뷰 용 무한스크롤
export const useInfiniteReviews = () => {
  return useInfiniteQuery({
    queryKey: ["reviews", "feed"],
    queryFn: async ({ pageParam }) => {
      const res = await fetchReviews({ cursor: pageParam });
      // axios-basic에서 response.data를 반환하도록 되어 있을 수도 있고,
      // 아닐 수도 있으므로 둘 다 대응
      const payload = res?.data ?? res;

      // 리스트 형태 정규화
      let list;
      if (Array.isArray(payload)) {
        list = payload;
      } else if (payload && typeof payload === "object") {
        list =
          payload.list ??
          payload.data ??
          payload.content ??
          payload.items ??
          payload.results ??
          [];
      } else {
        list = [];
      }

      // 페이지네이션 메타데이터 정규화
      const hasNext =
        res?.hasNext ??
        res?.has_next ??
        res?.hasNextPage ??
        res?.has_next_page ??
        payload?.hasNext ??
        payload?.has_next ??
        payload?.hasNextPage ??
        payload?.has_next_page ??
        false;

      const nextCursor =
        res?.nextCursor ??
        res?.next_cursor ??
        res?.cursor ??
        res?.next_page_cursor ??
        payload?.nextCursor ??
        payload?.next_cursor ??
        payload?.cursor ??
        payload?.next_page_cursor ??
        null;

      return { list, hasNext, nextCursor };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 0,
  });
};
