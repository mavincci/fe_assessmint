"use client"

import { useState } from "react"
import { Trash2, Plus, Edit, Eye, Info, PlusCircle } from "lucide-react"
import Button from "../../components/Button"

export default function MultipleChoiceBuilder() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    text: "",
    points: 1,
    allowMultiple: true, // Default to allowing multiple answers
    options: [
      { id: 1, text: "", isCorrect: false },
      { id: 2, text: "", isCorrect: false },
      { id: 3, text: "", isCorrect: false },
      { id: 4, text: "", isCorrect: false },
    ],
  })
  const [isEditing, setIsEditing] = useState(false)
  const [previewQuestion, setPreviewQuestion] = useState(null)

  // Handle question text change
  const handleQuestionTextChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, text: e.target.value })
  }

  // Handle points change
  const handlePointsChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, points: Number.parseInt(e.target.value) || 1 })
  }

  // Handle MCQ option changes
  const handleOptionChange = (id, text) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.map((option) => (option.id === id ? { ...option, text } : option)),
    })
  }

  // Handle toggling correct MCQ option
  const handleCorrectOption = (id) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.map((option) =>
        option.id === id ? { ...option, isCorrect: !option.isCorrect } : option,
      ),
    })
  }

  // Add new MCQ option
  const addOption = () => {
    const newId = Math.max(...currentQuestion.options.map((o) => o.id)) + 1
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, { id: newId, text: "", isCorrect: false }],
    })
  }

  // Remove MCQ option
  const removeOption = (id) => {
    if (currentQuestion.options.length > 2) {
      setCurrentQuestion({
        ...currentQuestion,
        options: currentQuestion.options.filter((option) => option.id !== id),
      })
    }
  }

  // Check if at least one option is marked as correct
  const hasCorrectOption = () => {
    return currentQuestion.options.some((option) => option.isCorrect)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate that at least one option is marked as correct
    if (!hasCorrectOption()) {
      alert("Please mark at least one option as correct.")
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
      allowMultiple: true,
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ],
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
    document.getElementById("preview_modal").showModal()
  }

  // Close preview modal
  const closePreview = () => {
    document.getElementById("preview_modal").close()
    setPreviewQuestion(null)
  }

  // Count correct answers
  const countCorrectAnswers = (options) => {
    return options.filter((option) => option.isCorrect).length
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Multiple Choice Question Builder</h1>

      {/* Question Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Question" : "Create New Question"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Text */}
          <div className=" flex flex-col">
            <label className="label">
              <span className="label-text font-medium">Question Text</span>
            </label>
            <textarea
              className="rounded-xl h-24 outline-2 p-2 outline-accent-teal-dark focus:outline-accent-teal-light"
              placeholder="Enter your question here"
              value={currentQuestion.text}
              onChange={handleQuestionTextChange}
              required
            ></textarea>
          </div>

          {/* Points */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-medium">Points</span>
            </label>
            <input
              type="number"
              className="p-2 rounded-xl w-full max-w-xs outline-2 outline-accent-teal-dark focus:outline-accent-teal-light "
              min="1"
              value={currentQuestion.points}
              onChange={handlePointsChange}
            />
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Answer Options</h3>
              <button type="button" className="btn flex gap-2 btn-md btn-outline hover:outline-accent-teal-light outline bg-btn-primary hover:bg-white p-2 rounded-xl text-white hover:text-accent-teal-light " onClick={addOption}>
                <PlusCircle/> Add Option
                          </button>
                       
            </div>

           
            <div className="text-sm text-gray-500 alert alert-info">  <Info/>* Check the boxes next to all correct answers</div>
              {/* <span>Check all options that are correct answers. You must select at least one correct answer.</span> */}
            

            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-accent"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOption(option.id)}
                />
                <input
                  type="text"
                  className="input input-bordered flex-grow"
                  placeholder={`Option ${option.id}`}
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-error"
                  onClick={() => removeOption(option.id)}
                  disabled={currentQuestion.options.length <= 2}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
           
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="btn  bg-btn-primary text-white roundxl">
              {isEditing ? "Update Question" : "Add Question"}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Questions</h2>
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No questions yet. Create your first multiple choice question above.
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{question.text}</h3>
                  <div className="badge badge-accent">
                    {question.points} {question.points === 1 ? "point" : "points"}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="badge badge-outline">
                    {countCorrectAnswers(question.options)} correct{" "}
                    {countCorrectAnswers(question.options) === 1 ? "answer" : "answers"}
                  </span>
                </div>
                <ul className="list-disc list-inside ml-4 mb-4">
                  {question.options.map((option) => (
                    <li key={option.id} className={option.isCorrect ? "font-bold text-success" : ""}>
                      {option.text} {option.isCorrect && "(Correct)"}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 justify-end">
                  <button className="btn btn-sm btn-outline" onClick={() => previewQuestionHandler(question)}>
                    <Eye size={16} /> Preview
                  </button>
                  <button className="btn btn-sm btn-outline btn-info" onClick={() => editQuestion(question)}>
                    <Edit size={16} /> Edit
                  </button>
                  <button className="btn btn-sm btn-outline btn-error" onClick={() => deleteQuestion(question.id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <dialog id="preview_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Question Preview</h3>
          {previewQuestion && (
            <div className="space-y-4">
              <p className="text-lg">{previewQuestion.text}</p>
              <div className="alert alert-info text-sm">
                <Info/>
                <span>Select all that apply</span>
              </div>
              <div className="space-y-2">
                {previewQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox" disabled />
                    <span>{option.text}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                This question is worth {previewQuestion.points} {previewQuestion.points === 1 ? "point" : "points"}
              </div>
            </div>
          )}
          <div className="modal-action">
            <button className="btn" onClick={closePreview}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}
