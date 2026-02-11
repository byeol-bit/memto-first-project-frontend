import { useUserReviews } from "../../hooks/queries/use-reviews-data"
const UserReview = ({userId}) => {
    
    const { data: reviews, isLoading, error} = useUserReviews(userId)

    console.log(reviews)
    
    if(isLoading) return <div>리뷰 목록을 불러오고 있습니다.</div>
    if(error) return <div>리뷰 목록을 불러오는데 실패했습니다.</div>

    return(

        <div>
            {reviews.length > 0?( 
                reviews.map((review) => (
                    <div key={review.id}>{review.review}</div>
                ))
            ):(
                <div>작성된 리뷰가 없습니다.</div>
            )}
        </div>
    )
}

export default UserReview