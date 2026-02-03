
const FollowUserCard = () => {
    return (
        <div>
            {/* 유저 카드 누르면 해당 유저 정보 페이지로 이동 */}
           <div onClick={() => naviagate(`/users`)}></div>

        </div>
    )
}
export default FollowUserCard