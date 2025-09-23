// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import useAuth from "../services/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <Motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1">
          <img className="size-10" src="/plant.png" alt="logo" />
          <span className="font-semibold text-lg text-white">
            AI Kisan Mitra
          </span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/expert" className="hover:text-green-400">
            Ask Expert
          </Link>
          {user && (
            <>
              <span className="text-sm text-gray-300 hidden sm:block">
                {user.displayName || user.email}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-md bg-green-600 text-gray-900 hover:bg-green-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </Motion.nav>
  );
}
