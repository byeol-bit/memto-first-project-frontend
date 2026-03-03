const FollowButton = ({isFollowing, onToggle, size='sm'}) => {
    const sizeStyle = {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-5 py-2 text-sm'
    }

    return (
        <div 
            className ={`
                ${sizeStyle[size]}
                min-w-13.5
                border border-gray-100 shadow-sm font-semibold rounded-2xl select-none text-center
                ${isFollowing
                    ? 'text-white bg-red-400 hover:bg-red-300'
                    : 'text-red-400 bg-white hover:bg-gray-100'
                }
            `}
            onClick={(e) => {
                e.stopPropagation()
                onToggle(e)
            }}
        >
            {isFollowing ? '팔로잉' : '팔로우'} 
        </div>
    )

}

export default FollowButton