import { X } from 'lucide-react';
const QuestionModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in mx-auto ">
    <div className={`relative bg-white w-full h-[90%] md:w-[50%] md:h-[95%] overflow-auto p-6 animate-slide-up mx-auto rounded-xl dark:bg-gray-700 dark:text-bg-light`}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition dark:hover:text-bg-light"
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
