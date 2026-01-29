import { useState } from 'react'
import UserList from '../components/user-list-components/userList'
import UserFilter from '../components/user-list-components/userFilter'
import useUserFilter from '../hooks/useUserFilter'


const UserListPage = () => {
   
  const {
    users, keyword, setKeyword, tag, setTag, tags
  } = useUserFilter();

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
        <UserList users={users} />
      </div>
    </div>
  )
}

export default UserListPage