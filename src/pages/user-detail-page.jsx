import { useState, useContext, useRef } from "react"

import { DetailStateContext } from "../components/layout/map-layout"

import FollowButton from "../components/user-detail-components/followButton"
import UserProfile from "../components/user-detail-components/userProfile"
import UserReview from "../components/user-detail-components/userReview"
import LoginTooltip from "../components/loginTooltip"
import Loading from "../components/loading"

import { useUserDetail, useIsFollowing, useCountFollowing, useCountFollower } from "../hooks/queries/use-users-data"
import { useToggleFollow } from "../hooks/mutations/use-create-user-mutation"

const UserDetailPage = () => {
  const context = useContext(DetailStateContext)

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef(null)

  // 로그인 여부
  const isLogin = true

  let currentId = context?.selectedUser?.id

  if(!currentId) {
    return null
  }

  const { data: user, isLoading, error} = useUserDetail(currentId)
  const { data: isFollowing } = useIsFollowing(currentId)
  const { data: followingsCount } = useCountFollowing(currentId)
  const { data: followersCount } = useCountFollower(currentId)

  const { mutate: toggleFollow } = useToggleFollow()

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
      toggleFollow({
        userId: currentId,
        isFollowing: isFollowing
      })
    })
  }

  // 내가 보고 있는 페이지 기억하기..
  const handleLoginRedirect = () => {

  }
  
  if(isLoading) return <Loading />
  if(error) return <div>유저 정보를 불러오는데 실패했습니다.</div>

  return (
    <div>
      <UserProfile user={user}/>
      {/* 팔로잉 수 / 팔로워 수 */}
      <div className="flex w-full mt-3 border-b border-t border-gray-50">
        {/* 팔로워 */}
        <div
          onClick={() => {
            context.setUserDetailView("followers")
          }}
          className="flex-1 flex flex-col py-1.5 items-center cursor-pointer hover:text-red-400 hover:bg-gray-100"
        >
          <span className="text-lg font-semibold">
            {followersCount ?? 0}
          </span>
          <span className="text-sm text-gray-500">
            팔로워
          </span>
        </div>
        <div className="w-px self-stretch bg-gray-50"/>
        {/* 팔로잉 */}
        <div
          onClick={() => 
            context.setUserDetailView("followings")
          }
          className="flex-1 flex flex-col py-1.5 items-center cursor-pointer  hover:text-red-400 hover:bg-gray-100"
        >
          <span className="text-lg font-semibold">
            {followingsCount ?? 0}
          </span>
          <span className="text-sm text-gray-500">
            팔로잉
          </span>
        </div>
        
      </div>
      <div className="relative flex justify-center mt-4">
        <FollowButton isFollowing={!!isFollowing} onToggle={handleFollowToggle}/>
        {showTooltip && (
          <LoginTooltip 
            onClick={handleLoginRedirect}
            onClose={() => setShowTooltip(false)}
            mainText="로그인이 필요합니다"
            buttonText="로그인"
          />
        )}
      </div>
      <div className="flex border-b border-b-gray-200 mt-4">
        <div className="text-center flex-1 py-4 text-sm font-medium border-t-2 border-red-400 text-red-400">리뷰</div>
      </div>
      <div>
        <UserReview userId={currentId}/>
      </div>
    </div> 
  )
}

export default UserDetailPage