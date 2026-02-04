import { followers } from "../../data/users.mock"
import FollowUserCard from "./followUserCard"

// 팔로잉이랑 팔로워랑 다른 데이터 사용하기 때문에 각각의 리스트 창에서 데이터 패칭
const FollowingsList = ({userId}) => {

    

    return (
        <div>
            {followers.map((user) => {
                return (
                    <FollowUserCard 
                        key = {user.id}
                        user={user}
                        // 유저의 상태에 따라 출력되도록 수정하기 (팔로우 / 팔로잉)
                        type={'팔로우'}
                        toggleFollow={() => alert('팔로우')}    
                    />
                )
            })}
        
        </div>
    )
}

export default FollowingsList