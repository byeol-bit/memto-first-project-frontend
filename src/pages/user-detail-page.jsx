import { useParams, useSearchParams } from "react-router"

import UserProfile from "../components/user-detail-components/userProfile"
import UserReview from "../components/user-detail-components/userReview"
import UserVisited from "../components/user-detail-components/userVisited"

import {users} from "../data/users.mock"
import SelectedTab from "../components/follow/selectedTab"


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
      {/* 상단 탭바 */}
      <SelectedTab 
        tabs={[
          { label: '방문목록', value: 'visited' },
          { label: '리뷰', value: 'reviews'}
        ]}
        active={selectedTab}
        onChange={(tab) => setSearchParams({tab})}
      />
      {/* 선택된 탭에 따라 다른 컴포넌트 출력 */}
      <div>
        {selectedTab === 'visited' && <UserVisited />}
        {selectedTab === 'reviews' && <UserReview />}
      </div>
    </div>
  )
}

export default UserDetailPage