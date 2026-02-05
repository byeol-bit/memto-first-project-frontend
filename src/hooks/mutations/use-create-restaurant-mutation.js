import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../lib/constants"
import { createRestaurant } from "../../api/create-restaurnt"


export function useCreateRestaurantMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRestaurant,
    onMutate: () => { },
    onSettled: () => { },
    onSuccess: (newRestaurant) => {
      queryClient.setQueryData(QUERY_KEYS.restaurant.list, (prevRestaurants) => {
        if (!prevRestaurants) return [newRestaurant]
        return [...prevRestaurants, newRestaurant]
      })
    },
    onError: (error) => {
      -
      window.alert(error.message)
    }
  })
}