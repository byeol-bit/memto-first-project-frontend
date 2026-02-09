import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRestaurant,
  likeRestaurant,
  unlikeRestaurant,
} from "../../api/axios-restaurant";

// 식당 등록
export const useCreateRestaurantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRestaurant,
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
    },
  });
};
