import profileImage from '../../assets/PPURY.png'

import { useNavigate } from 'react-router'

const UserCard = ({user}) => {
    const navigate = useNavigate()


    return (
        <div className='border-b-black border' onClick={() => navigate(`/users/${user.id}`)}>
            <div className="flex flex-row">
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
            <button onClick={(e) => {
                e.stopPropagation()
                console.log('버튼 클릭')
            }}>팔로우</button>
        </div>
    )
}

export default UserCard