import { useQuery } from "@tanstack/react-query";
import { fetchRandomUsers } from "../../api/fetch-random-user"
import { QUERY_KEYS } from "../../lib/constants"

export function useRandomUsersData() {
  return useQuery({
    queryFn: async () => {
      const res = await fetchRandomUsers()
      if (!res) return []
      const list = Array.isArray(res) ? res : []
      return list.slice(0, 3)
    },
    queryKey: QUERY_KEYS.user.random,
  })
}