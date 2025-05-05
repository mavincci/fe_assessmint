

import { useState } from "react"
import { Bell, Search, Filter, Download, ArrowLeft, ArrowLeftCircle } from "lucide-react"

export default function ResultDetail({ assignment, onBack }) {
  const [activeTab, setActiveTab] = useState("all-results")

  // Sample data for the detailed view
  const performanceSummary = {
    overallScore: "85%",
    assessmentsCompleted: "3/5",
    averageScore: "85%",
    highestScore: "92%",
  }

  const skillBreakdown = [
    { skill: "Technical Knowledge", score: 78 },
    { skill: "Problem Solving", score: 92 },
    { skill: "Communication", score: 85 },
  ]

  const detailedResults = [
    {
      id: 1,
      title: "Personality Assessment",
      description: "Understand your work style and preferences",
      completedOn: "April 28, 2025",
      score: "85%",
      status: "PASSED",
      feedback: "Strong in communication and teamwork. Areas for improvement include time management.",
    },
    {
      id: 2,
      title: "Technical Skills Assessment",
      description: "Evaluate your technical capabilities",
      completedOn: "May 1, 2025",
      score: "78%",
      status: "PASSED",
      feedback: "Good understanding of core concepts. Consider strengthening knowledge in advanced topics.",
    },
    {
      id: 3,
      title: "Problem Solving Challenge",
      description: "Test your analytical thinking",
      completedOn: "May 3, 2025",
      score: "92%",
      status: "PASSED",
      feedback: "Excellent problem-solving abilities. Creative approaches to complex challenges.",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto bg-bg-light p-6 rounded-lg max-h-[90vh] ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeftCircle className="w-7 h-7" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Result</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-1">
            {/* <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">JD</div> */}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        {/* <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md border border-gray-300">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div> */}
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Performance Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-6">Performance Summary</h2>
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b5b67"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * Number.parseInt(performanceSummary.overallScore)) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{performanceSummary.overallScore}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-300">
              <span className="text-gray-600">Assessments Completed</span>
              <span className="font-medium">{performanceSummary.assessmentsCompleted}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="text-gray-600">Average Score</span>
              <span className="font-medium">{performanceSummary.averageScore}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="text-gray-600">Highest Score</span>
              <span className="font-medium">{performanceSummary.highestScore}</span>
            </div>
          </div>
        </div>

        {/* Skill Breakdown Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-6">Skill Breakdown</h2>
          <div className="space-y-6">
            {skillBreakdown.map((item) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex justify-between">
                  <span>{item.skill}</span>
                  <span className="font-medium">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#3b5b67] h-2.5 rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 ">
        <div className="flex space-x-8">
          <button
            className={`py-2 px-1 ${
              activeTab === "all-results" ? "border-b-2 border-[#3b5b67] text-[#3b5b67] font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("all-results")}
          >
            All Results
          </button>
          <button
            className={`py-2 px-1 ${
              activeTab === "detailed-feedback"
                ? "border-b-2 border-[#3b5b67] text-[#3b5b67] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("detailed-feedback")}
          >
            Detailed Feedback
          </button>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6 overflow-y-scroll max-h-[30vh]">
        {detailedResults.map((result) => (
          <div key={result.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{result.title}</h3>
                <p className="text-gray-600">{result.description}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {result.status}
              </span>
            </div>
            <div className="flex items-center gap-8 mt-4 text-sm text-gray-600">
              <div>Completed on: {result.completedOn}</div>
              <div>Score: {result.score}</div>
            </div>
            <p className="mt-4 text-gray-700">{result.feedback}</p>
            <div className="flex justify-end gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="px-4 py-2 bg-[#3b5b67] text-white rounded-md">View Detailed Results</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
