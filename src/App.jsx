import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing all required components
import Landing from "./pages/LandingPAge"
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
// import LandingPage from "./pages/LandingPage"; // You can remove this import if you only want auth/dashboards

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Authentication Routes --- */}
        
        {/* FIX: Set the root path ('/') to the Login component for immediate access. */}
        <Route path="/" element={<Landing />} /> 
        
        {/* The dedicated login path is optional if '/' is used, but keeping it is fine. */}
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        {/* --- Protected Dashboard Routes --- */}
        
        {/* Dashboard routes remain correct as per the role-based navigation */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        
        {/* OPTIONAL: Add a fallback for any unknown paths */}
        <Route path="*" element={<p className="text-center mt-20 text-xl">404 - Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;