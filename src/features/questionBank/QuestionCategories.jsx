import React, { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Bot } from "lucide-react"; // Import Lucide icons
import QuestionModal from "../../components/QuestionModal";
import {
  create_question_bank,
  create_question_bank_category,
  load_my_categories,
  load_my_question_Bank_by_CategoryId,
} from "../../action/Auth";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const QuestionCategories = ({
  create_question_bank_category,
  create_question_bank,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IscategorySubmitting, setiscategorysubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [Categories, setCastegories] = useState([]);
  const [QuestionType, setQuestionType] = useState([]);
  const [SelectedCategories, setSelectedCastegories] = useState({
    category_id: null,
    category_name: null,
  });
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

    if (SelectedCategories.category_id) {
      setFormData({
        name: "",
        description: "",
        questionType: "MULTIPLE_CHOICE",
        categoryId: SelectedCategories.category_id || "",
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
  }, [SelectedCategories]);
  const handleBanksubmission = () => {
    setiscategorysubmitting(true);
    create_question_bank(
      formData.name,
      formData.description,
      formData.questionType,
      formData.categoryId,
      formData.difficultyLevel
    );

    setiscategorysubmitting(false);
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setWordCount(value.trim() === "" ? 0 : value.trim().split(/\s+/).length);
  };

  const fetchBank_by_categoryId = async (categoryID) => {
     const response = await dispatch(load_my_question_Bank_by_CategoryId(categoryID))
  }
     const fetch_my_categories = async () => {
      const res = await dispatch(load_my_categories());
      if (res?.body) {
        setCastegories(res.body);
      }
    };
  useEffect(() => {
 
    fetch_my_categories();
  }, []);

 
  const handleCreateCategory = async () => {
    setiscategorysubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    create_question_bank_category(formData.name, formData.description);
    await new Promise((resolve) => setTimeout(resolve, 100));
  setiscategorysubmitting(false);
    setIsModalOpen(false);
    await fetch_my_categories()
  
  };
  return (
    // Main container with background and padding
    <div className="min-h-screen bg-blue-50/50 p-6 dark:bg-gray-800 dark:text-bg-light">
      <div className="container mx-auto">
        {/* Header: Title and Create Category Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold w-full">Question Categories</h1>
          {/* DaisyUI Button */}
          <div className="flex flex-row justify-end gap-8 p-2 align-middle items-center w-full">
             <Link to="/ai" >
                <Bot className="w-11 h-11 rounded-full text-btn-primary animate animate-pulse duration-300  dark:text-bg-light "/>
              </Link>
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="p-3 flex flex-row items-center justify-center cursor-pointer bg-btn-primary text-white rounded-xl"
            >
              {" "}
              {/* Using btn-neutral for a darker button */}
             
              <Plus className="mr-1 h-4 w-4" /> {/* Lucide Plus icon */}
              Create Category
            </button>
            {/* {SelectedCategories !==null &&      <button onClick={()=>setIsBankModalOpen(!IsBankModalOpen)} className="p-3 flex flex-row items-center justify-center bg-amber-400 text-white rounded-xl">
            <Plus className="mr-1 h-4 w-4" /> 
            Create Bank
          </button>} */}
          </div>
        </div>


        <div className="flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {Categories.map((category) => (
            <div
              key={category.id}
              className={`card bg-base-100 shadow-xl cursor-pointer transition-colors duration-300  min-w-[300px] w-[384px] dark:bg-gray-700 dark:text-bg-light`}
              onClick={() =>
                setSelectedCastegories({
                  category_id: category.id,
                  category_name: category.name,
                })
              }
            >
              <div className="card-body p-4">
                {/* Card Header: Title and More Options */}
                <div
                  className={` flex justify-between items-start mb-4 p-2 rounded-t-2xl ${category.id === SelectedCategories.category_id
                      ? "bg-bg-secondary-light text-white"
                      : ""
                    }`}
                >
                  <h2 className="card-title text-xl">{category.name}</h2>
                  {/* DaisyUI Dropdown for More Options */}
                  <div className="dropdown dropdown-end text-black">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle btn-sm"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-[1]"
                    >
                      <li>
                        <a>Edit</a>
                      </li>
                      <li>
                        <a>Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Card Description */}
                <p className=" mb-4">{category.description.length >=200  ?  category.description.slice(0,200) + "...":category.description }</p>

                {/* Question Count and Created Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm mb-6">
                  <div className="badge badge-outline">
                    {category.bankCount} Repositories
                  </div>
                  <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Manage Question Button */}
                <div className="card-actions justify-center">
                  <Link
                    onClick={()=>fetchBank_by_categoryId(category.id)}
                    to={`/my-question-repository/${category.name}/${category.id}` }
                    className={` p-2 rounded-xl ${category.id === SelectedCategories.category_id
                        ? "bg-accent-teal-light text-white"
                        : "bg-btn-primary text-white"
                      }`}
                  >
                    Manage Repository
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <h1 className="text-center flex text-3xl font-semibold justify-center">
          {" "}
          Add New{" "}
          {SelectedCategories.category_id !== null ? "Bank" : "Category"}{" "}
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
                {wordCount} words
              </span>
            </div>
            {SelectedCategories.category_id !== null && (
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
                    {QuestionType.map((qType) => (
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
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black  hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${IscategorySubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              clear
            </button>
            {SelectedCategories.category_id === null && (
              <button
                type="button"
                disabled={IscategorySubmitting}
                onClick={() => handleCreateCategory()}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-accent-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${IscategorySubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {IscategorySubmitting
                  ? "Creating Category ..."
                  : "Add Category"}
              </button>
            )}
            {SelectedCategories.category_id !== null && (
              <button
                type="button"
                disabled={IscategorySubmitting}
                onClick={() => handleBanksubmission()}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-accent-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${IscategorySubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {IscategorySubmitting ? "Creating Bank ..." : "Add Bank"}
              </button>
            )}
          </div>
        </div>
      </QuestionModal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  create_question_bank_category,
  create_question_bank,
})(QuestionCategories);
