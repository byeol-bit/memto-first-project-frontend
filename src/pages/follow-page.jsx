import { useNavigate, useParams } from "react-router"
import FollowersList from "../components/follow/followersList"
import FollowingsList from "../components/follow/followingsList"
import SelectedTab from "../components/follow/selectedTab"

// react-query..? useEffect..?
const FollowPage = () => {
    const {id, type} = useParams()
    let selectedTab = type === 'followings' ? 'followings' : 'followers'
    // const [followings, setFollowings] = useState([])
    // const [followers, setFollowers] = useState([])

    // useEffect(() => {

    // })

    const navigate = useNavigate()


    return (

        <div>
            {/* 상단 선택 탭바 */}
            <div className='flex border-t border-gray-100 items-stretch'> 

                <SelectedTab 
                    tabs={[
                        { label: '팔로워', value: 'followers'},
                        { label: '팔로잉', value: 'followings'}
                    ]}
                    active={selectedTab}
                    onChange={(tab) => navigate(`/users/${id}/${tab}`)}
                />
            </div>   

            <div className='max-w-7xl mx-auto px-6'>
    
            {/* 선택된 탭에 따라 다른 컴포넌트 출력 */}
                {type === 'followers' && <FollowersList userId={id}/>}
                {type === 'followings' && <FollowingsList userId={id} />}
            </div>
        </div>
    )
}

export default FollowPage