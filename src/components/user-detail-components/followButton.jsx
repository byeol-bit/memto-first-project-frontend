const FollowButton = ({isFollowing, onToggle, size='sm'}) => {
    const sizeStyle = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-5 py-2 text-sm'
    }

    return (
        <div 
            className ={`
                ${sizeStyle[size]}
                border border-gray-100 shadow-sm font-semibold rounded-lg select-none
                ${isFollowing
                    ? 'text-gray-100 bg-red-400 hover:bg-red-300'
                    : 'text-red-400 bg-white hover:bg-gray-100'
                }
            `}
            onClick={(e) => {
                e.stopPropagation()
                onToggle()
            }}
        >
            {isFollowing ? '팔로잉' : '팔로우'} 
        </div>
    )

}

export default FollowButton