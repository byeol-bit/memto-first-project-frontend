import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/fetch-users"
import { QUERY_KEYS } from "../../lib/constants";

export function useUsersData() {
  return useQuery({
    queryFn: fetchUsers,
    queryKey: QUERY_KEYS.user.list,
  })
}