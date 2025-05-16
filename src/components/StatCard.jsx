import React from 'react';



const StatCard = ({ icon, title, value, subtitle, className }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
      <div className="flex-shrink-0 text-gray-600">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;