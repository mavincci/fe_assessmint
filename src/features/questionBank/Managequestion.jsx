import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { load_my_question_Bank_by_BankId } from '../../action/Auth';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../../components/Loading';
import NoDataAvailable from '../../components/NoDataAvailable';

const QuestionBankQuestionPreview = ({ bankId }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bankreducer.RepositoryQuestions);
  const loading = useSelector((state) => state.bankreducer.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
 console.log("data",data)
  useEffect(() => {
    if (bankId) {
      dispatch(load_my_question_Bank_by_BankId(bankId));
    }
  }, [bankId, dispatch]);

  const questions = data?.body?.questions || [];
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const paginatedQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const no_of_question =questions.length 

  return (
    <div className="h-full bg-gray-50 flex p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl w-full"
      >
        <table className="w-full bg-white rounded-lg overflow-hidden table-zebra">
          <thead className="bg-btn-primary/40">
            <tr>
              <th className="p-2 text-left">No.</th>
              <th className="p-2 text-left">Question</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3}>
                  <LoadingPage />
                </td>
              </tr>
            ) : paginatedQuestions.length > 0 ? (
              paginatedQuestions.map((question, index) => (
                <tr
                  key={question.id}
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="p-2 text-gray-700">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-2 text-gray-700">
                    {question.questionData?.questionText}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <NoDataAvailable />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {questions.length > itemsPerPage && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-btn-primary text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
