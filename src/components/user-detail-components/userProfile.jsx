import profileImage from '../../assets/PPURY.png'
import { useNavigate } from 'react-router'


const UserProfile = ({user}) => {
    const navigate = useNavigate()
    return(
        <div className="flex justify-center">
            <div className="">
                <img className="rounded-full size-30" src={profileImage}/>
                <div>
                    <div className="bg-amber-300">
                        <p>{user.tag}</p>
                        <p>{user.name}</p>
                        <button 
                            className="bg-amber-900"
                            onClick={(e) => {
                                e.stopPropagation()
                                console.log('버튼 클릭')
                            }
                        }>팔로우</button>
                    </div>
                    <div className="flex flex-row">
                        <div onClick={() => navigate(`/users`)}>
                            <p>팔로잉</p>
                            <p>{user.followings}</p>
                        </div>
                        <div onClick={() => navigate(`/users`)}>
                            <p>팔로워</p> 
                            <p>{user.followers}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
)
}

export default UserProfile