import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-opacity-50 mb-6"></div>
      <h2 className="text-xl font-semibold animate-pulse">
        Loading, please wait...
      </h2>
      <p className="text-sm text-gray-500 mt-2">Fetching your data securely.</p>
    </div>
  );
};

export default LoadingPage;
