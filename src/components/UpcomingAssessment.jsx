import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@mui/material';
const UpcomingAssignment = ({ title, date, time, candidates }) => {
  return (
    <div className="rounded-xl md:p-4 p-1 border-b border-2 space-y-4 border-gray-100">
      <h3 className="font-medium text-gray-800">{title}</h3>
      <div className="mt-2 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Users className="h-4 w-4" />
          <span>{candidates} candidates</span>
        </div>
        <div className="flex gap-2">
          <button variant="outline" size="sm" className="text-xs h-7 px-3">
            Edit
          </button>
          <button 
            size="sm" 
            className="text-xs h-7 px-3 bg-btn-primary hover:bg-teal-800 text-white rounded-full"
          >
            manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAssignment;