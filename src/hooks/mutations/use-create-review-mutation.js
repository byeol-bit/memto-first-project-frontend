import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, likeReview, unlikeReview } from "../../api/axios-review";

// 리뷰 등록
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      // 해당 식당 리뷰 목록도 갱신 (디테일 페이지에서 바로 반영)
      if (variables?.restaurantId != null) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "restaurant", variables.restaurantId],
        });
      }
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
      });
    },
  });
};
