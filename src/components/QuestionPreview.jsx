import { Delete, Edit } from 'lucide-react'
import React from 'react'

const QuestionPreview = ({ questions =[] }) => {
    
  return (
    <>
      {questions.length !=0 ? 
    <div className="p-6 bg-white rounded-xl  max-w-xl mx-auto space-y-6 border border-accent-teal-light mt-3 max-h-3/4 overflow-y-auto">
    {questions.map((q, idx) => (
      <div key={q.id} className="space-y-2">
        <div className="flex items-start gap-2">
          <p className="font-semibold text-gray-700">{idx + 1}.</p>
                <p className="font-medium text-gray-800">{q.question}</p>
                <span className='flex ms-auto  space-x-0.5 '><Edit size={18} className='text-amber-400 '/> <Delete size={18} className='text-red-600'/></span>
        </div>

        <div className="flex flex-col gap-2 pl-6">
          {q.choices.map((choice, choiceIdx) => (
            <div key={choiceIdx} className="text-gray-600 text-md flex flex-row  ">
              <span className="font-semibold mr-2 ml-3 ">{String.fromCharCode(65 + choiceIdx)}) </span> 
                  {choice}
                  {/* <span className='flex justify-end ms-auto space-x-0.5 '><Edit size={18} className='text-amber-400 ' /> <Delete size={18} className='text-red-600' /></span> */}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div> : <span>No priview</span>}
    </>
  )
}

export default QuestionPreview
