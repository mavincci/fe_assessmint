import React, { useState } from 'react';
import { Edit, Trash2, Save, X, PlusIcon } from 'lucide-react';
import SelectCategoryandRepo from './SelectCategory';

export default function ResponseDisplay({
  tfQuestions = [],
  mcqQuestions = [],
  onDeleteTF,
  onEditTF,
  onDeleteMCQ,
  onEditMCQ,
}) {
  const [editingTFId, setEditingTFId] = useState(null);
  const [editingMCQId, setEditingMCQId] = useState(null);
  const [editedTFQuestion, setEditedTFQuestion] = useState(null);
  const [editedMCQQuestion, setEditedMCQQuestion] = useState(null);
  const [Submitquestion, setSubmitquestion] =useState(false)

  const handleStartEditTF = (id, question) => {
    setEditingTFId(id);
    setEditedTFQuestion({ ...question });
  };
  const handleAddQuestions = () => {
    setSubmitquestion(true)
    console.log(editedMCQQuestion, mcqQuestions)
  
}
  const handleStartEditMCQ = (id, question) => {
    setEditingMCQId(id);
    setEditedMCQQuestion({ ...question });
  };

  const handleSaveTF = (id) => {
    if (editedTFQuestion && onEditTF) {
      onEditTF(id, editedTFQuestion);
    }
    setEditingTFId(null);
    setEditedTFQuestion(null);
  };

  const handleSaveMCQ = (id) => {
    if (editedMCQQuestion && onEditMCQ) {
      onEditMCQ(id, editedMCQQuestion);
    }
    setEditingMCQId(null);
    setEditedMCQQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingTFId(null);
    setEditingMCQId(null);
    setEditedTFQuestion(null);
    setEditedMCQQuestion(null);
  };

  if (tfQuestions.length > 0) {
    return (
      <div className="space-y-6 animate-slide-in">
        <div className="overflow-x-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">True/False Questions</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Response contains {tfQuestions.length} true/false questions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Question</th>
                    <th className="p-4 text-gray-500 dark:text-gray-400 font-medium w-24 text-center">Answer</th>
                    <th className="p-4 text-gray-500 dark:text-gray-400 font-medium w-24 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tfQuestions.map((question, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                      <td className="p-4 text-gray-800 dark:text-gray-200">
                        {editingTFId === index ? (
                          <textarea
                            value={editedTFQuestion?.questionText}
                            onChange={(e) => setEditedTFQuestion({ ...editedTFQuestion, questionText: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            rows={2}
                          />
                        ) : (
                          question.questionText
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {editingTFId === index ? (
                          <select
                            value={editedTFQuestion?.answer ? 'true' : 'false'}
                            onChange={(e) => setEditedTFQuestion({ ...editedTFQuestion, answer: e.target.value === 'true' })}
                            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        ) : (
                          <span className={question.answer ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
                            {question.answer ? 'True' : 'False'}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          {editingTFId === index ? (
                            <>
                              <button
                                onClick={() => handleSaveTF(index)}
                                className="p-1.5 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-150"
                                aria-label="Save"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-150"
                                aria-label="Cancel"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEditTF(index, question)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                                aria-label="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => onDeleteTF && onDeleteTF(index)}
                                className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                                aria-label="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                {JSON.stringify({
                  statusCode: 200,
                  message: "TF_QUESTIONS_GENERATION_SUCCESS",
                  body: tfQuestions,
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mcqQuestions.length > 0) {
    return (
      <div className="space-y-6 animate-slide-in">
        <div className="overflow-x-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 relative">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Multiple Choice Questions</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Response contains {mcqQuestions.length} multiple choice questions
              </p>
              <div className='z-10 fixed  right-8 top-48 rounded-l-full bg-accent text-white flex items-center p-1 hover:bg-accent-teal-light px-2 font-display'>
                <PlusIcon/>
              <button className='' onClick={handleAddQuestions}>Submit the Questions</button>


              </div>

            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
           
              {mcqQuestions.map((question, index) => (
                <div key={index} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                  <div className="flex justify-between items-start">
                    {editingMCQId === index ? (
                      <textarea
                        value={editedMCQQuestion?.questionText}
                        onChange={(e) => setEditedMCQQuestion({ ...editedMCQQuestion, questionText: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-3"
                        rows={2}
                      />
                    ) : (
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">{question.questionText}</h3>
                    )}

                    <div className="flex space-x-2 ml-4">
                      {editingMCQId === index ? (
                        <>
                          <button
                            onClick={() => handleSaveMCQ(index)}
                            className="p-1.5 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-150"
                            aria-label="Save"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-150"
                            aria-label="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEditMCQ(index, question)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                            aria-label="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDeleteMCQ && onDeleteMCQ(index)}
                            className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingMCQId === index ? (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Options:</p>
                      {editedMCQQuestion?.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...editedMCQQuestion.options];
                              newOptions[optIndex] = e.target.value;
                              setEditedMCQQuestion({ ...editedMCQQuestion, options: newOptions });
                            }}
                            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                          <input
                            type="checkbox"
                            checked={editedMCQQuestion.answers.includes(option)}
                            onChange={(e) => {
                              let newAnswers = [...editedMCQQuestion.answers];
                              if (e.target.checked) {
                                newAnswers.push(option);
                              } else {
                                newAnswers = newAnswers.filter((a) => a !== option);
                              }
                              setEditedMCQQuestion({ ...editedMCQQuestion, answers: newAnswers });
                            }}
                            className="checkbox checkbox-primary"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={question.answers.includes(option)}
                            readOnly
                            className="checkbox checkbox-primary"
                            disabled
                          />
                          <span
                            className={`text-sm ${
                              question.answers.includes(option)
                                ? 'text-primary-700 dark:text-primary-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                {JSON.stringify({
                  statusCode: 200,
                  message: "MCQ_QUESTIONS_GENERATION_SUCCESS",
                  body: mcqQuestions,
                  timestamp: new Date().toISOString(),
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
  {/* {Submitquestion && <SelectCategoryandRepo/>} */}

      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No questions generated yet</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Go to the Chat tab and ask the AI to generate some true/false or multiple choice questions.
        </p>
      </div>
    </div>
  );
}