import Map from "../components/map/map"
import TopFiveRestaurants from "../components/map/top-five-restaurants"

const MapPage = () => {
  return (
    <div className="relative flex border-box overflow-hidden w-full h-full">
      <Map />
      <div className="absolute top-6 right-0 z-[6] mr-6">
        <TopFiveRestaurants />
      </div>

    </div>
  )
}

export default MapPage