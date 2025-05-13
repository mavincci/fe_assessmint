import React, { useRef, useState } from "react";
import TakeAssessment from "./TakeAssessment";
import Button from "../../components/Button";
import { BookmarkCheck, ListStartIcon, LogOut, PowerOff } from "lucide-react";
import EXamUI from "./EXamUI";

const AssessmentPage = () => {
    const assessmentRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startAssesment, setstartAssesment] = useState(false);
 const handleEnterFullscreen = () => {
    if (assessmentRef.current.requestFullscreen) {
      assessmentRef.current.requestFullscreen();
    } else if (assessmentRef.current.webkitRequestFullscreen) {
      assessmentRef.current.webkitRequestFullscreen();
    } else if (assessmentRef.current.msRequestFullscreen) {
      assessmentRef.current.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };


  // Function to handle fullscreen state from the child
  const handleFullscreenChange = (isFull) => {
    setIsFullscreen(isFull);
  };


  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  return (
    <div ref={assessmentRef} className="w-screen h-screen bg-gray-100 p-5">
                  {!startAssesment && <div className="flex flex-col items-center justify-center max-h-full text-center px-4 py-8 ">
  <div className="bg-bg-secondary-light rounded-lg shadow-lg p-8 max-w-xl w-full ">
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
            onClick={() => {
                handleEnterFullscreen()
                setstartAssesment(true)
                        }}
                        bg="bg-white"
    //   className="mt-8 bg-accent-teal-light hover:bg-accent-teal-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
    />
  </div>
</div>

      }{startAssesment && <>
      
      <div className="flex justify-between mb-4">
        {/* <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleEnterFullscreen}
        >
          Enter Fullscreen
        </button> */}
        <button
          className="bg-red-500 text-white py-2 px-4 rounded flex gap-2"
            onClick={() => {
              setstartAssesment(false)
            handleExitFullscreen()
          }}
        >
          <PowerOff/> Exit Fullscreen
        </button>
      </div>

      <div className="w-full h-full bg-white rounded-lg shadow-lg p-5 overflow-auto">
        <EXamUI/>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          icon={<BookmarkCheck />}
          label="Finish Assessment"
          bg="bg-btn-primary"
          text="text-white"
        />
        <Button
          icon={<LogOut />}
          label="Exit Assessment"
          bg="bg-error"
          onClick={handleExitFullscreen}
        />
      </div>
      </>}
    </div>
  );
};

export default AssessmentPage;
