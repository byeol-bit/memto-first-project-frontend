import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, likeReview, unlikeReview } from "../../api/axios-review";

// 리뷰 등록
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      const restaurantId = Number(variables.restaurantId);
      queryClient.invalidateQueries({
        queryKey: ["reviews", "restaurant", restaurantId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews", "restaurant", restaurantId, "infinite"],
      });

      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// 리뷰 좋아요
export const useLikeReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.visitId, "like-status"],
        exact: false,
      });
    },
  });
};

// 리뷰 좋아요 취소
export const useUnlikeReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.visitId, "like-status"],
        exact: false,
      });
    },
  });
};
