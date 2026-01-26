import { useState } from 'react'
import UserList from '../components/user-list-components/userList'
import UserSearchName from '../components/user-list-components/userSearchName'

const USER = [
  { 
    id: 1,
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    following: 3,
    comment: "맛집만 추천합니다!"
  },

  {
    id : 2,
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    following: 3,
    comment: "맛집만 추천합니다!"
  },
  {
    id : 3,
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    following: 3,
    comment: "맛집만 추천합니다!"
  },
  {
    id : 4,
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    following: 3,
    comment: "맛집만 추천합니다!"
  },
  { 
    id : 5,
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    following: 3,
    comment: "맛집만 추천합니다!"
  },
  { 
    id : 6,
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    following: 3,
    comment: "맛집만 추천합니다!"
  },
]
const TAG = [
  {
    id : 1,
    name: "푸드파이터"
  },
  {
    id : 2,
    name: "먹방유튜버"
  },
  {
    id : 3,
    name: "동네맛집고수"
  }
]

const UserListPage = () => {
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState([]);


  // 필터링 유저 저장 나중에 userList로 넘기기 const filteredUsers = USER.filter()

  return (
    <div> 
      <div className="mx-auto m-4 p-4">
        {/* 상단 메뉴 설명 (메뉴 이름, 숨은 고수들을 탐색해보세요.) */}
        <div>
          고수목록
        </div>
        <div>
          숨은 고수들을 탐색해보세요.
        </div>


        {/* 고수 검색창 */}
        <form onSubmit={(e) => e.preventDefault()}>
          <UserSearchName keyword={keyword} setKeyword={setKeyword} />
          <p>현재 검색어 : {keyword}</p>
        </form>


        {/* 태그 필터링 */}
        {/* 고수 리스트 */}
        <UserList users={USER} />
      </div>
    </div>
  )
}

export default UserListPage