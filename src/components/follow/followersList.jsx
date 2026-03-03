import FollowUserCard from "./followUserCard"
import { useInfiniteFollowerUsers } from "../../hooks/queries/use-users-data"
import Loading from "../loading"
import InfiniteScrollTrigger from "../common/infiniteScrollTrigger"
import { useMemo } from "react"

const FollowersList = ({userId}) => {
    // const {data: followers, isLoading, error} = useFollowerUsers(userId)
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} 
        = useInfiniteFollowerUsers({userId, limit: 10})
    const followers = useMemo(() => {
            if(!data?.pages) return []
            return data.pages.flatMap((page) => {
                if(Array.isArray(page)) return page
                if(page?.data) return page.data
                return []
            })
        }, [data])
                
    if(isLoading) {
        return <Loading />
    }

    if(!followers?.length){
        return <div className="flex justify-center items-center pt-10">팔로워가 없습니다.</div>
    }
    
    return (
        <div>
            {followers.map((user) => {
                return (
                    <>
                        <FollowUserCard 
                            key = {user.id}
                            user={user}
                            // 유저의 상태에 따라 출력되도록 수정하기 (팔로우 / 팔로잉)
                            // isFollowing={user.follow} 
                        />
                        <InfiniteScrollTrigger
                            onIntersect={fetchNextPage}
                            hasNextPage={hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </>
                )
            })}
        </div>
    )
}

export default FollowersList