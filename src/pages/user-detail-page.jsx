import { useParams, useSearchParams } from "react-router"

import UserProfile from "../components/user-detail-components/userProfile"
import UserReview from "../components/user-detail-components/userReview"
import UserVisited from "../components/user-detail-components/userVisited"

import {users} from "../data/users.mock"


const UserDetailPage = () => {
  const {id} = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  
  const user = users.find((u) =>{
    return u.id === Number(id)  
  })
  // 선택된 탭이 없으면 기본으로 visited탭 보여주기
  let selectedTab = searchParams.get('tab') ?? 'visited'

  // 팔로잉 정보
  // const isFollowing = false

  return (
    <div>
      <UserProfile user={user} />
  
      <div className='flex border-t border-gray-100 items-stretch'> 
        <div 
            className={
              `flex-1 flex items-center justify-center gap-2 py-4 text-xs  text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer
              ${selectedTab=='visited'
                ? 'text-red-400 border-b border-red-400 font-semibold'
                : 'font-medium border-b border-gray-100'
              }`
            }
            onClick={() => {setSearchParams({tab: 'visited'})}}
        >
          <span className="text-gray-400">방문 맛집</span> 
          <span className='font-bold'>{user.visited_count}개</span>
        </div>
            
        <div className='w-px bg-gray-100'></div>

        <div 
            className={
              `flex-1 flex items-center justify-center gap-2 py-4 text-xs  text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer
              ${selectedTab=='reviews'
                ? 'text-red-400 border-b border-red-400 font-semibold'
                : 'font-medium border-b border-gray-100'
              }`
            }
            onClick={() => {setSearchParams({tab: 'reviews'})}}
        >
          <span className="text-gray-400">리뷰</span> 
          <span className='font-bold'>{user.reviews}개</span>
        </div>
      </div>     
         {/* 선택된 탭에 따라 다른 컴포넌트 출력 */}
      <div>
        {selectedTab === 'visited' && <UserVisited />}
        {selectedTab === 'reviews' && <UserReview />}
      </div>
    </div>
  )
}

export default UserDetailPage