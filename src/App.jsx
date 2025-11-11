import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./pages/CreateIssue";
import MyIssues from "./pages/MyIssues";
import IssueDetails from "./pages/IssueDetails";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/Home";
import Navbar from "./Components/Navbar";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

    <main className="pt-12">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/issues/new" element={<CreateIssue />} />
      <Route path="/issues/my" element={<MyIssues />} />
      <Route path="/issues/:id" element={<IssueDetails />} />
    </Routes>
    </main>
    </>
  );
}

export default App;
