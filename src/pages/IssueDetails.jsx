import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaComments,
  FaChevronDown,
  FaExclamationCircle,
} from "react-icons/fa";

export default function AdminIssuesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const MOCK_ISSUES = [
    {
      id: "ISS-001",
      title: "Broken water fountain in North Building",
      description: "The water fountain on the 3rd floor is not dispensing water properly.",
      status: "open",
      priority: "high",
      category: "Facilities",
      location: "North Building, 3rd Floor",
      reportedBy: "John Smith",
      reportedDate: "2025-01-08",
      assignee: null,
      updatedDate: "2025-01-08",
      comments: 2,
    },
    {
      id: "ISS-002",
      title: "Parking lot lights not working",
      description: "Several lights in Section C of the parking lot are burnt out.",
      status: "in-progress",
      priority: "medium",
      category: "Safety",
      location: "Parking Lot, Section C",
      reportedBy: "Sarah Johnson",
      reportedDate: "2025-01-07",
      assignee: "Mike Davis",
      updatedDate: "2025-01-08",
      comments: 5,
    },
    {
      id: "ISS-003",
      title: "Library air conditioning malfunction",
      description: "AC unit in the main reading area is leaking water.",
      status: "resolved",
      priority: "high",
      category: "HVAC",
      location: "Main Library, Reading Area",
      reportedBy: "Emma Wilson",
      reportedDate: "2025-01-06",
      assignee: "Robert Brown",
      updatedDate: "2025-01-08",
      comments: 8,
    },
  ];

  const filteredIssues = MOCK_ISSUES.filter((issue) => {
    const statusMatch = statusFilter === "all" || issue.status === statusFilter;
    const priorityMatch = priorityFilter === "all" || issue.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8 border-b border-blue-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-bold mb-2">Issues Dashboard</h1>
          <p className="text-blue-100">Review, manage, and resolve campus issues</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Filter Section */}
        <div className="p-6 mb-6 bg-white border rounded-lg shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-100">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search issues by ID or title..."
                className="w-full bg-transparent focus:outline-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Filter by Status</label>
              <div className="flex gap-2 flex-wrap">
                {["all", "open", "in-progress", "resolved"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      statusFilter === status
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Filter by Priority</label>
              <div className="flex gap-2 flex-wrap">
                {["all", "low", "medium", "high"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setPriorityFilter(priority)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      priorityFilter === priority
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="p-12 text-center bg-white border rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">No issues found matching your filters.</p>
            </div>
          ) : (
            filteredIssues.map((issue) => <AdminIssueCard key={issue.id} issue={issue} />)
          )}
        </div>
      </div>
    </main>
  );
}

function AdminIssueCard({ issue }) {
  const statusColors = {
    open: "bg-red-100 text-red-800 border-red-300",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-300",
    resolved: "bg-green-100 text-green-800 border-green-300",
  };

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-semibold">{issue.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[issue.status]}`}>
            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace("-", " ")}
          </span>
        </div>
        <p className="text-sm text-gray-600">{issue.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-blue-500" /> {issue.location}
        </span>
        <span className="flex items-center gap-1">
          <FaClock className="text-blue-500" /> {issue.reportedDate}
        </span>
        <span className="flex items-center gap-1">
          <FaUser className="text-blue-500" /> {issue.reportedBy}
        </span>
        <span className="flex items-center gap-1">
          <FaComments className="text-blue-500" /> {issue.comments} comments
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
          {issue.category}
        </span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-md ${priorityColors[issue.priority]}`}
        >
          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
          <FaChevronDown className="inline ml-1 text-xs" />
        </span>
        {issue.assignee ? (
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
            Assigned to {issue.assignee}
          </span>
        ) : (
          <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-md flex items-center gap-1">
            <FaExclamationCircle /> Unassigned
          </span>
        )}
      </div>

      <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
        <span>Updated: {issue.updatedDate}</span>
        <button className="px-3 py-1 text-sm border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
