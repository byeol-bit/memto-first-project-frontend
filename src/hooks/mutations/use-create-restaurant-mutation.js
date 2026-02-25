import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRestaurant,
  fetchRestaurants,
  likeRestaurant,
  unlikeRestaurant,
} from "../../api/axios-restaurant";

// 식당 등록
export const useCreateRestaurantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => {
      const result = await createRestaurant(variables);

      // 1차: POST 응답에서 바로 id를 꺼내보기
      let normalized = Array.isArray(result)
        ? result[0]
        : (result?.data ?? result);

      if (normalized && normalized.id) {
        return normalized;
      }

      // 2차: 백엔드가 id를 안 돌려주는 경우 → 전체 목록을 다시 불러와서 방금 만든 식당을 찾아서 반환
      try {
        const listRes = await fetchRestaurants();
        const list = Array.isArray(listRes) ? listRes : (listRes?.data ?? []);

        // kakao_place_id가 있으면 그걸로 우선 매칭
        let found = null;

        if (variables.kakao_place_id) {
          found = list.find(
            (r) =>
              String(r.kakao_place_id) === String(variables.kakao_place_id),
          );
        }

        // 없으면 name + address 로 매칭
        if (!found) {
          found = list.find(
            (r) => r.name === variables.name && r.address === variables.address,
          );
        }

        // 그래도 못 찾으면 마지막 요소(가장 최근 추가)로 추정
        if (!found && list.length > 0) {
          found = list[list.length - 1];
        }

        return found ?? normalized;
      } catch (e) {
        // 목록 조회 실패 시, 원본이라도 반환
        return normalized;
      }
    },
    onMutate: async (variables) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["restaurants"] });

      // 이전 데이터 백업
      const previousRestaurants = queryClient.getQueryData(["restaurants"]);

      // Optimistic 식당 데이터 생성 (고유한 temp ID)
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const optimisticRestaurant = {
        id: tempId,
        name: variables.name,
        address: variables.address,
        phone_number: variables.phone_number || null,
        category: variables.category || "",
        latitude: variables.latitude || "0.00000000",
        longitude: variables.longitude || "0.00000000",
        kakao_place_id: variables.kakao_place_id || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        optimistic: true,
      };

      // 일반 query에 optimistic 데이터 추가
      queryClient.setQueryData(["restaurants"], (old = []) => {
        return [optimisticRestaurant, ...old];
      });

      return { previousRestaurants, tempId };
    },
    onError: (err, variables, context) => {
      // 에러 시 이전 데이터로 복구
      if (context?.previousRestaurants !== undefined) {
        queryClient.setQueryData(["restaurants"], context.previousRestaurants);
      }
    },
    onSuccess: (newRestaurant, variables, context) => {
      // 실제 응답으로 optimistic 데이터 교체
      const normalizedRestaurant = Array.isArray(newRestaurant)
        ? newRestaurant[0]
        : (newRestaurant?.data ?? newRestaurant);

      // 일반 query에서 optimistic 교체 (tempId로 매칭)
      queryClient.setQueryData(["restaurants"], (old = []) => {
        return [
          { ...normalizedRestaurant, optimistic: false },
          ...old.filter((r) => r.id !== context.tempId),
        ];
      });

      // 검색 쿼리 등도 무효화
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// 좋아요
export const useLikeRestaurantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeRestaurant,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurants", variables.restaurantId, "like-status"],
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// 좋아요 취소
export const useUnlikeRestaurantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeRestaurant,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurants", variables.restaurantId, "like-status"],
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
