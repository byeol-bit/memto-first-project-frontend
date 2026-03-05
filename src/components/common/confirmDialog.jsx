import React from "react";
import { createPortal } from "react-dom";

const ConfirmDialog = ({
  open,
  title = "알림",
  message,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  danger = false,
}) => {
  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onCancel}
        aria-hidden
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
          {message && (
            <p className="text-sm text-gray-600 whitespace-pre-line mb-5">
              {message}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm text-white ${
                danger ? "bg-red-500" : "bg-black"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ConfirmDialog;

