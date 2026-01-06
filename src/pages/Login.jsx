// File: Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Using Lucide-React icons, which are typically installed via npm/yarn
// If you encounter an error here, you might need to install them: npm install lucide-react
import { Eye, EyeOff } from "lucide-react"; 

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data.detail || "Login failed. Check your credentials.";
        setError(errorMessage);
        return;
      }

      // Store Auth Data
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_email", data.email);

      // Role-Based Redirection (Logic is correct)
      if (data.role === "student") {
        navigate("/student/dashboard");
      } else if (data.role === "teacher" || data.role === "admin") {
        navigate("/teacher/dashboard");
      } else {
        setError("Login successful, but role is unrecognized. Contact support.");
      }
    } catch (err) {
      setError("Server not reachable. Please check your network or try again later.");
      console.error("Login Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Removed TypeScript type annotation (e: React.KeyboardEvent)
  const handleKeyPress = (e) => { 
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-blue-600 text-xl font-bold">P</span>
              </div>
            </div>
            <h1 className="text-white text-center text-3xl font-bold mb-2">PresenX</h1>
            <p className="text-blue-100 text-center text-sm">Attendance Made Easy</p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin mr-2"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">New to PresenX?</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2026 PresenX. All rights reserved. |
              <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">🔒 Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
}

export default Login;