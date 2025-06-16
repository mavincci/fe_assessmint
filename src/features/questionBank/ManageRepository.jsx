import React, { useState, useMemo, useEffect } from 'react'; // Import useMemo
import { MoreHorizontal, Plus, FileText, Search } from 'lucide-react';
import { create_question_bank, load_my_question_Bank, load_my_question_Bank_by_CategoryId } from '../../action/Auth';
import { connect, useDispatch, useSelector } from 'react-redux';
import MCQquestions from '../questionTypes/MCQquestions';
import QuestionModal from '../../components/QuestionModal';
import TFquestions from '../questionTypes/TFquestions';
import QuestionBankQuestionPreview from './Managequestion';
import { useParams } from 'react-router-dom';
import { useLoadQuestionType } from '../../hooks/useQuestionType';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../components/Pagination';


const ManageRepository = ({create_question_bank}) => {
  const categoryId = useParams().categoryId
  const categoryName = useParams().categoryName
  const QuestionType = useSelector((state)=>state.assessment.QuestionType?.body)
  const initialState = {
    selectedType: "All",
    selectedDifficulty: "all-difficulty",
    selectedCategory: "all-categories",
    expandedQuestionId: null,
    SelectedQuestionType: null,
    searchQuery: "",
    wordCount: 0,
    
    
  }
  const [state, setState] = useState(initialState);
  
const updateField = (field, value) => {
  setState(prev => ({
    ...prev,
    [field]: value,
  }));
  };
  // load question type 
  useLoadQuestionType()
  
  const [searchQuery, setSearchQuery] = useState("");
  const [IsRepoSubmitting, setIsRepoSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] =useState(false)
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    questionType: "MULTIPLE_CHOICE",
    categoryId: "",
    difficultyLevel: "EASY",
  });
  useEffect(() => {

    if (categoryId) {
      setFormData({
        name: "",
        description: "",
        questionType: "MULTIPLE_CHOICE",
        categoryId: categoryId || "",
        difficultyLevel: "EASY",
      });
    } else {
      // Reset form if no initial data is provided (for creation)
      setFormData({
        name: "",
        description: "",
        questionType: "MULTIPLE_CHOICE",
        categoryId: "",
        difficultyLevel: "EASY",
      });
    }
  }, []);
  const handleBanksubmission = async() => {
    setIsRepoSubmitting(true);
    create_question_bank(
      formData.name,
      formData.description,
      formData.questionType,
      formData.categoryId,
      formData.difficultyLevel
    );
       await new Promise((resolve) => setTimeout(resolve, 300)); 

          await dispatch(load_my_question_Bank_by_CategoryId(categoryId));
 setFormData({
        name: "",
        description: "",
        questionType: "MULTIPLE_CHOICE",
        categoryId: categoryId || "",
        difficultyLevel: "EASY",
      });
    setIsRepoSubmitting(false);
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    updateField("wordCount",(value.trim() === "" ? 0 : value.trim().split(/\s+/).length))
  };

  // Mock data for questions with added type property
  // Casting to the type implicitly or explicitly is good practice if you remove the type alias
 
  const questionsData = useSelector((state) => state.bankreducer.BankRepositoryByID?.body)
    const fetch_my_question_bank_by_category_Id = async () => {
          await dispatch(load_my_question_Bank_by_CategoryId(categoryId));
          };
          
        useEffect(() => {
             
            fetch_my_question_bank_by_category_Id();
           
        },[])

  // Get unique categories from the data
  const categories = ['all-categories', ...Array.from(new Set(questionsData?.map(q => q.name)))];

  // Function to render difficulty badge with appropriate color (using Tailwind classes)
  const renderDifficultyBadge = (difficulty) => {
    const baseClasses = "badge border-0 ";
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return <span className={`${baseClasses} bg-green-100 text-green-700 hover:bg-green-200`}>{difficulty}</span>;
      case 'medium':
        return <span className={`${baseClasses} bg-amber-100 text-amber-700 hover:bg-amber-200`}>{difficulty}</span>;
      case 'hard':
        return <span className={`${baseClasses} bg-pink-100 text-pink-700 hover:bg-pink-200`}>{difficulty}</span>;
      default:
        return <span className={`${baseClasses} badge-outline`}>{difficulty}</span>;
    }
  };

  // Function to render question type badge with appropriate color (using Tailwind classes)
  const renderTypeBadge = (type) => {
    const baseClasses = "badge border-0 ";
    switch (type) {
      case 'MULTIPLE_CHOICE':
        return <span className={`${baseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200`}>{type.toLowerCase().replaceAll("_", " ")}</span>;
      case 'TRUE_OR_FALSE':
        return <span className={`${baseClasses} bg-purple-100 text-purple-700 hover:bg-purple-200`}>{type.toLowerCase().replaceAll("_", " ")}</span>;
         case 'Subjective':
        return <span className={`${baseClasses} bg-purple-100 text-purple-700 hover:bg-purple-200`}>{type.toLowerCase().replaceAll("_", " ")}</span>;
      case 'Coding':
        return <span className={`${baseClasses} bg-teal-100 text-teal-700 hover:bg-teal-200`}>{type}</span>;
      default:
        return <span className={`${baseClasses} badge-outline`}>{type}</span>;
    }
  };

  // Toggle expanded question
  const toggleExpandQuestion = (id,type) => {
    if (state.expandedQuestionId === id) {
      updateField("expandedQuestionId", null)
      // setExpandedQuestionId(null);
    } else {
      updateField("expandedQuestionId", id)

      // setExpandedQuestionId(id);
            updateField("SelectedQuestionType", type)

        // setQuestionType(type)
    }
  };

  // Apply all filters to questions - Use useMemo to avoid re-calculating on every render
  const filteredQuestions = useMemo(() => {
      return questionsData?.filter(question => {
      const matchesSearch = question.name.toLowerCase().includes(searchQuery.toLowerCase()) ||question.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = state.selectedType === 'All' || question.questionType === state.selectedType;

      const matchesDifficulty =
        state.selectedDifficulty === 'all-difficulty' ||
        question.difficultyLevel.toLowerCase() === state.selectedDifficulty.toLowerCase();

      const matchesCategory =
        state.selectedCategory === 'all-categories' ||
        question.name === state.selectedCategory;

      return matchesSearch && matchesType && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, state.selectedType, state.selectedDifficulty, state.selectedCategory, questionsData]); // Depend on filter states and source data


const {
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem,
  currentItems,
  handlePageChange,
  handleItemsPerPageChange,
} = usePagination(filteredQuestions, filteredQuestions?.length <=4 ? filteredQuestions.length : 5);
  return (
    <div className="min-h-screen bg-blue-50/50 p-6 dark:bg-gray-800 dark:text-bg-light ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row  space-y-5 md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold  ">Question Repository under <span className='px-2 bg-accent-teal-light text-white'> {categoryName}</span></h1>
          <button className="btn bg-btn-primary text-white hover:bg-slate-800"
            onClick={() => { setIsModalOpen(true)
            
          }}>
            <Plus className="mr-1 h-4 w-4" />
            Create Repository
          </button>


        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700 dark:text-bg-light">
          {/* Question Type filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              className={`btn ${state.selectedType === "All" ? "bg-btn-primary text-white" : "btn-outline"} flex items-center gap-2`}
              onClick= {() => updateField("selectedType","All")}
            >
              <FileText className="h-4 w-4" />
              All Types
                      </button>
                       <button
              className={`btn ${state.selectedType === "TRUE_OR_FALSE" ? "bg-btn-primary text-white" : "btn-outline"} flex items-center gap-2`}
              onClick= {() => updateField("selectedType","TRUE_OR_FALSE")}
            >
              <FileText className="h-4 w-4" />
              True Or False
            </button>
            <button
              className={`btn ${state.selectedType === "MULTIPLE_CHOICE" ? "bg-btn-primary text-white" : "btn-outline"} flex items-center gap-2`}
              onClick={() => updateField("selectedType","MULTIPLE_CHOICE")}
            >
              <FileText className="h-4 w-4" />
              MCQ
            </button>
            {/* <button
              className={`btn ${selectedType === "Subjective" ? "bg-btn-primary text-white" : "btn-outline"} flex items-center gap-2`}
                           onClick={() => updateField("selectedType","Subjective")}

            >
              <FileText className="h-4 w-4" />
              Subjective
            </button> */}
            {/* <button
              className={`btn ${state.selectedType === "Coding" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
                            onClick={() => updateField("selectedType","Coding")}
            >
              <FileText className="h-4 w-4" />
              &lt;/&gt; Coding
            </button> */}

            <div className="md:ml-auto w-full md:w-auto flex flex-wrap gap-3 mt-3 md:mt-0">
              {/* Search input */}
              <div className="relative w-full md:w-60">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search question or category..."
                  className="input input-bordered w-full pl-9" // Used DaisyUI input classes
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category filter */}
               {/* <select
                className="select select-bordered w-full md:w-[160px]" // DaisyUI select classes + original Tailwind width
                value={state.selectedCategory}
                // onChange={(e) => setSelectedCategory(e.target.value)}
                onchange ={()=> updateField("selectedCategory", e.target.value)}
              >
                <option value="all-categories">All Categories</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select> */}

              {/* Difficulty filter */}
              <select
                className="select select-bordered w-full md:w-[160px]" // DaisyUI select classes + original Tailwind width
                value={state.selectedDifficulty}
                // onChange={(e) => setSelectedDifficulty(e.target.value)}
                onChange={(e) => updateField("selectedDifficulty",e.target.value)}

              >
                <option value="all-difficulty">All Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Questions Table */}
          <div className="overflow-x-auto">
            {/* DaisyUI table */}
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th className="text-left">Repository</th>
                  <th>Type</th>
                  <th>Difficulty</th>
                  <th>Questions</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                           {/* Map over currentItems (data for the current page) */}
                {currentItems?.map((repo) => (
                  <React.Fragment key={repo.id}>
                    <tr
                      className="hover:bg-gray-50 cursor-pointer w-full dark:hover:bg-gray-600"
                      onClick={() => toggleExpandQuestion(repo.id, repo.questionType)}
                    >
                      <td className="font-medium">
                        <div className=''>
                          {repo.name}
                          <div className="text-xs text-gray-500">description: {repo.description.length >=120 ? repo.description.slice(0,120) +"...": repo.description }</div>
                        </div>
                      </td>
                      <td>{renderTypeBadge(repo.questionType)}</td>
                      <td>{renderDifficultyBadge(repo.difficultyLevel)}</td>
                      <td>{repo.noOfQuestions}</td>
                      <td className="text-right">
                         {/* DaisyUI Dropdown */}
                         <div className="dropdown dropdown-left">
                           <div
                             tabIndex={0}
                             role="button"
                             className="btn btn-ghost btn-circle"
                             onClick={(e) => e.stopPropagation()}
                           >
                             <MoreHorizontal className="h-4 w-4" />
                           </div>
                           <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
                             <li><a>Edit</a></li>
                             <li><a>Duplicate</a></li>
                             <li><a>Delete</a></li>
                           </ul>
                         </div>
                       </td>
                    </tr>
                    {/* Expanded content - Full Width */}
                    {state.expandedQuestionId === repo.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4">
                          <div className="w-full flex gap-4">
                            {/* Left Section */}
                            <div className="w-1/2 bg-white p-4 rounded shadow dark:bg-gray-700 dark:text-bg-light">
                              <h4 className="font-medium mb-2">Add Question under 
                                <span className='uppercase text-bold bg-accent-teal-light p-1 rounded text-white'> {repo.name}</span>
                              </h4>
                              {repo?.questionType === 'MULTIPLE_CHOICE' && (
                                <MCQquestions bankId={repo.id} sectionType={repo.questionType}/>
                              )}
                              {repo?.questionType === 'Subjective' && (
                                <div className="space-y-2">
                                  <p>Expected Answer Points:</p>
                                  <ul className="list-disc pl-5">
                                    <li>Definition of the concept</li>
                                    <li>Key characteristics</li>
                                    <li>Example use cases</li>
                                    <li>Proper references</li>
                                  </ul>
                                  <p className="text-sm text-gray-600 mt-2">
                                    Word limit: 250-300 words
                                  </p>
                                </div>
                              )}
                              {repo.questionType === 'TRUE_OR_FALSE' && (
                                <TFquestions bankId={repo.id} sectionType={repo.questionType}/>
                              )}
                            </div>
                            {/* Right Section */}
                            <div className="w-1/2 bg-white p-4 rounded shadow">
                              <QuestionBankQuestionPreview bankId={repo.id} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {/* Add empty rows if currentItems is less than itemsPerPage to maintain table height */}
                {currentItems?.length < itemsPerPage && Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
                    <tr key={`${index}`} className="h-12"> {/* Add a minimum height */}
                        <td colSpan={6}></td> {/* Empty cells spanning all columns */}
                    </tr>
                ))}
                 {/* Message if no results found after filtering */}
                {filteredQuestions?.length === 0 && (
                     <tr>
                        <td colSpan={6} className="text-center py-4 text-gray-500">No questions found matching your criteria.</td>
                    </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    <div className="w-full">
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          handlePageChange={handlePageChange}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
        />
                    </div>
                    </td>
                </tr>
              </tfoot>
            </table>
          </div>
     

        </div>

            <QuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <h1 className="text-center flex text-3xl font-semibold justify-center">
          Add New Repository
        </h1>

        <div className="space-y-4">
          <fieldset className="fieldset border border-base-300 rounded-lg p-4">
            <legend className="fieldset-legend px-2 text-sm font-medium">
              Enter Title <sup className="text-red-400">*</sup>
            </legend>
            <input
              type="text"
              name="name"
              className="input border-none  w-full outline outline-accent-teal-light focus:outline-accent-teal-dark"
              placeholder="Type here"
              value={formData.name}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className="fieldset border border-base-300 rounded-lg p-4">
            <legend className="fieldset-legend px-2 text-sm font-medium">
              Enter Description/ <sup className="text-red-400">*</sup>
            </legend>
            <div className="relative">
              <textarea
                placeholder="Enter Description more less than 30 words"
                className="textarea textarea-accent w-full h-32 resize-none"
                name="description"
                value={formData.description}
                onChange={handleDescriptionChange}
              />
              <span className="absolute bottom-2 right-4 text-sm text-gray-500">
                {state.wordCount} words
              </span>
            </div>
            {categoryId !== null && (
              <>
                <div className="space-y-2 mb-4 ">
                  <label className="label">
                    <span className="label-text">Question Type</span>
                  </label>
                  <select
                    name="questionType"
                    className="select select-bordered  select-accent w-full" // DaisyUI select classes
                    value={formData.questionType}
                    onChange={handleInputChange}
                    required
                  >
                    {QuestionType?.map((qType) => (
                      <option key={qType} value={qType}>
                        {qType
                          .replaceAll("_", " ")
                          .toLowerCase()
                          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Difficulty Level</span>
                  </label>
                  <select
                    name="difficultyLevel"
                    className="select select-bordered select-accent w-full" // DaisyUI select classes
                    value={formData.difficultyLevel}
                    onChange={handleInputChange}
                    required // HTML5 validation
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </>
            )}
          </fieldset>

          <div className="flex flex-row gap-5">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
              }}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black  hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${IsRepoSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              clear
            </button>
      
              <button
                type="button"
                disabled={IsRepoSubmitting}
                onClick={() => handleBanksubmission()}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-accent-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${IsRepoSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {IsRepoSubmitting ? "Creating Repository ..." : "Add Repository"}
              </button>
          </div>
        </div>
      </QuestionModal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  create_question_bank,
})(ManageRepository);
