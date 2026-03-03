import { useInfiniteUserReviews } from "../../hooks/queries/use-reviews-data"
import InfiniteScrollTrigger from "../common/infiniteScrollTrigger"
import Loading from "../loading"
import UserReviewCard from "./userReviewCard"
import { useMemo } from "react"
const UserReview = ({userId}) => {
    // const 
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError} = useInfiniteUserReviews(userId);
    
    const reviews = useMemo(() => {
        if (!data?.pages.length) return [];
        return data.pages.flatMap((page) => page?.list ?? []).filter(Boolean)
    }, [data]);
    
    if(isLoading) return <Loading />
    if(isError) return <div>리뷰 목록을 불러오는데 실패했습니다.</div>

    return(

        <div className="p-2">
            {reviews?.length > 0?( 
                <>
                    {reviews.map((review) => (
                        <UserReviewCard key={review.id} review={review} />
                    ))}

                    <InfiniteScrollTrigger 
                        onIntersect={fetchNextPage} 
                        hasNextPage={hasNextPage ?? false} 
                        isFetchingNextPage={isFetchingNextPage ?? false} 
                    />
                </>
            ):(
                <div className="flex justify-center py-8">작성된 리뷰가 없습니다.</div>
            )}
        </div>
    )
}

export default UserReview