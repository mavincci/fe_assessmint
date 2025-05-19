import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Plus } from 'lucide-react';

const mockData = {
  id: "142b8c5c-76cb-49f4-80ca-b61cb38e39fd",
  name: "Js Library",
  description: "Js library",
  questionType: "TRUE_OR_FALSE",
  difficultyLevel: "EASY",
  category: {
    id: "902982e1-52bd-4df0-a087-cb8ddb2e2471",
    name: "JavaScript"
  },
  questions: [
    {
      id: "4d67f47a-ef92-43d5-ab53-fc61af05a413",
      questionData: {
        questionText: "React.js uses a virtual DOM to improve rendering performance."
      }
    },
    {
      id: "5e23f57b-ef12-45a5-a561-df61bf05a422",
      questionData: {
        questionText: "JavaScript is a strongly typed language."
      }
    }
  ]
};

const QuestionBankQuestionPreview = () => {
  const data = mockData;

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
    
        <div className="flex justify-end mb-4">
          <button className="bg-btn-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-btn-primary">
            <Plus size={16} /> Add Question
          </button>
        </div>
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 text-left">Question Text</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.questions.map((question, index) => (
              <tr 
                key={question.id}
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-2 text-gray-700">{question.questionData.questionText}</td>
                <td className="p-2 flex items-center gap-2">
                  <button className="text-blue-500 hover:text-blue-600">
                    <Edit3 size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default QuestionBankQuestionPreview;
