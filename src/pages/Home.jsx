"use client";

import React from "react";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaBolt,
  FaChevronRight,
} from "react-icons/fa";

export default function HomePage() {
  const stats = [
    {
      label: "Total Issues",
      value: "248",
      icon: <FaFileAlt />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Open Issues",
      value: "52",
      icon: <FaExclamationCircle />,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "In Progress",
      value: "31",
      icon: <FaClock />,
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Resolved",
      value: "165",
      icon: <FaCheckCircle />,
      color: "from-green-500 to-green-600",
    },
  ];

  const recentIssues = [
    {
      id: 1,
      title: "WiFi Not Working in Library Building",
      status: "open",
      reported_by: "Sarah Ahmed",
      created_at: "2 hours ago",
      category: "IT / Network",
    },
    {
      id: 2,
      title: "Broken AC in Classroom 301",
      status: "in_progress",
      reported_by: "John Davis",
      created_at: "5 hours ago",
      category: "Infrastructure",
    },
    {
      id: 3,
      title: "Water Leak in Cafeteria",
      status: "open",
      reported_by: "Emma Wilson",
      created_at: "1 day ago",
      category: "Infrastructure",
    },
    {
      id: 4,
      title: "Dusty Computer Lab Desks",
      status: "resolved",
      reported_by: "Mike Johnson",
      created_at: "3 days ago",
      category: "Cleanliness",
    },
  ];

  const categories = [
    { name: "Infrastructure", count: 89, icon: "🏗️" },
    { name: "IT / Network", count: 42, icon: "💻" },
    { name: "Cleanliness", count: 54, icon: "🧹" },
    { name: "Other", count: 63, icon: "⚙️" },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        label: "Open",
        className: "bg-red-100 text-red-800",
      },
      in_progress: {
        label: "In Progress",
        className: "bg-amber-100 text-amber-800",
      },
      resolved: {
        label: "Resolved",
        className: "bg-green-100 text-green-800",
      },
    };

    const config = statusConfig[status] || statusConfig.open;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
              <FaExclamationCircle />
            </div>
            <h1 className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">
              CampusTrack
            </h1>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Issues
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Docs
            </a>
            <button className="bg-blue-500 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-semibold">
              Sign In
            </button>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <span className="w-fit bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              Report & Track Issues
            </span>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Report, Track, and Resolve Campus Issues Easily
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Streamline campus maintenance with our intuitive issue tracking
              platform. Report problems, monitor progress, and ensure swift
              resolutions across your campus.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition">
                <FaBolt className="inline-block mr-2" />
                Report an Issue
              </button>

              <button className="border border-blue-300 text-blue-600 bg-transparent px-8 py-4 text-lg font-semibold rounded-full hover:bg-blue-50 transition">
                View All Issues
                <FaChevronRight className="inline-block ml-2" />
              </button>
            </div>
          </div>

          {/* Decorative Hero Image */}
          <div className="relative h-96 hidden md:flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-3xl"></div>
            <div className="relative w-80 h-80 bg-blue-500 rounded-3xl shadow-2xl flex items-center justify-center animate-float">
              <div className="text-white text-center space-y-4">
                <div className="text-6xl">📋</div>
                <p className="text-lg font-semibold">
                  Issue Tracking Made Simple
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-blue-100 transition-all hover:scale-105 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 text-white group-hover:scale-110 transition-transform`}
                >
                  <div className="text-xl">{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-10">
          <h3 className="text-3xl font-bold text-gray-900">Issue Categories</h3>
          <p className="text-gray-600 text-lg">
            Organize issues by type for better tracking
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                {cat.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {cat.name}
              </h4>
              <p className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-blue-500 rounded-3xl p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <h3 className="text-4xl md:text-5xl font-bold">
              Start Reporting Issues Today
            </h3>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto">
              Join your campus community in keeping the environment safe and
              well-maintained. Every report makes a difference.
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-full mx-auto inline-flex items-center hover:scale-105 transition-transform">
              <FaBolt className="mr-2" />
              Report Your First Issue
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-2">CampusTrack</h4>
              <p className="text-sm">
                Making campus maintenance simple and efficient.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm">support@campustrack.edu</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            © 2025 CampusTrack. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
