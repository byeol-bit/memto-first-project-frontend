import { useContext } from "react"
import { MAP_LAYOUT_TABS } from "../../lib/constants"
import { DetailStateContext } from "./map-layout"
import style from "./map-layout.module.css"

const TAB_ITEMS = [
  { tab: MAP_LAYOUT_TABS.FEED, label: "피드" },
  { tab: MAP_LAYOUT_TABS.USERS, label: "고수", subLabel: "목록" },
  { tab: MAP_LAYOUT_TABS.RESTAURANTS, label: "맛집", subLabel: "목록" },
]

const SidebarTabs = () => {
  const { activeTab, onTabClick } = useContext(DetailStateContext)

  return (
    <div id="sidebar-tabs" className={style.leftSidebar}>
      {TAB_ITEMS.map(({ tab, label, subLabel }) => (
        <button
          key={tab}
          type="button"
          className={`${style.leftSidebarBtn} ${activeTab === tab ? style.active : ""}`}
          onClick={() => onTabClick?.(tab)}
        >
          {subLabel ? (
            <>
              {label}
              <br />
              {subLabel}
            </>
          ) : (
            label
          )}
        </button>
      ))}
    </div>
  )
}

export default SidebarTabs
