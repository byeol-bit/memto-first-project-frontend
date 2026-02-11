import UserCard from './userCard'

const UserList = ({users}) => {
    
    if (!users?.length) {
        return <div>검색 결과가 없습니다.</div>
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