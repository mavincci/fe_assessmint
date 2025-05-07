import { Delete, Edit, FileType, List } from 'lucide-react'
import React from 'react'
import NoElements from './NoElements'

const QuestionPreview = ({ questions }) => {

  return (
    <>
      {questions.length !== 0 ? (
        <div className="p-6 bg-white rounded-xl max-w-xl mx-auto space-y-6 border border-accent-teal-light mt-3 max-h-3/4 overflow-y-auto">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <p className="font-semibold text-gray-700">{idx + 1}.</p>
                <p className="font-medium text-gray-800">{q.questionData?.questionText}</p>
                <span className='flex ms-auto space-x-0.5'>
                  <Edit size={18} className='text-amber-400 ' />
                  <Delete size={18} className='text-red-600' />
                </span>
              </div>

              {/* Render True/False Options */}
              {q.questionType === "TRUE_OR_FALSE" && (
                <div className="flex flex-col gap-2 pl-6">
                  <div className="text-gray-600 text-md flex flex-row items-center gap-2">
                    <span className="font-semibold">A)</span> True
                    {q.questionData.answer === true && <span className="text-green-500 ml-2">(Correct)</span>}
                  </div>
                  <div className="text-gray-600 text-md flex flex-row items-center gap-2">
                    <span className="font-semibold">B)</span> False
                    {q.questionData.answer === false && <span className="text-green-500 ml-2">(Correct)</span>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <NoElements
          core_item="Question"
          todo="Question"
          type="add"
          icon={<List className="w-24 h-24 text-accent-teal-light animate-pulse" />} />
      )
      }
    </>
)}
export default QuestionPreview
