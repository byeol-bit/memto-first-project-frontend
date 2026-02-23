import { useState } from "react"
import Map from "../components/map/map"
import TopFiveRestaurants from "../components/map/top-five-restaurants"
import RandomUsers from "../components/map/random-users"
import MapPanelToggleButton from "../components/map/map-panel-toggle-button"
import top5Img from "../assets/top-five/top5.png"
import top3Img from "../assets/top-three/top3.png"

const MapPage = () => {
  const [showTopFive, setShowTopFive] = useState(false)
  const [showRandomUsers, setShowRandomUsers] = useState(false)

  return (
    <div className="relative flex border-box overflow-hidden w-full h-full">
      <Map />
      <div className="absolute top-6 right-0 z-[6] mr-6 flex flex-col gap-2 items-end">
        <div className="flex gap-2">
          <MapPanelToggleButton
            src={top5Img}
            alt="맛집 Top5"
            onClick={() => setShowTopFive((prev) => !prev)}
            isSelected={showTopFive}
          />
          <MapPanelToggleButton
            src={top3Img}
            alt="랜덤고수"
            onClick={() => setShowRandomUsers((prev) => !prev)}
            isSelected={showRandomUsers}
          />
        </div>

        {showTopFive && (
          <div className="mt-1">
            <TopFiveRestaurants onClose={() => setShowTopFive(false)} />
          </div>
        )}
        {showRandomUsers && (
          <div className="mt-1">
            <RandomUsers onClose={() => setShowRandomUsers(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MapPage