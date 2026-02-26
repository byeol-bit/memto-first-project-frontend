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
      const infiniteKey = ["reviews", "restaurant", restaurantId, "infinite"];

      await Promise.all([
        queryClient.cancelQueries({ queryKey }),
        queryClient.cancelQueries({ queryKey: infiniteKey }),
      ]);

      const previousData = queryClient.getQueryData(queryKey);
      const previousInfinite = queryClient.getQueryData(infiniteKey);

      const optimisticReview = {
        id: Date.now(),
        user_id: variables.userId,
        review,
        visit_date: new Date().toISOString(),
        visitDate: new Date().toISOString(),
        likeCount: 0,
        optimistic: true,
        user: variables.user ?? null,
      };

      queryClient.setQueryData(queryKey, (old = []) => {
        return [optimisticReview, ...(old || [])];
      });

      queryClient.setQueryData(infiniteKey, (old) => {
        if (!old || !Array.isArray(old.pages)) {
          return {
            pages: [
              { list: [optimisticReview], hasNext: false, nextCursor: null },
            ],
            pageParams: [null],
          };
        }

        const firstPage = old.pages[0] || {};
        const firstList = Array.isArray(firstPage.list) ? firstPage.list : [];

        const newFirstPage = {
          ...firstPage,
          list: [optimisticReview, ...firstList],
        };

        return {
          ...old,
          pages: [newFirstPage, ...old.pages.slice(1)],
        };
      });

      return { previousData, previousInfinite, queryKey, infiniteKey };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
      if (context?.previousInfinite) {
        queryClient.setQueryData(context.infiniteKey, context.previousInfinite);
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
          const base = Array.isArray(old) ? old : [];
          return [normalizedReview, ...base.filter((r) => !r?.optimistic)];
        });
      }

      if (context?.infiniteKey) {
        queryClient.setQueryData(context.infiniteKey, (old) => {
          if (!old || !Array.isArray(old.pages)) return old;

          const newPages = old.pages.map((page, idx) => {
            if (idx !== 0) return page;
            const list = Array.isArray(page.list) ? page.list : [];
            const filtered = list.filter((r) => !r?.optimistic);
            return {
              ...page,
              list: [normalizedReview, ...filtered],
            };
          });

          return {
            ...old,
            pages: newPages,
          };
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
