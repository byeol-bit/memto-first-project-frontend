import UserCard from './userCard'

const UserList = ({users}) => {
    return(
        users.length ?
            <div>
                <div className="grid grid-cols-3 gap-2">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} />
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