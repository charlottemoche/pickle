import React, { lazy, Suspense } from "react";

const ModalContent = lazy(() => import("./ModalContent"));

function Modal({ sender, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full relative max-w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <Suspense fallback={<div>Loading...</div>}>
          <ModalContent sender={sender} />
        </Suspense>
      </div>
    </div>
  );
}

export default Modal;
