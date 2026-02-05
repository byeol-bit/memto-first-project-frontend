import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../../api/fetch-restaurants"
import { QUERY_KEYS } from "../../lib/constants";

export function useRestaurantsData() {
  return useQuery({
    queryFn: fetchRestaurants,
    queryKey: QUERY_KEYS.restaurant.list,
  })
}