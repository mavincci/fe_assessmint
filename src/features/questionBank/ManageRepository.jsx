import React, { useState, useMemo, useEffect } from 'react'; // Import useMemo
import { MoreHorizontal, Plus, FileText, Search } from 'lucide-react';
import { load_my_question_Bank } from '../../action/Auth';
import { useDispatch } from 'react-redux';
import MCQquestions from '../questionTypes/MCQquestions';
import QuestionModal from '../../components/QuestionModal';
import TFquestions from '../questionTypes/TFquestions';
import QuestionBankQuestionPreview from './Managequestion';
import { useParams } from 'react-router-dom';
// Import statements for ShadCN/UI components are removed


// Question type definition (keeping it for clarity, though removed from state type)
// type QuestionType = 'MCQ' | 'Subjective' | 'Coding' | 'All';
// type Question = {
//   id: number;
//   question: string;
//   lastModified: string;
//   difficulty: 'Easy' | 'Medium' | 'Hard';
//   category: string;
//   usedIn: string;
//   type: QuestionType;
// };

const ManageRepository = () => {
  const categoryId = useParams()
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all-difficulty");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [SelectedQuestionType, setQuestionType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionsData, setQuestionBank] = useState([]);
  const dispatch = useDispatch()
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // State for items per page
  // --- End Pagination State ---


  // Mock data for questions with added type property
  // Casting to the type implicitly or explicitly is good practice if you remove the type alias
 
    
    
        useEffect(() => {
               const fetch_my_question_bank = async () => {
           const res = await dispatch(load_my_question_Bank());
           if (res?.body) {
             setQuestionBank(res.body);
     
           }
            };
            fetch_my_question_bank();
           
        },[])

    console.log("Question bank", questionsData)
  // Get unique categories from the data
  const categories = ['all-categories', ...Array.from(new Set(questionsData.map(q => q.category.name)))];

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
    if (expandedQuestionId === id) {
      setExpandedQuestionId(null);
    } else {
        setExpandedQuestionId(id);
        setQuestionType(type)
    }
  };

  // Apply all filters to questions - Use useMemo to avoid re-calculating on every render
  const filteredQuestions = useMemo(() => {
      console.log("Filtering questions..."); // Log to see when filtering happens
      return questionsData.filter(question => {
      const matchesSearch = question.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||question.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'All' || question.questionType === selectedType;

      const matchesDifficulty =
        selectedDifficulty === 'all-difficulty' ||
        question.difficultyLevel.toLowerCase() === selectedDifficulty.toLowerCase();

      const matchesCategory =
        selectedCategory === 'all-categories' ||
        question.category.name === selectedCategory;

      return matchesSearch && matchesType && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedDifficulty, selectedCategory, questionsData]); // Depend on filter states and source data

  // --- Pagination Logic Calculations ---
  const totalItems = filteredQuestions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuestions.slice(indexOfFirstItem, indexOfLastItem);
  // --- End Pagination Logic Calculations ---

  // --- Pagination Handlers ---
  const handlePageChange = (pageNumber) => {
      // Ensure page number is within valid range
      const newPage = Math.max(1, Math.min(pageNumber, totalPages === 0 ? 1 : totalPages));
       // Reset expanded item when page changes
      setExpandedQuestionId(null);
      setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (value) => {
    const newItemsPerPage = parseInt(value, 10);
     // Reset expanded item when items per page changes
    setExpandedQuestionId(null);
    setItemsPerPage(newItemsPerPage);
    // Optional: Reset to page 1 when items per page changes
    // setCurrentPage(1);
     // Or, try to keep the current item visible if possible - more complex
     // For simplicity, let's just reset to 1 if the current page number is now invalid
     if (currentPage > Math.ceil(totalItems / newItemsPerPage)) {
         setCurrentPage(1);
     }
  };
  // --- End Pagination Handlers ---


  return (
    <div className="min-h-screen bg-blue-50/50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Question Bank</h1>
          <button className="btn bg-slate-700 text-white hover:bg-slate-800">
            <Plus className="mr-1 h-4 w-4" />
            Create Question
          </button>


        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Question Type filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              className={`btn ${selectedType === "All" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
              onClick={() => setSelectedType("All")}
            >
              <FileText className="h-4 w-4" />
              All Types
                      </button>
                       <button
              className={`btn ${selectedType === "TRUE_OR_FALSE" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
              onClick={() => setSelectedType("TRUE_OR_FALSE")}
            >
              <FileText className="h-4 w-4" />
              True Or False
            </button>
            <button
              className={`btn ${selectedType === "MULTIPLE_CHOICE" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
              onClick={() => setSelectedType("MULTIPLE_CHOICE")}
            >
              <FileText className="h-4 w-4" />
              MCQ
            </button>
            <button
              className={`btn ${selectedType === "Subjective" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
              onClick={() => setSelectedType("Subjective")}
            >
              <FileText className="h-4 w-4" />
              Subjective
            </button>
            <button
              className={`btn ${selectedType === "Coding" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
              onClick={() => setSelectedType("Coding")}
            >
              <FileText className="h-4 w-4" />
              &lt;/&gt; Coding
            </button>

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
               <select
                className="select select-bordered w-full md:w-[160px]" // DaisyUI select classes + original Tailwind width
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all-categories">All Categories</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Difficulty filter */}
              <select
                className="select select-bordered w-full md:w-[160px]" // DaisyUI select classes + original Tailwind width
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
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
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-left">Repository</th>
                  <th>Type</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Used In</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                           {/* Map over currentItems (data for the current page) */}
                {currentItems.map((question) => (
                  <React.Fragment key={question.id}>
                    <tr
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpandQuestion(question.id, question.questionType)}
                    >
                      <td className="font-medium">
                        <div className=''>
                          {question.name}
                          <div className="text-xs text-gray-500">description: {question.description.slice(0,120)}</div>
                        </div>
                      </td>
                      <td>{renderTypeBadge(question.questionType)}</td>
                      <td>{renderDifficultyBadge(question.difficultyLevel)}</td>
                      <td>{question.category.name}</td>
                      <td>{question.usedIn || "3 assessment"} </td>
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
                    {expandedQuestionId === question.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4">
                          <div className="w-full flex gap-4">
                            {/* Left Section */}
                            <div className="w-1/2 bg-white p-4 rounded shadow">
                              <h4 className="font-medium mb-2">Add Question under 
                                <span className='uppercase text-bold bg-accent-teal-light p-1 rounded text-white'> {question.name}</span>
                              </h4>
                              {question.questionType === 'MULTIPLE_CHOICE' && (
                                <MCQquestions bankId={question.id} sectionType={question.questionType}/>
                              )}
                              {question.questionType === 'Subjective' && (
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
                              {question.questionType === 'TRUE_OR_FALSE' && (
                                <TFquestions bankId={question.id} sectionType={question.questionType}/>
                              )}
                            </div>
                            {/* Right Section */}
                            <div className="w-1/2 bg-white p-4 rounded shadow">
                              <QuestionBankQuestionPreview />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {/* Add empty rows if currentItems is less than itemsPerPage to maintain table height */}
                {currentItems.length < itemsPerPage && Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
                    <tr key={`empty-${index}`} className="h-12"> {/* Add a minimum height */}
                        <td colSpan={6}></td> {/* Empty cells spanning all columns */}
                    </tr>
                ))}
                 {/* Message if no results found after filtering */}
                {filteredQuestions.length === 0 && (
                     <tr>
                        <td colSpan={6} className="text-center py-4 text-gray-500">No questions found matching your criteria.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- Pagination Controls --- */}
           {totalItems > 0 && ( // Only show pagination if there are items
            <div className="mt-6 flex flex-wrap justify-between items-center bg-accent-teal-light p-3 text-white rounded-b-xl">
                {/* Items per page selector */}
                 <div className="flex flex-row items-center gap-2 mb-3 md:mb-0 w-[20%]">
                    <span className='w-fit'>Items/page:</span>
                     <select
                       className="select select-bordered select-sm bg-accent-teal-light" // DaisyUI select classes
                       value={itemsPerPage}
                       onChange={(e) => handleItemsPerPageChange(e.target.value)}
                     >
                       <option value={5}>5</option>
                       <option value={10}>10</option>
                       <option value={20}>20</option>
                       <option value={50}>50</option>
                     </select>
                 </div>

                {/* Page Info */}
                <div className="text-sm text-gray-700 mb-3 md:mb-0">
                    Showing {Math.min(totalItems, indexOfFirstItem + 1)}-{Math.min(totalItems, indexOfLastItem)} of {totalItems} questions
                </div>

                {/* Pagination Buttons (Using DaisyUI btn-group or individual buttons) */}
                {/* Example using individual buttons */}
                <div className="join"> {/* DaisyUI join class for button grouping */}
                    <button
                        className="join-item btn btn-outline btn-sm" // DaisyUI button classes
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {/* Optional: Display page numbers - more complex, skipping for this example */}
                    {/* For a simple implementation, just Previous/Next is often enough */}
                    {/* If you want page numbers, you'd loop from 1 to totalPages and create a button for each */}
                     {/* Example: showing current page out of total */}
                     <button className="join-item btn btn-outline btn-sm pointer-events-none">
                         Page {currentPage} of {totalPages}
                     </button>

                    <button
                        className="join-item btn btn-outline btn-sm" // DaisyUI button classes
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0} // Disable if no pages
                    >
                        Next
                    </button>
                </div>
            </div>
           )}
          {/* --- End Pagination Controls --- */}

        </div>
      </div>
    </div>
  );
};

export default ManageRepository;