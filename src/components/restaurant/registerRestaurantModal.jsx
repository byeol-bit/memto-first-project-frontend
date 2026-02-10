import React, { useState } from "react";
import ImagesUploader from "../review/imagesUploader";
import KakaoSearchSection from "./kakaoSearch";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import Button from "../common/button";
import { X } from "lucide-react";

const RegisterRestaurantModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1); // 1: 검색, 2: 작성
  const [selectedPlace, setSelectedPlace] = useState(null); // 카카오에서 선택된 장소

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const { loading, error } = useKakaoLoader(); // ✅ 카카오 SDK 로드

  if (!open) return null;
  if (loading) return <div>카카오맵 로딩 중입니다...</div>;
  if (error) return <div>카카오맵을 불러오는 중 오류가 발생했습니다.</div>;

  if (!open) return null;

  // Step 1에서 장소 선택 시 실행
  const handleSelectPlace = (place) => {
    const isAlreadyRegistered = false;

    if (isAlreadyRegistered) {
      alert("이미 고수들이 찾은 맛집입니다! 리뷰 페이지로 이동합니다.");
      // 상세 페이지로 이동 로직
      return;
    }

    setSelectedPlace(place);
    setStep(2); // 다음 단계로 이동
  };

  const handleSubmit = async () => {
    // 트랜잭션 처리 로직 (가게 정보 + 리뷰)
    const finalData = {
      restaurant: {
        name: selectedPlace.place_name,
        address: selectedPlace.address_name,
        kakaoId: selectedPlace.id,
      },
      firstReview: {
        content,
        // images
      },
    };

    console.log("등록 데이터:", finalData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-18">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* 헤더 */}
        <div className="p-6 border-b flex justify-between items-center border-gray-100">
          <div>
            <span className="text-red-500 font-bold text-sm tracking-widest uppercase">
              Step {step} / 2
            </span>
            <h2 className="text-2xl font-black text-gray-900">
              {step === 1 ? "🚩 새로운 맛집 등록" : "✨ 첫 리뷰 작성"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 mt-0.5" />
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto p-8">
          {step === 1 ? (
            /* Step 1: 카카오맵 검색 섹션 */
            <KakaoSearchSection onSelect={handleSelectPlace} />
          ) : (
            /* Step 2: 정보 확인 + 리뷰 작성  */
            <div className="space-y-10">
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-red-400">
                    {selectedPlace?.place_name}
                  </h3>
                  <p className="text-gray-600">{selectedPlace?.address_name}</p>
                </div>
                <Button
                  onClick={() => setStep(1)}
                  className="text-sm text-orange-600"
                >
                  장소 변경
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">
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
            </div>
          )}
        </div>

        {step === 2 && (
          <div className="p-6 border-t border-gray-100">
            <button
              onClick={handleSubmit}
              className="w-full py-5 bg-red-400 text-white font-black text-xl rounded-2xl hover:bg-red-500 transition-all shadow-lg"
            >
              🚩 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterRestaurantModal;
