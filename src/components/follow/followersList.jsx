import { useParams } from "react-router"
import FollowUserCard from "./followUserCard"

const FollowersList = ({userId}) => {
    return (
        <div>
            <>팔로워 리스트 {userId}</>
        </div>
    )
}

export default FollowersList