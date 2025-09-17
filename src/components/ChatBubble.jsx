import { motion } from "framer-motion";

export default function ChatBubble({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700"
    >
      <p className="text-sm text-green-400 mb-2">
        <strong>Q:</strong> {item.question}
      </p>
      <p className="text-gray-200">
        <strong>AI:</strong> {item.answer}
      </p>
      <span className="block text-xs text-gray-500 mt-2">
        {new Date(item.createdAt).toLocaleString()}
      </span>
    </motion.div>
  );
}
