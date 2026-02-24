import RandomUserItem from "./random-user-item"
import { useRandomUsersData } from "../../hooks/queries/use-random-user-data"

const RandomUsers = ({ onClose }) => {
  const { data: users } = useRandomUsersData()
  console.log('users', users)

  return (
    <div
      className="
        flex flex-col rounded-lg overflow-hidden
        bg-[var(--background-color)] border border-[var(--border-light)]
        shadow-md
      "
    >
      <header className="flex items-center justify-between gap-2 px-2.5 py-2 bg-[var(--background-color)] border-b border-[var(--border-light)]">
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm tracking-tight">
            랜덤 고수
          </h3>
          <p className="[color:var(--text-secondary)] text-[10px] mt-0.5">
            추천 유저 3명
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              shrink-0 w-6 h-6 flex items-center justify-center rounded-md
              text-[var(--text-secondary)] hover:text-[var(--text-primary)]
              hover:bg-[var(--background-dark)] active:bg-[var(--border-color)]
              transition-colors duration-150 text-base leading-none
            "
            aria-label="닫기"
          >
            ×
          </button>
        )}
      </header>

      <div className="flex flex-col gap-1.5 p-2 pt-0">
        {users?.map((user, idx) => (
          <RandomUserItem key={user.id ?? idx} user={user} />
        ))}
      </div>
    </div>
  )
}

export default RandomUsers
