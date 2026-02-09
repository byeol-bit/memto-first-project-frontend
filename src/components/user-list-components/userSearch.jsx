
const UserSearch = ({keyword, setKeyword}) => {
    
    return (
        <div>
            {/* 검색창 */}
           
            <div className='relative max-w-160 h-12 rounded-full border-2 border-gray-300 transition-all duration-200 focus-within:border-red-400'>
                <input
                    className='w-full h-full pl-6 pr-12 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="찾고싶은 고수 이름을 입력해주세요.">
                </input>
                <span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition hover:text-red-400'>🔍</span>
            </div>
            
        </div>
    )
}

export default UserSearch