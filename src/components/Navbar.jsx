// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-green-400 font-bold text-lg">
          AI Kisan Mitra
        </Link>
        <div className="flex gap-4">
          <Link to="/expert" className="hover:text-green-400">
            Ask Expert
          </Link>
          <Link to="/register" className="hover:text-green-400">
            Register
          </Link>
          <Link to="/login" className="hover:text-green-400">
            Login
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
