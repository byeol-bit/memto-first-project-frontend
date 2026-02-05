import { useState, createContext } from "react"
import style from "./map-layout.module.css"
import { Outlet } from "react-router"
import UserList from "../map/map-user-list"
import RestaurantList from "../map/map-restaurant-list"
import { mockUsers, mockRestaurants } from "../../data/mockData"
import MapRestaurantModal from "../map/map-restaurant-modal"


export const DetailStateContext = createContext()

const MapLayout = () => {
  const [activeTab, setActiveTab] = useState(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <div className={style.mapSidebarContainer}>
      <div className={style.leftContainer}>
        <div className={style.leftSidebar}>
          <button
            className={`${style.leftSidebarBtn} ${activeTab === 'users' ? style.active : ''}`}
            onClick={() => handleTabClick('users')}
          >
            고수<br />목록
          </button>
          <button
            className={`${style.leftSidebarBtn} ${activeTab === 'restaurants' ? style.active : ''}`}
            onClick={() => handleTabClick('restaurants')}
          >
            맛집<br />목록
          </button>
          <button
            className={`${style.leftSidebarBtn} ${activeTab === 'feed' ? style.active : ''}`}
            onClick={() => handleTabClick('feed')}
          >
            피드
          </button>
        </div>

        <DetailStateContext.Provider
          value={{
            mockUsers,
            mockRestaurants,
            selectedRestaurant,
            setSelectedRestaurant,
            isModalOpen,
            setIsModalOpen,
          }}>
          {activeTab && (
            <div className={style.leftSidebarDetail}>
              {activeTab === 'users' && <UserList />}
              {activeTab === 'restaurants' && <RestaurantList />}
              {activeTab === 'feed' && <div>피드 기능은 준비 중입니다.</div>}
            </div>
          )}
          <div className={style.outlet}>

            <Outlet />
          </div>
          <MapRestaurantModal />
        </DetailStateContext.Provider>
      </div>

    </div>
  )
}

export default MapLayout