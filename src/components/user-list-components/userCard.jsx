import {profileImage} from '../../data/users.mock'
import { useNavigate } from 'react-router'

const UserCard = ({user}) => {
    const navigate = useNavigate()

    return (
        <div 
            className='rounded-2xl shadow-xl hover:cursor-pointer hover: flex flex-col gap-2 hover:border-l-amber-100 border' 
            onClick={() => navigate(`/users/${user.id}`)}
        >
            <div className="flex flex-row p-8">
                <div>
                    <img className="rounded-full size-16" src={profileImage}/>
                </div>
                <div>
                    <div>
                        <span>{user.name}</span>
                        <span>{user.tag}</span>
                    </div>
                    <div>
                        {/* 해당 글자를 클릭하면 user-detail페이지로 이동했을 때 해당 항목 보여주도록 수정 */}
                        <span>방문맛집 {user.visited_count}</span>
                        <span>리뷰 {user.reviews}</span>    
                        <span>팔로워 {user.followers}</span>
                    </div>
                </div>
            </div>
            <div>{user.comment}</div>
            
            <div 
                className="text-center py-5 rounded-b-2xl border-amber-900 border"
                onClick={(e) => {
                    e.stopPropagation()
                    console.log('버튼 클릭')
                }}
            >
                팔로우
            </div>
        </div>
    )
}

export default UserCard