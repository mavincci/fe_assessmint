import { useEffect, useRef } from "react";

export default function ScreenReaderComponent() {
  const speechSynthesisRef = useRef(window.speechSynthesis);

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesisRef.current.speak(utterance);
  };

  const handleKeyDown = (e) => {
    const target = e.target;
    if (target.getAttribute("aria-label")) {
      speak(target.getAttribute("aria-label"));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 space-y-4 p-8">
      <h1 className="text-2xl font-bold text-blue-800" aria-label="Screen Reader Component">
        Accessible Screen Reader Component
      </h1>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Submit Button"
      >
        Submit
      </button>

      <input
        type="text"
        placeholder="Enter your name"
        className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Name Input"
      />

      <a
        href="#"
        className="text-blue-600 underline hover:text-blue-800"
        aria-label="Learn More Link"
      >
        Learn More
      </a>
    </div>
  );
}
