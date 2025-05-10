import React, { useEffect, useRef, useState } from 'react'
import QuestionAccordion from '../../components/QuestionAccordion'
import { testquestions } from '../../lib/data'
import { ClipboardList, Delete, Eye, FileType, HelpCircle, Lightbulb, Plus, PlusCircle, Save, Settings, X } from 'lucide-react'
import Button  from '../../components/Button'
import QuestionPreview from '../../components/QuestionPreview'
import QuestionModal from '../../components/QuestionModal'
import AssessmentSettings from './AssessmentSetting'

import MultipleChoiceBuilder from '../questionTypes/MCQquestions'
import TrueFalseBuilder from '../questionTypes/TFquestions'
import ShortAnswerBuilder from '../questionTypes/ShortAnswer'
import { createquestion, createSection, load_my_assesment, load_my_questions, load_my_section, load_question_type } from '../../action/Auth'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import Step from '../../components/Step'
import { createAssessment } from '../../action/Auth'
import { toast } from 'react-toastify'
import SelectableAccordion from '../../components/AssessmentList'
import NoElements from '../../components/NoElements'

const CreateAssessment = ({createAssessment,createSection,isAuthenticated,createquestion }) => {

  // const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const handleSectionSelect = (questions) => { setSelectedQuestions(questions); };
  const [selectedSectionID, setSelectedSectionID] = useState(null);
  const [selectedquestioType, setselectedquestioType] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isMCQopen, setIsMCQopen] = useState(false);
  const [AllQuestions, setIsAllQuestions] = useState([])
  const [IsassessementSubmitting, setIsassessementSubmitting] = useState(false);
  const [Isassessmentcreated, setIsassesmentcreated] = useState(false);
  const [IsGuidanceModalOpen, setGuidanceModalOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sectionCreated, setsectioncreated] = useState("")
  const [type, setType] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [assessmentData, setAssessmentData] = useState([]);
  const [QuestionType, setQuestionType] = useState([]);
  const [FetchedSection, setFetchedSection] = useState([]);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedtitle, setSelectedtitle] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDescriptionChange = (e) => {
    const text = e.target.value
    setDescription(text)
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length)
  }
  const sectionCache = useRef({});
  const handleChange = (event) => {
    setType(event.target.value)
  }
  const handleCreateAssessment = async () => {
    setIsassessementSubmitting(true)
    console.log("Create Assessment", title, description)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    createAssessment(title, description)
    console.log("Sent to Auth...")
    setIsassessementSubmitting(false)
   setIsModalOpen(false)

  }
  const handleSelect = (items) => {
    setSelectedId(items.id);
    setSelectedtitle(items.title)
    console.log("Selected ID:", items.id);
    console.log("ASSESsment datas" , items)
  };
  const handleSubmit = () => {
    // Handle form submission
    console.log({ title, description, type })
    onClose()
  }
  const handleCreateSection = async () => {
    // setIsassessementSubmitting(true)
    console.log("Create Assessment",selectedId, title, description,type)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    createSection(selectedId, title, description, type);
    // createAssessment(title, description)
    console.log("Sent to Auth...")
    // setIsassessementSubmitting(false)
   setIsModalOpen(false)

  }
useEffect(() => {
    const fetchAssessment = async () => {
      const res = await dispatch(load_my_assesment());
      if (res?.body) {
        setAssessmentData(res.body);

      }
  };

    const fetchquestionType = async () => {
      const res = await dispatch(load_question_type());
      if (res?.body) {
        setQuestionType(res.body);
      }
  };
  
  const fetchquestions = async () => {
    console.log("selectedSectionId", selectedSectionID)
    const res = await dispatch(load_my_questions(selectedSectionID));
    if (res?.body) {
      setFetchedQuestions(res.body);
    }
};



  
  const fetchSection = async () => {
    if (sectionCache.current[selectedId]) {
      setFetchedSection(sectionCache.current[selectedId]);
      return;
    }

    // Else fetch from API
    const res = await dispatch(load_my_section(selectedId));
    if (res?.body) {
      sectionCache.current[selectedId] = res.body; 
      setFetchedSection(res.body);
      console.log("FetchedSection", res.body)
    }
  };
  

  if (selectedId ) {
    fetchSection();
  }
  if (isModalOpen) {
    fetchquestionType();
  
  }
  if (setIsMCQopen  ) {
    fetchquestions();
  }
  if (setIsModalOpen) {
    fetchAssessment();
  }
 
}, [dispatch, isModalOpen,selectedId,setIsModalOpen, selectedSectionID]);
  

 
  console.log("SEctionID", selectedSectionID)
  console.log("selected Type", selectedquestioType)
  console.log("fetchedquestions", fetchedQuestions)
  
  return (
    <>
        
      <div className="flex  justify-center items-center gap-4 last:ms-auto mr-4">
        
        
       
        <h1 className='font-bold w-[90%] text-3xl p-7'>Create Assessment</h1>
        <Button icon={<PlusCircle />} label="Add Assessment" text="white" bg="bg-secondary" onClick={() => {
              setIsassesmentcreated(true)
               setIsModalOpen(true)
              }}/>
          {selectedId !== null && <Button icon={<Settings />} label="Assesment Setting" text="white" bg="bg-btn-primary" onClick={() => setIsSettingModalOpen(true)} />}
          <Button icon={<Eye />} label="Preview" text="gray-200" bg="bg-lime-500" /> 
          <Button icon={<HelpCircle />} label="Guidance" text="gray-200" bg="bg-btn-primary"  onClick={() => setGuidanceModalOpen(true)}/> 
        
        
   
      </div>
          
      <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📚 Select an Assessment</h2>
        <div className="space-y-4">
    
  
      {/* Row of buttons (Assessment list) */}
      <div className="flex flex-wrap gap-3">
        {assessmentData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              selectedId === item.id ? "bg-btn-primary text-white" : "outline outline-accent-teal-light text-black font-semibold hover:bg-accent-teal-dark"
            }`}
          >
            {item.title}
          </button>
        ))}
          </div>
          <div className="min-h-[60px] bg-bg-secondary-light p-4 rounded shadow-sm">
        <h2 className="text-lime-50 text-md">
          {hoveredItem ? hoveredItem.description : "Hover over the assessments to preview the description."}   
        </h2>
      </div>
    </div>
        
    </div>
   
     
        <div className="md:w-[95%] w-full flex flex-col md:flex-row lg:justify-center mx-auto lg:mt-5  gap-5 bg-bg-light overflow-auto scrollbar-hide p-2 h-[60vh]">
        {/* left */}
     
        <div className="w-full lg:w-1/2 bg-white shadow-xl shadow-bg-secondary-light overflow-auto scrollbar-hide  ">
        {FetchedSection.length === 0 &&  <NoElements core_item="Item"  type="Select" icon={<FileType className="w-24 h-24 text-accent-teal-light animate-pulse" />} />}
       
          
            <div className="w-[90%] rounded-xl   p-2 flex flex-col mx-auto">
            {FetchedSection.length !== 0 && <QuestionAccordion items={FetchedSection} onSectionSelect={handleSectionSelect} selectedID={setSelectedSectionID} selected_type={setselectedquestioType} count={fetchedQuestions?.length} />}
        {/* <QuestionAccordion items={testquestions} onSectionSelect={handleSectionSelect}/> */}
            </div>
              <div className="flex ">
            
             {selectedId &&  <Button icon={<PlusCircle />} label="Add Section" text="white" bg="bg-btn-primary" onClick={() => setIsModalOpen(true)}/>}
           </div>
          </div>
      
        {/* right */}
          <div className="w-full lg:w-1/2 bg-button-primary  rounded-xl">
            
            <div className="flex justify-start last:ms-auto ">
              {selectedquestioType != null ? <> <Button icon={<PlusCircle />} label="Add Question" text="white" bg="bg-btn-primary" onClick={()=>setIsMCQopen(true)} />  <Button icon={<X />} label="Cancel" text="gray-200" bg="black"   /></>: ""}
             
              
          </div>
        <QuestionPreview questions={fetchedQuestions}/>
        </div>
        
        {/* Create ASsessment or Section */}
        <QuestionModal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false)
          setIsassesmentcreated(false)
          }}>
          
          <h1 className='text-center flex text-3xl font-semibold justify-center'> Add New {Isassessmentcreated ? "Assessment" : "Section"} for {!Isassessmentcreated ? selectedtitle : ""} </h1>
  
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
  
              
            {!Isassessmentcreated && <>
              <div className="form-control flex flex-col space-y-2">
                <label className="label">
                  <span className="label-text">Select Type:</span>
                </label>
                <select
  className="select select-bordered w-full bg-[#286575] text-white text-base sm:text-sm md:text-base"
  value={type}
  onChange={(e) => setType(e.target.value)}
>
  <option disabled value="">
    Select Type
  </option>
  {QuestionType.map((qType) => (
    <option key={qType} value={qType}>
      {qType
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
    </option>
  ))}
</select>
              </div>
    
              <Button icon={<PlusCircle />} label={sectionCreated.length != 0 ? sectionCreated : "Add Section"} text="white" bg="bg-btn-primary" onClick={() => {
                handleCreateSection()
                setsectioncreated("Section created")
                setIsMCQopen(true)
                setIsModalOpen(false)
              }} />
            </>}
       
            {Isassessmentcreated &&      <button
          type="button"
          disabled={IsassessementSubmitting}
          onClick={() => handleCreateAssessment()}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${IsassessementSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {IsassessementSubmitting ? 'Creating Assessment ...' : 'Add Assessment'}
        </button>}
              
            </div>
     
  
          </QuestionModal>
          <QuestionModal isOpen={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)}>
          <AssessmentSettings assessmentID={selectedId} assessmentTitle={selectedtitle} />
        </QuestionModal>
        <QuestionModal isOpen={IsGuidanceModalOpen} onClose={() => setGuidanceModalOpen(false)}>
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">How to Create an Assessment</h1>

      <div className="space-y-4 text-gray-700">
        <Step
          icon={<ClipboardList className="text-blue-600" />}
          title="Step 1: Click 'Add Assessment Button'"
          description=" click the 'Add Assessment' button to begin. Add Assessment Will be visible"
        />
        <Step
          icon={<Plus className="text-green-600" />}
          title="Step 2: Click 'Add Section'"
          description=" click 'Add Section' to create a new part of your assessment. modal will be visible once you clicked it"
        />
        <Step
          icon={<Lightbulb className="text-yellow-500" />}
          title="Step 3: Fill Out Section Details"
          description="Provide a title for the section. Then add questions to this section will be appeared."
        />
        <Step
          icon={<Save className="text-purple-600" />}
          title="Step 4: Save the It All"
          description="Save the It All in all your steps"
        />
      </div>

    </div>
          </QuestionModal>
          <QuestionModal isOpen={isMCQopen} onClose={() => {
            setIsMCQopen(false)
            
          }} >
          {selectedquestioType  === "MULTIPLE_CHOICE" ? <MultipleChoiceBuilder/> : selectedquestioType === "TRUE_OR_FALSE" ? <TrueFalseBuilder sectionID={selectedSectionID} sectionType={selectedquestioType} />:selectedquestioType === "ESSAY"?<ShortAnswerBuilder/>: "" }
  
          
          </QuestionModal>
   </div>
      
    </>
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {createAssessment, createSection, createquestion})(CreateAssessment)
