import { useParams } from "react-router"

import UserProfile from "../components/user-detail-components/userProfile"
import UserReview from "../components/user-detail-components/userReview"

import { useContext } from "react"
import { DetailStateContext } from "../components/layout/map-layout"
import { useUserDetail } from "../hooks/useUserDetail"



const UserDetailPage = () => {
  const context = useContext(DetailStateContext)
  const {id} = useParams()

  let currentId

  if(context?.selectedUser?.id){
    currentId = parseInt(context.selectedUser.id)
  } else {
    currentId = parseInt(id)
  }
  
  const { data: user, isLoading, error} = useUserDetail(currentId)
  
  if(isLoading) return <div>유저 정보를 불러오고 있습니다.</div>
  if(error) return <div>유저 정보를 불러오는데 실패했습니다.</div>

  return (
    <div>
      <UserProfile user={user} />
      <UserReview />
    </div>
  )
}

export default UserDetailPage