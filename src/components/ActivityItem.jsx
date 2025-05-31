import React from 'react';


const ActivityItem = ({ type, description, details, time }) => {
  return (
    <div className="mb-4 last:mb-0 dark:bg-gray-700 dark:text-bg-light">
      <div className="text-sm font-medium  dark:text-bg-light text-gray-700">{type}</div>
      <div className="mt-0.5 text-sm">
        <span className="text-gray-600 dark:text-bg-light">{description} </span>
        <span className="font-medium  dark:text-gray-400 text-gray-900">{details}</span>
      </div>
      <div className="text-xs text-slate-400 mt-0.5">{time}</div>
    </div>
  );
};

export default ActivityItem;