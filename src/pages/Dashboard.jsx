import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // our axios instance
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token) return navigate("/login");

    if (storedUser) setUser(JSON.parse(storedUser));

    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const endpoint =
        user?.role === "ADMIN" ? "/issues" : "/issues/my";

      const res = await axios.get(endpoint, { headers });
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`/issues/${id}/status?status=${status}`, {}, { headers });
      fetchIssues();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/issues/${id}`, { headers });
      fetchIssues();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        {user?.role === "ADMIN" ? "All Issues" : "My Issues"}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {issue.title}
            </h2>
            <p className="text-gray-600 mt-2">{issue.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Category: <span className="font-medium">{issue.category}</span>
            </p>
            <p className="mt-1 text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  issue.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : issue.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-800"
                    : issue.status === "RESOLVED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {issue.status}
              </span>
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Reported by: {issue.createdBy}
            </p>

            {user?.role === "ADMIN" && (
              <div className="mt-4 space-x-2">
                <select
                  onChange={(e) =>
                    handleStatusChange(issue.id, e.target.value)
                  }
                  defaultValue={issue.status}
                  className="border rounded-lg p-2 text-sm"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>

                <button
                  onClick={() => handleDelete(issue.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
