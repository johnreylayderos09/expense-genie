import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        // Save login status and username to localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.username); // assuming API returns username
        // Dispatch event so other components can update (optional but recommended)
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/");
      } else {
        setError(data.error || "Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Log In
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
            ❌ {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 px-4 py-2 rounded text-slate-900"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 px-4 py-2 rounded text-slate-900"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
