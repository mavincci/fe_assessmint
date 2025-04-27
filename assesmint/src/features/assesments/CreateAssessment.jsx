import React, { useState } from 'react'
import QuestionAccordion from '../../components/QuestionAccordion'
import { testquestions } from '../../lib/data'
import { Delete, Eye, PlusCircle, X } from 'lucide-react'
import Button from '../../components/Button'
import QuestionPreview from '../../components/QuestionPreview'

const CreateAssessment = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const handleSectionSelect = (questions) => {
    setSelectedQuestions(questions);
  };
  return (
    <>
        
      <div className="flex  justify-center items-center  last:ms-auto">
        <h1 className='font-bold w-[90%] text-3xl p-7'>Create Assessment</h1>
        <Button icon={<Eye />} label="Preview" text="gray-200" bg="white" />
     </div>
      <div className="md:w-[95%] w-full flex flex-col md:flex-row lg:justify-center mx-auto lg:mt-5  h-3/4  gap-5 bg-white p-7">
      {/* left */}
        <div className="w-full lg:w-1/2 bg-white shadow-xl shadow-bg-secondary-light ">
          <div className="w-[90%] rounded-xl   p-2 flex flex-col mx-auto">
          
      <QuestionAccordion items={testquestions} onSectionSelect={handleSectionSelect}/>
          </div>
          <Button icon={<PlusCircle />} label="Add Section" text="white" bg="btn-primary"/>
        </div>
      {/* right */}
        <div className="w-full lg:w-1/2 bg-button-primary  rounded-xl">
          
          <div className="flex justify-start last:ms-auto ">
            <Button icon={<PlusCircle />} label="Add Question" text="white" bg="btn-primary" />
            <Button icon={<X />} label="Cancel" text="gray-200" bg="white"  />
            
        </div>
      <QuestionPreview questions={selectedQuestions}/>
        </div>
 </div>
      
    </>
  )
}

export default CreateAssessment
