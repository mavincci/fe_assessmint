import  { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // handles differnt functions

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);  // call back for response display page 
      setMessage('');
    }
  };
// Event listener for Enter key  to handle submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <form onSubmit={handleSubmit} className="relative font-display w-full">
      <div className="flex items-end ">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here... (e.g., 'Generate true/false questions about climate change')"
          className="flex-1 resize-none rounded-lg border font-display font-semibold border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 pr-12 shadow-sm focus:outline-none focus:border-accent-teal-light  min-h-[100px] max-h-[220px] md:max-w-[75%] mx-auto transition-colors duration-200"
          disabled={isLoading}
          rows={1}
        />
        <button
          type="submit"
          className={`absolute right-2 md:right-54 bottom-3 text-white p-2 rounded-full  hover:scale-110 duration-700 ${
            message.trim() && !isLoading
              ? 'bg-accent-teal-dark  hover:bg-primary-700'
              : 'bg-gray-400 cursor-not-allowed'
          } transition-colors duration-200`}
          disabled={!message.trim() || isLoading}
        >
          <Send className="h-6 w-6 hover:scale-105 duration-500" />
        </button>
      </div>
    </form>
  );
}