import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageViewerModal = ({
  open,
  onClose,
  images = [],
  currentIndex = 0,
  onIndexChange,
  onGoToReviews,
}) => {
  const goPrev = () => {
    if (images.length <= 1) return;
    onIndexChange?.(currentIndex <= 0 ? images.length - 1 : currentIndex - 1);
  };

  const goNext = () => {
    if (images.length <= 1) return;
    onIndexChange?.(currentIndex >= images.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") {
        if (images.length <= 1) return;
        onIndexChange?.(
          currentIndex <= 0 ? images.length - 1 : currentIndex - 1,
        );
      }
      if (e.key === "ArrowRight") {
        if (images.length <= 1) return;
        onIndexChange?.(
          currentIndex >= images.length - 1 ? 0 : currentIndex + 1,
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, currentIndex, images.length, onClose, onIndexChange]);

  if (!open) return null;

  const safeIndex =
    currentIndex < 0
      ? 0
      : currentIndex >= images.length
        ? images.length - 1
        : currentIndex;
  const currentSrc = images[safeIndex];

  const content = (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 보기"
    >
      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        aria-label="닫기"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 중앙 이미지 + 좌우 화살표 */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-12 py-4">
        {images.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        <div className="flex flex-col items-center justify-center max-w-full max-h-full gap-3">
          {currentSrc ? (
            <img
              src={currentSrc}
              alt="맛집 사진"
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              draggable={false}
            />
          ) : (
            <span className="text-white/80">이미지를 불러올 수 없습니다.</span>
          )}
          <button
            type="button"
            onClick={() => {
              onClose?.();
              onGoToReviews?.();
            }}
            className="text-white/90 text-sm font-medium hover:text-white underline underline-offset-2"
          >
            리뷰에서 보기 👉
          </button>
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default ImageViewerModal;
