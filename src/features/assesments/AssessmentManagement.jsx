"use client"

import { useState } from "react"
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, PlusCircle } from "lucide-react"

// Sample assignment data
const assignments = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Technical",
    questions: 25,
    duration: "45 min",
    difficulty: "Medium",
    status: "Active",
    created: "Apr 28, 2025",
  },
  {
    id: 2,
    title: "Python Programming",
    type: "Coding",
    questions: 15,
    duration: "45 min",
    difficulty: "Easy",
    status: "Active",
    created: "Apr 25, 2025",
  },
  {
    id: 3,
    title: "UX Design Challenge",
    type: "Practical",
    questions: 5,
    duration: "120 min",
    difficulty: "Hard",
    status: "Draft",
    created: "Apr 22, 2025",
  },
  {
    id: 4,
    title: "Technical Interview",
    type: "Technical",
    questions: 20,
    duration: "90 min",
    difficulty: "Hard",
    status: "Active",
    created: "Apr 20, 2025",
  },
  {
    id: 5,
    title: "JavaScript Algorithms",
    type: "Coding",
    questions: 10,
    duration: "60 min",
    difficulty: "Medium",
    status: "Inactive",
    created: "Apr 15, 2025",
  },
  {
    id: 6,
    title: "Data Structures",
    type: "Coding",
    questions: 12,
    duration: "75 min",
    difficulty: "Hard",
    status: "Active",
    created: "Apr 10, 2025",
  },
  {
    id: 7,
    title: "System Design",
    type: "Technical",
    questions: 8,
    duration: "120 min",
    difficulty: "Hard",
    status: "Draft",
    created: "Apr 8, 2025",
  },
  {
    id: 8,
    title: "Mobile App Development",
    type: "Practical",
    questions: 15,
    duration: "90 min",
    difficulty: "Medium",
    status: "Active",
    created: "Apr 5, 2025",
  },
  {
    id: 9,
    title: "Database Fundamentals",
    type: "Technical",
    questions: 20,
    duration: "60 min",
    difficulty: "Medium",
    status: "Active",
    created: "Apr 3, 2025",
  },
  {
    id: 10,
    title: "UI Component Library",
    type: "Practical",
    questions: 10,
    duration: "90 min",
    difficulty: "Medium",
    status: "Inactive",
    created: "Mar 30, 2025",
  },
]

export default function AssessmentManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("Assessments")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  // Filter assignments based on search query and filters
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "All Types" || assignment.type === typeFilter

    const matchesStatus = statusFilter === "All Status" || assignment.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAssignments = filteredAssignments.slice(startIndex, startIndex + itemsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 3

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3)
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      }
    }

    return pages
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "badge badge-neutral"
      case "Inactive":
        return "badge badge-ghost"
      case "Draft":
        return "badge badge-outline"
      default:
        return "badge"
    }
  }

  return (
    <div className="w-full bg-bg-light rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Assignment Management</h1>
          <p className="text-base-content/70">Create and manage assessments and question banks</p>
        </div>
        <button className="btn bg-bg-secondary-light text-white" onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Assignment
        </button>
      </div>

      <div className="tabs mb-6">
        <button
          className={`tab tab-bordered ${activeTab === "Assessments" ? "tab-active bg-accent-teal-light text-white" : ""}`}
          onClick={() => setActiveTab("Assessments")}
        >
          Assessments
        </button>
        <button
          className={`tab tab-bordered ${activeTab === "Question Bank" ? "tab-active bg-accent-teal-light text-white" : ""}`}
          onClick={() => setActiveTab("Question Bank")}
        >
          Question Bank
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="join w-full">
            <div className="join-item btn btn-square btn-ghost">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search assessments..."
              className="input input-bordered join-item w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered w-full md:w-[180px]"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All Types">All Types</option>
          <option value="Technical">Technical</option>
          <option value="Coding">Coding</option>
          <option value="Practical">Practical</option>
        </select>
        <select
          className="select select-bordered w-full md:w-[180px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className="overflow-x-auto h-full">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Questions</th>
              <th>Duration</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssignments.length > 0 ? (
              paginatedAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover">
                  <td className="font-medium">{assignment.title}</td>
                  <td>{assignment.type}</td>
                  <td>{assignment.questions}</td>
                  <td>{assignment.duration}</td>
                  <td>{assignment.difficulty}</td>
                  <td>
                    <span className={getStatusBadgeClass(assignment.status)}>{assignment.status}</span>
                  </td>
                  <td>{assignment.created}</td>
                  <td className="text-right">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <a>View details</a>
                        </li>
                        <li>
                          <a>Edit assignment</a>
                        </li>
                        <li>
                          <a>Duplicate</a>
                        </li>
                        <li>
                          <a className="text-error">Delete assignment</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAssignments.length > 0 && (
        <div className="flex justify-center mt-4">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`join-item btn ${currentPage === page ? "btn-active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            {totalPages > 3 && currentPage < totalPages - 2 && (
              <button className="join-item btn btn-disabled">...</button>
            )}

            <button
              className="join-item btn"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Create New Assignment</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Handle form submission logic here
              setIsModalOpen(false)
              // You would typically add the new assignment to your assignments array here
            }}
          >
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter assignment title"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select className="select select-bordered w-full" defaultValue="" required>
                <option value="" disabled>
                  Select a type
                </option>
                <option value="Technical">Technical</option>
                <option value="Coding">Coding</option>
                <option value="Practical">Practical</option>
              </select>
            </div>

            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Number of Questions</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="Enter number of questions"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Duration (minutes)</span>
              </label>
              <input
                type="number"
                min="5"
                placeholder="Enter duration in minutes"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Difficulty</span>
              </label>
              <select className="select select-bordered w-full" defaultValue="" required>
                <option value="" disabled>
                  Select difficulty level
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select className="select select-bordered w-full" defaultValue="Draft">
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Assignment
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  )
}
