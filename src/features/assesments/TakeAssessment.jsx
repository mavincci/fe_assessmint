import { useState, useEffect, useRef } from "react";
import { testquestions } from "../../lib/data";
import Button from "../../components/Button";
import { BookmarkCheck, ListStartIcon, LogOut } from "lucide-react";
import { load_my_assesment_by_Id } from "../../action/Auth";
import { useDispatch } from "react-redux";

const TakeAssessment = ({ assessmentId }) => {
  const dispatch = useDispatch();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [FetchedQuestions, setFetchedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(140); // 2:20 in seconds
  const [startAssesment, setStartAssesment] = useState(false);
  const currentQuiz = testquestions[currentQuizIndex];
  const totalQuizzes = testquestions.length;
  const totalQuestionsInQuiz = currentQuiz.questions.length;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  // Calculate total questions across all quizzes
  const totalQuestions = testquestions.reduce(
    (sum, quiz) => sum + quiz.questions.length,
    0
  );

  // Calculate current question number across all quizzes
  const calculateOverallQuestionNumber = () => {
    let questionNumber = 1;
    for (let i = 0; i < currentQuizIndex; i++) {
      questionNumber += testquestions[i].questions.length;
    }
    return questionNumber + currentQuestionIndex;
  };

  const currentOverallQuestionNumber = calculateOverallQuestionNumber();
  useEffect(() => {
    const fetchquestions = async () => {

      const res = await dispatch(load_my_assesment_by_Id(assessmentId));
      if (res?.body) {
        setFetchedQuestions(res.body);
      }
    };
    if (assessmentId) {
      fetchquestions();
    }
  });

  useEffect(() => {
    setTimeLeft(totalQuestions * 60);
  }, [totalQuestions, startAssesment === true]);

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: option,
    });
  };

  // Handle navigation
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setCurrentQuestionIndex(
        testquestions[currentQuizIndex - 1].questions.length - 1
      );
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInQuiz - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuizIndex < totalQuizzes - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  // Handle question number click
  const handleQuestionClick = (quizIndex, questionIndex) => {
    setCurrentQuizIndex(quizIndex);
    setCurrentQuestionIndex(questionIndex);
  };

  // Generate all questions for the question grid
  const generateAllQuestions = () => {
    const allQuestions = [];
    testquestions.forEach((quiz, quizIndex) => {
      quiz.questions.forEach((question, questionIndex) => {
        allQuestions.push({
          quizIndex,
          questionIndex,
          id: question.id,
        });
      });
    });
    return allQuestions;
  };

  const allQuestions = generateAllQuestions();

  // Get option letter based on index
  const getOptionLetter = (index) => {
    return String.fromCharCode(97 + index);
  };

  const assessmentRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const handleFetching = () => {
    fetchquestions();
    setStartAssesment(!startAssesment);
  };
  return (
    <>
      {!startAssesment && (
        <div className="flex flex-col items-center justify-center max-h-full text-center px-4 py-8 ">
          <div className="bg-bg-secondary-light rounded-lg shadow-lg p-8 max-w-xl w-full ">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Start?
            </h2>

            <p className="text-lg text-gray-200 mb-2">Click if you are ready</p>
            <p className="text-sm text-gray-300 mb-6">
              Once you start the assessment, you can't:
            </p>

            <ul className="list-disc list-inside text-gray-100 text-left space-y-2">
              <li>Open another tab</li>
              <li>Open another browser or application</li>
              <li>
                Take screenshot
                <span className="block text-red-400 text-sm mt-1">
                  Attempting to press keyboard keys related to screenshots will
                  disqualify you automatically
                </span>
              </li>
            </ul>

            <Button
              icon={<ListStartIcon />}
              label="Start Assessment"
              onClick={() => {
                handleFetching();
              }}
              bg="bg-white"
              //   className="mt-8 bg-accent-teal-light hover:bg-accent-teal-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            />
          </div>
        </div>
      )}
      {startAssesment && (
        <div className="min-h-screen bg-sky-50 p-4">
          {/* Header */}
          <div className="container mx-auto mb-6">
            <h1 className="text-xl font-medium">welcome to your Assesment</h1>
          </div>

          <div className="container mx-auto flex flex-col md:flex-row gap-6">
            {/* Question Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex-1">
              {/* Timer and Progress */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Questions</span>
                  <span className="text-sm font-medium">
                    {currentOverallQuestionNumber}/{totalQuestions}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Time Left:</span>
                  <span className="text-sm font-medium">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-teal-600 h-2 rounded-full"
                  style={{
                    width: `${(currentOverallQuestionNumber / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Quiz Title and Description */}
              <div className="mb-4">
                <h2 className="text-lg font-bold">{currentQuiz.title}</h2>
                <p className="text-sm text-gray-500">
                  {currentQuiz.description}
                </p>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {currentOverallQuestionNumber}. {currentQuestion.question}
                </h3>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.choices.map((choice, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        userAnswers[currentQuestion.id] === choice
                          ? "bg-[#2a6f7e] text-white border-[#2a6f7e]"
                          : "bg-white hover:bg-gray-50 border-gray-200"
                      }`}
                      onClick={() => handleOptionSelect(choice)}
                    >
                      <span className="font-medium">
                        {getOptionLetter(index)})
                      </span>{" "}
                      {choice}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  className="btn btn-sm btn-ghost bg-gray-200 hover:bg-gray-300"
                  onClick={handlePrevious}
                  disabled={
                    currentQuizIndex === 0 && currentQuestionIndex === 0
                  }
                >
                  previous
                </button>
                <button
                  className="btn btn-sm text-white bg-[#2a6f7e] hover:bg-[#235a67] border-none"
                  onClick={handleNext}
                  disabled={
                    currentQuizIndex === totalQuizzes - 1 &&
                    currentQuestionIndex === totalQuestionsInQuiz - 1
                  }
                >
                  Next
                </button>
              </div>
            </div>

            {/* Question Grid */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-72">
              <div className="grid grid-cols-3 gap-3">
                {allQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`border border-dashed border-blue-300 rounded flex items-center justify-center h-12 cursor-pointer hover:bg-blue-50 ${
                      currentQuizIndex === question.quizIndex &&
                      currentQuestionIndex === question.questionIndex
                        ? "bg-blue-100"
                        : userAnswers[question.id]
                          ? "bg-blue-50"
                          : "bg-white"
                    }`}
                    onClick={() =>
                      handleQuestionClick(
                        question.quizIndex,
                        question.questionIndex
                      )
                    }
                  >
                    <span>{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 ">
                <Button
                  icon={<BookmarkCheck />}
                  label="Finish Assesment"
                  bg="bg-btn-primary"
                  text="text-white"
                  onClick={() => setStartAssesment(!startAssesment)}
                />
                <Button
                  icon={<LogOut />}
                  label="Exit Assesment"
                  bg="bg-error"
                  onClick={() => setStartAssesment(!startAssesment)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TakeAssessment;
