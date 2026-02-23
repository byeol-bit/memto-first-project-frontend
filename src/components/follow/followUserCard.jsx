import { useNavigate } from "react-router"
import {profileImage} from '../../data/users.mock'
import FollowButton from "../user-detail-components/followButton"
import { useFollow, useUnfollow } from "../../hooks/mutations/use-create-user-mutation"

const FollowUserCard = ({user, isFollowing, toggleFollow}) => {
    const followMutation = useFollow(user.id)
    const unfollowMutation = useUnfollow(user.id)
      
    const handleFollowToggle = () => {
        if(isFollowing) {
            unfollowMutation.mutate()
        } else {
            followMutation.mutate()
        }
    }

    const navigate = useNavigate()
    return (
        // 유저 카드 누르면 해당 유저 상세페이지로 
        <div 
            className='flex items-center justify-between max-w-3xl mx-auto px-6 py-4 border-y cursor-pointer border-gray-100 hover:bg-gray-50' 
            onClick={() => navigate(`/users`)}
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
            <FollowButton isFollowing={isFollowing} onToggle={handleFollowToggle} />

        </div>
    )
}
export default FollowUserCard