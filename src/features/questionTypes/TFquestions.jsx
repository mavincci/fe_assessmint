
import { useState, useRef, useEffect } from "react"
import { Trash2, Edit, Eye, X, Check, Info } from "lucide-react"
import { createquestion,createquestion_for_question_bank } from "../../action/Auth"
import { connect } from "react-redux"

const TrueFalseBuilder = ({ createquestion, sectionID, sectionType, bankId ,createquestion_for_question_bank}) => {
  console.log("imported datas", sectionID, sectionType)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    text: "",
    points: 1,
    correctAnswer: "", // "true" or "false"
  })
  const [isEditing, setIsEditing] = useState(false)
  const [previewQuestion, setPreviewQuestion] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef(null)

  // Handle click outside modal to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && showModal) {
        closePreview()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showModal])

  // Handle question text change
  const handleQuestionTextChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, text: e.target.value })
  }

  // Handle points change
  const handlePointsChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, points: Number.parseInt(e.target.value) || 1 })
  }

  // Handle correct answer change
  const handleCorrectAnswerChange = (value) => {
    setCurrentQuestion({ ...currentQuestion, correctAnswer: value })
  }

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Create Question inTF ", sectionType, sectionID, currentQuestion.text,null, currentQuestion.correctAnswer)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (bankId !== null) {
        console.log("sending to question bank")
        createquestion_for_question_bank(bankId, sectionType, currentQuestion.text,null, currentQuestion.correctAnswer)
    } else {
      console.log("Sending to normal TF ")
  createquestion(sectionType, sectionID, currentQuestion.text,null, currentQuestion.correctAnswer)
      
      }
    // Validate that a correct answer is selected
    if (!currentQuestion.correctAnswer) {
      alert("Please select either True or False as the correct answer.")
      return
    }

    if (isEditing) {
      // Update existing question
      setQuestions(questions.map((q) => (q.id === currentQuestion.id ? { ...currentQuestion } : q)))
    } else {
      // Add new question
      const newQuestion = {
        ...currentQuestion,
        id: Date.now(),
      }
      setQuestions([...questions, newQuestion])
    }

    // Reset form
    resetForm()
  }

  // Reset the form
  const resetForm = () => {
    setCurrentQuestion({
      id: null,
      text: "",
      points: 1,
      correctAnswer: "",
    })
    setIsEditing(false)
  }

  // Edit a question
  const editQuestion = (question) => {
    setCurrentQuestion({ ...question })
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  // Preview a question
  const previewQuestionHandler = (question) => {
    setPreviewQuestion(question)
    setShowModal(true)
  }

  // Close preview modal
  const closePreview = () => {
    setShowModal(false)
    setPreviewQuestion(null)
  }
  const handleCreateQuestion = async () => {
    // setIsassessementSubmitting(true)
    console.log("Create Question", sectionType, sectionID, currentQuestion.text, currentQuestion.correctAnswer)
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // createquestion(sectionType, sectionID, , type);
    // createAssessment(title, description)
    console.log("Sent to Auth...")
    // setIsassessementSubmitting(false)
   setIsModalOpen(false)

  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">True/False Question Builder</h1>

      {/* Question Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Question" : "Create New Question"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Question Text</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:accent-accent-teal-dark h-24 resize-none"
              placeholder="Enter your true/false statement here"
              value={currentQuestion.text}
              onChange={handleQuestionTextChange}
              required
            ></textarea>
            <p className="text-xs text-gray-500">Write a statement that is clearly true or false</p>
          </div>

          {/* Points */}
          <div className="space-y-2 max-w-xs">
            <label className="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:accent-accent-teal-dark"
              min="1"
              value={currentQuestion.points}
              onChange={handlePointsChange}
            />
          </div>

          {/* Correct Answer */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="correctAnswer"
                    className="sr-only"
                    checked={currentQuestion.correctAnswer === "true"}
                    onChange={() => handleCorrectAnswerChange("true")}
                    required
                  />
                  <div
                    className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                      currentQuestion.correctAnswer === "true" ? "border-green-500 bg-green-500" : "border-gray-300"
                    }`}
                  >
                    {currentQuestion.correctAnswer === "true" && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm">True</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="correctAnswer"
                    className="sr-only"
                    checked={currentQuestion.correctAnswer === "false"}
                    onChange={() => handleCorrectAnswerChange("false")}
                    required
                  />
                  <div
                    className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                      currentQuestion.correctAnswer === "false" ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}
                  >
                    {currentQuestion.correctAnswer === "false" && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm">False</span>
              </label>
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-accent-teal-light text-white rounded-md hover:bg-accent-teal-dark focus:outline-none focus:ring-2 focus:accent-accent-teal-dark focus:ring-offset-2 transition-colors"
            >
              {isEditing ? "Update Question" : "Add Question"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:accent-accent-teal-dark focus:ring-offset-2 transition-colors"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your True/False Questions</h2>
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No questions yet. Create your first true/false question above.
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{question.text}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {question.points} {question.points === 1 ? "point" : "points"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-medium">Correct Answer:</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      question.correctAnswer === "true" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {question.correctAnswer === "true" ? "True" : "False"}
                  </span>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => previewQuestionHandler(question)}
                  >
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </button>
                  <button
                    className="inline-flex items-center px-2 py-1 border border-blue-300 text-sm font-medium rounded-md text-accent-teal-light bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => editQuestion(question)}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    className="inline-flex items-center px-2 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Question Preview</h3>
                <button onClick={closePreview} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {previewQuestion && (
                <div className="space-y-4">
                  <p className="text-lg">{previewQuestion.text}</p>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-gray-300 rounded-full"></div>
                      <span>True</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-gray-300 rounded-full"></div>
                      <span>False</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Info className="w-4 h-4" />
                    <span>
                      This question is worth {previewQuestion.points}{" "}
                      {previewQuestion.points === 1 ? "point" : "points"}
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closePreview}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { createquestion ,createquestion_for_question_bank})(TrueFalseBuilder);
