import { motion } from "framer-motion";
import ChatList from "../components/ChatList";

export default function History() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl font-semibold mb-4 text-green-400">
        📜 Query History
      </h2>
      <p className="text-gray-400 mb-4">
        View your past queries and AI responses.
      </p>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <button className="px-3 py-1 bg-green-500 text-gray-900 rounded-lg hover:bg-green-600">
          All
        </button>
        <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600">
          Text
        </button>
        <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600">
          Image
        </button>
      </div>

      <ChatList />
    </motion.div>
  );
}
