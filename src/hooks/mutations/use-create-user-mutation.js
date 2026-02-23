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

export const useFollow = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => followUser(userId),

    onSuccess: () => {
      queryClient.invalidateQueries(["follow", userId])
      queryClient.invalidateQueries(["userDetail", userId])
    }
  })
}

export const useUnfollow = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unfollowUser(userId),
    
    onSuccess: () => {
      queryClient.invalidateQueries(["follow", userId])
      queryClient.invalidateQueries(["userDetail", userId])
    }
  })
}