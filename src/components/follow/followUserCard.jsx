import FollowButton from "./followButton"
import { useToggleFollow } from "../../hooks/mutations/use-create-user-mutation"
import { useContext } from "react"
import { DetailStateContext } from "../layout/map-layout"
import { useLoginState } from '../loginstate'
import { useNavigate } from 'react-router'
import { userImg } from '../../api/user.api'
import { useCountFollower } from '../../hooks/queries/use-users-data'

const FollowUserCard = ({user, isFollowing}) => {
    const context = useContext(DetailStateContext)
    const navigate = useNavigate()
    const {isLoggedIn, user:isMe} = useLoginState()
    const {mutate: toggleFollow} = useToggleFollow()
    const {data: followerCount} = useCountFollower(user.id)
    // const {data: }

    const handleFollowToggle = (e) => {
    	if (!isLoggedIn) {
            alert("로그인이 필요합니다.")
            navigate('/sign-in')
            return;
      	}
      
    	toggleFollow({
      		userId: user.id,
      		isFollowing: isFollowing
    })}

    const handleCardClick = (selectedUser) => {
		context.setSelectedUser(selectedUser)
		context.setUserDetailView("detail")
	}
    console.log(user, userImg(user.id), userImg)
    return (
        // 유저 카드 누르면 해당 유저 상세페이지로 
        <div 
            className='flex items-center justify-between max-w-3xl mx-auto px-6 py-4 border-y cursor-pointer border-gray-100 hover:bg-gray-50' 
            onClick={() => handleCardClick(user)}
        >
            <div>
                <div className='flex items-center gap-4'>
                    <img className="rounded-full w-16 h-16 object-cover shrink-0 shadow-md" src={userImg(user.id)}/>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                                {user.nickname}
                            </span>

                            <span className='px-2 border border-red-400 rounded-full text-xs text-red-400 w-fit'>
                                {user.category}
                            </span>
                        </div>
                        <div className='flex items-center gap-4 mt-1 text-sm text-gray-400'>
                            <span>
                                리뷰 <span className="font-medium">{user.visitCount? user.visitCount : 0}</span>
                            </span>
                            <span>
                                팔로워 <span classname="font-medium">{followerCount}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {user?.id !== isMe?.id && (
              <FollowButton isFollowing={isFollowing} onToggle={handleFollowToggle} />
            )}
        </div>
    )
}
export default FollowUserCard