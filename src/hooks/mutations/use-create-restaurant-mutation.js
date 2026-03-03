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

      let normalized = Array.isArray(result)
        ? result[0]
        : (result?.data ?? result);

      if (normalized && normalized.id) {
        return normalized;
      }

      try {
        const listRes = await fetchRestaurants();
        const list = Array.isArray(listRes) ? listRes : (listRes?.data ?? []);

        let found = null;
        if (variables.kakao_place_id) {
          found = list.find(
            (r) =>
              String(r.kakao_place_id) === String(variables.kakao_place_id),
          );
        }
        if (!found) {
          found = list.find(
            (r) => r.name === variables.name && r.address === variables.address,
          );
        }
        if (!found && list.length > 0) {
          found = list[list.length - 1];
        }

        return found ?? normalized;
      } catch (e) {
        return normalized;
      }
    },
    onSuccess: () => {
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
      queryClient.invalidateQueries({
        queryKey: ["restaurants", "liked", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["restaurants", "liked-fallback"],
      });
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
      queryClient.invalidateQueries({
        queryKey: ["restaurants", "liked", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["restaurants", "liked-fallback"],
      });
    },
  });
};
