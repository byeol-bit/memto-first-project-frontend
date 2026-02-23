const UserReviewCard = ({review}) => {
    console.log(review)
    return(
        <div className="border border-gray-100 rounded-xl p-5 bg-white hover:shadow-sm">
            <div className="mb-3">
                <p className="text-lg font-semibold text-gray-900">{review.restaurant.name}</p>
                <p className="text-sm text-gray-500">{review.restaurant.address}</p>
                <p className="text-sm text-gray-400">{review.restaurant.category}</p>
            </div>
            <div className="border-t border-gray-100 my-3" />
            <div className="flex flex-col gap-2">
                <p className="text-gray-800 leading-relaxed">{review.review}</p>
                <p className="flex justify-end text-xs text-gray-400">{new Date(review.visit_date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default UserReviewCard