import React, { useEffect, useRef, useState } from "react";
import TakeAssessment from "./TakeAssessment";
import Button from "../../components/Button";
import { BookmarkCheck, ListStartIcon, LogOut, PowerOff, X } from "lucide-react";
import EXamUI from "./EXamUI";
import { useParams } from "react-router-dom";

const AssessmentPage = () => {
  const assessmentId = useParams();
  const assessmentRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startAssessment, setStartAssessment] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [wasAttemptedExit, setWasAttemptedExit] = useState(false);

  useEffect(() => {
    if (isCountdown) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCountdown(false);
            handleEnterFullscreen();

            setStartAssessment(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCountdown]);

  const handleEnterFullscreen = () => {
    const el = assessmentRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
      setIsFullscreen(true);
    }
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
    setStartAssessment(false);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    setWasAttemptedExit(false);
    handleExitFullscreen();
  };

  const cancelExit = () => {
    setShowExitModal(false);
    setWasAttemptedExit(false);
    handleEnterFullscreen(); // Re-enter fullscreen
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        e.preventDefault(); // Prevent automatic exit
       setShowExitModal(true);
                setWasAttemptedExit(true);
      }
    };

    const handleFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      if (!fsElement && isFullscreen && !wasAttemptedExit) {
        // User exited without confirmation
        setShowExitModal(true);
        setWasAttemptedExit(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [isFullscreen, wasAttemptedExit,showExitModal]);

  return (
    <div ref={assessmentRef} className="w-full h-screen bg-bg-light p-5 relative">
      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to exit the assessment?</h2>
            <div className="flex justify-end gap-4">
              <button onClick={cancelExit} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={confirmExit} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {!startAssessment && !isCountdown && (
        <div className="flex flex-col items-center justify-center text-center px-4 py-8">
          <div className="bg-bg-secondary-light rounded-lg shadow-lg p-8 max-w-xl w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>
            <p className="text-lg text-gray-200 mb-2">Click if you are ready</p>
            <p className="text-sm text-gray-300 mb-6">Once you start the assessment, you can't:</p>
            <ul className="list-disc list-inside text-gray-100 text-left space-y-2">
              <li>Open another tab</li>
              <li>Open another browser or application</li>
              <li>
                Take screenshot
                <span className="block text-red-400 text-sm mt-1">
                  Attempting to press keyboard keys related to screenshots will disqualify you automatically
                </span>
              </li>
            </ul>
            <Button
              icon={<ListStartIcon />}
              label="Start Assessment"
              onClick={() => setIsCountdown(true)}
              bg="bg-white"
            />
          </div>
        </div>
      )}

      {isCountdown && (
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 bg-bg-secondary-light rounded-lg max-w-xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-white mb-2">
            Your assessment starts in {countdown} second{countdown !== 1 && "s"}
          </h2>
          <p className="text-lg text-gray-300">Get ready!</p>
        </div>
      )}

      {startAssessment && (
        <>
          <div className="flex justify-between mb-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded flex gap-2"
              onClick={() => {
                setShowExitModal(true);
                setWasAttemptedExit(true);
              }}
            >
              <PowerOff /> Exit Fullscreen
            </button>
          </div>

          <div className="w-full h-full bg-white rounded-lg shadow-lg p-5 overflow-auto">
            <EXamUI assessmentId={assessmentId} isStartAssessment={startAssessment} />
          </div>

          <div className="flex flex-col gap-4">
            <Button icon={<BookmarkCheck />} label="Finish Assessment" bg="bg-btn-primary" text="text-white" />
            <Button
              icon={<LogOut />}
              label="Exit Assessment"
              bg="bg-error"
              onClick={() => {
                setShowExitModal(true);
                setWasAttemptedExit(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentPage;
