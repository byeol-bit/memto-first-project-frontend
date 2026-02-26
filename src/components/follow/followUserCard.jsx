import {profileImage} from '../../data/users.mock'
import FollowButton from "./followButton"
import { useToggleFollow } from "../../hooks/mutations/use-create-user-mutation"
import { useState, useContext, useRef } from "react"
import { DetailStateContext } from "../layout/map-layout"
import { useLoginState } from '../loginstate'
import LoginTooltip from '../loginTooltip'

const FollowUserCard = ({user, isFollowing}) => {
    const context = useContext(DetailStateContext)
    const {isLoggedIn, user:isMe} = useLoginState()
    const {mutate: toggleFollow} = useToggleFollow()
    
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState(null)
    const tooltipTimer = useRef(null)


    const handleFollowToggle = (e) => {
    	if (!isLoggedIn) {
      		const rect = e.currentTarget.getBoundingClientRect()
		    setTooltipPosition({
        	top: rect.bottom + 8,
        	left: rect.left + rect.width / 2 
      	})
      
      	setShowTooltip(true)
      	clearTimeout(tooltipTimer.current)
      	tooltipTimer.current = setTimeout(() => {
        	setShowTooltip(false)
      	}, 2000)
      	return
    }
    	toggleFollow({
      		userId: user.id,
      		isFollowing: isFollowing
    })}

    const handleCardClick = (selectedUser) => {
		context.setSelectedUser(selectedUser)
		context.setUserDetailView("detail")
	}

    const handleLoginRedirect = () => {
    	navigate("/sign-in", {
      	state: {
        from: {
          selectedUser: context.selectedUser,
          userDetailView: context.userDetailView
        }
      }
    })
    	return
  	}
	console.log('내가 누구인가!!', isMe, user.id)
    return (
        // 유저 카드 누르면 해당 유저 상세페이지로 
        <div 
            className='flex items-center justify-between max-w-3xl mx-auto px-6 py-4 border-y cursor-pointer border-gray-100 hover:bg-gray-50' 
            onClick={() => handleCardClick(user)}
        >
            <div className='flex items-center gap-4'>
                <img className="rounded-full w-16 h-16 object-cover shrink-0" src={profileImage}/>
                <div className='font-semibold text-gray-900'>
                    {user.nickname}
                </div>
                <div className='px-2 inline-block border-red-400 rounded-full border text-xs text-red-400 w-fit'>
                    {user.category}
                </div>
            </div>
            {user?.id !== isMe?.id && (
              <FollowButton isFollowing={isFollowing} onToggle={handleFollowToggle} />
            )}
          {showTooltip && (
              <LoginTooltip
                  position={tooltipPosition}
                  onClick={handleLoginRedirect}
                  onClose={() => setShowTooltip(false)}
                  mainText='로그인이 필요합니다'
                  buttonText='로그인'
              />
            )}
        </div>
    )
}
export default FollowUserCard