import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!username || !email || !role || !password) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("https://authbackend-ljk9.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: email.toLowerCase().trim(),
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          typeof data.detail === "string"
            ? data.detail
            : data.detail?.[0]?.msg || "Registration failed"
        );
        return;
      }

      alert("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      setError("Backend server not reachable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-center">
            <div className="w-12 h-12 bg-white rounded-xl mx-auto flex items-center justify-center mb-2 shadow">
              <span className="text-blue-600 text-xl font-bold">P</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Join PresenX</h1>
            <p className="text-blue-100 text-sm">Create your account</p>
          </div>

          {/* BODY */}
          <div className="px-6 py-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  placeholder="JohnDoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </p>
          </div>

          {/* FOOTER */}
          <div className="bg-gray-50 py-3 text-center text-xs text-gray-500 border-t">
            © 2026 PresenX
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
