import UserCard from './userCard'

const UserList = ({users}) => {
    return(
        <div>
            <div className="grid grid-cols-3 gap-2">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}

export default UserList