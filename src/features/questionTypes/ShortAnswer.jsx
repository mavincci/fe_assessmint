"use client"

import { useState, useRef, useEffect } from "react"
import { Trash2, Edit, Eye, X, Info, AlertCircle, MessageSquare } from "lucide-react"

export default function ShortAnswerBuilder() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    text: "",
    points: 1,
    sampleAnswer: "",
    maxWords: 100,
    maxChars: 500,
    limitType: "words", // "words" or "characters"
  })
  const [isEditing, setIsEditing] = useState(false)
  const [previewQuestion, setPreviewQuestion] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [previewAnswer, setPreviewAnswer] = useState("")
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

  // Handle sample answer change
  const handleSampleAnswerChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, sampleAnswer: e.target.value })
  }

  // Handle max words/chars change
  const handleMaxLimitChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    if (currentQuestion.limitType === "words") {
      setCurrentQuestion({ ...currentQuestion, maxWords: value })
    } else {
      setCurrentQuestion({ ...currentQuestion, maxChars: value })
    }
  }

  // Handle limit type change
  const handleLimitTypeChange = (type) => {
    setCurrentQuestion({ ...currentQuestion, limitType: type })
  }

  // Count words in text
  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate that sample answer is provided
    if (!currentQuestion.sampleAnswer.trim()) {
      alert("Please provide a sample answer or keywords for grading.")
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
      sampleAnswer: "",
      maxWords: 100,
      maxChars: 500,
      limitType: "words",
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
    setPreviewAnswer("")
    setShowModal(true)
  }

  // Close preview modal
  const closePreview = () => {
    setShowModal(false)
    setPreviewQuestion(null)
    setPreviewAnswer("")
  }

  // Handle preview answer change
  const handlePreviewAnswerChange = (e) => {
    const text = e.target.value
    if (
      (previewQuestion.limitType === "words" && countWords(text) <= previewQuestion.maxWords) ||
      (previewQuestion.limitType === "characters" && text.length <= previewQuestion.maxChars)
    ) {
      setPreviewAnswer(text)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Short Answer Question Builder</h1>

      {/* Question Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Question" : "Create New Question"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Question Text</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  h-24 resize-none"
              placeholder="Enter your question here"
              value={currentQuestion.text}
              onChange={handleQuestionTextChange}
              required
            ></textarea>
            <p className="text-xs text-gray-500">Write a clear question that requires a short written response</p>
          </div>

          {/* Points */}
          <div className="space-y-2 max-w-xs">
            <label className="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  "
              min="1"
              value={currentQuestion.points}
              onChange={handlePointsChange}
            />
          </div>

          {/* Sample Answer */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sample Answer or Keywords</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2   h-24 resize-none"
              placeholder="Enter sample answer or keywords for grading (not shown to students)"
              value={currentQuestion.sampleAnswer}
              onChange={handleSampleAnswerChange}
              required
            ></textarea>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Info className="w-3 h-3" />
              <span>This will be used for grading but won't be shown to students</span>
            </div>
          </div>

          {/* Answer Limit */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">Answer Limit Type:</label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                    currentQuestion.limitType === "words"
                      ? "bg-blue-50 border-accent-teal-dark text-accent-teal-light"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleLimitTypeChange("words")}
                >
                  Words
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                    currentQuestion.limitType === "characters"
                      ? "bg-blue-50 border-accent-teal-dark text-accent-teal-light"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleLimitTypeChange("characters")}
                >
                  Characters
                </button>
              </div>
            </div>

            <div className="space-y-2 max-w-xs">
              <label className="block text-sm font-medium text-gray-700">
                Maximum {currentQuestion.limitType === "words" ? "Words" : "Characters"}
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                min="1"
                value={currentQuestion.limitType === "words" ? currentQuestion.maxWords : currentQuestion.maxChars}
                onChange={handleMaxLimitChange}
              />
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-btn-primary text-white rounded-md hover:bg-accent-teal-dark focus:outline-none focus:ring-2  focus:ring-offset-2 transition-colors"
            >
              {isEditing ? "Update Question" : "Add Question"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2 transition-colors"
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
        <h2 className="text-xl font-bold mb-4">Your Short Answer Questions</h2>
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No questions yet. Create your first short answer question above.
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{question.text}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-accent-teal-light">
                    {question.points} {question.points === 1 ? "point" : "points"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Max {question.limitType === "words" ? question.maxWords : question.maxChars}{" "}
                    {question.limitType === "words" ? "words" : "characters"}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="flex items-center gap-1 mb-1">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Sample Answer:</span>
                  </div>
                  <p className="text-sm text-gray-600">{question.sampleAnswer}</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:accent-accent-teal-dark"
                    onClick={() => previewQuestionHandler(question)}
                  >
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </button>
                  <button
                    className="inline-flex items-center px-2 py-1 border border-blue-300 text-sm font-medium rounded-md text-accent-teal-light bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:accent-accent-teal-dark"
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
                  <div className="space-y-2">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-accent-teal-light h-32 resize-none"
                      placeholder="Type your answer here..."
                      value={previewAnswer}
                      onChange={handlePreviewAnswerChange}
                    ></textarea>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        <span>
                          Maximum{" "}
                          {previewQuestion.limitType === "words" ? previewQuestion.maxWords : previewQuestion.maxChars}{" "}
                          {previewQuestion.limitType === "words" ? "words" : "characters"}
                        </span>
                      </div>
                      <div>
                        {previewQuestion.limitType === "words"
                          ? `${countWords(previewAnswer)}/${previewQuestion.maxWords} words`
                          : `${previewAnswer.length}/${previewQuestion.maxChars} characters`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <AlertCircle className="w-4 h-4" />
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
