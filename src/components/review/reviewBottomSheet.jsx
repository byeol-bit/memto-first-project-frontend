import React, { useState, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import ImagesUploader from "./imagesUploader";

import { useLoginState } from "../loginstate";

import { useCreateReviewMutation } from "../../hooks/mutations/use-create-review-mutation";

const ReviewBottomSheet = ({
  open,
  onClose,
  restaurant,
  onSuccess,
  currentUser,
  restaurantIdForReviews,
}) => {
  const { user: contextUser } = useLoginState();
  const user = currentUser ?? contextUser;
  // 리뷰 작성란
  const [content, setContent] = useState("");
  // 이미지
  const [images, setImages] = useState([]);
  // 툴팁
  const [showTooltip, setShowTooltip] = useState(false);

  // 훅 가져오기
  const { mutate: registerReview, isLoading } = useCreateReviewMutation();

  // 더블 클릭으로 인한 중복 전송 방지용 ref
  const isSubmittingRef = useRef(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (isSubmittingRef.current || isLoading) {
      return;
    }

    if (!content.trim()) {
      alert("뉴비들을 위해 고수님의 팁을 한 마디만 적어주세요! ✍️");
      return;
    }

    if (!images || images.length === 0) {
      alert("리뷰에는 최소 1장 이상의 사진을 등록해 주세요. 📸");
      return;
    }

    if (images.length > 5) {
      alert("사진은 최대 5장까지 등록할 수 있어요.");
      return;
    }

    if (!user?.id) {
      alert("로그인 정보를 불러올 수 없습니다. 다시 로그인해 주세요.");
      return;
    }

    const fallbackId =
      restaurant?.[0]?.id ||
      restaurant?.id ||
      restaurant?.restaurant_id ||
      restaurant?.kakao_place_id;

    const targetId =
      restaurantIdForReviews != null
        ? Number(restaurantIdForReviews)
        : fallbackId != null
          ? Number(fallbackId)
          : null;

    if (!targetId) {
      alert("식당 ID를 찾을 수 없습니다. 데이터를 확인해 주세요!");
      console.log("현재 넘겨받은 restaurant 데이터:", restaurant);
      return;
    }

    const author = user ?? contextUser;
    const reviewData = {
      userId: author?.id ?? null,
      restaurantId: Number(targetId),
      visitDate: new Date().toISOString().slice(0, 10),
      review: content,
      images,
      restaurant: restaurant?.[0] ?? restaurant,
      user: author
        ? {
            id: author.id,
            nickname: author.nickname ?? contextUser?.nickname ?? "알 수 없음",
            profile_image: author.profile_image ?? contextUser?.profile_image,
            category: author.category ?? contextUser?.category,
          }
        : null,
    };

    isSubmittingRef.current = true;

    registerReview(reviewData, {
      onSuccess: () => {
        isSubmittingRef.current = false;
        setContent("");
        setImages([]);
        onSuccess?.();
        onClose();
      },

      onError: (error) => {
        isSubmittingRef.current = false;
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "리뷰 등록에 실패했습니다.";
        console.error("리뷰 등록 실패:", error);
        alert(message);
      },
    });
  };

  const restaurantName = restaurant?.name;

  return createPortal(
    <>
      {/* 배경 */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* 시트 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50  h-[75vh] flex flex-col">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />

        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 px-41">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {restaurantName || "맛집"} 추천
            </h2>
            <p className="text-xm text-gray-500">
              나만의 꿀조합 레시피를 알려주세요 🍯
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 메인 컨텐츠 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 왼쪽 : 텍스트 */}
            <div className="space-y-12">
              <section>
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  💡 고수 TIP
                </h3>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="이 곳을 처음 방문하는 뉴비들에게 고수님의 팁을 전수해 주세요!"
                  className="w-full h-40 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-red-400 transition-all resize-none"
                />
              </section>
            </div>

            {/* 오른쪽 : 사진 인증 */}
            <div className="flex flex-col">
              <ImagesUploader
                onImagesChange={(newFiles) => setImages(newFiles)}
              />
            </div>
          </div>
        </div>

        {/* 등록 */}
        <div className="px-8 py-6 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-5 text-white font-extrabold text-lg rounded-2xl shadow-xl transition-all 
              ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-400 active:scale-[0.98] shadow-orange-100"}`}
            >
              {isLoading ? "꿀조합 전수 중... 🐝" : "리뷰 등록 👍"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ReviewBottomSheet;
