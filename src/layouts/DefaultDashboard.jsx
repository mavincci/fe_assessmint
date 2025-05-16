import React from 'react';
import { CalendarIcon, ChartBar, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import UpcomingAssignment from '../components/UpcomingAssessment';
import ActivityItem from '../components/ActivityItem';

const ExaminerDashboard = () => {
  // Mock data for the dashboard

  const stats = [
    {
      title: "Total Assessment",
      value: 567,
      icon: (
        <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" stroke-opacity="0.21" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      visible : ["EXAMINER"]
    },
    {
      title: "Pending Evaluation",
      value: 8,
      subtitle: "assignments for evaluation",
      icon: <CalendarIcon className="h-8 w-8" />,
      visible : ["EXAMINER"]

    },
    {
      title: "Scheduled Assignment",
      value: 2,
      subtitle: "Next 7 days",
      icon: <Clock className="h-8 w-8" />,
      visible : ["EXAMINER"]

    },
      {
      title: "Taken Assessment",
      value: 5,
      subtitle: "Next 7 days",
        icon: <Clock className="h-8 w-8" />,
            visible : ["EXAMINEE"]

    },  {
      title: "Pending Assessment ",
      value: 5,
      subtitle: "Next 7 days",
        icon: <Clock className="h-8 w-8" />,
            visible : ["EXAMINEE"]

    },
  ];

  const upcomingAssignments = [
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 },
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 },
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 }
  ];

  const activities = [
    { 
      type: 'created assignment',
      description: 'created assessment',
      details: 'Frontend Developer Skills',
      time: '2 minutes ago' 
    },
    { 
      type: 'evaluation',
      description: 'evaluation new assessment',
      details: 'Python Programming Basics',
      time: '45 minutes ago' 
    },
    { 
      type: 'invitation',
      description: 'invited 3 candidates',
      details: 'Data Science Interview',
      time: '2 hours ago' 
    },
    { 
      type: 'update',
      description: 'modified assessment',
      details: 'UX Design Challenge',
      time: '3 hours ago' 
    },
    { 
      type: 'Add question',
      description: 'added new question bank',
      details: 'JavaScript Algorithms',
      time: '5 hours ago' 
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"))
  const isExaminee = user.roles.some(role => role === "EXAMINER");
  const currentuser= user.roles.filter(role => role !== "USER")[0]
  return (
    <div className="min-h-screen bg-blue-50/50">
      <div className="container mx-auto px-4 py-6">
        {/* <Header userName="Examiner user" /> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            if (stat.visible.includes(currentuser)) {
              return (
                 <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
            />
              )
            }
          })}
        </div>

        {/* Main Content */}
        {
          isExaminee  ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Assignments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-1">Upcoming assignments</h2>
            <p className="text-sm text-gray-500 mb-4">scheduled assignments for the next 7 days</p>
            <div className="divide-y divide-gray-100 space-y-3 p-2">
              {upcomingAssignments.map((assignment, index) => (
                <UpcomingAssignment
                  key={index}
                  title={assignment.title}
                  date={assignment.date}
                  time={assignment.time}
                  candidates={assignment.candidates}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-1">Recent Submission</h2>
            <p className="text-sm text-gray-500 mb-4">4 assignment waiting for review and evaluation</p>
            <div>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  type={activity.type}
                  description={activity.description}
                  details={activity.details}
                  time={activity.time}
                />
              ))}
            </div>
          </div>
          </div> :""
              
        }
        
      </div>
    </div>
  );
};

export default ExaminerDashboard;