import style from "./map-restaurant-list.module.css"
import { useContext } from "react"
import { DetailStateContext } from "./map-layout"
import MapRestaurantDetail from "./map-restaurant-detail"

const RestaurantList = () => {
  const { mockRestaurants } = useContext(DetailStateContext)

  if (!mockRestaurants || mockRestaurants.length === 0) {
    return <div className={style.empty}>맛집 목록이 없습니다.</div>
  }

  return (
    <div className={style.restaurantList}>
      <h3 className={style.title}>맛집 목록</h3>
      <div className={style.list}>
        {mockRestaurants.map((restaurant) => (
          <MapRestaurantDetail key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}

export default RestaurantList
