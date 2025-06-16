import { Delete, Edit, List, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import NoElements from './NoElements';



const QuestionPreview = ({ questions = [], isLoading = false }) => {
  const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};
  if (isLoading) {
    return (
      <div className="text-center p-10 text-gray-500 text-lg animate-pulse">
        Loading questions...
      </div>
    );
  }

  return (
    <>
      {questions?.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          //  style={{ border: '3px solid red' }}
          className="bg-bg-light dark:bg-gray-800 dark:text-bg-light rounded-xl max-w-full mx-auto p-6 border text-black border-accent-teal-light max-h-full overflow-y-auto space-y-6"
        >
          {questions.map((q, idx) => (
            <motion.div
              key={q.id}
              className="space-y-3 border-b pb-4"
              custom={idx}
              variants={fadeUp}
            >
              <div className="flex items-start gap-2">
                <p className="font-semibold text-gray-700">{idx + 1}.</p>
                <p className="font-medium light:text-gray-800">{q?.questionData.questionText}</p>
                <span className="flex ms-auto space-x-1">
                  <Edit size={18} className="text-amber-500 hover:text-amber-600 cursor-pointer" />
                  <Delete size={18} className="text-red-500 hover:text-red-600 cursor-pointer" />
                </span>
              </div>

              {/* True / False Question */}
              {q?.questionType === 'TRUE_OR_FALSE' && (
                <div className="flex flex-col gap-2 pl-6">
                  {['True', 'False'].map((val, i) => {
                    const isCorrect = (val === 'True' && q.questionData.answer === true) ||
                                      (val === 'False' && q.questionData.answer === false);
                    return (
                      <div key={val} className="light:text-gray-700 flex items-center gap-2">
                        <span className="font-semibold">{i === 0 ? 'A)' : 'B)'}</span> {val}
                        {isCorrect && (
                          <CheckCircle2 size={16} className="text-green-500 ml-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Multiple Choice */}
              {q.questionType === 'MULTIPLE_CHOICE' && (
                <div className="flex flex-col gap-2 pl-6">
                  {q.questionData.options.map((opt, index) => {
                    const isCorrect = q.questionData.answers.includes(opt.id);
                    return (
                      <div key={opt.id} className="flex items-center gap-2">
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                        <span className={`light:text-gray-800 ${isCorrect ? 'text-green-600 font-semibold' : ''}`}>
                          {opt.answerText}
                        </span>
                        {isCorrect && <CheckCircle2 size={16} className="text-green-500" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='border border-accent-teal-light rounded-xl h-full'
        >
          <NoElements
            core_item="Question"
            todo="Question"
            type="add"
            icon={<List className="w-24 h-24 text-accent-teal-light animate-pulse" />}
          />
        </motion.div>
      )}
    </>
  );
};

export default QuestionPreview;
