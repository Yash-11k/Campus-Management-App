import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage (if logged in previously)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function (works with backend OR mock for now)
  const login = async (email, password) => {
    try {
      // 🔹 Mock login (for now, since backend not ready)
      // Replace this block later with an API call to your backend:
      // const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      // const { token, user } = response.data;
      // localStorage.setItem("token", token);
      // setUser(user);

      if (email && password) {
        const mockUser = { name: "Vaishnavi", email };
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        navigate("/");
      } else {
        alert("Please enter email and password!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  // Signup function (for backend — not used yet)
  const signup = async (name, email, password) => {
    try {
      // 🔹 Replace with backend call when ready
      const mockUser = { name, email };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Keep user synced with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
