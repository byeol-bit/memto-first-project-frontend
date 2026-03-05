import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, updateReview, deleteReview, likeReview, unlikeReview } from "../../api/axios-review";

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
      queryClient.invalidateQueries({
        queryKey: ["reviews", "restaurant-gallery-images"],
      });
      queryClient.invalidateQueries({
        queryKey: ["restaurants", restaurantId, "images"],
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// 리뷰 수정 (내용만) PATCH /visits/{id}
export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ visitId, review }) => updateReview(visitId, { review }),
    onSuccess: (_, variables) => {
      const visitId = variables.visitId;
      const restaurantId = variables.restaurantId;

      // ✅ 피드 캐시에서 해당 리뷰의 내용만 업데이트 (isLiked 유지)
      queryClient.setQueryData(["reviews", "feed"], (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page) => {
            const list = page?.list ?? page;
            if (!Array.isArray(list)) return page;
            return {
              ...page,
              list: list.map((r) => {
                const id = r?.id ?? r?.visit_id ?? r?.visitId;
                if (id == null || Number(id) !== Number(visitId)) return r;
                return {
                  ...r,
                  review: variables.review,
                  content: variables.review,
                  rev: variables.review,
                };
              }),
            };
          }),
        };
      });

      // 상세/리스트/갤러리 등은 기존대로 invalidation
      queryClient.invalidateQueries({ queryKey: ["reviews", visitId, "images"] });
      if (restaurantId != null) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "restaurant", restaurantId],
        });
        queryClient.invalidateQueries({
          queryKey: ["reviews", "restaurant", restaurantId, "infinite"],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["reviews", "restaurant-gallery-images"],
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// 리뷰 삭제 DELETE /visits/{id}
export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ visitId }) => deleteReview(visitId),
    onSuccess: (_, variables) => {
      const { visitId, restaurantId } = variables;

      // ✅ 피드 캐시에서 해당 리뷰 제거 (좋아요 탭도 함께 반영)
      queryClient.setQueryData(["reviews", "feed"], (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page) => {
            const list = page?.list ?? page;
            if (!Array.isArray(list)) return page;
            return {
              ...page,
              list: list.filter((r) => {
                const id = r?.id ?? r?.visit_id ?? r?.visitId;
                return !(id != null && Number(id) === Number(visitId));
              }),
            };
          }),
        };
      });

      queryClient.invalidateQueries({ queryKey: ["reviews", visitId, "images"] });
      if (restaurantId != null) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "restaurant", restaurantId],
        });
        queryClient.invalidateQueries({
          queryKey: ["reviews", "restaurant", restaurantId, "infinite"],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["reviews", "restaurant-gallery-images"],
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

// 피드 캐시에서 해당 visitId 리뷰의 visitLikeCount를 delta만큼 변경 (feed-page에서 숫자 즉시 반영)
function updateReviewLikeCountInFeedCache(queryClient, visitId, delta) {
  const key = ["reviews", "feed"];
  queryClient.setQueryData(key, (old) => {
    if (!old?.pages) return old;
    return {
      ...old,
      pages: old.pages.map((page) => {
        const list = page?.list ?? page;
        if (!Array.isArray(list)) return page;
        return {
          ...page,
          list: list.map((r) => {
            const id = r?.id ?? r?.visit_id ?? r?.visitId;
            if (id == null || Number(id) !== Number(visitId)) return r;
            const cur =
              r?.visitLikeCount ?? r?.visit_like_count ?? r?.likeCount ?? 0;
            const next = Math.max(0, Number(cur) + delta);
            return {
              ...r,
              visitLikeCount: next,
              visit_like_count: next,
            };
          }),
        };
      }),
    };
  });
}

function setReviewLikeStatusInCache(queryClient, visitId, userId, isLiked) {
  const key = ["reviews", visitId, "like-status", userId];
  queryClient.setQueryData(key, isLiked);
}

// 리뷰 좋아요 — 낙관적 업데이트: 피드에서 하트 누르면 count·하트 즉시 반영
export const useLikeReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeReview,
    onMutate: (variables) => {
      updateReviewLikeCountInFeedCache(
        queryClient,
        variables.visitId,
        +1,
      );
      setReviewLikeStatusInCache(
        queryClient,
        variables.visitId,
        variables.userId,
        true,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.visitId, "like-status"],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["reviews", "restaurant"] });
    },
    onError: (_, variables) => {
      updateReviewLikeCountInFeedCache(
        queryClient,
        variables.visitId,
        -1,
      );
      setReviewLikeStatusInCache(
        queryClient,
        variables.visitId,
        variables.userId,
        false,
      );
    },
  });
};

// 리뷰 좋아요 취소 — 낙관적 업데이트
export const useUnlikeReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeReview,
    onMutate: (variables) => {
      updateReviewLikeCountInFeedCache(
        queryClient,
        variables.visitId,
        -1,
      );
      setReviewLikeStatusInCache(
        queryClient,
        variables.visitId,
        variables.userId,
        false,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.visitId, "like-status"],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["reviews", "restaurant"] });
    },
    onError: (_, variables) => {
      updateReviewLikeCountInFeedCache(
        queryClient,
        variables.visitId,
        +1,
      );
      setReviewLikeStatusInCache(
        queryClient,
        variables.visitId,
        variables.userId,
        true,
      );
    },
  });
};
