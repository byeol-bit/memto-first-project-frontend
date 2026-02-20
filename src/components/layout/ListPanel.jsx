import { useContext } from "react"
import { MAP_LAYOUT_TABS } from "../../lib/constants"
import UserListPage from "../../pages/user-list-page"
import RestaurantListPage from "../../pages/restaurant-list-page"
import FeedPage from "../../pages/feed-page"
import RestaurantDetailPage from "../../pages/restaurant-detail-page"
import UserDetailPage from "../../pages/user-detail-page"
import { DetailStateContext } from "./map-layout"
import DetailPanel from "./DetailPanel"
import style from "./map-layout.module.css"

const ListPanel = ({ activeTab }) => {
  const { selectedUser, setSelectedUser, selectedRestaurant, setSelectedRestaurant } =
    useContext(DetailStateContext)

  if (!activeTab) return null

  return (
    <>
      <div className={style.leftSidebarDetail}>
        {activeTab === MAP_LAYOUT_TABS.USERS && <UserListPage />}
        {activeTab === MAP_LAYOUT_TABS.RESTAURANTS && <RestaurantListPage />}
        {activeTab === MAP_LAYOUT_TABS.FEED && <FeedPage />}
      </div>
      {activeTab === MAP_LAYOUT_TABS.RESTAURANTS && selectedRestaurant && (
        <DetailPanel onClose={() => setSelectedRestaurant(null)}>
          <RestaurantDetailPage />
        </DetailPanel>
      )}
      {activeTab === MAP_LAYOUT_TABS.USERS && selectedUser && (
        <DetailPanel onClose={() => setSelectedUser(null)}>
          <UserDetailPage />
        </DetailPanel>
      )}
    </>
  )
}

export default ListPanel
