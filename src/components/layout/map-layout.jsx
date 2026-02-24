import { useState, createContext, useMemo, useCallback } from "react"
import style from "./map-layout.module.css"
import { Outlet } from "react-router"
import ListPanel from "./list-panel"
import SidebarTabs from "./sidebar-tabs"
import { MAP_LAYOUT_TABS } from "../../lib/constants"

export const DetailStateContext = createContext()
// 하나의 컨택스트라는 공간을 만들어서 Provider 안에 선언된 컴포넌트들은 모두 이 해당 컨택스트에 접근할 수 있다.

const MapLayout = () => {
  const [activeTab, setActiveTab] = useState(MAP_LAYOUT_TABS.FEED)
  const [selectedUser, setSelectedUser] = useState()
  const [selectedRestaurant, setSelectedRestaurant] = useState()
  const [selectedFeed, setSelectedFeed] = useState()

  const handleTabClick = useCallback((tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab))
  }, [])

  const currentSelection = useMemo(
    () => ({ user: selectedUser, restaurant: selectedRestaurant, feed: selectedFeed }),
    [selectedUser, selectedRestaurant, selectedFeed]
  )
  const selectionSetters = useMemo(
    () => ({
      user: setSelectedUser,
      restaurant: setSelectedRestaurant,
      feed: setSelectedFeed,
    }),
    []
  )

  const selectOnly = useCallback((payload) => {
    const key = Object.keys(payload).find((k) => payload[k] !== undefined)
    if (!key || !selectionSetters[key]) return

    const value = payload[key]
    const isTogglingOff = currentSelection[key]?.id === value?.id
    selectionSetters[key](isTogglingOff ? null : value)

    Object.keys(selectionSetters).forEach((k) => {
      if (k !== key) selectionSetters[k](null)
    })
  }, [currentSelection, selectionSetters])

  const handleSelectUser = useCallback((user) => selectOnly({ user }), [selectOnly])
  const handleSelectRestaurant = useCallback((restaurant) => selectOnly({ restaurant }), [selectOnly])
  const handleSelectFeed = useCallback((feed) => selectOnly({ feed }), [selectOnly])

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      onTabClick: handleTabClick,
      selectedUser,
      setSelectedUser: handleSelectUser,
      selectedRestaurant,
      setSelectedRestaurant: handleSelectRestaurant,
      selectedFeed,
      setSelectedFeed: handleSelectFeed,
    }),
    [
      activeTab,
      selectedUser,
      selectedRestaurant,
      selectedFeed,
      handleTabClick,
      handleSelectUser,
      handleSelectRestaurant,
      handleSelectFeed,
    ]
  )

  return (
    <div className={style.mapSidebarContainer}>
      <div className={style.leftContainer}>

        <DetailStateContext.Provider value={contextValue}>
          <div className={style.leftContainerInner}>
            <SidebarTabs />
            <div className="bg-transparent flex gap-4">
              <ListPanel activeTab={activeTab} />
            </div>
            <div className={style.outlet}>
              <Outlet />
            </div>
          </div>
        </DetailStateContext.Provider>
      </div>

    </div>
  )
}

export default MapLayout