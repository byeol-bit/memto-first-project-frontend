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

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, isFollowing }) => {
      return isFollowing
        ? unfollowUser(userId)
        : followUser(userId)
    },
    
    onMutate: async ({userId, isFollowing}) => {
      await queryClient.cancelQueries({queryKey: ["follows", userId]})

      queryClient.setQueryData(["follows", userId, "follow-status"], !isFollowing)
      queryClient.setQueryData(["follows", userId, "followers", "count"], (old = 0) => isFollowing ? old - 1 : old + 1)
    },

    onError: (_, {userId}, context) => {
      queryClient.setQueryData(["follows", userId, "follow-status"], context?.prevFollow)
      queryClient.setQueryData(["follows", userId, "followers", "count"], context?.prevFollowCount)
    },

    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["follows"]})
    },
  })
}