import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, SpellCheck, SkipForward, Shield, ShieldX, Timer } from 'lucide-react';
import { shuffleArray } from '../../lib/Shuffle';
import { load_my_assesment_by_Id ,Create_do_answer, Create_start_assessment, Create_finish_attempt} from '../../action/Auth';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';



function ExamPage({ Create_do_answer,assessmentId,Create_start_assessment,Create_finish_attempt,isStartAssessment }) {
  // const assessmentId = useParams()
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [responses, setresponses] = useState({
    rightanswer: 0,
    wronganswer: 0,
    skipped:0
  });
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(40 * 60); // Default 40 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTimeLeft, setTransitionTimeLeft] = useState(6); // 60 seconds transition time
  const dispatch = useDispatch()
  // Fetch exam data and shuffle questions
useEffect(() => {
   console.log("ASSESSMENT ID", assessmentId);
    const start_assessment = async () => {
      try {
        setIsLoading(true);
        const res = await Create_start_assessment(assessmentId);
        console.log("Sent Start to ASSESSMENT", res);
        if (res?.data?.message === "ASSESSMENT_START_SUCCESS") {
          console.log("HERE in Success")
          await fetchExamData(res.data.body.assessmentId);
        } else if(res?.response?.data?.message === "MAX_ATTEMPTS_REACHED") {
          setError(res?.response?.data?.message.replaceAll("_", " "));
        }
        else if(res?.response?.data?.message === "ASSESSMENT_NOT_STARTED_YET") {
          setError(res?.response?.data?.message.replaceAll("_", " "));
        }
        else if(res?.response?.data?.message === "ASSESSMENT_ALREADY_ENDED") {
          setError(res?.response?.data?.message.replaceAll("_", " "));
        }
        else if(res?.response?.data?.message === "ASSESSMENT_NOT_PUBLISHED") {
          setError(res?.response?.data?.message.replaceAll("_", " "));
        }
      } catch (err) {
        console.error("Error in starting assessment:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchExamData = async (assessmentID) => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("assessmentId in fetchExam", assessmentID);
        const data = await dispatch(load_my_assesment_by_Id(assessmentID));
          console.log(data.body)
        if (data) {
          const shuffledData = {
            ...data.body,
            sections: data.body.sections.map(section => ({
              ...section,
              questions: section.questions ? shuffleArray(section.questions) : []
            }))
          };

          setExamData(shuffledData);

          let initialSection = 0;
          let initialQuestion = 0;
          let foundQuestion = false;

          for (let i = 0; i < shuffledData.sections.length; i++) {
            if (shuffledData.sections[i].questions && shuffledData.sections[i].questions.length > 0) {
              initialSection = i;
              initialQuestion = 0;
              foundQuestion = true;
              break;
            }
          }

          if (foundQuestion) {
            setCurrentSection(initialSection);
            setCurrentQuestion(initialQuestion);
          }

          if (shuffledData.settings?.duration) {
            setTimeRemaining(shuffledData.settings.duration * 60);
          }
        } else {
          throw new Error("Failed to fetch exam data");
        }
      } catch (err) {
        console.error("Error fetching exam data:", err);
        setError(err.message || "Failed to load exam");
      } finally {
        setIsLoading(false);
      }
    };

    start_assessment();
  }, []);



  // Timer effect - separate from data fetching
  useEffect(() => {
    if (!examData || timeRemaining <= 0 || examCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, examCompleted, examData]);

  // Transition timer effect
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setInterval(() => {
      setTransitionTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTransitioning(false);
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining <= 0 && !examCompleted && examData) {
      handleSubmitExam();
    }
  }, [timeRemaining, examCompleted, examData]);

  // Format time remaining as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, value, isMultiSelect) => {
    setAnswers((prev) => {
      if (isMultiSelect) {
        // For multi-select questions (MCQ with multiple answers)
        const currentAnswers = prev[questionId] || [];
        return {
          ...prev,
          [questionId]: currentAnswers.includes(value)
            ? currentAnswers.filter((id) => id !== value)
            : [...currentAnswers, value],
        };
      } else {
        // For single-select questions (TRUE_OR_FALSE or MCQ with single answer)
        return {
          ...prev,
          [questionId]: [value],
        };
      }
    });
  };

  // Find the next section with questions
  const findNextSectionWithQuestions = (startSection) => {
    if (!examData) return -1;

    for (let i = startSection + 1; i < examData.sections.length; i++) {
      if (examData.sections[i].questions && examData.sections[i].questions.length > 0) {
        return i;
      }
    }
    return -1; // No more sections with questions
  };

  // Handle submitting the current answer
  const handleSubmitCurrentAnswer = async () => {
    if (!examData || !currentQuestionData) return;

    setIsSubmitting(true);
    try {
     
        await new Promise((resolve) => setTimeout(resolve, 100));
        console.log("answers" , answers[currentQuestionData.id][0])
    Create_do_answer(examData.id, currentSectionData.id,currentQuestionData.id,currentSectionData.questionType,currentSectionData.questionType === "TRUE_OR_FALSE" ? answers[currentQuestionData.id][0] :  answers[currentQuestionData.id] || [])
    

      // Show a brief success message
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500';
      notification.textContent = 'Answer saved successfully';
      document.body.appendChild(notification);

      // Remove the notification after 2 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 2000);

    } catch (err) {
      console.error('Error submitting answer:', err);
      setError(err.message || 'Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next question button
  const handleNextQuestion = async () => {
    if (!examData) return;

    // Submit the current answer first
    await handleSubmitCurrentAnswer();

    const currentSectionData = examData.sections[currentSection];

    // Check if current section has questions
    if (!currentSectionData.questions || currentSectionData.questions.length === 0) {
      // Current section has no questions, find next section with questions
      const nextSection = findNextSectionWithQuestions(currentSection);
      if (nextSection !== -1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSection(nextSection);
          setCurrentQuestion(0);
        }, 100); // Wait for 60 seconds before transitioning
      } else {
        // No more sections with questions, end exam
        handleSubmitExam();
      }
      return;
    }

    if (currentQuestion < currentSectionData.questions.length - 1) {
      // Move to next question in current section
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Find next section with questions
      const nextSection = findNextSectionWithQuestions(currentSection);
      if (nextSection !== -1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSection(nextSection);
          setCurrentQuestion(0);
        }, 100); // Wait for 60 seconds before transitioning
      } else {
        // No more sections with questions, end exam
        handleSubmitExam();
      }
    }
  };

  // Handle submitting the entire exam
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    try {
      // Submit any remaining answers
      if (currentQuestionData) {
        await handleSubmitCurrentAnswer();
      }

      // Here you would typically make a final API call to mark the exam as completed
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      const payload = await Create_finish_attempt(assessmentId.assessmentId)

      // const payload = await dispatch(Create_finish_attempt(assessmentId.assessmentId));
      console.log("Payload", payload)
      setresponses({
        rightanswer: payload?.body?.successCount,
        wronganswer: payload?.body?.failureCount,
        skipped:payload?.body?.skippedCount

       })
      setExamCompleted(true);
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.message || 'Failed to submit exam');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4">Loading exam...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !examData) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div className="flex">
            <AlertCircle className="h-6 w-6 mr-2" />
            <span>{error || "Failed to load exam. Please try again later."}</span>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-btn-primary text-white rounded hover:bg-accent-teal-dark transition-colors" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // Show section transition screen
  if (isTransitioning) {
    const nextSection = examData.sections[currentSection + 1];
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Get Ready for the Next Section!</h2>
            <div className="mb-8">
              <p className="text-lg mb-2">Next up: {nextSection?.title}</p>
              <p className="text-gray-600">{nextSection?.description}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">{formatTime(transitionTimeLeft)}</div>
              <p className="text-gray-600">Next section will start in</p>
            </div>
            <div className="mt-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-accent-teal-dark h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(transitionTimeLeft / 60) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">Take a moment to prepare yourself. The next section will begin automatically.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if there are no questions in any section
  const hasQuestions = examData.sections.some((section) => section.questions && section.questions.length > 0);

  if (!hasQuestions) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <div className="flex">
            <AlertCircle className="h-6 w-6 mr-2" />
            <span>This exam has no questions yet. Please check back later.</span>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-btn-primary text-white rounded hover:bg-accent-teal-dark transition-colors" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>
    );
  }

  // Calculate total questions across all sections
  const totalQuestions = examData.sections.reduce(
    (total, section) => total + (section.questions ? section.questions.length : 0),
    0
  );

  // Calculate current question number across all sections
  const calculateOverallQuestionNumber = () => {
    let questionNumber = currentQuestion + 1;
    for (let i = 0; i < currentSection; i++) {
      questionNumber += examData.sections[i].questions ? examData.sections[i].questions.length : 0;
    }
    return questionNumber;
  };

  // Calculate progress percentage
  const progressPercentage = (calculateOverallQuestionNumber() / totalQuestions) * 100;

  // Get current section and question data
  const currentSectionData = examData.sections[currentSection];

  // Check if current section has questions
  if (!currentSectionData.questions || currentSectionData.questions.length === 0) {
    // If current section has no questions, find next section with questions
    const nextSection = findNextSectionWithQuestions(currentSection);
    if (nextSection !== -1) {
      // Automatically move to next section with questions
      setCurrentSection(nextSection);
      setCurrentQuestion(0);
      return (
        <div className="container mx-auto max-w-4xl py-8 px-4 flex justify-center items-center" aria-label='Loading Exam please wait'>
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>
      );
    } else {
      // No more sections with questions
      setExamCompleted(true);
    }
  }

  // Current question data
  const currentQuestionData =
    currentSectionData.questions && currentSectionData.questions.length > 0
      ? currentSectionData.questions[currentQuestion]
      : null;

  // Helper function to check if this is the last question
  function isLastQuestion() {
    if (!examData) return false;

    // Check if current question is the last in the current section
    const isLastInSection = currentQuestion === currentSectionData.questions.length - 1;

    if (!isLastInSection) return false;

    // Check if there are any more sections with questions
    return findNextSectionWithQuestions(currentSection) === -1;
  }

  if (examCompleted) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2
              className="text-2xl font-bold text-center mb-6"
              aria-label="Exam Completed"
            >
              Exam Completed
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg mb-4" aria-label={examData.title} tabIndex={0}>
                  Thank you for completing the <b>{examData.title}</b> exam!
                </p>
                <p  aria-label="Your answers have been submitted successfully" tabIndex={1}>Your answers have been submitted successfully.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2" aria-label="Exam Summary">
                  Exam Summary
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div aria-label="Total Questions">Total Questions:</div>
                  <div aria-label={totalQuestions}>{totalQuestions}</div>
                  <div aria-label="You answered ">Questions Answered:</div>
                  <div aria-label={Object.keys(answers).length}>
                    {Object.keys(answers).length}
                  </div>
                  <div
                    className="flex gap-3 items-center p-2 "
                    aria-label="Correct answers"
                  >
                    <SpellCheck /> correct Answers:
                  </div>
                  <div aria-label={responses.rightanswer}>
                    {responses.rightanswer}
                  </div>
                  <div
                    className="flex gap-3 items-center p-2 "
                    aria-label="you skipped"
                  >
                    <SkipForward /> Skipped Questions:
                  </div>
                  <div aria-label={responses.skipped}>{responses.skipped}</div>
                  <div
                    aria-label="wroong answers"
                    className="flex gap-3 items-center p-2 "
                  >
                    <ShieldX /> Wrong Answers:
                  </div>
                  <div aria-label={responses.wronganswer}>
                    {responses.wronganswer}
                  </div>
                  <div className="flex gap-3 items-center p-2">
                    <Timer />
                    Time Taken:
                  </div>
                  <div>
                    {Math.floor(
                      (examData.settings.duration * 60 - timeRemaining) / 60
                    )}{" "}
                    minutes{" "}
                    {(examData.settings.duration * 60 - timeRemaining) % 60}{" "}
                    seconds
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="px-4 py-2 bg-btn-primary text-white rounded hover:bg-accent-teal-dark transition-colors"
                onClick={() => window.location.reload()}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no current question data, show loading
  if (!currentQuestionData) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold" aril-label={examData.title }>{examData.title}</h2>
              <p className="text-sm text-gray-600 mt-1" aria-label={` Section ${currentSection + 1} of ${examData.sections.length}: ${currentSectionData.title}`}>
                Section {currentSection + 1} of {examData.sections.length}: {currentSectionData.title}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className={`font-mono ${timeRemaining < 300 ? "text-red-600 font-bold" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2" aria-label={`you answered ${calculateOverallQuestionNumber} from ${totalQuestions}`}>
              <span>Progress</span>
              <span>
                {calculateOverallQuestionNumber()} of {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-accent-teal-dark h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* <div className="text-lg font-medium" aria-label={`Question ${currentQuestionData.questionData.questionText}`}>
              Question {currentQuestion + 1}: {currentQuestionData.questionData.questionText}
            </div> */}

   <fieldset className="space-y-4" aria-labelledby={`question-${currentQuestionData.id}`}>
              <legend
          tabIndex={1}
                
                id={`question-${currentQuestionData.id}`} className="text-lg font-semibold text-gray-800 mb-2">
   Question {currentQuestion + 1}:  {currentQuestionData.questionData.questionText}
  </legend>

  {currentSectionData.questionType === "TRUE_OR_FALSE" ? (
    ["true", "false"].map((option) => {
      const isSelected = answers[currentQuestionData.id]?.[0] === option;
      return (
        <div
          key={option}
          role="radio"
          aria-checked={isSelected}
          tabIndex={1}
          className={`flex items-center border p-3 rounded-md cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-teal-light ${
            isSelected ? "border-accent-teal-light bg-blue-50" : "border-gray-200"
          }`}
          onClick={() => handleAnswerSelect(currentQuestionData.id, option, false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleAnswerSelect(currentQuestionData.id, option, false);
            }
          }}
        >
          <input
            type="radio"
          tabIndex={1}
            
            name={`question-${currentQuestionData.id}`}
            className="checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            checked={isSelected}
            onChange={() => {}}
            aria-label={option}
          />
          <span className="ml-3 text-gray-700 capitalize" id={`label-${currentQuestionData.id}-${option}`}>
            {option}
          </span>
        </div>
      );
    })
  ) : (
    <>
      {currentQuestionData.questionData.answers?.length > 1 && (
        <div
          id={`multi-select-hint-${currentQuestionData.id}`}
          className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          <span>This question allows multiple selections. Choose all that apply.</span>
        </div>
      )}

      <div className="space-y-3">
        {currentQuestionData.questionData.options?.map((option) => {
          const isSelected = answers[currentQuestionData.id]?.includes(option.id);
          const allowsMultiple = currentQuestionData.questionData.answers?.length > 1;
          return (
            <div
              key={option.id}
          tabIndex={1}

              role={allowsMultiple ? "checkbox" : "radio"}
              aria-checked={isSelected}
              aria-labelledby={`label-${currentQuestionData.id}-${option.id}`}
              // tabIndex={0}
              className={`flex items-center border p-3 rounded-md cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-teal-light ${
                isSelected ? "border-accent-teal-light bg-blue-50" : "border-gray-200"
              }`}
              onClick={() =>
                handleAnswerSelect(
                  currentQuestionData.id,
                  option.id,
                  allowsMultiple
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAnswerSelect(
                    currentQuestionData.id,
                    option.id,
                    allowsMultiple
                  );
                }
              }}
            >
              <label className="flex items-center cursor-pointer w-full" id={`label-${currentQuestionData.id}-${option.id}`}>
                {allowsMultiple ? (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accent-teal-light bg-gray-100 border-gray-300 rounded focus:ring-accent-teal-dark"
                    checked={isSelected || false}
                    onChange={() => {}}
                    aria-describedby={`multi-select-hint-${currentQuestionData.id}`}
                  />
                ) : (
                  <input
                    type="radio"
                    name={`question-${currentQuestionData.id}`}
                    className="w-4 h-4 text-accent-teal-light bg-gray-100 border-gray-300 focus:ring-accent-teal-dark"
                    checked={answers[currentQuestionData.id]?.[0] === option.id}
                    onChange={() => {}}
                  />
                )}
                <span className="ml-3 text-gray-700">{option.answerText}</span>
              </label>
            </div>
          );
        })}
      </div>
    </>
  )}
</fieldset>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between p-4 border-t mt-4">
          <div className="text-sm text-gray-500">
            {currentQuestionData.questionData.isMultiSelect
              ? `Selected ${answers[currentQuestionData.id]?.length || 0} option(s)`
              : ""}
          </div>
          <button
            aria-label={ isLastQuestion() ? "Submit Exam" : "Next Question"}
            className={`px-4 py-2 rounded transition-colors ${
              answers[currentQuestionData.id]?.length
                ? isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-btn-primary text-white hover:bg-accent-teal-dark"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestionData.id]?.length || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-2"></div>
                Saving...
              </span>
            ) : (
              isLastQuestion() ? "Submit Exam" : "Next Question"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {Create_start_assessment,Create_do_answer,Create_finish_attempt})(ExamPage)
