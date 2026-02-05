
const UserFilter = ({keyword, setKeyword, tag, setTag, tags}) => {
    
    const toggleTag = (tagId) => {
        setTag((prev) => {
            return prev.includes(tagId)
            ? prev.filter((t) => t !== tagId)
            : [...prev, tagId]
        })
    }

    console.log(tags)
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
            
            {/* 태그 */}
            <div className='flex flex-row gap-2 my-2'>
                <div 
                    onClick={() => setTag([])}
                    className={`w-25 text-center x-4 py-2 rounded-full text-sm font-medium cursor-pointer border transition-all duration-200
                        ${
                            tag.length > 0
                                ? 'bg-white text-red-400 border border-red-400 hover:bg-gray-100'    
                                : 'bg-red-400 text-white border-red-400'
                                
                        }`}
                >
                    {tag.length > 0 ? '선택 해제' : '전체'}   
                </div>

                {tags.map(t => {
                    const isSelected = tag.includes(t.name)

                    return(
                        <div
                            key={t.id}
                            onClick={() => toggleTag(t.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer border transition-all duration-200
                              ${
                                isSelected
                                    ? 'bg-red-400 text-white border-red-400 hover:bg-red-100'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }
                `}
                        >
                            {t.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserFilter