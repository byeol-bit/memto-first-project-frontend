import FollowUserCard from "./followUserCard"

import { followers } from "../../data/users.mock"

const FollowersList = ({userId}) => {
    // const [users, setUsers] = useState([])
    // 유저리스트 불러오기
    // useEffect() => {

    // }

    // 팔로우 버튼 눌렀을 때 (상태가 팔로잉이면? 언팔로우 / 팔로잉중이지 않으면? 팔로우) 상태변경! 리스트는 유지
    // const toggleFollow = 

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
            <>팔로워 리스트 {userId}</>
        </div>
    )
}

export default FollowersList