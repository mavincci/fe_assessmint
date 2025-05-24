import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

export default function QuestionTable({ response, onDelete, onEdit }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditStart = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const handleEditSave = (index) => {
    onEdit(index, editText);
    setEditingIndex(null);
  };

  const isTFQuestion = (question) => {
    return 'answer' in question;
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Question</th>
            <th>{isTFQuestion(response.body[0]) ? 'Answer' : 'Options'}</th>
            <th className="w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {response.body.map((question, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="input input-bordered w-full"
                  />
                ) : (
                  question.questionText
                )}
              </td>
              <td>
                {isTFQuestion(question) ? (
                  <span className={question.answer ? 'text-success' : 'text-error'}>
                    {question.answer ? 'True' : 'False'}
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {question.options.map((option, i) => (
                      <span
                        key={i}
                        className={`badge ${
                          question.answers.includes(option)
                            ? 'badge-success'
                            : 'badge-ghost'
                        }`}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditSave(index)}
                      className="btn btn-square btn-sm btn-success"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="btn btn-square btn-sm btn-error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditStart(index, question.questionText)}
                      className="btn btn-square btn-sm btn-ghost"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="btn btn-square btn-sm btn-ghost text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}