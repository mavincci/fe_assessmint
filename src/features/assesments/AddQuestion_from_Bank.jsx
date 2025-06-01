import React, { useState, useEffect } from 'react';
import CategoryRepoAutocomplete from '../../components/AutoCompleteSearch';
import QuestionBankQuestionPreview from '../questionBank/Managequestion';
import NoDataAvailable from '../../components/NoDataAvailable';
import { X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { sync } from 'framer-motion';
import { add_Questions_from_bank, createquestion } from '../../action/Auth';
import { connect } from 'react-redux';


const RepositoryQuestionViewer = ({add_Questions_from_bank}) => {
  const [selectedRepoID, setSelectedRepoID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuestionIds, setselectedQeustionIds] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const sectionId= useParams().sectionId
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
  // Handle repository selection
  const handleRepoSelect = (repoID) => {
    setIsLoading(true);
    setSelectedRepoID(repoID);
    // Simulate async operation (e.g., fetching questions)
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust delay as needed
  };

  const handleAddQuestion = async () => {
    console.log("Selected Repo,", selectedRepoID, "sectionId", sectionId, "Questions", selectedQuestionIds)
  setShowModal(true);

    for (let i = 0; i < selectedQuestionIds.length  ; i++) {
      const question = selectedQuestionIds[i];
      console.log(`Submitting  question`, i + 1);
     await add_Questions_from_bank(selectedRepoID, question, sectionId)
    console.log("Selected Repo,", selectedRepoID, "sectionId", sectionId, "Questions", question)
      
  setProgress({ current: i + 1, total: selectedQuestionIds.length });
      await sleep(500);
      
    }
  setShowModal(false);
  }
  return (
    <div className="max-h-screen bg-bg-light dark:bg-gray-800 dark:text-bg-light  flex flex-col items-center p-4 sm:p-6 lg:p-8 ">
      {/* Container for the entire component */}
      <div className="w-full max-w-7xl space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <h1 className="md:text-2xl text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Question Repository Selection Area
        </h1>
 
          <button
            onClick={() => window.history.back()}
            className="absolute top-2 right-2 text-bg-light items-center font-semibold text-lg  p-2  bg-accent-teal-light rounded-bl-full "
          >
            <X/>
          </button>
      
        {/* Autocomplete for Repository Selection */}
        <div className="mb-6 flex justify-center">
          <CategoryRepoAutocomplete
            onRepoSelect={handleRepoSelect}
            className="w-full"
          />
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-bg-secondary-light"></div>
          </div>
        ) : selectedRepoID !== null ? (
            <div className="transition-opacity duration-300 ease-in-out">
               {selectedQuestionIds.length > 0 && (
        <div className="flex justify-end mb-4 mt-6">
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-accent-teal-light text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Add {selectedQuestionIds.length} Question
            {selectedQuestionIds.length > 1 ? 's' : ''}
          </button>
        </div>
      )}

              <QuestionBankQuestionPreview bankId={selectedRepoID} onSelectionChange={(selectedID) => setselectedQeustionIds(selectedID)} />
               {showModal && (
  <dialog id="submit_modal" className="modal modal-open">
    <div className="modal-box text-center">
      <h3 className="font-bold text-lg mb-4">Submitting Questions</h3>
      <p>{`${progress.current}/${progress.total} Submitted`}</p>
      <progress className="progress progress-primary w-full mt-4" value={progress.current} max={progress.total}></progress>
    </div>
  </dialog>
)}
          </div>
        ) : (
          <NoDataAvailable
            message="Please select a repository or note that the selected repository has no questions."
            emoji="📊❓"
            className="py-12"
          />
        )}
      </div>
    </div>
  );
};

export default connect(null, {add_Questions_from_bank})(RepositoryQuestionViewer)
