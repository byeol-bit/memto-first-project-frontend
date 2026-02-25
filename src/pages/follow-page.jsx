import FollowersList from "../components/follow/followersList"
import FollowingsList from "../components/follow/followingsList"
import TabButton from "../components/tabButton"
import { useContext } from "react"
import { DetailStateContext } from "../components/layout/map-layout"

const FollowPage = () => {
    const {selectedUser, userDetailView, setUserDetailView} = useContext(DetailStateContext)
    if(!selectedUser) return null

    const userId = selectedUser.id

    return (

        <div>
            <div className="flex items-center bg-gray-50 px-4 py-3">
                <button
                    onClick={() => setUserDetailView("detail")}
                    className="text-xl font-medium text-gray-400 hover:text-black"
                >
                    ←
                </button>
            </div>
            <div className="pt-4 flex">
                <TabButton
                    label="팔로워"
                    active={userDetailView === "followers"}
                    onClick={() => setUserDetailView("followers")}
                />
                <TabButton
                    label="팔로잉"
                    active={userDetailView === "followings"}
                    onClick={() => setUserDetailView("followings")}
                />
            </div>
            <div>
                {userDetailView === "followers" && (<FollowersList userId={userId} />)}
                {userDetailView === "followings" && (<FollowingsList userId={userId} />)}
            </div>
        </div>
    )
}

export default FollowPage