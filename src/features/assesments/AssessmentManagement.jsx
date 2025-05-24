"use client"

import { useEffect, useState } from "react"
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, PlusCircle} from "lucide-react"
import { Calendar, Clock, FileText, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { load_my_assesment } from "../../action/Auth"
import { useDispatch } from "react-redux"
import NoDataAvailable from "../../components/NoDataAvailable"
// Sample assignment data
// const assignments = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     type: "Technical",
//     questions: 25,
//     duration: "45 min",
//     difficulty: "Medium",
//     status: "Active",
//     created: "Apr 28, 2025",
//   },
//   {
//     id: 2,
//     title: "Python Programming",
//     type: "Coding",
//     questions: 15,
//     duration: "45 min",
//     difficulty: "Easy",
//     status: "Active",
//     created: "Apr 25, 2025",
//   },
//   {
//     id: 3,
//     title: "UX Design Challenge",
//     type: "Practical",
//     questions: 5,
//     duration: "120 min",
//     difficulty: "Hard",
//     status: "Draft",
//     created: "Apr 22, 2025",
//   },
//   {
//     id: 4,
//     title: "Technical Interview",
//     type: "Technical",
//     questions: 20,
//     duration: "90 min",
//     difficulty: "Hard",
//     status: "Active",
//     created: "Apr 20, 2025",
//   },
//   {
//     id: 5,
//     title: "JavaScript Algorithms",
//     type: "Coding",
//     questions: 10,
//     duration: "60 min",
//     difficulty: "Medium",
//     status: "Inactive",
//     created: "Apr 15, 2025",
//   },
//   {
//     id: 6,
//     title: "Data Structures",
//     type: "Coding",
//     questions: 12,
//     duration: "75 min",
//     difficulty: "Hard",
//     status: "Active",
//     created: "Apr 10, 2025",
//   },
//   {
//     id: 7,
//     title: "System Design",
//     type: "Technical",
//     questions: 8,
//     duration: "120 min",
//     difficulty: "Hard",
//     status: "Draft",
//     created: "Apr 8, 2025",
//   },
//   {
//     id: 8,
//     title: "Mobile App Development",
//     type: "Practical",
//     questions: 15,
//     duration: "90 min",
//     difficulty: "Medium",
//     status: "Active",
//     created: "Apr 5, 2025",
//   },
//   {
//     id: 9,
//     title: "Database Fundamentals",
//     type: "Technical",
//     questions: 20,
//     duration: "60 min",
//     difficulty: "Medium",
//     status: "Active",
//     created: "Apr 3, 2025",
//   },
//   {
//     id: 10,
//     title: "UI Component Library",
//     type: "Practical",
//     questions: 10,
//     duration: "90 min",
//     difficulty: "Medium",
//     status: "Inactive",
//     created: "Mar 30, 2025",
//   },
// ]

export default function AssessmentManagement() {
  const user = JSON.parse(localStorage.getItem("user"))


  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("Assessments")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [assignments, setAssessmentData] =useState([])
  const itemsPerPage = 10

  // Filter assignments based on search query and filters
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "All Types" || assignment.type === typeFilter

    const matchesStatus = statusFilter === "All Status" || assignment.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })
console.log(assignments)
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
  const isExaminee = user.roles.some(role => role === "EXAMINEE");
  const isExaminer = user.roles.some(role => role === "EXAMINER");
   const dispatch = useDispatch();
  useEffect(() => {
     const fetchAssessment = async () => {
        const res = await dispatch(load_my_assesment());
        if (res?.body) {
          setAssessmentData(res.body);
  console.log(res.body)
        } 
    };

   
    if (isExaminer) {
   
      fetchAssessment()
    }
  }, [])
 
  const handlePublished = () => {
    // publish API

  }

  const handleunPublished = () => {
    // unpublish API
  }
  return (
    <>
      {/* if Examinees */}
      {isExaminee && <>
        
        <div className="min-h-screen bg-bg-light flex-wrap flex md:flex-row items-center justify-center p-4 gap-4 w-full ">
          {assignments.length > 0 ? <>
              {assignments?.map((items, index) => (
             <div className="w-full max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl  transition-shadow duration-300 overflow-hidden" key={items.id}>
        {/* Card Header */}
        <div className="bg-gradient-to-r from-btn-primary to-accent-teal-light text-white p-6 rounded-t-lg h-32" aria-label="Assessment Card header">
          <div className="flex justify-between items-start" aria-label="Assessment Title">
                  <h2 className="text-xl font-bold" aria-label={items.title}>{items.title}
                  </h2>
            <span className="hidden md:block px-2 py-1 text-xs font-semibold rounded-full bg-white/20 text-white border border-white/30">
              Assessment
            </span>
          </div>
          <p className="text-blue-100 mt-2 text-sm" aria-label={`discription for ${items.title} says ${items.description}`}>
           {items.description.slice(0,50)}...
          </p>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500" aria-label="Duration ">Duration</p>
                <p className="font-medium" >40 minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="font-medium">May 11-12, 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Attempts</p>
                <p className="font-medium">Maximum 2 attempts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Content</p>
                <p className="font-medium">1 section • 1 question</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 border-t px-6 py-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                  </div>
                  
                <Link to={`/assessment/${items.id}`} className="rounded-xl bg-gradient-to-r from-bg-dark to-bg-secondary-light text-white p-3">
                    Take Assessment</Link>
             
                  
          </div>
        </div>
      </div>
          ))}
          </>: <NoDataAvailable message="Assessment is not Availble" emoji="🙅"/>}
        
     
        </div>
        
      </>   
      }

      {/* if not Examines */}
{isExaminer &&  <div className="w-full bg-bg-light rounded-lg p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Assignment Management</h1>
          <p className="text-base-content/70">Create and manage assessments and question banks</p>
        </div>
        <Link to="/create-assessment" className="btn bg-bg-secondary-light text-white" onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Assignment
        </Link>
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

      <div className="overflow-x-auto h-fit">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Assessment</th>
              {/* <th>Questions</th> */}
              <th>Duration</th>
              <th>Attempt</th>
                <th>Access</th>
                
              <th>Created</th>
                <th>Published</th>
                <th>Invite</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssignments.length > 0 ? (
              paginatedAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover">
                  <td className="font-medium">{assignment.title}</td>
                  {/* <td>{assignment.questions || "-"}</td> */}
                  <td>{assignment.settings.duration}</td>
                  <td>{assignment.settings.maxAttempts}</td>
                  {/* <td>
                    <span className={getStatusBadgeClass(assignment.status)}>{assignment.status || "-"}</span>
                  </td> */}
                  <td>{assignment.settings.isPublic == true ? "Public" : "Private"}</td>

                  <td>{ new Date(assignment.createdAt ).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })|| "-"}</td>
                  <td>{assignment.isPublished  ? <button className=" p-2 rounded-xl  outline  outline-btn-primary hover:outline-accent-teal-light hover:bg-btn-primary cursor-pointer hover:text-white text-gray-800" onClick={handlePublished}>published</button> : <button className=" p-2 rounded-xl  outline  outline-btn-primary hover:outline-accent-teal-light hover:bg-btn-primary cursor-pointer hover:text-white text-gray-800" onClick={handleunPublished}>Unpublished</button> 
 || "-"}</td>
                  <td ><Link className="outline outline-accent-teal-light text-center p-2 rounded-xl w-fit font-semibold hover:bg-accent-teal-light hover:text-white" to={`/invitiation/${assignment.id}/${assignment.title}`} >
                    Invite Cand.
                  </Link></td>
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
    </div>}
     
    </>
  )
}
