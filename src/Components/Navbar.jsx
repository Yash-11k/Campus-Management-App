import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// React Icons
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdLogout, MdAddCircle, MdHome } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <MdHome /> },
    { name: "Report Issue", path: "/issues/new", icon: <MdAddCircle /> },
    { name: "My Issues", path: "/issues/my", icon: <IoMdListBox /> },
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-50 bg-opacity-90 backdrop-blur border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <Link
            to="/"
            className="text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
          >
            Campus Tracker
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition font-medium"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-blue-900 font-medium">
                Hi, {user.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <MdLogout /> Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-1.5 border border-blue-400 text-blue-700 rounded-md hover:bg-blue-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-50 border-t border-blue-200 py-3 flex flex-col gap-3 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium py-1"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <div className="flex items-center gap-2 text-blue-900">
                <FaUserCircle /> {user.name || "User"}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-600 font-medium"
              >
                <MdLogout /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block py-1 text-blue-700 hover:text-blue-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block py-1 text-blue-700 hover:text-blue-900"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
