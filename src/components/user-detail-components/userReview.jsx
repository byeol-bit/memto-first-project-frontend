import { useUserReviews } from "../../hooks/queries/use-reviews-data"
import Loading from "../loading"
import UserReviewCard from "./userReviewCard"
const UserReview = ({userId}) => {
    
    const { data: reviews, isLoading, error} = useUserReviews(userId)

    console.log(reviews)
    
    if(isLoading) return <Loading />
    if(error) return <div>리뷰 목록을 불러오는데 실패했습니다.</div>

    return(

        <div className="p-2">
            {reviews?.length > 0?( 
                reviews.map((review) => (
                    <UserReviewCard key={review.id} review={review} />
                ))
            ):(
                <div className="flex justify-center py-8">작성된 리뷰가 없습니다.</div>
            )}
        </div>
    )
}

export default UserReview