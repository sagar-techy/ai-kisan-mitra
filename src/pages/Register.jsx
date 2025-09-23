import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import useAuth from "../services/useAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      // After first registration, go straight to home (protected)
      navigate("/");
    } catch (err) {
      alert("Register failed: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex justify-center items-center px-4">
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-2 text-green-400">
          Create Account 🌾
        </h2>
        <p className="text-gray-400 mb-6">
          Join{" "}
          <span className="text-green-400 font-medium">AI Kisan Mitra</span> to
          get instant farming advice via text, voice, or images in your
          language.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-400 text-gray-900 font-medium py-2 rounded-lg shadow-md"
          >
            Register
          </Motion.button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </Motion.div>
    </div>
  );
}
