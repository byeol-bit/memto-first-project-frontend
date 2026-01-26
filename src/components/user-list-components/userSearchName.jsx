
const UserSearchName = ({keyword, setKeyword}) => {
    
    return (
        <div className='relative m-4'>
            <input 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="찾고싶은 고수 이름을 입력해주세요.">
            </input>
        </div>
    )
}

export default UserSearchName