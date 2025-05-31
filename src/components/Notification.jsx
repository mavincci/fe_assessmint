"use client"

import { useState } from "react"
import { Search, Filter, FileText, Video, Clock, Square } from "lucide-react"
import { Link } from "react-router-dom"

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all")

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "new_assessment",
      title: "New Assessment Available",
      message: "A new technical assessment has been assigned to you.",
      time: "2 hours ago",
      read: false,
      icon: <FileText className="w-5 h-5 text-white" />,
      iconBg: "bg-blue-500",
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Scheduled",
      message: "Your technical interview has been scheduled for May 7.",
      time: "1 day ago",
      read: false,
      icon: <Video className="w-5 h-5 text-white" />,
      iconBg: "bg-teal-500",
    },
    {
      id: 3,
      type: "result",
      title: "Assessment Result",
      message: "Your personality assessment results are now available.",
      time: "2 days ago",
      read: true,
      icon: <Square className="w-5 h-5 text-white" />,
      iconBg: "bg-green-500",
    },
    {
      id: 4,
      type: "deadline",
      title: "Deadline Reminder",
      message: "The technical skills assessment is due in 5 days.",
      time: "3 days ago",
      read: true,
      icon: <Clock className="w-5 h-5 text-white" />,
      iconBg: "bg-orange-500",
    },
  ]

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true
  })

  return (
    <div className="max-w-7xl mx-auto bg-bg-light max-h-[90vh] table= dark:bg-gray-800 dark:text-bg-light ">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          

          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300">
              <Filter className="w-4 h-4" />
              <span>All notification</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              className={`py-2 px-1 ${
                activeTab === "all" ? "border-b-2 border-accent-teal-light text-accborder-accent-teal-light font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`py-2 px-1 ${
                activeTab === "unread" ? "border-b-2 border-accent-teal-light text-accborder-accent-teal-light font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </button>
            <button
              className={`py-2 px-1 ${
                activeTab === "read" ? "border-b-2 border-accent-teal-light text-accborder-accent-teal-light font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("read")}
            >
              Read
            </button>
          </div>
        </div>

        <div className="space-y-4  max-h-[60vh] overflow-y-scroll">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white p-6 rounded-md border  dark:bg-gray-700 dark:text-bg-light ${
                notification.read ? "border-gray-200" : "border-blue-200"
              } relative`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 ${notification.iconBg} rounded-md flex items-center justify-center`}>
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold">{notification.title}</h3>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600  dark:text-gray-400 mb-4">{notification.message}</p>
                  <Link to="/assignment-detail">
                    <button className="px-4 py-2 bg-btn-primary text-white rounded-md text-sm">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full py-3 border border-dashed border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 transition">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}
