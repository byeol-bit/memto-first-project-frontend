import {profileImage} from '../../data/users.mock'
import { useNavigate } from 'react-router'


const UserProfile = ({user, isFollowing=false}) => {
    const navigate = useNavigate()
    return(
        <div className='max-w-7xl mx-auto px-10 py-10'>
            {/* 유저 정보 */}
            <div className='flex gap-8'>
                {/* 유저 이미지 */}
                <img className='rounded-full w-30 h-30 object-cover' src={profileImage}/>
                {/* 기타 정보 */}
                <div className='flex-1'>
                    {/* 이름 + 태그 */}
                    <div className='flex items-center gap-2'>
                        <span className='font-semibold text-gray-900'>{user.name}</span>
                        <span className='px-2 border border-red-400 rounded-full text-xs text-red-400'>{user.tag}</span>
                    </div>
                    {/* 최다 방문 / 평균 별점 등 기타 수치가 들어가는 정보 */}
                    <div className='flex gap-6 mt-2 text-sm'>
                        <div className='flex gap-1 items-center'>
                            <span className='text-gray-400 text-xs'>최다 방문 맛집</span>
                            <span className='text-red-400 font-semibold'>{user.most_visited}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <span className='text-gray-400 text-xs'>평균 별점</span>
                            <span className='text-red-400 font-semibold'>{user.stars}</span>
                        </div>
                    </div>
                    {/* 소개글 */}
                    <div className='mt-3 text-sm text-gray-600 max-w-2xl'>
                        {user.comment}
                    </div>
                </div>
                <div className='flex flex-row'>
                    
                    <div onClick={() => navigate(`/users/${user.id}/followings`)}>
                        <p>팔로잉</p>
                        <p>{user.followings}</p>
                    </div>
                    <div onClick={() => navigate(`/users/${user.id}/followers`)}>
                        <p>팔로워</p> 
                        <p>{user.followers}</p>
                    </div>
                    {/* <FollowButton size='md' isFollowing={isFollowing} onToggle={() => toggleFollow(user.id)} /> */}
                </div>

                  <div className="grid grid-cols-4 text-center">

            </div>


            </div>
           
        </div>
        
)
}

export default UserProfile