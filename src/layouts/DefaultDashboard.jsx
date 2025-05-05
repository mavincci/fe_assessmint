
import { Search, Bell, Clock, ChevronRight, Calendar } from "lucide-react"
import dashboardicon from "../assets/icondashboard.png"
import MiniAssignmentCard from "../components/SmallAssesmentCard"
export default function DefaultDashboard() {
  // Sample data for assessments
  const assessments = [
    {
      id: 1,
      title: "Technical Skills Assessment",
      progress: 15,
      dueDate: "May 15, 2025",
      daysLeft: 3,
    },
    {
      id: 2,
      title: "Technical Skills Assessment",
      progress: 95,
      dueDate: "May 18, 2025",
      daysLeft: 3,
    },
  ]

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      title: "Technical Interview",
      date: "April 23, 2025",
          status: "completed",
      score:89
    },
    {
      id: 2,
      title: "Technical Interview",
      date: "April 25, 2025",
        status: "completed",
        score:50
      
    },
    {
      id: 3,
      title: "Technical Interview",
      date: "April 28, 2025",
        status: "completed",
        score:50
    },
    {
      id: 4,
      title: "Technical Interview",
      date: "April 30, 2025",
        status: "completed",
        score:68
    },
  ]

  // Upcoming interview data
  const upcomingInterview = {
    title: "Technical Interview",
    date: "April 30, 2025",
    time: "9:00pm",
      status: "scheduled",
      type: "Zoom",
      interviewer:"Segni Asrat"
  }
const ongoing = [
    {
      "title": "Assignment 1",
      "progress": 33,
      "startDate": "12 Jan",
      "endDate": "12 Jan"
    },
    {
      "title": "Assignment 2",
      "progress": 60,
      "startDate": "15 Jan",
      "endDate": "20 Jan"
    },
    {
      "title": "Assignment 3",
      "progress": 80,
      "startDate": "22 Jan",
      "endDate": "28 Jan"
    },
    {
      "title": "Assignment 4",
      "progress": 45,
      "startDate": "30 Jan",
      "endDate": "02 Feb"
    },
    {
      "title": "Assignment 5",
      "progress": 100,
      "startDate": "05 Feb",
      "endDate": "10 Feb"
    }
  ]
  
  // Current assignment progress
  const currentProgress = 70

  return (
    <div className="flex flex-col  bg-bg-light max-h-[85vh] overflow-y-scroll scroll-smooth">
     

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto ">
          {/* Dashboard grid layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                      

           {/* Left Side */}
            <div className="lg:col-span-2 space-y-6  p-2">
              {/* Welcome card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-gray-500 text-sm">Welcome to</p>
                    <h2 className="text-2xl font-bold">Your Assignment dashboard user</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nulla unde totam placeat.
                    </p>

                    <button className="mt-4 btn btn-accent btn-md text-white  border-bg bg-bg-secondary-light hover:bg-btn-primary hover:border-btn-bg-btn-primary rounded-full px-6">
                      Learn More
                    </button>
                  </div>

                  <div className="w-full md:w-auto">
                    <img
                      src={dashboardicon}
                      alt="Dashboard illustration"
                      className="w-full max-w-[200px] h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Assessments card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Assessments</h3>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Here is an overview of your assessments, interviews, and recent activity.
                </p>

                <div className="space-y-6 ">
                  {assessments.map((assessment, index) => (
                    <div key={assessment.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{assessment.title}</span>
                        <span className="text-sm text-gray-500">{assessment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-btn-primary h-2 rounded-full"
                          style={{ width: `${assessment.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Due: {assessment.dueDate}</span>
                        <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          <Clock className="w-3 h-3" />
                          <span>{assessment.daysLeft} days</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <button className="btn btn-outline btn-md flex items-center gap-1 rounded-xl px-4">
                    View all   assessment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                          </div>
                          <div className="flex flex-row gap-6 ">
                                 {/* Upcoming Assesment */}
              <div className="bg-white p-6 rounded-xl shadow-sm w-full md:max-w-80  max-h-fit">
                <h3 className="text-lg font-semibold">Upcoming Interview</h3>

                <div className="mt-4 p-4  rounded-lg">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{upcomingInterview.title}</p>
                                              <span className="badge badge-success text-white text-xs bg-green-500 border-none">{upcomingInterview.type}</span>
                    </div>
                                          <div className="flex flex-row justify-between">
                                          <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{upcomingInterview.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{upcomingInterview.time}</span>
                    </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>Interviewer: {upcomingInterview.interviewer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button className="btn btn-outline btn-md flex items-center gap-1 rounded-xl px-4">
                    View all upcoming assessment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
                              {/* upcoming assesment */}
                              <div className="flex flex-col w-full rounded-b-2xl">
                              <h1 className="bg-white rounded-t-2xl h-12  sticky p-1 font-semibold text-lg text-center">Ongoing Assessment</h1>
                              <div className="overflow-y-auto scrollbar-hide max-h-[29vh]  space-y-5">
                                  
                                  {ongoing.map((item) => (
                                      <MiniAssignmentCard title={item.title} progress={item.progress} startDate={item.startDate} endDate={item.endDate} />
                             ))}
                             </div>
                              </div>
              {/* Current assignment */}
              <div className="bg-white p-6 rounded-xl shadow-sm w-full md:max-w-80  max-h-fit">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Current assignment</h3>
                  <span className="badge badge-ghost bg-blue-100 text-btn-primary border-none">In progress</span>
                </div>

                <div className="flex justify-center my-4 max-h-fit">
                  <div className="relative w-32 h-32">
                    {/* Circle progress with gradient */}
                    <div className="relative w-full h-full">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * currentProgress) / 100}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{currentProgress}%</span>
                        <span className="text-xs text-gray-500">Progress rate test</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Start Date:</span>
                    <span>April 25, 2025</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">End Date:</span>
                    <span>May 05, 2025</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Duration:</span>
                    <span>2 hours</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-blue-600">In progress</span>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button className="btn btn-outline btn-md flex items-center gap-1 rounded-xl px-4">
                    View all assessment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div> */}
              </div>
                          </div>
            </div>

            {/* Right Side */}
            <div className="space-y-9  p-2 flex justify-center ">
              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm h-full w-[90%] ">
                <h3 className="text-xl font-semibold mb-4">Recent Activity's</h3>
                <p className="text-gray-500 text-sm mb-6">Your recent activity report</p>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 mb-6">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <div className="flex flex-col space-y-1 items-center">
                      <span className=" bg-gray text-xs py-1  px-3 rounded-full">{activity.score}</span>
                      <span className="font-semibold text-green-400 text-xs px-2 py-1 rounded">{activity.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button className="btn btn-outline btn-sm flex items-center gap-1 rounded-full px-4">
                    View all result
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

           
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
