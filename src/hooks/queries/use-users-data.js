import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/fetch-users"
import { QUERY_KEYS } from "../../lib/constants";
import { getUserDetail } from "../../api/user.api";

export function useUsersData() {
  return useQuery({
    queryFn: fetchUsers,
    queryKey: QUERY_KEYS.user.list,
  })
}

export const useUserDetail = (userId) => {
  return useQuery({
    queryKey: QUERY_KEYS.user.detail(userId),
    queryFn:() => getUserDetail(userId)
  })
}

