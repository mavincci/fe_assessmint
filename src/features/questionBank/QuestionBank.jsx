import React, { useState, useMemo } from 'react'; // Import useMemo
import { MoreHorizontal, Plus, FileText, Search } from 'lucide-react';
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

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all-difficulty");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // State for items per page
  // --- End Pagination State ---


  // Mock data for questions with added type property
  // Casting to the type implicitly or explicitly is good practice if you remove the type alias
  const questionsData /*: Question[]*/ = [
    {
      id: 1,
      question: "What is JavaScript?",
      lastModified: "May 12, 2025",
      difficulty: "Medium",
      category: "JavaScript",
      usedIn: "3 assignments",
      type: "MCQ"
    },
    {
      id: 2,
      question: "Explain closures in JavaScript",
      lastModified: "May 10, 2025",
      difficulty: "Hard",
      category: "JavaScript",
      usedIn: "4 assignments",
      type: "Subjective"
    },
    {
      id: 3,
      question: "What is the difference between Java and JavaScript?",
      lastModified: "May 09, 2025",
      difficulty: "Easy",
      category: "Java",
      usedIn: "5 assignments",
      type: "MCQ"
    },
    {
      id: 4,
      question: "Write a function to check if a string is a palindrome",
      lastModified: "May 05, 2025",
      difficulty: "Medium",
      category: "JavaScript",
      usedIn: "6 assignments",
      type: "Coding"
    },
    {
      id: 5,
      question: "Implement a binary search algorithm",
      lastModified: "May 03, 2025",
      difficulty: "Hard",
      category: "Algorithms",
      usedIn: "5 assignments",
      type: "Coding"
    },
    {
      id: 6,
      question: "Describe the MVC architecture pattern",
      lastModified: "Apr 29, 2025",
      difficulty: "Easy",
      category: "Software Design",
      usedIn: "3 assignments",
      type: "Subjective"
    },
    {
      id: 7,
      question: "How does CSS specificity work?",
      lastModified: "Apr 25, 2025",
      difficulty: "Medium",
      category: "CSS",
      usedIn: "2 assignments",
      type: "MCQ"
    },
     {
      id: 8,
      question: "Implement a Queue using two Stacks",
      lastModified: "Apr 20, 2025",
      difficulty: "Hard",
      category: "Data Structures",
      usedIn: "3 assignments",
      type: "Coding"
    },
     {
      id: 9,
      question: "Explain the concept of hoisting in JavaScript",
      lastModified: "Apr 18, 2025",
      difficulty: "Medium",
      category: "JavaScript",
      usedIn: "1 assignment",
      type: "Subjective"
    },
    {
      id: 10,
      question: "What is JSX?",
      lastModified: "Apr 15, 2025",
      difficulty: "Easy",
      category: "React",
      usedIn: "4 assignments",
      type: "MCQ"
    }
     // Add more mock data if you want more pages
  ];

  // Get unique categories from the data
  const categories = ['all-categories', ...Array.from(new Set(questionsData.map(q => q.category)))];

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
      case 'MCQ':
        return <span className={`${baseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200`}>{type}</span>;
      case 'Subjective':
        return <span className={`${baseClasses} bg-purple-100 text-purple-700 hover:bg-purple-200`}>{type}</span>;
      case 'Coding':
        return <span className={`${baseClasses} bg-teal-100 text-teal-700 hover:bg-teal-200`}>{type}</span>;
      default:
        return <span className={`${baseClasses} badge-outline`}>{type}</span>;
    }
  };

  // Toggle expanded question
  const toggleExpandQuestion = (id) => {
    if (expandedQuestionId === id) {
      setExpandedQuestionId(null);
    } else {
      setExpandedQuestionId(id);
    }
  };

  // Apply all filters to questions - Use useMemo to avoid re-calculating on every render
  const filteredQuestions = useMemo(() => {
      console.log("Filtering questions..."); // Log to see when filtering happens
      return questionsData.filter(question => {
      const matchesSearch =
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'All' || question.type === selectedType;

      const matchesDifficulty =
        selectedDifficulty === 'all-difficulty' ||
        question.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const matchesCategory =
        selectedCategory === 'all-categories' ||
        question.category === selectedCategory;

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
              className={`btn ${selectedType === "MCQ" ? "btn-neutral" : "btn-outline"} flex items-center gap-2`}
              onClick={() => setSelectedType("MCQ")}
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
                  <th className="text-left">Question</th>
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
                      onClick={() => toggleExpandQuestion(question.id)}
                    >
                      <td className="font-medium">
                        <div>
                          {question.question}
                          <div className="text-xs text-gray-500">Last modified: {question.lastModified}</div>
                        </div>
                      </td>
                      <td>{renderTypeBadge(question.type)}</td>
                      <td>{renderDifficultyBadge(question.difficulty)}</td>
                      <td>{question.category}</td>
                      <td>{question.usedIn}</td>
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
                    {/* Expanded content */}
                    {expandedQuestionId === question.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4">
                          <div className="p-2">
                            <h4 className="font-medium mb-2">Question Details</h4>
                            {question.type === 'MCQ' && (
                              <div className="space-y-2">
                                <p>Options:</p>
                                <ul className="list-disc pl-5">
                                  <li>Option A: JavaScript is a programming language</li>
                                  <li>Option B: JavaScript is a markup language</li>
                                  <li>Option C: JavaScript is a styling language</li>
                                  <li>Option D: None of the above</li>
                                </ul>
                                <p className="font-medium text-green-700">Correct Answer: Option A</p>
                              </div>
                            )}
                            {question.type === 'Subjective' && (
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
                            {question.type === 'Coding' && (
                              <div className="space-y-2">
                                <p>Problem Statement:</p>
                                <div className="bg-slate-800 text-white p-3 rounded-md overflow-x-auto">
                                  <pre>
                                    <code className="text-sm">
                                      {question.id === 4 ?
                                        "Write a function isPalindrome(str) that returns true if the given string is a palindrome, false otherwise." :
                                        "Implement a function binarySearch(arr, target) that returns the index of target in sorted array arr or -1 if not found."}
                                    </code>
                                  </pre>
                                </div>
                                <div className="mt-3">
                                  <p className="font-medium">Test Cases:</p>
                                  <ul className="list-disc pl-5">
                                    <li>Basic functionality</li>
                                    <li>Edge cases (empty input)</li>
                                    <li>Performance with large inputs</li>
                                  </ul>
                                </div>
                              </div>
                            )}
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

export default Questions;