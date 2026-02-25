import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, likeReview, unlikeReview } from "../../api/axios-review";

// 리뷰 등록
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onMutate: async (variables) => {
      const restaurantId = Number(variables.restaurantId);
      const review = variables.review;

      const queryKey = ["reviews", "restaurant", restaurantId];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      const optimisticReview = {
        id: Date.now(),
        review,
        created_at: new Date().toISOString(),
        likeCount: 0,
        optimistic: true,
      };

      queryClient.setQueryData(queryKey, (old = []) => {
        return [optimisticReview, ...old];
      });

      return { previousData, queryKey };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
    },

    onSuccess: (newReview, variables, context) => {
      const realReview = newReview?.data ?? newReview;

      const normalizedReview = {
        ...realReview,
        review: realReview.review ?? realReview.content ?? variables.review,
        likeCount: realReview.likeCount ?? 0,
        optimistic: false,
      };

      if (context?.queryKey) {
        queryClient.setQueryData(context.queryKey, (old = []) => {
          return [normalizedReview, ...old.filter((r) => !r.optimistic)];
        });
        queryClient.invalidateQueries({ queryKey: context.queryKey });
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
