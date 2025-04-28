import { X } from 'lucide-react';
import React from 'react'
const QuestionModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in mx-auto">
    <div className="relative bg-white w-full h-[90%] md:w-[75%] md:h-[75%] overflow-auto p-6 animate-slide-up mx-auto rounded-xl">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
      >
        <X size={32} />
      </button>

      {/* Modal Content */}
      <div className="mt-12">
        {children}
      </div>
    </div>
  </div>
  )
}

export default QuestionModal
