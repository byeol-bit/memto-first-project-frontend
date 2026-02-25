
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { DetailStateContext } from '../layout/map-layout'

const UserCard = ({user}) => {
    console.log(user)
    const navigate = useNavigate()
    const context = useContext(DetailStateContext)

    const onUserDetailClick = (selectedUser) => {
        if(context?.setSelectedUser) {
            context.setSelectedUser(selectedUser)
            context.setUserDetailView("detail")
        } else {
            navigate(`/users/${user.id}`)
        }
    }

    return (
       <div 
            className='bg-white rounded-2xl shadow-sm hover:shadow-md transition px-6 py-4 cursor-pointer fle flex-col gap-4 hover:-translate-y-1' 
            onClick={() => onUserDetailClick(user)}
        >
            <div className='flex items-center gap-4'>
                <img 
                    className="rounded-full w-12 h-12 object-cover shrink-0" 
                    alt={user.nickname}
                    src={user.profile_image}/>

                <div className='flex flex-col gap-1 min-w-0'>
                    <div className='flex items-cetner gap-2'>
                        <span className='font-semibold text-gray-900 truncate'>{user.nickname}</span>
                        <span className='px-2 py-0.5 border border-red-400 rounded-full text-xs text-red-400 w-fit'>{user.category}</span>
                    </div>

                    <div className='text-xs text-gray-400'>
                        리뷰 <b className='text-red-400'>{user.reviews}</b>
                    </div>
                </div>
            </div>
            <div className='pt-3 text-sm text-gray-500 leading-relaxed truncate'>
                {user.introduction}
            </div>
        </div>
    )
}

export default UserCard