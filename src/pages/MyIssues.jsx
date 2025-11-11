import React, { useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaUser,
  FaRegCommentDots,
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

// ✅ Main Page Component
export default function MyIssuesPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const issues = [
    {
      id: "ISS-001",
      title: "Library WiFi Connection Issues",
      description: "WiFi keeps disconnecting in the library study area",
      category: "Infrastructure",
      status: "In Progress",
      priority: "High",
      progress: 65,
      createdDate: "2025-01-15",
      updatedDate: "2025-01-20",
      assignee: "John Doe",
      comments: 5,
    },
    {
      id: "ISS-002",
      title: "Cafeteria Payment System Down",
      description: "Card reader machines are not working properly",
      category: "Payment",
      status: "Resolved",
      priority: "Critical",
      progress: 100,
      createdDate: "2025-01-10",
      updatedDate: "2025-01-18",
      assignee: "Sarah Smith",
      comments: 12,
    },
    {
      id: "ISS-003",
      title: "Missing Door Handle in Lab 4",
      description: "Lab 4 main entrance door handle is broken",
      category: "Facilities",
      status: "Open",
      priority: "Medium",
      progress: 0,
      createdDate: "2025-01-22",
      updatedDate: "2025-01-22",
      assignee: "Unassigned",
      comments: 2,
    },
    {
      id: "ISS-004",
      title: "Parking Lot Light Malfunction",
      description: "Multiple lights in parking area D are not working",
      category: "Safety",
      status: "In Progress",
      priority: "High",
      progress: 45,
      createdDate: "2025-01-08",
      updatedDate: "2025-01-21",
      assignee: "Mike Johnson",
      comments: 8,
    },
    {
      id: "ISS-005",
      title: "Classroom AC System Noise",
      description: "AC unit in Room 302 making unusual noise",
      category: "Facilities",
      status: "Open",
      priority: "Low",
      progress: 15,
      createdDate: "2025-01-20",
      updatedDate: "2025-01-21",
      assignee: "Alex Lee",
      comments: 3,
    },
  ];

  const filteredIssues = issues.filter((issue) => {
    const matchesStatus =
      filterStatus === "all" || issue.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <MyIssuesHeader />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <IssueFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalIssues={filteredIssues.length}
        />

        {filteredIssues.length > 0 ? (
          <div className="grid gap-4 mt-8">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <EmptyState onClear={() => {
            setSearchTerm("");
            setFilterStatus("all");
          }} />
        )}
      </div>
    </main>
  );
}

// ✅ Header Component
function MyIssuesHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <FaArrowLeft className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors" />
          <h1 className="text-3xl font-bold text-gray-900">My Issues</h1>
        </div>
        <p className="text-gray-500">
          Track and manage all the issues you've reported or assigned to you
        </p>
      </div>
    </div>
  );
}

// ✅ Filter Component
function IssueFilter({ filterStatus, setFilterStatus, searchTerm, setSearchTerm, totalIssues }) {
  const statusOptions = [
    { value: "all", label: "All Issues" },
    { value: "open", label: "Open" },
    { value: "in progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Box */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or issue ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Showing {totalIssues} {totalIssues === 1 ? "issue" : "issues"}
      </div>
    </div>
  );
}

// ✅ Issue Card Component
function IssueCard({ issue }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "text-red-600";
      case "High":
        return "text-orange-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <FaExclamationCircle className="w-4 h-4" />;
      case "In Progress":
        return <FaClock className="w-4 h-4" />;
      case "Resolved":
        return <FaCheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold text-blue-600">{issue.id}</span>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                issue.status
              )} flex items-center gap-1`}
            >
              {getStatusIcon(issue.status)}
              {issue.status}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-1">{issue.title}</h3>
          <p className="text-sm text-gray-500">{issue.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">Progress</span>
          <span className="text-xs font-semibold">{issue.progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${issue.progress}%` }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-500 mb-1">Category</p>
          <p className="text-sm font-medium">{issue.category}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Priority</p>
          <p className={`text-sm font-semibold ${getPriorityColor(issue.priority)}`}>
            {issue.priority}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Created</p>
          <p className="text-sm font-medium">{issue.createdDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Updated</p>
          <p className="text-sm font-medium">{issue.updatedDate}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaUser className="w-4 h-4" />
            <span>{issue.assignee}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCommentDots className="w-4 h-4" />
            <span>{issue.comments} comments</span>
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
}

// ✅ Empty State Component
function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 p-4 rounded-full bg-gray-100">
        <FaExclamationCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold mb-2">No Issues Found</h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        No issues match your current filters. Try adjusting your search or status filter.
      </p>
      <button
        onClick={onClear}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
