import {
  ChevronDown,
  ChevronUp,
  Edit,
} from "lucide-react";
import React, { useState } from "react";

const QuestionAccordion = ({
  items,
  onSectionSelect,
  selectedID,
  selected_type,
  count,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    if (newIndex !== null) {
      const selectedSection = items[newIndex];
      onSectionSelect(selectedSection.questions);
      selectedID(selectedSection.id); //call back parent with section id
      selected_type(selectedSection.questionType);
    } else {
      onSectionSelect([]);
      selectedID(null);
      selected_type(null);
    }
  };
  return (
    <div className="w-[90%] mx-auto mt-3 mb-3 space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-accent-teal-light rounded-md shadow-sm overflow-hidden"
        >
          <button
            className={`flex justify-between w-full p-4 mb-0 duration-300 transition text-left ${
              openIndex === index
                ? "bg-accent-teal-light text-white"
                : "bg-white dark:bg-gray-800 dark:text-bg-light"
            }`}
            onClick={() => toggle(index)}
          >
            <div className="flex flex-col">
              <span>
                <b>Title:</b> {item.title}
              </span>
              <span>
                <b>Type:</b> {item.questionType.replaceAll("_", " ")}
              </span>
            </div>
            <span>{openIndex === index ? <ChevronDown /> : <ChevronUp />}</span>
          </button>

          {openIndex === index && (
            <>
              <p className="flex justify-end ms-auto mr-3 p-1 max-w-fit ">
                Number of Questions
                <strong className="ml-1 text-center rounded bg-accent-teal-light h-7 min-w-8 max-w-fit text-white">
                  {count || "0"}
                </strong>
              </p>
              <div className="p-4 bg-white dark:bg-gray-800 dark:text-bg-light text-gray-700 border-2 border-accent-teal-light rounded-xl my-5 w-[95%] mx-auto relative">
                <Edit className="absolute top-2 right-2" />
                <b>Description:</b> {item.description}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionAccordion;
