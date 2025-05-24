import React from "react";

const NoDataAvailable = ({message, emoji}) => {
  return (
    <div className=" flex flex-col items-center space-y-5 justify-center mt-23 h-full bg-bg-light text-gray-500">
      {/* <svg
        className="w-20 h-20 text-gray-300 mb-4 animate-bounce text-center mx-auto flex items-center"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 14l6 6m0 0l6-6m-6 6V4m0 24l-6 6m6-6l6 6m-6-6v16"
        />
      </svg> */}
      <span className=" text-9xl text-center animate-pulse duration-300    ">{emoji ? emoji : ""}</span>

      <h2 className="text-lg font-semibold">{message ? message : "No Data Available"} </h2>
      <p className="text-sm mt-1">There’s nothing to display here yet.</p>
    </div>
  );
};

export default NoDataAvailable;
