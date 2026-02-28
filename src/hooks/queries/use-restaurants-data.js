import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchRestaurants,
  searchRestaurants,
  searchKakaoRestaurants,
  fetchRestaurantKakaoId,
  fetchLikeStatus,
  fetchLikedRestaurants,
  fetchRestaurantImages,
} from "../../api/axios-restaurant";

// API 응답이 배열이거나 { data } 형태일 수 있음 → 항상 배열로 정규화
const normalizeList = (res) =>
  Array.isArray(res) ? res : ((res && res?.data) ?? []);

// 단일 객체 응답 정규화 (배열이면 [0], 객체면 res.data ?? res)
const normalizeOne = (res) => {
  if (!res || typeof res !== "object") return res;
  if (Array.isArray(res) && res.length > 0) return res[0];
  return res?.data ?? res;
};

// TanStack Query는 queryFn이 undefined를 반환하면 에러 → 항상 값 반환
const safeListFn = (fn) => async () => (await fn()) ?? [];
const safeOneFn = (fn) => async () => (await fn()) ?? null;

// 모든 식당
export const useRestaurants = () =>
  useQuery({
    queryKey: ["restaurants"],
    queryFn: safeListFn(fetchRestaurants),
    select: normalizeList,
  });

// 특정 식당 (kakaoId)
export const useRestaurantDetail = (kakaoId) =>
  useQuery({
    queryKey: ["restaurants", kakaoId],
    queryFn: safeOneFn(() => fetchRestaurantKakaoId(kakaoId)),
    select: normalizeOne,
    enabled: !!kakaoId,
  });

// 식당 검색
export const useSearchRestaurants = ({ q, category }) =>
  useQuery({
    queryKey: ["restaurants", "search", q, category],
    queryFn: safeListFn(() => searchRestaurants({ q, category })),
    select: normalizeList,
    enabled: !!q || !!category,
  });

// 카카오 맛집 검색
export const useSearchKakaoRestaurants = (q) =>
  useQuery({
    queryKey: ["restaurants", "kakao", q],
    queryFn: safeListFn(() => searchKakaoRestaurants(q)),
    select: normalizeList,
    enabled: !!q,
  });

// 좋아요 상태
export const useRestaurantLikeStatus = (params = {}) => {
  const userId = params.userId;
  const restaurantId = params.restaurantId;

  return useQuery({
    queryKey: ["restaurants", restaurantId, "like-status", userId],
    queryFn: async () => {
      const res = await fetchLikeStatus({ userId, restaurantId });
      const data = res?.data ?? res;
      return data?.isLiked ?? false;
    },
    enabled: !!userId && !!restaurantId,
  });
};

// 내가 좋아요한 맛집 목록 (관심 목록 탭용) — GET /restaurants/liked?userId=
export const useLikedRestaurants = (userId) =>
  useQuery({
    queryKey: ["restaurants", "liked", userId],
    queryFn: async () => {
      const res = await fetchLikedRestaurants(userId);
      const raw = res?.data ?? res;
      const list = Array.isArray(raw) ? raw : (raw?.list ?? raw?.data ?? []);
      return list.filter(Boolean);
    },
    enabled: !!userId,
    retry: false,
  });

// fallback: GET /restaurants/liked 가 500 등으로 실패할 때, 이미 불러온 목록에 대해 좋아요 상태 확인 API로 필터
export const useLikedRestaurantsFallback = (userId, restaurantList) =>
  useQuery({
    queryKey: [
      "restaurants",
      "liked-fallback",
      userId,
      restaurantList?.length ?? 0,
      restaurantList
        ?.map((r) => r?.id)
        .filter(Boolean)
        .join(",") ?? "",
    ],
    queryFn: async () => {
      if (!userId || !restaurantList?.length) return [];
      const results = await Promise.all(
        restaurantList.map((r) =>
          fetchLikeStatus({ userId, restaurantId: r.id })
            .then((res) => {
              const isLiked = (res?.data ?? res)?.isLiked ?? false;
              return isLiked ? { ...r, isLiked: true } : null;
            })
            .catch(() => null),
        ),
      );
      return results.filter(Boolean);
    },
    enabled:
      !!userId && !!restaurantList?.length && restaurantList.length <= 100,
  });

// 맛집 이미지 목록 — GET /restaurants/{id}/image
export const useRestaurantImages = (restaurantId) =>
  useQuery({
    queryKey: ["restaurants", restaurantId, "images"],
    queryFn: async () => {
      try {
        return await fetchRestaurantImages(restaurantId);
      } catch {
        return [];
      }
    },
    select: (list) => (Array.isArray(list) ? list : []),
    enabled: !!restaurantId,
  });

// 맛집 리스트용 무한 스크롤
export const useInfiniteRestaurants = (filters) =>
  useInfiniteQuery({
    queryKey: ["restaurants", "list", filters],
    queryFn: async ({ pageParam }) => {
      // 백엔드 응답 예시:
      // { success: true, data: { ...단일 맛집... }, hasNextPage, nextCursor }
      const res = await fetchRestaurants({
        cursor: pageParam,
        ...(filters || {}),
      });

      const payload = res?.data ?? res;

      let list;
      if (Array.isArray(payload)) {
        // data 자체가 배열인 경우
        list = payload;
      } else if (payload && typeof payload === "object" && payload.id) {
        // 단일 맛집 객체인 경우 → 배열로 감싸서 리스트처럼 사용
        list = [payload];
      } else {
        // 기타 케이스 (혹시 모를 확장용)
        list = payload?.content ?? payload?.data ?? payload?.restaurants ?? [];
      }

      const hasNext =
        res?.hasNext ??
        res?.has_next ??
        res?.hasNextPage ??
        res?.has_next_page ??
        false;

      const nextCursor =
        res?.nextCursor ??
        res?.next_cursor ??
        res?.cursor ??
        res?.next_page_cursor ??
        null;

      return { list, hasNext, nextCursor };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext && lastPage?.nextCursor != null
        ? lastPage.nextCursor
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
