"use client"

import { useRef, useState, useEffect } from "react"
import Button from "../../components/Button"
import { ListStartIcon, LogOut, PowerOff } from "lucide-react"
import EXamUI from "./EXamUI"
import { useParams } from "react-router-dom"

const AssessmentPage = () => {
  const assessmentId = useParams()
  const assessmentRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [startAssessment, setStartAssessment] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  const [isCountdown, setIsCountdown] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [showExitModal, setShowExitModal] = useState(false)

  // Countdown timer effect
  useEffect(() => {
    if (isCountdown) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsCountdown(false)
            setStartAssessment(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isCountdown])

  // Tab switching and application switching detection
  useEffect(() => {
    if (!startAssessment) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched tabs or minimized window
        alert("Assessment terminated: Tab switching or window minimizing detected!")
        handleExitFullscreen()
      }
    }

    const handleWindowBlur = () => {
      // Window lost focus (user switched to another application)
      alert("Assessment terminated: Application switching detected!")
      handleExitFullscreen()
    }

    const handleBeforeUnload = (e) => {
      // Prevent closing the tab/browser
      e.preventDefault()
      e.returnValue = "Are you sure you want to leave? Your assessment will be terminated."
      return "Are you sure you want to leave? Your assessment will be terminated."
    }

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleWindowBlur)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleWindowBlur)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [startAssessment])

  // Keyboard shortcuts blocking
  useEffect(() => {
    if (!startAssessment) return

    const handleKeyDown = (e) => {
      // Block Alt+Tab (Windows)
      if (e.altKey && e.key === "Tab") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block Ctrl+Tab (browser tab switching)
      if (e.ctrlKey && e.key === "Tab") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block Windows key
      if (e.key === "Meta" || e.key === "OS") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block Alt+F4 (close window)
      if (e.altKey && e.key === "F4") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block Ctrl+W (close tab)
      if (e.ctrlKey && e.key === "w") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block Ctrl+T (new tab)
      if (e.ctrlKey && e.key === "t") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block F11 (fullscreen toggle)
      if (e.key === "F11") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block Escape key
      if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        // Show exit confirmation modal
        setShowExitModal(true)
        return false
      }

      // Block F5 and Ctrl+R (refresh)
      if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Block PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault()
        e.stopPropagation()
        alert("Screenshots are not allowed during assessment!")
        return false
      }
    }

    // Add event listener with capture phase
    document.addEventListener("keydown", handleKeyDown, true)

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true)
    }
  }, [startAssessment])

  // Fullscreen change detection
  useEffect(() => {
    if (!startAssessment) return

    const handleFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement

      if (!fsElement && isFullscreen) {
        // User exited fullscreen
        setIsFullscreen(false)
        // Try to re-enter fullscreen
        handleEnterFullscreen()
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
    }
  }, [startAssessment, isFullscreen])

  const handleEnterFullscreen = () => {
    if (assessmentRef.current.requestFullscreen) {
      assessmentRef.current.requestFullscreen()
    } else if (assessmentRef.current.webkitRequestFullscreen) {
      assessmentRef.current.webkitRequestFullscreen()
    } else if (assessmentRef.current.msRequestFullscreen) {
      assessmentRef.current.msRequestFullscreen()
    }
    setIsFullscreen(true)
  }

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    setIsFullscreen(false)
    setStartAssessment(false)
    setShowContinue(false)
    setIsCountdown(false)
    setCountdown(5)
  }

  const handleContinue = () => {
    handleEnterFullscreen()
    setIsCountdown(true)
  }

  const confirmExit = () => {
    setShowExitModal(false)
    handleExitFullscreen()
  }

  const cancelExit = () => {
    setShowExitModal(false)
    // Re-enter fullscreen mode after canceling exit
    setTimeout(() => {
      handleEnterFullscreen()
    }, 100)
  }

  return (
    <div ref={assessmentRef} className="w-screen h-screen bg-gray-100 p-5">
      {!showContinue && !isCountdown && !startAssessment && (
        <div className="flex flex-col items-center justify-center max-h-full text-center px-4 py-8">
          <div className="bg-bg-secondary-light rounded-lg shadow-lg p-8 max-w-xl w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>

            <p className="text-lg text-gray-200 mb-2">Click if you are ready</p>
            <p className="text-sm text-gray-300 mb-6">Once you start the assessment, you can't:</p>

   

            <Button
              icon={<ListStartIcon />}
              label="Start Assessment"
              onClick={() => setShowContinue(true)}
              bg="bg-white"
            />
          </div>
        </div>
      )}

      {showContinue && !isCountdown && !startAssessment && (
        <div className="flex flex-col items-center justify-center max-h-full text-center px-4 py-8" tabIndex={0}>
          <div className="bg-bg-secondary-light rounded-lg shadow-lg p-8 max-w-xl w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Important Information</h2>

            <p className="text-lg text-gray-200 mb-4" tabIndex={0}>
              Please read the following instructions carefully before continuing:
            </p>

            <ul className="list-disc list-inside text-gray-100 text-left space-y-3 mb-6" tabIndex={0}>
              <li>The assessment will be conducted in fullscreen mode</li>
              <li>
                <strong>Do not</strong> attempt to exit fullscreen mode or switch tabs
              </li>
              <li>
                <strong>Do not</strong> open other applications during the assessment
              </li>
              <li>
                <strong>Do not</strong> take screenshots or record your screen
              </li>
              <li>Any violation of these rules may result in automatic disqualification</li>
            </ul>

            <p className="text-sm text-gray-300 mb-6" tabIndex={0}>
              By clicking "Continue", you agree to these terms and conditions.
            </p>

            <div className="flex justify-center space-x-4">
              <Button
                icon={<LogOut />}
                label="Cancel"
                onClick={() => setShowContinue(false)}
                bg="bg-gray-500"
                text="text-white"
              />
              <Button icon={<ListStartIcon />} label="Continue" onClick={handleContinue} bg="bg-white" />
            </div>
          </div>
        </div>
      )}

      {isCountdown && !startAssessment && (
        <div className="flex flex-col items-center justify-center max-h-full text-center px-4 py-8">
          <div className="bg-bg-secondary-light rounded-lg shadow-lg p-8 max-w-xl w-full">
            <h2 className="text-3xl font-bold text-white mb-4">
              Your assessment starts in {countdown} second{countdown !== 1 && "s"}
            </h2>
            <p className="text-lg text-gray-300 mb-6">Get ready!</p>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg mx-4">
            <h2 className="text-xl font-bold mb-4">Exit Assessment?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to exit the assessment? Your progress may be lost and you might not be able to
              resume.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelExit}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmExit}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {startAssessment && (
        <>
          <div className="flex justify-between mb-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded flex gap-2"
              onClick={() => setShowExitModal(true)}
            >
              <PowerOff /> Exit Assessment
            </button>
            <div className="text-sm text-gray-600 flex items-center">
              🔒 Secure Mode Active - Tab switching disabled
            </div>
          </div>

          <div className="w-full h-full bg-white rounded-lg shadow-lg p-5 overflow-auto">
            <EXamUI assessmentId={assessmentId} isStartAssessment={startAssessment}  />
          </div>
        </>
      )}
    </div>
  )
}

export default AssessmentPage
