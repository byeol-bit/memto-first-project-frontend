import UserCard from './userCard'
import Loading from '../loading'
const UserList = ({users, isLoading}) => {
    if (isLoading) {
        return <Loading />
    }

    if (!users?.length) {
        return <div className="flex justify-center items-center min-h-screen overflow-hidden">검색 결과가 없습니다.</div>
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