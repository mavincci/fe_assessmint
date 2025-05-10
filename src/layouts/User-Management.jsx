"use client"

import { useState } from "react"
import { Search, MoreHorizontal, UserPlus, ChevronLeft, ChevronRight } from "lucide-react"
import QuestionModal from "../components/QuestionModal"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Examinee",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Examinee",
    status: "Active",
    lastActive: "3 days ago",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@example.com",
    role: "Examiner",
    status: "Inactive",
    lastActive: "2 weeks ago",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "Examiner",
    status: "Active",
    lastActive: "5 hours ago",
  },
  {
    id: 6,
    name: "Lisa Garcia",
    email: "lisa@example.com",
    role: "Examinee",
    status: "Pending",
    lastActive: "Never",
  },
  {
    id: 7,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 8,
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    role: "Examiner",
    status: "Active",
    lastActive: "4 days ago",
  },
  {
    id: 9,
    name: "Thomas Wright",
    email: "thomas@example.com",
    role: "Examinee",
    status: "Inactive",
    lastActive: "1 month ago",
  },
  {
    id: 10,
    name: "Patricia Miller",
    email: "patricia@example.com",
    role: "Examinee",
    status: "Active",
    lastActive: "12 hours ago",
  },
  {
    id: 11,
    name: "James Wilson",
    email: "james@example.com",
    role: "Examiner",
    status: "Pending",
    lastActive: "Never",
  },
  {
    id: 12,
    name: "Elizabeth Taylor",
    email: "elizabeth@example.com",
    role: "Examinee",
    status: "Active",
    lastActive: "2 days ago",
  },
]

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [statusFilter, setStatusFilter] = useState("All Status")
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter

    const matchesStatus = statusFilter === "All Status" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

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
      case "Pending":
        return "badge badge-outline"
      default:
        return "badge"
    }
  }

  return (
    <div className="w-full bg-bg-light rounded-lg p-6  h-full ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-base-content/70">Manage users, assign roles, and control access</p>
        </div>
        <button className="btn bg-accent-teal-light text-white" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
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
              placeholder="Search users..."
              className="input input-bordered join-item w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered w-full md:w-[180px]"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All Roles">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Examiner">Examiner</option>
          <option value="Examinee">Examinee</option>
        </select>
        <select
          className="select select-bordered w-full md:w-[180px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="hover">
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={getStatusBadgeClass(user.status)}>{user.status}</span>
                  </td>
                  <td>{user.lastActive}</td>
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
                          <a>Edit user</a>
                        </li>
                        <li>
                          <a className="text-error">Delete user</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > 0 && (
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

           <QuestionModal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false)
          }}>
            
      
          <h3 className="font-bold text-lg mb-4">Add New User</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Handle form submission logic here
              setIsModalOpen(false)
              // You would typically add the new user to your users array here
            }}
          >
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input type="text" placeholder="Enter full name" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Enter email address" className="input input-bordered w-full" required />
            </div>

           <div className="form-control w-full mb-3">
  {/* <label className="label">
    <span className="label-text">Role</span>
  </label> */}
         <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Role"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Admin</MenuItem>
    <MenuItem value={20}>Examiner</MenuItem>
    <MenuItem value={30}>Examinee</MenuItem>
  </Select>
</FormControl>
                  </div>
         

            <div className="form-control w-full mb-3">
              {/* <label className="label">
                <span className="label-text">Status</span>
              </label> */}
               <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Status"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Active</MenuItem>
    <MenuItem value={20}>Inactive</MenuItem>
    <MenuItem value={30}>Pending</MenuItem>
  </Select>
</FormControl>
            </div>
                
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter password" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="Confirm password" className="input input-bordered w-full" required />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn bg-accent-teal-light text-white">
                Add User
              </button>
            </div>
          </form>
        
              <form method="dialog" className="modal-backdrop">
                  
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
   
  
          </QuestionModal>
         
    </div>
  )
}
