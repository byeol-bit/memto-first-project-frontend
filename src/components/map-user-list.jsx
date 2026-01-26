import style from "./map-user-list.module.css"
import { useContext } from "react"
import { DetailStateContext } from "./map-layout"

const UserList = () => {
  const { mockUsers } = useContext(DetailStateContext)

  if (!mockUsers || mockUsers.length === 0) {
    return <div className={style.empty}>고수 목록이 없습니다.</div>
  }

  return (
    <div className={style.userList}>
      <h3 className={style.title}>고수 목록</h3>
      <div className={style.list}>
        {mockUsers.map((user) => (
          <div key={user.id} className={style.userItem}>
            <img
              src={user.profileImage}
              alt={user.name}
              className={style.profileImage}
            />
            <div className={style.userInfo}>
              <div className={style.userName}>{user.name}</div>
              <div className={style.specialty}>{user.specialty}</div>
              <div className={style.rating}>
                ⭐ {user.rating} ({user.reviewCount}개 리뷰)
              </div>
              <div className={style.location}>{user.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
