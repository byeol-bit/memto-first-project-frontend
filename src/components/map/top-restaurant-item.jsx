import { rankingImgArr } from "../../lib/constants"
import { useContext } from "react"
import { DetailStateContext } from "../layout/map-layout"

const TopRestaurantItem = ({ rank, restaurant }) => {
  const {setSelectedRestaurant} = useContext(DetailStateContext)

  const onItemClick = ()=> {
    setSelectedRestaurant(restaurant)
  }

  return (
    <article
      className="
        group flex items-center gap-3 px-3 py-2.5 rounded-lg
        cursor-pointer select-none
        bg-[var(--background-color)] border border-[var(--border-light)]
        shadow-sm hover:shadow-md hover:border-[var(--border-color)]
        hover:bg-[var(--background-light)]
        transition-all duration-200 ease-out
      "
      onClick={onItemClick}
    >
      <div
        className="
          w-9 h-9 shrink-0 flex items-center justify-center rounded-full overflow-hidden
          bg-[var(--background-light)] ring-1 ring-[var(--border-light)]
          group-hover:ring-[var(--border-color)] transition-shadow duration-200
        "
      >
        <img
          className="w-6 h-6 object-contain rank-img-sparkle"
          
          src={rankingImgArr[rank]}
          alt={`${rank + 1}등 맛집`}
        />
      </div>

      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <h4 className="font-semibold text-[var(--text-primary)] [font-size:var(--font-size-sm)] truncate tracking-tight">
          {restaurant.name}
        </h4>
        <p className="[color:var(--text-secondary)] [font-size:var(--font-size-xs)] truncate">
          {restaurant.address}
        </p>
      </div>
    </article>
  )
}

export default TopRestaurantItem