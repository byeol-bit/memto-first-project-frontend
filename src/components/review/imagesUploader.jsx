import { useState, useRef } from "react";

function ImagesUploader({ onImagesChange }) {
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    onImagesChange(fileArray);
  };

  const removeImage = (index) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        📸 맛있는 순간 인증샷
      </h3>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current.click()}
        className={`flex-1 min-h-[350px] bg-gray-50 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer
          ${isDragging ? "border-red-400 bg-red-50" : "border-gray-200 hover:bg-gray-100"}`}
      >
        {/* 플러스 아이콘 */}
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>

        <span className="text-sm font-medium text-gray-600">
          사진 업로드 (필수 1장)
        </span>
        <span className="text-xs text-gray-400 mt-2 text-center">
          고수님의 인증샷을 올려주세요!
          <br />
          사진을 이곳으로 끌어다 놓거나 클릭해서 업로드하세요!
        </span>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* 미리보기 영역 */}
      {previews.length > 0 && (
        <div className="flex gap-3 overflow-x-auto py-4 mt-2">
          {previews.map((url, index) => (
            <div
              key={url}
              className="relative flex-shrink-0 w-20 h-20 shadow-sm"
            >
              <img
                src={url}
                className="w-full h-full object-cover rounded-xl border border-gray-100"
                alt="preview"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute -top-2 -right-2 bg-red-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImagesUploader;
