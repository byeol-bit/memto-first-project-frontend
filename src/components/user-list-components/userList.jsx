import UserCard from './userCard'

const UserList = ({users, followingUsers, toggleFollow}) => {
    return(
        users.length ?
            <div>
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} isFollowing={followingUsers.includes(user.id)} toggleFollow={toggleFollow} />
                    ))}
                </div>
            </div> 
        :
            <div>
                검색 결과가 없습니다.
            </div>
    )
}

export default UserList