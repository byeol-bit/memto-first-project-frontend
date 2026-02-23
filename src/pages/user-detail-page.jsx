import { useParams, useNavigate } from "react-router"
import { useState, useContext, useRef } from "react"

import { DetailStateContext } from "../components/layout/map-layout"

import TabButton from "../components/tabButton"
import FollowButton from "../components/user-detail-components/followButton"
import UserProfile from "../components/user-detail-components/userProfile"
import UserReview from "../components/user-detail-components/userReview"
import LoginTooltip from "../components/loginTooltip"

import { useUserDetail, useIsFollowing, useCountFollowing, useCountFollower } from "../hooks/queries/use-users-data"
import {useFollow, useUnfollow} from "../hooks/mutations/use-create-user-mutation"


const TABS = {
  REVIEWS: 'reviews',
  FOLLOWERS: 'followers',
  FOLLOWINGS: 'followings'
}


const UserDetailPage = () => {
  const context = useContext(DetailStateContext)
  const navigate = useNavigate()

  const {id} = useParams()
  const [selectedTab, setSelectedTab] = useState(TABS.REVIEWS)
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef(null)

  // 로그인 여부
  const isLogin = true

  let currentId = context?.selectedUser?.id
    ? parseInt(context.selectedUser.id)
    : parseInt(id) 

  const { data: user, isLoading, error} = useUserDetail(currentId)
  const { data: isFollowing } = useIsFollowing(currentId)
  const { data: followingsCount } = useCountFollowing(currentId)
  const { data: followersCount } = useCountFollower(currentId)

  const followMutation = useFollow(currentId)
  const unfollowMutation = useUnfollow(currentId)
  

  const requireLogin = (callback) => {
    if(!isLogin) {
      setShowTooltip(true)
      clearTimeout(tooltipTimer.current)
      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
      return
    }
    callback()
  }

  const handleFollowToggle = () => {
    requireLogin(() => {
      if(isFollowing) {
        unfollowMutation.mutate()
      } else {
        followMutation.mutate()
      }
    })
  }

  // 내가 보고 있는 페이지 기억하기..
  const handleLoginRedirect = () => {
  //   sessionStorage.setItem(
  //     'returnDetailState',
  //     JSON.stringify({
  //       userId: currentId,
  //     })
  //   )
  //   navigate("/sign-up")
  }
  
  if(isLoading) return <div>유저 정보를 불러오고 있습니다.</div>
  if(error) return <div>유저 정보를 불러오는데 실패했습니다.</div>

  return (
    <div>
      <UserProfile user={user} />
      {/* 팔로잉 수 / 팔로워 수 */}
      <div className="flex w-full py-4 border-b border-gray-100">

        {/* 팔로워 */}
        <div
          onClick={() => 
            requireLogin(() => 
              navigate(`/users/${currentId}/followers`)
          )}
          className="flex-1 flex flex-col items-center cursor-pointer hover:text-red-400 hover:bg-gray-100"
        >
          <span className="text-lg font-semibold">
            {followersCount?.count ?? 0}
          </span>
          <span className="text-sm text-gray-500">
            팔로워
          </span>
        </div>

        {/* 팔로잉 */}
        <div
          onClick={() => 
            requireLogin(() =>
              navigate(`/users/${currentId}/followings`)
          )}
          className="flex-1 flex flex-col items-center cursor-pointer  hover:text-red-400 hover:bg-gray-100"
        >
          <span className="text-lg font-semibold">
            {followingsCount?.count ?? 0}
          </span>
          <span className="text-sm text-gray-500">
            팔로잉
          </span>
        </div>
        
      </div>
      <div className="relative flex justify-center mt-4">
        <FollowButton isFollowing={isFollowing} onToggle={handleFollowToggle}/>
        {showTooltip && (
          <LoginTooltip 
            onClick={handleLoginRedirect}
            onClose={() => setShowTooltip(false)}
            mainText="로그인이 필요합니다"
            buttonText="로그인"
          />
        )}
      </div>
      <div className="flex border-b border-b-gray-200 mt-2">
        <TabButton
          label="리뷰"
          active={selectedTab === TABS.REVIEWS}
          onClick={() => setSelectedTab(TABS.REVIEWS)}
        />
      </div>
      <div>
        <UserReview userId={currentId}/>
      </div>
    </div> 
  )
}

export default UserDetailPage