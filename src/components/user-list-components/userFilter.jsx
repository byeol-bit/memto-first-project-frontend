
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
            <div className='flex flex-row rounded-3xl max-w-160 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-red-400'>
                <div className='h-12 px-10 '>
                    <input
                        className='py-1.5 px-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="찾고싶은 고수 이름을 입력해주세요.">
                    </input>
                </div>
                
                <div className='bg-red-400 justify-self-end'>
                    🔍
                </div>
            </div>
            {/* 태그 */}
            <div>
                <div 
                    onClick={() => setTag([])}
                    className='rounded-full border'
                >
                    ALL   
                </div>

                {tags.map(t => {

                    return(
                        <div
                            key={t.id}
                            onClick={() => toggleTag(t.name)}
                            className='rounded-full border'
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