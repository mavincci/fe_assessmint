import React, { useState } from 'react'
import QuestionAccordion from '../../components/QuestionAccordion'
import { testquestions } from '../../lib/data'
import { Delete, Eye, PlusCircle, Settings, X } from 'lucide-react'
import Button  from '../../components/Button'
import QuestionPreview from '../../components/QuestionPreview'
import QuestionModal from '../../components/QuestionModal'
import AssessmentSettings from './AssessmentSetting'
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
const CreateAssessment = () => {

  // const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const handleSectionSelect = (questions) => {
    setSelectedQuestions(questions);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [wordCount, setWordCount] = useState(0)

  const handleDescriptionChange = (e) => {
    const text = e.target.value
    setDescription(text)
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length)
  }
  const handleChange = (event) => {
    setType(event.target.value)
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log({ title, description, type })
    onClose()
  }
  return (
    <>
        
      <div className="flex  justify-center items-center gap-4 last:ms-auto mr-4">
        <h1 className='font-bold w-[90%] text-3xl p-7'>Create Assessment</h1><Button icon={<Settings />} label="Assesment Setting" text="white" bg="bg-btn-primary" onClick={() => setIsSettingModalOpen(true)} />
        <Button icon={<Eye />} label="Preview" text="gray-200" bg="white" /> 
        

     </div>
      <div className="md:w-[95%] w-full flex flex-col md:flex-row lg:justify-center mx-auto lg:mt-5  h-3/4  gap-5 bg-white p-7">
      {/* left */}
        <div className="w-full lg:w-1/2 bg-white shadow-xl shadow-bg-secondary-light ">
          <div className="w-[90%] rounded-xl   p-2 flex flex-col mx-auto">
          
      <QuestionAccordion items={testquestions} onSectionSelect={handleSectionSelect}/>
          </div>
          <Button icon={<PlusCircle />} label="Add Section" text="white" bg="bg-btn-primary" onClick={() => setIsModalOpen(true)}/>
        </div>
      {/* right */}
        <div className="w-full lg:w-1/2 bg-button-primary  rounded-xl">
          
          <div className="flex justify-start last:ms-auto ">
            <Button icon={<PlusCircle />} label="Add Question" text="white" bg="bg-btn-primary" />
            <Button icon={<X />} label="Cancel" text="gray-200" bg="black"   />
            
        </div>
      <QuestionPreview questions={selectedQuestions}/>
        </div>
        <QuestionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        
            <h1 className='text-center flex text-3xl font-semibold justify-center'> Add New Section</h1>

          <div className="space-y-4">
            <fieldset className="fieldset border border-base-300 rounded-lg p-4">
              <legend className="fieldset-legend px-2 text-sm font-medium">Enter Title <sup className='text-red-400'>*</sup></legend>
              <input
                type="text"
                className="input border-none  w-full outline outline-accent-teal-light focus:outline-accent-teal-dark"
                placeholder="Type here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
            </fieldset>
            <fieldset className="fieldset border border-base-300 rounded-lg p-4">
              <legend className="fieldset-legend px-2 text-sm font-medium">Enter Description/ <sup className='text-red-400'>*</sup></legend>
              <div className="relative">
              <textarea
                placeholder="Enter Description more less than 30 words"
                className="textarea textarea-accent w-full h-32 resize-none"
                value={description}
                onChange={handleDescriptionChange}
              />
              <span className="absolute bottom-2 right-4 text-sm text-gray-500">{wordCount} words</span>
            </div>

            </fieldset>

            
            <div className="form-control flex flex-col space-y-2">
              <label className="label">
                <span className="label-text">Select Type:</span>
              </label>
              <select
  className="select select-bordered w-full  bg-[#286575] text-white text-base sm:text-sm md:text-base"
  value={type}
  onChange={(e) => setType(e.target.value)}
>
  <option disabled value="">
    Select Type
  </option>
  <option value="MCQ">MCQ</option>
  <option value="T/F">T/F</option>
  <option value="Short Answer">Short Answer</option>
  <option value="Code">Code (practical)</option>
</select>
            </div>
            {/* <FormControl
      fullWidth
      sx={{
        maxWidth: '90%',
        backgroundColor: '#286575',
        borderRadius: 2,
        '@media (max-width: 640px)': {
          fontSize: '0.8rem',  // smaller font on mobile
        },
      }}
    >
      <InputLabel sx={{ color: 'white' }}>Select Type</InputLabel>
      <Select
        value={type}
        onChange={handleChange}
        label="Select Type"
        sx={{
          color: 'white',
          fontSize: { xs: '0.8rem', sm: '1rem' }, // small font on xs, normal on sm
        }}
      >
        <MenuItem value="MCQ">MCQ</MenuItem>
        <MenuItem value="T/F">T/F</MenuItem>
        <MenuItem value="Short Answer">Short Answer</MenuItem>
        <MenuItem value="Code">Code (practical)</MenuItem>
      </Select>
    </FormControl> */}
            <Button icon={<PlusCircle />} label="Add Section" text="white" bg="bg-btn-primary" />
          </div>
   

        </QuestionModal>
        <QuestionModal isOpen={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)}>
          <AssessmentSettings/>
        </QuestionModal>
 </div>
      
    </>
  )
}

export default CreateAssessment
