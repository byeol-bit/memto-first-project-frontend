import { useQuery } from "@tanstack/react-query";
import {
  fetchRestaurants,
  searchRestaurants,
  searchKakaoRestaurants,
  fetchRestaurantKakaoId,
  fetchLikeStatus,
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
export const useRestaurantLikeStatus = ({ userId, restaurantId }) =>
  useQuery({
    queryKey: ["restaurants", restaurantId, "like-status", userId],
    queryFn: () => fetchLikeStatus({ userId, restaurantId }),
    enabled: !!userId && !!restaurantId,
  });
