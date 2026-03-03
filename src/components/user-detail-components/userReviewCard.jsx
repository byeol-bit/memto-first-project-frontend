import { useReviewImages } from "../../hooks/queries/use-reviews-data"
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const UserReviewCard = ({review}) => {
    const {data: images= []} = useReviewImages(review.id)

    const hasImages = images.length > 0;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const safeIndex = hasImages
        ? Math.min(Math.max(currentImageIndex, 0), images.length - 1)
        : 0;
    const currentImageSrc = hasImages ? images[safeIndex] : null;

    const goPrevImage = () => {
        if (!hasImages) return;
        setCurrentImageIndex((prev) =>
        prev <= 0 ? images.length - 1 : prev - 1,
        );
    };

    const goNextImage = () => {
        if (!hasImages) return;
        setCurrentImageIndex((prev) =>
        prev >= images.length - 1 ? 0 : prev + 1,
        );
    };
    return(
        <div className="border border-gray-100 rounded-xl my-1 bg-white hover:shadow-sm hover:bg-gray-50">
            <div className="mb-3 px-5 py-2">
                <p className="text-lg font-semibold text-gray-900">{review.restaurant.name}</p>
                <p className="text-sm text-gray-500">{review.restaurant.address}</p>
                <p className="text-sm text-gray-400">{review.restaurant.category}</p>
            </div>

            {images.length > 0 && currentImageSrc && (
          <div className="w-full mb-4 rounded-xl overflow-hidden border border-gray-50 relative">
            <img
              src={currentImageSrc}
              alt="리뷰 사진"
              className="w-full h-56 object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 text-white rounded-full p-1.5 flex items-center justify-center"
                  aria-label="이전 사진"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 text-white rounded-full p-1.5 flex items-center justify-center"
                  aria-label="다음 사진"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full ${
                        idx === safeIndex ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`${idx + 1}번째 사진 보기`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
            <div className="border-t border-gray-100 my-2" />
            <div className="flex flex-col gap-2 px-5 py-2">
                <p className="text-gray-800 leading-relaxed">{review.review}</p>
                <p className="flex justify-end text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default UserReviewCard