  
const UserTag = ({tag, setTag, tags}) => {
     const toggleTag = (tagId) => {
        setTag((prev) => {
            return prev.includes(tagId)
            ? prev.filter((t) => t !== tagId)
            : [...prev, tagId]
        })
    }

    return(
        <div className='grid grid-cols-3'>
            <div 
          		onClick={() => setTag([])}
				className={`w-25 text-center x-4 py-2 rounded-full text-xs font-medium cursor-pointer border transition-all duration-200
             		${
                  		tag.length > 0
                      	? 'bg-white text-red-400 border border-red-400 hover:bg-gray-100'    
                      	: 'bg-red-400 text-white border-red-400'
                }`}
      		>
          	{tag.length > 0 ? '선택 해제' : '전체'}   
      	</div>

      	{tags?.map(t => {
          	const isSelected = tag.includes(t.name)

			return(
				<div
					key={t.id}
					onClick={() => toggleTag(t.name)}
					className={`px-3 py-2 rounded-full text-xs font-medium cursor-pointer border transition-all duration-200 whitespace-normal leading-snug max-w-full
						${
							isSelected
							? 'bg-red-400 text-white border-red-400 hover:bg-red-100'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
					}`}
              	>
                  	{t.name}
              	</div>
          	)
      	})}
  	</div>
)}

export default UserTag