import {profileImage} from '../../data/users.mock'
import { useNavigate } from 'react-router'
import FollowButton from '../user-detail-components/followButton'

const UserCard = ({user, isFollowing, toggleFollow}) => {
    const navigate = useNavigate()

    return (
        <div 
            className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col h-full' 
            onClick={() => navigate(`/users/${user.id}`)}
        >
            <div className='flex gap-4 p-8 flex-1'>
                <div className='shrink-0'>
                    <img className="rounded-full w-16 h-16 object-cover" src={profileImage}/>
                </div>
                <div className='flex justify-between flex-1 min-w-0'>
                    <div className='flex flex-col gap-1 flex-1 min-w-0 pr-4'>
                        <span className='px-2 inline-block border-red-400 rounded-full border text-xs text-red-400 w-fit'>{user.tag}</span>
                        <span className='font-semibold text-gray-900'>{user.name}</span>
                        <span className=' text-sm text-gray-700 flex-1'>{user.comment}</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <span className='text-xs text-gray-600'>팔로워</span>
                        <span className='text-xs font-semibold '>{user.followers}</span>
                        <FollowButton isFollowing={isFollowing} onToggle={() => toggleFollow(user.id)} />
                    </div>
                

                </div>
            </div>

                <div className='flex border-t border-gray-100 items-stretch'> 
                    <div 
                        className='flex-1 flex items-center justify-center gap-2 py-4 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer'
                        onClick={(e) => { 
                            e.stopPropagation();
                            navigate(`/users/${user.id}?tab=visited`)
                        }}
                    >
                        <span className='text-gray-400'>방문 맛집</span> 
                        <span className='font-bold'>{user.visited_count}개</span>
                    </div>
                    
                    {/* 세로 구분선 */}
                    <div className='w-px bg-gray-100'></div>

                    <div 
                        className='flex-1 flex items-center justify-center gap-2 py-4 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer'
                        onClick={(e) => { 
                            e.stopPropagation()
                            navigate(`/users/${user.id}?tab=reviews`)
                        }}
                    >
                        <span className='text-gray-400'>리뷰</span> 
                        <span className='font-bold'>{user.reviews}개</span>
                    </div>
                </div>
        </div>
    )
}

export default UserCard