import { useQuery } from "@tanstack/react-query";
import { fetchRandomUsers } from "../../api/fetch-random-user"
import { QUERY_KEYS } from "../../lib/constants"

export function useRandomUsersData() {
  return useQuery({
    queryFn: fetchRandomUsers,
    queryKey: QUERY_KEYS.user.random,
  })
}