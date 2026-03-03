import UserCard from './userCard'
import Loading from '../loading'
const UserList = ({users, isLoading, type="all"}) => {
    if (isLoading) {
        return <Loading />
    }

    // if (type==="followings" && !users?)
    if (!users?.length) {
        if(type==="following"){
            return <div className="flex justify-center items-center py-10">관심 고수 목록이 없습니다.</div>
        } else{
            return <div className="flex justify-center items-center py-10">검색 결과가 없습니다.</div>
        }
    }
    return(
        <div>
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div> 
    )
}

export default UserList