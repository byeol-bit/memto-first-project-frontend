import { useQuery } from "@tanstack/react-query";
import {
  fetchReviews,
  fetchUserReviews,
  fetchRestaurantReviews,
  fetchReviewLikeStatus,
} from "../../api/axios-review";

// API 응답이 배열이거나 { data } 형태일 수 있음 → 항상 배열로 정규화
const normalizeList = (res) =>
  Array.isArray(res) ? res : ((res && res?.data) ?? []);

// 전체 리뷰
export const useReviews = () =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    select: normalizeList,
  });

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
