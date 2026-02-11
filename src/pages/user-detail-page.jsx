import { useParams } from "react-router"
import { useState } from "react"

import UserProfile from "../components/user-detail-components/userProfile"
import UserReview from "../components/user-detail-components/userReview"

import { useContext } from "react"
import { DetailStateContext } from "../components/layout/map-layout"
import { useUserDetail } from "../hooks/queries/use-users-data"
import TabButton from "../components/tabButton"
import FollowersList from "../components/follow/followersList"
import FollowingsList from "../components/follow/followingsList"


const TABS = {
  REVIEWS: 'reviews',
  FOLLOWERS: 'followers',
  FOLLOWINGS: 'followings'
}


const UserDetailPage = () => {
  const context = useContext(DetailStateContext)
  const {id} = useParams()
  const [selectedTab, setSelectedTab] = useState(TABS.REVIEWS)

  let currentId = context?.selectedUser?.id
    ? parseInt(context.selectedUser.id)
    : parseInt(id) 

  
  const { data: user, isLoading, error} = useUserDetail(currentId)
  
  if(isLoading) return <div>유저 정보를 불러오고 있습니다.</div>
  if(error) return <div>유저 정보를 불러오는데 실패했습니다.</div>

  return (
    <div>
      <UserProfile user={user} />
            <div className="flex border-b border-b-gray-200 mt-2">
        <TabButton
          label="리뷰"
          active={selectedTab === TABS.REVIEWS}
          onClick={() => setSelectedTab(TABS.REVIEWS)}
        />
        <TabButton
          label="팔로워"
          active={selectedTab === TABS.FOLLOWERS}
          onClick={() => setSelectedTab(TABS.FOLLOWERS)}
        />
        <TabButton
          label="팔로잉"
          active={selectedTab === TABS.FOLLOWINGS}
          onClick={() => setSelectedTab(TABS.FOLLOWINGS)}
        />
      </div>
      <div>
        {selectedTab === TABS.REVIEWS && <UserReview userId={currentId}/>}
        {selectedTab === TABS.FOLLOWERS && <FollowersList userId={currentId}/>}
        {selectedTab === TABS.FOLLOWINGS && <FollowingsList userId={currentId}/>}
      </div>
    </div>
  )
}

export default UserDetailPage