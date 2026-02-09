
import { useNavigate } from 'react-router'
import FollowButton from '../user-detail-components/followButton'
import { useContext } from 'react'
import { DetailStateContext } from '../layout/map-layout'

const UserCard = ({user, isFollowing, toggleFollow}) => {
    const navigate = useNavigate()
    const context = useContext(DetailStateContext)

    const onUserDetailClick = () => {
        context.setSelectedUser(user)
    }

    return (
       <div 
            className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-row h-full hover:-translate-y-2' 
            onClick={() => {
                if (context?.setSelectedUser){
                    onUserDetailClick()
                // 없을 때
                } else {
                    navigate(`/users/${user.id}`)
                }
            }}
        >
            <div className='flex gap-4 p-8 flex-1'>
                <div className='shrink-0'>
                    <img className="rounded-full w-16 h-16 object-cover" src={user.profile_image}/>
                </div>
                <div className='flex justify-between flex-1 min-w-0'>
                    <div className='flex flex-col gap-1 flex-1 min-w-0 pr-4'>
                        <span className='px-2 inline-block border-red-400 rounded-full border text-xs text-red-400 w-fit'>{user.category}</span>
                        <span className='font-semibold text-gray-900'>{user.nickname}</span>
                    </div>
    
                </div>

            </div>
                            {/* 세로 구분선 */}
                <div className='w-px bg-gray-100'></div>
                <div 
                    className='flex-1 flex items-center justify-center gap-2 py-4 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer'
                >
                    <div className='text-gray-400'>리뷰</div> 
                    <div className='font-bold'>{user.reviews}개</div>

                </div>
        </div>
    )
}

export default UserCard