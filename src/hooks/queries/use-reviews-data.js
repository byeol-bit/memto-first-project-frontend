import { useMemo } from "react";

import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchReviews,
  fetchUserReviews,
  fetchRestaurantReviews,
  fetchReviewLikeStatus,
  fetchReviewImages,
} from "../../api/axios-review";

const normalizeList = (res) =>
  Array.isArray(res) ? res : ((res && res?.data) ?? []);

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
      } catch (e) {
        if (e?.response?.status === 404) return [];
        throw e;
      }
    },
    select: normalizeList,
    enabled: !!restaurantId,
  });

// 리뷰 좋아요 상태
export const useReviewLikeStatus = ({ userId, visitId }) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["reviews", visitId, "like-status", userId],
    queryFn: async () => {
      const res = await fetchReviewLikeStatus({ userId, visitId });
      // 응답: { isLiked: true } 형태
      const normalized = res?.data ?? res;
      const isLiked = normalized?.isLiked ?? false;

      // 피드 무한 스크롤 캐시에 isLiked 반영
      queryClient.setQueriesData(
        { queryKey: ["reviews", "feed"], exact: false },
        (oldData) => {
          if (!oldData || !Array.isArray(oldData.pages)) return oldData;

          const newPages = oldData.pages.map((page) => {
            if (!page || !Array.isArray(page.list)) return page;
            const newList = page.list.map((review) =>
              review?.id === visitId ? { ...review, isLiked } : review,
            );
            return { ...page, list: newList };
          });

          return { ...oldData, pages: newPages };
        },
      );

      return isLiked;
    },
    enabled: !!userId && !!visitId,
  });
};

// 리뷰 이미지 목록 — GET /visits/{id}/image
export const useReviewImages = (visitId) =>
  useQuery({
    queryKey: ["reviews", visitId, "images"],
    queryFn: () => fetchReviewImages(visitId),
    select: (images) => (Array.isArray(images) ? images : []),
    enabled: !!visitId,
  });

// 맛집 상세 갤러리용: 해당 맛집 리뷰(visits)들의 이미지를 모두 모음
export const useRestaurantReviewImages = (visitIds) => {
  const stableKey = useMemo(
    () =>
      Array.isArray(visitIds)
        ? [...visitIds].sort((a, b) => (a ?? 0) - (b ?? 0)).join(",")
        : "",
    [visitIds],
  );
  return useQuery({
    queryKey: ["reviews", "restaurant-gallery-images", stableKey],
    queryFn: async () => {
      if (!visitIds?.length) return [];
      const arrays = await Promise.all(
        visitIds.map((id) => fetchReviewImages(id).catch(() => [])),
      );
      return arrays.flat().filter(Boolean);
    },
    enabled: !!stableKey,
  });
};

// 무한스크롤 응답 정규화
const normalizeInfiniteResponse = (res) => {
  const payload = res?.data ?? res;

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

  // 특정 식당 리뷰 API에서 내려주는 전체 리뷰 수
  // 예: item.restaurant.total_review_restaurant_count
  let totalRestaurantReviewCount = null;
  if (Array.isArray(list) && list.length > 0) {
    const found = list.find(
      (item) =>
        item?.restaurant?.total_review_restaurant_count != null ||
        item?.total_review_restaurant_count != null,
    );
    const rawCount =
      found?.restaurant?.total_review_restaurant_count ??
      found?.total_review_restaurant_count ??
      null;
    if (rawCount != null && !Number.isNaN(Number(rawCount))) {
      totalRestaurantReviewCount = Number(rawCount);
    }
  }

  return { list, hasNext, nextCursor, totalRestaurantReviewCount };
};

// 전체 피드용 무한스크롤
export const useInfiniteReviews = () =>
  useInfiniteQuery({
    queryKey: ["reviews", "feed"],
    queryFn: async ({ pageParam }) => {
      const res = await fetchReviews({ cursor: pageParam });
      return normalizeInfiniteResponse(res);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 0,
  });

// 특정 식당 리뷰 무한스크롤
export const useInfiniteRestaurantReviews = (restaurantId) =>
  useInfiniteQuery({
    queryKey: ["reviews", "restaurant", restaurantId, "infinite"],
    queryFn: async ({ pageParam }) => {
      const res = await fetchReviews({
        cursor: pageParam,
        restaurant_id: restaurantId,
      });
      return normalizeInfiniteResponse(res);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
    enabled:
      restaurantId !== null &&
      restaurantId !== undefined &&
      !Number.isNaN(Number(restaurantId)),
    staleTime: 0,
  });

  // 유저 리뷰 무한스크롤
export const useInfiniteUserReviews = (userId) =>
  useInfiniteQuery({
    queryKey: ["reviews", "user", userId, "infinite"],
    queryFn: async ({ pageParam }) => {
      console.log('유저........', userId, pageParam)
      const res = await fetchReviews({
        cursor: pageParam, 
        userId: userId
      });
      return normalizeInfiniteResponse(res);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      console.log("페이지네이션", lastPage);
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
      // return lastPage?.hasNext && lastPage?.nextCursor ? lastPage.nextCursor : undefined
    },
    enabled: userId !== null && userId !== undefined && !Number.isNaN(Number(userId)),
    staleTime: 0,
  });
