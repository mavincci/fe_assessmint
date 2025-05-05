
import { useState } from "react"
import { Bell, Search, Filter, Clock, FileText, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react"
import ResultDetail from "../components/AssignmentDetail"

export default function Resultpage() {
  const [activeTab, setActiveTab] = useState("available")
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Sample assignment data (expanded with more items to demonstrate pagination)
  const assignments = [
    {
      id: 1,
      title: "Technical Skills Assessment",
      status: "not_started",
      time: "60 minutes",
      questions: true,
      deadline: "may5,2025",
      progress: 0,
    },
    {
      id: 2,
      title: "Logical Reasoning Test",
      status: "ongoing",
      time: "60 minutes",
      questions: true,
      deadline: "may5,2025",
      progress: 25,
    },
    {
      id: 3,
      title: "Personality Assessment",
      status: "completed",
      score: "89%",
      end: "may5,2025",
      passed: true,
    },
    {
      id: 4,
      title: "Leadership Assessment",
      status: "upcoming",
      time: "45 minutes",
      questions: true,
      deadline: "may15,2025",
      progress: 0,
    },
    {
      id: 5,
      title: "Communication Skills",
      status: "completed",
      score: "92%",
      end: "apr28,2025",
      passed: true,
    },
    {
      id: 6,
      title: "Problem Solving Challenge",
      status: "ongoing",
      time: "90 minutes",
      questions: true,
      deadline: "may10,2025",
      progress: 45,
    },
    {
      id: 7,
      title: "Team Collaboration Exercise",
      status: "upcoming",
      time: "120 minutes",
      questions: true,
      deadline: "may20,2025",
      progress: 0,
    },
    {
      id: 8,
      title: "Data Analysis Test",
      status: "not_started",
      time: "75 minutes",
      questions: true,
      deadline: "may12,2025",
      progress: 0,
    },
    {
      id: 9,
      title: "Project Management Basics",
      status: "not_started",
      time: "90 minutes",
      questions: true,
      deadline: "may18,2025",
      progress: 0,
    },
    {
      id: 10,
      title: "Critical Thinking Assessment",
      status: "completed",
      score: "78%",
      end: "apr30,2025",
      passed: true,
    },
    {
      id: 11,
      title: "Design Thinking Workshop",
      status: "upcoming",
      time: "180 minutes",
      questions: true,
      deadline: "may25,2025",
      progress: 0,
    },
    {
      id: 12,
      title: "Business Ethics Quiz",
      status: "ongoing",
      time: "45 minutes",
      questions: true,
      deadline: "may8,2025",
      progress: 60,
    },
  ]

  // Filter assignments based on active tab and filter
  const filteredAssignments = assignments.filter((assignment) => {
    // First filter by tab
    if (activeTab === "available" && assignment.status === "completed") {
      return false
    }
    if (activeTab === "completed" && assignment.status !== "completed") {
      return false
    }

    // Then apply status filter
    if (activeFilter === "all") {
      return true
    }
    return assignment.status === activeFilter
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page changes
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Reset to page 1 when filters change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Handle view detail click
  const handleViewDetail = (assignment) => {
    setSelectedAssignment(assignment)
  }

  // If an assignment is selected, show the detail view
  if (selectedAssignment) {
    return <ResultDetail assignment={selectedAssignment} onBack={() => setSelectedAssignment(null)} />
  }

  return (
      <>
          
      <div className="max-w-7xl mx-auto bg-bg-light p-6 rounded-lg ">
     

      <div className="flex justify-between items-center mb-6 ">
                  <div className="relative w-full max-w-md">
                  <div className="flex flex-col p-3 ms-8">
          <h1 className="text-2xl font-bold">Assignment Centre</h1>
          <p className="text-gray-600">view, start, manage your assignment</p>
        </div>
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
          {/* <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>

        <div className="relative ">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-md border border-gray-300"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 ">
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      checked={activeFilter === "all"}
                      onChange={() => handleFilterChange("all")}
                      className="radio radio-sm"
                    />
                    <span className="text-sm">All</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      checked={activeFilter === "upcoming"}
                      onChange={() => handleFilterChange("upcoming")}
                      className="radio radio-sm"
                    />
                    <span className="text-sm">Upcoming</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      checked={activeFilter === "ongoing"}
                      onChange={() => handleFilterChange("ongoing")}
                      className="radio radio-sm"
                    />
                    <span className="text-sm">Ongoing</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      checked={activeFilter === "completed"}
                      onChange={() => handleFilterChange("completed")}
                      className="radio radio-sm"
                    />
                    <span className="text-sm">Completed</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      checked={activeFilter === "not_started"}
                      onChange={() => handleFilterChange("not_started")}
                      className="radio radio-sm"
                    />
                    <span className="text-sm">Not Started</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0 mb-6">
        <button
          className={`py-3 text-center font-medium rounded-tl-md rounded-bl-md transition ${
            activeTab === "available" ? "bg-[#3b5b67] text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => handleTabChange("available")}
        >
          Available Assignment
        </button>
        <button
          className={`py-3 text-center font-medium rounded-tr-md rounded-br-md transition ${
            activeTab === "completed" ? "bg-[#3b5b67] text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => handleTabChange("completed")}
        >
          Completed Assignment
        </button>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-scroll">
        {currentItems.length > 0 ? (
          currentItems.map((assignment) => (
            <div key={assignment.id} className="bg-white p-6 rounded-md border border-gray-200 relative">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold">{assignment.title}</h2>
                  <p className="text-gray-600">view, start, manage your assignment</p>
                </div>
                {assignment.status === "completed" && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Passed</span>
                )}
                {assignment.status === "not_started" && (
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">not started</span>
                )}
                {assignment.status === "ongoing" && (
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">ongoing</span>
                )}
                {assignment.status === "upcoming" && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">upcoming</span>
                )}
              </div>

              <div className="flex items-center gap-8 mt-4">
                {assignment.status !== "completed" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Time:{assignment.time}</span>
                    </div>
                    {assignment.questions && (
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Questions</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Deadline:{assignment.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">view instructor</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Score:{assignment.score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">End:{assignment.end}</span>
                    </div>
                  </>
                )}
              </div>

              {assignment.status === "ongoing" && (
                <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#3b5b67] h-full" style={{ width: `${assignment.progress}%` }}></div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                {assignment.status === "completed" ? (
                  <>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">
                      download Report
                    </button>
                    <button
                      className="px-4 py-2 bg-[#3b5b67] text-white rounded-md"
                      onClick={() => handleViewDetail(assignment)}
                    >
                      View Result
                    </button>
                  </>
                ) : assignment.status === "ongoing" ? (
                  <>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                      onClick={() => handleViewDetail(assignment)}
                    >
                      View in detail
                    </button>
                    <button className="px-4 py-2 bg-[#3b5b67] text-white rounded-md">Resume</button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                      onClick={() => handleViewDetail(assignment)}
                    >
                      View in detail
                    </button>
                    <button className="px-4 py-2 bg-[#3b5b67] text-white rounded-md">Start now</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-md border border-gray-200 text-center">
            <p className="text-gray-600">No assignments found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAssignments.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Show:</span>
            <select
              className="select select-bordered select-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span className="text-sm text-gray-600 ml-2">per page</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="join">
              <button
                className="join-item btn btn-sm border-gray-300"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Show limited page numbers with ellipsis for many pages */}
              {totalPages <= 5 ? (
                // If 5 or fewer pages, show all page numbers
                Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`join-item btn btn-sm ${
                      currentPage === page
                        ? "bg-[#3b5b67] text-white border-[#3b5b67] hover:bg-[#2a4a56]"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))
              ) : (
                // If more than 5 pages, show current page with neighbors and ellipsis
                <>
                  {/* Always show first page */}
                  <button
                    className={`join-item btn btn-sm ${
                      currentPage === 1
                        ? "bg-[#3b5b67] text-white border-[#3b5b67] hover:bg-[#2a4a56]"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => goToPage(1)}
                  >
                    1
                  </button>

                  {/* Show ellipsis if current page is more than 3 */}
                  {currentPage > 3 && <span className="join-item btn btn-sm btn-disabled">...</span>}

                  {/* Show pages around current page */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => page !== 1 && page !== totalPages && Math.abs(page - currentPage) <= 1)
                    .map((page) => (
                      <button
                        key={page}
                        className={`join-item btn btn-sm ${
                          currentPage === page
                            ? "bg-[#3b5b67] text-white border-[#3b5b67] hover:bg-[#2a4a56]"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    ))}

                  {/* Show ellipsis if current page is less than totalPages - 2 */}
                  {currentPage < totalPages - 2 && <span className="join-item btn btn-sm btn-disabled">...</span>}

                  {/* Always show last page */}
                  <button
                    className={`join-item btn btn-sm ${
                      currentPage === totalPages
                        ? "bg-[#3b5b67] text-white border-[#3b5b67] hover:bg-[#2a4a56]"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => goToPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                className="join-item btn btn-sm border-gray-300"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAssignments.length)} of{" "}
              {filteredAssignments.length}
            </div>
          </div>
        </div>
      )}
    </div>
      </>
  )
}
