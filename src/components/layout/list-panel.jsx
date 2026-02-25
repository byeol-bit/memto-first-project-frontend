import { useContext } from "react"
import { MAP_LAYOUT_TABS } from "../../lib/constants"
import { DetailStateContext } from "./map-layout"
import DetailPanel from "./detail-panel"
import style from "./map-layout.module.css"

import UserListPage from "../../pages/user-list-page"
import UserDetailPage from "../../pages/user-detail-page"
import RestaurantListPage from "../../pages/restaurant-list-page"
import RestaurantDetailPage from "../../pages/restaurant-detail-page"
import FeedPage from "../../pages/feed-page"
import FollowPage from "../../pages/follow-page"

const ListPanel = ({ activeTab }) => {
  const { selectedUser, setSelectedUser, userDetailView, setUserDetailView,  selectedRestaurant, setSelectedRestaurant } =
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
        <DetailPanel onClose={() => {
          setSelectedUser(null) 
          setUserDetailView("detail")
        }}>
          {userDetailView === "detail" && <UserDetailPage />}
          {(userDetailView === "followers" || userDetailView === "followings") && (<FollowPage />)}
        </DetailPanel>
      )}
    </>
  )
}

export default ListPanel
