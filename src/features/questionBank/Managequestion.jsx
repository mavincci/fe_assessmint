import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { load_my_question_Bank_by_BankId } from "../../action/Auth";
import LoadingPage from "../../components/Loading";
import NoDataAvailable from "../../components/NoDataAvailable";

const QuestionBankQuestionPreview = ({ bankId, onSelectionChange }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAddFromBankPage = location.pathname.includes("add-from-bank");

  const data = useSelector((state) => state.bankreducer.RepositoryQuestions);
  const loading = useSelector((state) => state.bankreducer.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    if (bankId) {
      dispatch(load_my_question_Bank_by_BankId(bankId));
      setSelectedQuestions([]);
    }
  }, [bankId, dispatch]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedQuestions);
    }
  }, [selectedQuestions, onSelectionChange]);

  const questions = data?.body?.questions || [];
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const paginatedQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`${
          isAddFromBankPage
            ? "bg-white dark:bg-gray-800 dark:text-bg-light md:p-6 overflow-y-auto w-full rounded-lg shadow-md"
            : "h-full bg-gray-50 flex p-4 rounded-lg"
        }`}
      >
        <table className="w-full bg-white rounded-lg overflow-hidden table-zebra">
          <thead className="bg-blue-100 dark:bg-blue-900/40">
            <tr>
              {isAddFromBankPage && (
                <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Select
                </th>
              )}
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                No.
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Question
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isAddFromBankPage ? 3 : 2} className="p-4">
                  <LoadingPage />
                </td>
              </tr>
            ) : paginatedQuestions.length > 0 ? (
              paginatedQuestions.map((question, index) => (
                <tr
                  key={question.id}
                  className={`border-b transition-colors ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-600`}
                >
                  {isAddFromBankPage && (
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={() => handleCheckboxChange(question.id)}
                        className="h-5 w-5 accent-accent-teal-light rounded focus:ring-accent-teal-light dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                  )}
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {question.questionData?.questionText ||
                      "No question text available"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAddFromBankPage ? 3 : 2} className="p-4">
                  <NoDataAvailable
                    message="No questions available in this repository."
                    emoji="📊❓"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {questions.length > itemsPerPage && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                } transition-colors`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionBankQuestionPreview;
