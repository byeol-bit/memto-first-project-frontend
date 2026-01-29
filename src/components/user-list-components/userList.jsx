import UserCard from './userCard'

const UserList = ({users}) => {
    return(
        users.length ?
            <div>
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
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