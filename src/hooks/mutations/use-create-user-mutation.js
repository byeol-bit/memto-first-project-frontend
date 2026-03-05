import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "../../api/create-user"
import { QUERY_KEYS } from "../../lib/constants"
import { followUser, unfollowUser } from "../../api/user.api"

export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onMutate: () => { },
    onSettled: () => { },
    onSuccess: (newUser) => {
      queryClient.setQueryData(QUERY_KEYS.user.list, (prevUsers) => {
        if (!prevUsers) return [newUser]
        return [...prevUsers, newUser]
      })
    },
    onError: (error) => {
      window.alert(error.message)
    }
  })
}

function patchInfiniteUsersFollowerCount(old, userId, delta) {
  if (!old?.pages) return old;

  return {
    ...old,
    pages: old.pages.map((page) =>
      page.map((u) => {
        if (!u || u.id !== userId) return u;
        return {
          ...u,
          followerCount: Math.max(0, (u.followerCount ?? 0) + delta),
        };
      })
    ),
  };
}
export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, isFollowing }) => {
      return isFollowing ? unfollowUser(userId) : followUser(userId);
    },

    onMutate: async ({ userId, isFollowing }) => {
      const delta = isFollowing ? -1 : 1;

      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["follows", userId] }),
        queryClient.cancelQueries({ queryKey: ["users"] }),
      ]);

      const prevFollow = queryClient.getQueryData([
        "follows",
        userId,
        "follow-status",
      ]);

      const prevUsersQueries = queryClient.getQueriesData({ queryKey: ["users"] });

      queryClient.setQueryData(
        ["follows", userId, "follow-status"],
        !isFollowing
      );

      queryClient.setQueriesData(
        { queryKey: ["users"], exact: false },
        (old) => patchInfiniteUsersFollowerCount(old, userId, delta)
      );

      queryClient.setQueryData(
        ["follows", userId, "followers", "count"],
        (old = 0) => Math.max(0, old + delta)
      );

      return { prevFollow, prevUsersQueries };
    },

    onError: (_err, { userId }, context) => {
      if (!context) return;

      // 팔로우 상태 롤백
      queryClient.setQueryData(
        ["follows", userId, "follow-status"],
        context.prevFollow
      );

      for (const [key, data] of context.prevUsersQueries) {
        queryClient.setQueryData(key, data);
      }
    },

    onSettled: (_data, _err, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["follows"]});
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
    },
  });
};