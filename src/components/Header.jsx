import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

// Check login status from localStorage
  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    return () => window.removeEventListener("loginStatusChanged", checkLoginStatus);
  }, []);

    const handleLogout = () => {
      setIsLoggingOut(true);
      setTimeout(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
        setIsLoggingOut(false);
        navigate("/login");
        window.dispatchEvent(new Event("loginStatusChanged"));
      }, 2000);
    };


  return (
    <nav className="bg-gray-800 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Expense Genie Logo" className="h-10 w-10 drop-shadow" />
            <span className="text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
              Expense Genie
            </span>
          </Link>

          {/* Desktop nav (lg and up) */}
          <div className="hidden lg:flex items-center gap-4 ml-6">
            <Link to="/" className="px-3 py-2 rounded-md text-base hover:bg-gray-700">
              Home
            </Link>
            <a href="#" className="px-3 py-2 rounded-md text-base hover:bg-gray-700">
              Features
            </a>
            <a href="#" className="px-3 py-2 rounded-md text-base hover:bg-gray-700">
              Contact
            </a>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition flex items-center justify-center"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" /*...*/></svg>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            ) : (
              <Link
                to="/signup"
                className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold transition"
              >
                Get Started
              </Link>
            )}

          </div>

          {/* Mobile menu button (below lg) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav (below lg) */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          <Link to="/" className="block px-3 py-2 rounded-md text-base hover:bg-gray-700">
            Home
          </Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base hover:bg-gray-700">
            Features
          </a>
          <a href="#" className="block px-3 py-2 rounded-md text-base hover:bg-gray-700">
            Contact
          </a>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold w-full flex items-center justify-center"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          ) : (
            <Link
              to="/signup"
              className="block mt-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
