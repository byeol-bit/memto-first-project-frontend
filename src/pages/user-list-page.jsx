import { useState } from 'react'
import UserList from '../components/user-list-components/userList'
import UserFilter from '../components/user-list-components/userFilter'
import useUserFilter from '../hooks/useUserFilter'


const UserListPage = () => {
   
  const {
    users, keyword, setKeyword, tag, setTag, tags, isLoading, error
  } = useUserFilter();

  if(isLoading){
    return(
      <div className='flex justify-center items-center'>
        유저 목록을 불러오는 중입니다.
      </div>
    )
  }
  
  if(error){
    return(
      <div className='flex justify-center items-center'>
        유저 목록을 불러오는데 실패했습니다.
      </div>
    )
  }

  // 팔로우 여부 users로 받아오면 삭제하기!
  const [followingUsers, setFollowingUsers] = useState([])

  const toggleFollow = (userId) => {
    setFollowingUsers((prev) => {
      return prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    })
    // 서버요청. 실패시 되돌리기..
  }

  return (
    <div className='max-w-7xl mx-auto px-6'> 
      <div >
        {/* 상단 메뉴 설명 (메뉴 이름, 숨은 고수들을 탐색해보세요.) */}
        <div className='text-2xl font-bold'>
          고수목록
        </div>
        <div>
          숨은 고수들을 탐색해보세요.
        </div>


        {/* 고수 검색창 + 태그 필터링 */}
        <form className='p-4' onSubmit={(e) => e.preventDefault()}>
          <UserFilter keyword={keyword} setKeyword={setKeyword} tag={tag} setTag={setTag} tags={tags}/>
        </form>

        {/* 고수 리스트 */}
        <UserList users={users} followingUsers={followingUsers} toggleFollow={toggleFollow} />
      </div>
    </div>
  )
}

export default UserListPage