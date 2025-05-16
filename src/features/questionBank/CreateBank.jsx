import React, { useState, useEffect } from 'react';
import { Save, Trash2, XCircle } from 'lucide-react'; // Lucide icons for Save, Delete, Cancel


const CreateQuestionBank = ({ initialData, onSubmit, onDelete, onCancel }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    questionType: 'MULTIPLE_CHOICE', // Default value
    // categoryId: '', // Assuming this might be handled outside the form or as a select
    difficultyLevel: 'EASY', // Default value
  });

  // Effect to populate form data when initialData prop changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        questionType: initialData.questionType || 'MULTIPLE_CHOICE',
        // categoryId: initialData.categoryId || '',
        difficultyLevel: initialData.difficultyLevel || 'EASY',
      });
    } else {
       // Reset form if no initial data is provided (for creation)
       setFormData({
         name: '',
         description: '',
         questionType: 'MULTIPLE_CHOICE',
         // categoryId: '',
         difficultyLevel: 'EASY',
       });
    }
  }, [initialData]); // Re-run effect when initialData changes

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would perform validation here
    onSubmit(formData); // Call the onSubmit prop with the form data
  };

  // Handle delete action
  const handleDelete = () => {
    // In a real app, you would show a confirmation modal here
    if (initialData && initialData.id && onDelete) {
      if (window.confirm("Are you sure you want to delete this category?")) { // Basic confirmation
         onDelete(initialData.id); // Call the onDelete prop
      }
    } else {
        console.warn("Delete called without initialData or onDelete handler.");
        // Handle case where delete is not possible or handler is missing
    }
  };

  return (
    // DaisyUI Modal structure could wrap this form if used in a modal
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
      {/* Form Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {initialData ? 'Edit Category' : 'Create New Category'}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="label">
            <span className="label-text">Category Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Biology Choice Questions"
            className="input input-bordered w-full" // DaisyUI input classes
            value={formData.name}
            onChange={handleInputChange}
            required // HTML5 validation
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            placeholder="e.g., Questions covering fundamental biology concepts"
            className="textarea textarea-bordered w-full h-24" // DaisyUI textarea classes
            value={formData.description}
            onChange={handleInputChange}
            required // HTML5 validation
          ></textarea>
        </div>

        {/* Question Type Select */}
        <div>
          <label className="label">
            <span className="label-text">Question Type</span>
          </label>
          <select
            name="questionType"
            className="select select-bordered w-full" // DaisyUI select classes
            value={formData.questionType}
            onChange={handleInputChange}
            required // HTML5 validation
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="SUBJECTIVE">Subjective</option>
            <option value="CODING">Coding</option>
          </select>
        </div>

        {/* Difficulty Level Select */}
        <div>
          <label className="label">
            <span className="label-text">Difficulty Level</span>
          </label>
          <select
            name="difficultyLevel"
            className="select select-bordered w-full" // DaisyUI select classes
            value={formData.difficultyLevel}
            onChange={handleInputChange}
            required // HTML5 validation
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-end gap-4 mt-6">
           {/* Delete Button (only shown for editing) */}
           {initialData && initialData.id && (
              <button
                 type="button" // Important: Use type="button" to prevent form submission
                 className="btn btn-error flex items-center" // DaisyUI error button
                 onClick={handleDelete}
              >
                 <Trash2 className="mr-1 h-4 w-4" /> {/* Lucide Trash icon */}
                 Delete
              </button>
           )}

           {/* Cancel Button */}
           <button
              type="button" // Important: Use type="button"
              className="btn btn-outline flex items-center" // DaisyUI outline button
              onClick={onCancel} // Call the onCancel prop
           >
              <XCircle className="mr-1 h-4 w-4" /> {/* Lucide Cancel icon */}
              Cancel
           </button>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary flex items-center"> {/* DaisyUI primary button */}
            <Save className="mr-1 h-4 w-4" /> {/* Lucide Save icon */}
            {initialData ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
        {/* --- End Action Buttons --- */}
      </form>
    </div>
  );
};

export default CreateQuestionBank;
