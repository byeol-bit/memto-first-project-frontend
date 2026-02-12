import { useQuery } from "@tanstack/react-query";
import { fetchTopFiveRestaurants } from "../../api/fetch-top-five"
import { QUERY_KEYS } from "../../lib/constants"

export function useTopFiveRestaurantsData() {
  return useQuery({
    queryFn: fetchTopFiveRestaurants,
    queryKey: QUERY_KEYS.restaurant.topFive,
  })
}