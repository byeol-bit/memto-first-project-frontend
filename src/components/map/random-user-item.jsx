import { useContext } from "react"
import { DetailStateContext } from "../layout/map-layout"
import { MAP_LAYOUT_TABS } from "../../lib/constants"

const RandomUserItem = ({ user }) => {
  const { setActiveTab, setSelectedUser } = useContext(DetailStateContext)

  const onItemClick = () => {
    setActiveTab?.(MAP_LAYOUT_TABS.USERS)
    setSelectedUser?.(user)
  }

  return (
    <article
      className="
        group flex items-center gap-2 px-2 py-1.5 rounded-md
        cursor-pointer select-none
        bg-[var(--background-color)] border border-[var(--border-light)]
        shadow-sm hover:shadow-md hover:border-[var(--border-color)]
        hover:bg-[var(--background-light)]
        transition-all duration-200 ease-out
      "
      onClick={onItemClick}
    >
      <div className="w-6 h-6 shrink-0 rounded-full overflow-hidden bg-[var(--background-light)] ring-1 ring-[var(--border-light)] group-hover:ring-[var(--border-color)] transition-shadow duration-200">
        <img
          className="w-full h-full object-cover"
          src={user.profile_image}
          alt={user.nickname}
        />
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <h4 className="font-semibold text-[var(--text-primary)] text-xs truncate tracking-tight">
          {user.nickname}
        </h4>
        {user.category && (
          <p className="[color:var(--text-secondary)] text-[10px] truncate max-w-[8.2rem]" title={user.category}>
            {user.category}
          </p>
        )}
      </div>
    </article>
  )
}

export default RandomUserItem
