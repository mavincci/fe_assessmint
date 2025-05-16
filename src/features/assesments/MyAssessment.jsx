import React, { useState } from "react";
import { Search, MoreHorizontal, Plus } from "lucide-react";

const MyAssessment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const assignmentsData = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Technical",
      candidates: 25,
      duration: "45 min",
      difficulty: "Medium",
      status: "Active",
      created: "Apr 28, 2025",
    },
    {
      id: 2,
      title: "Python Programming",
      type: "Coding",
      candidates: 15,
      duration: "45 min",
      difficulty: "Easy",
      status: "Completed",
      created: "Apr 25, 2025",
    },
    {
      id: 3,
      title: "UX Design Challenge",
      type: "Practical",
      candidates: 5,
      duration: "120 min",
      difficulty: "Hard",
      status: "Draft",
      created: "Apr 22, 2025",
    },
    {
      id: 4,
      title: "Technical Interview",
      type: "Technical",
      candidates: 20,
      duration: "90 min",
      difficulty: "Hard",
      status: "Active",
      created: "Apr 20, 2025",
    },
    {
      id: 5,
      title: "JavaScript Algorithms",
      type: "Coding",
      candidates: 10,
      duration: "60 min",
      difficulty: "Medium",
      status: "Scheduled",
      created: "Apr 15, 2025",
    },
  ];

  // Map status to DaisyUI badge colors
  const statusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "badge badge-success"; // green
      case "completed":
        return "badge badge-outline"; // gray outline
      case "draft":
        return "badge badge-warning"; // yellow/orange
      case "scheduled":
        return "badge badge-info"; // blue
      default:
        return "badge badge-outline";
    }
  };

  const filteredAssignments = assignmentsData.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "all" || assignment.type.toLowerCase() === typeFilter;

    const matchesStatus =
      statusFilter === "all" || assignment.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-blue-50/50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="hidden md:block text-2xl font-bold">Assignments</h1>
          <button className="btn bg-btn-primary text-white flex items-center gap-2">
            <Plus size={16} />
            Create Assessment
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="form-control flex-grow ">
              <div className="input-group ">
               
                <input
                  type="text"
                  placeholder="Search assignments..."
                  className=" outline rounded-xl p-2 outline-accent-teal-light w-full focus:outline-btn-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Type filter */}
            <select
              className=" outline rounded-xl p-2 outline-accent-teal-light w-full focus:outline-btn-primary md:w-40"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="technical">Technical</option>
              <option value="coding">Coding</option>
              <option value="practical">Practical</option>
            </select>

            {/* Status filter */}
            <select
              className=" outline rounded-xl p-2 outline-accent-teal-light w-full focus:outline-btn-primary md:w-40"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Assignments</th>
                <th>Type</th>
                <th className="text-center">Candidates</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover">
                    <td className="font-medium">{assignment.title}</td>
                    <td>{assignment.type}</td>
                    <td className="text-center">{assignment.candidates}</td>
                    <td>{assignment.duration}</td>
                    <td>{assignment.difficulty}</td>
                    <td>
                      <div className={statusBadgeClass(assignment.status)}>
                        {assignment.status}
                      </div>
                    </td>
                    <td>{assignment.created}</td>
                    <td className="text-right">
                      <button className="btn btn-ghost btn-sm">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssessment;
