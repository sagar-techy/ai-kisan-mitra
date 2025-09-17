import { useState } from "react";
import { motion } from "motion/react";

export default function ExpertDashboard() {
  const [message, setMessage] = useState("");
  const dummyReplies = [
    {
      q: "Tomato leaves yellow?",
      a: "Nitrogen deficiency, add urea carefully.",
    },
    { q: "Wheat rust issue?", a: "Apply Mancozeb fungicide immediately." },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    alert("Query sent: " + message);
    setMessage("");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex justify-center items-start py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          🤝 Ask an Expert
        </h2>
        <p className="text-gray-400 mb-6">
          Didn’t get enough from AI? Contact an agricultural expert for
          personalized help.
        </p>

        {/* Query Form */}
        <form onSubmit={handleSend} className="space-y-3 mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            rows={3}
            placeholder="Type your question for the expert..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-400 text-gray-900 font-medium rounded-lg shadow-md"
          >
            Send to Expert
          </motion.button>
        </form>

        {/* Replies */}
        <h3 className="text-lg font-semibold text-green-400 mb-3">
          📩 Expert Replies
        </h3>
        <div className="space-y-3">
          {dummyReplies.map((item, i) => (
            <div
              key={i}
              className="bg-gray-900 p-4 rounded-xl border border-gray-700 shadow"
            >
              <p className="text-green-400 font-medium">Q: {item.q}</p>
              <p className="text-gray-200 mt-1">🧑‍🏫 {item.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
