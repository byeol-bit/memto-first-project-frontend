import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/constants"
import { getUserDetail } from "../api/user.api"

export const useUserDetail = (userId) => {
  return useQuery({
    queryKey: QUERY_KEYS.user.detail(userId),
    queryFn:() => getUserDetail(userId)
  })
}