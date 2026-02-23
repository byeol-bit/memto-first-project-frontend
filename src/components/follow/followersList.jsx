import FollowUserCard from "./followUserCard"
import { useFollowerUsers } from "../../hooks/queries/use-users-data"
import Loading from "../loading"

const FollowersList = ({userId}) => {
    const {data: followers, isLoading, error} = useFollowerUsers(userId)
    
    if(isLoading) {
        return <Loading />
    }

    if(!followers?.length){
        return <div className="flex justify-center items-center min-h-screen overflow-hidden">팔로워가 없습니다.</div>
    }
    
    return (
        <div>
            {followers.map((user) => {
                return (
                    <FollowUserCard 
                        key = {user.id}
                        user={user}
                        // 유저의 상태에 따라 출력되도록 수정하기 (팔로우 / 팔로잉)
                        isFollowing={user.follow}
                        toggleFollow={() => alert('팔로우')}    
                    />
                )
            })}
            <>팔로워 리스트 {userId}</>
        </div>
    )
}

export default FollowersList