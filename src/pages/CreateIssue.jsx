import React, { useState } from "react";

export default function CreateIssue() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Issue reported successfully!");
    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
      priority: "medium",
    });
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Report an Issue</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Help us improve by reporting issues, bugs, or suggestions for the Campus Issue Tracker.
            Your feedback is valuable to us.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <div className="p-6 md:p-8 border border-gray-300 shadow-lg rounded-lg max-w-3xl mx-auto mt-10 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Report Your Issue</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">
              Issue Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title of the issue"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="facility">Facility</option>
              <option value="maintenance">Maintenance</option>
              <option value="safety">Safety</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where is this issue located?"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-800 mb-2">
              Priority Level <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about the issue..."
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Report Issue
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  title: "",
                  category: "",
                  description: "",
                  location: "",
                  priority: "medium",
                })
              }
              className="flex-1 border border-gray-300 text-gray-800 hover:bg-gray-100 bg-transparent font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
