import style from "./map-restaurant-detail.module.css"
import { DetailStateContext } from "../layout/map-layout"
import { useContext } from "react"

const MapRestaurantDetail = ({ restaurant }) => {
  const { selectedRestaurant, setSelectedRestaurant } = useContext(DetailStateContext)
  const isSelected = selectedRestaurant?.id === restaurant.id

  const onRestaurantDetailClick = () => {
    setSelectedRestaurant(restaurant)
  }

  return (
    <div
      className={`${style.restaurantItem} ${isSelected ? style.selected : ''}`}
      onClick={onRestaurantDetailClick}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className={style.restaurantImage}
      />
      <div className={style.restaurantInfo}>
        <div className={style.restaurantName}>{restaurant.name}</div>
        <div className={style.category}>{restaurant.category}</div>
        <div className={style.rating}>
          ⭐ {restaurant.rating} ({restaurant.reviewCount}개 리뷰)
        </div>
        <div className={style.address}>{restaurant.address}</div>
        <div className={style.priceRange}>가격대: {restaurant.priceRange}</div>
      </div>
    </div>
  )
}

export default MapRestaurantDetail