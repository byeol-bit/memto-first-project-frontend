import {profileImage} from '../../data/users.mock'


const UserProfile = ({user}) => {
    console.log(user)
    return(
        <div className='flex flex-col items-center texet-center px-4 pt-4'>
            {/* 유저 정보 */}
            <div className='flex gap-8 rounded-full p-0.75 bg-linear-to-br from-red-400 via-blue-300 to-pink-300 shadow-md'>
            {/* 유저 이미지 */}
                <img className='rounded-full w-20 h-20 object-cover' src={profileImage}/>
            </div>

            {/* 이름 + 태그 */}
            <div className='flex items-center gap-2 mt-3'>
                <span className='font-semibold text-gray-900'>{user.nickname}</span>
                <span className='px-2 border border-red-400 rounded-full text-xs text-red-400'>{user.category}</span>
            </div>
            {/* 소개글 */}
            <div className='mt-3 text-sm text-gray-600 line-clamp-3'>
                {user.introduction}
            </div>

        </div>
        
)
}

export default UserProfile