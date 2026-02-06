import UserCard from './userCard'

const UserList = ({users, followingUsers, toggleFollow}) => {

    console.log('users:', users)
    if (!users.length) {
        return <div>검색 결과가 없습니다.</div>
    }
    return(
        <div>
            <div className="grid gap-6 grid-cols-1">
                {users &&
                    users.map((user) => (
                        <UserCard key={user.id} user={user} isFollowing={followingUsers.includes(user.id)} toggleFollow={toggleFollow} />
                ))}
            </div>
        </div> 
    )
}

export default UserList