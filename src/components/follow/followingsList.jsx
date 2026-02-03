import { useNavigate, useParams } from "react-router"

const FollowingsList = ({userId}) => {
    const navigate = useNavigate()

    return (
        <div>
            <div onClick={() => naviagate(`/users`)}></div>

            팔로잉 리스트 {userId}
        </div>
    )
}

export default FollowingsList