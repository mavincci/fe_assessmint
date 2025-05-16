import React from 'react';


const ActivityItem = ({ type, description, details, time }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-sm font-medium text-gray-700">{type}</div>
      <div className="mt-0.5 text-sm">
        <span className="text-gray-600">{description} </span>
        <span className="font-medium text-gray-900">{details}</span>
      </div>
      <div className="text-xs text-gray-400 mt-0.5">{time}</div>
    </div>
  );
};

export default ActivityItem;