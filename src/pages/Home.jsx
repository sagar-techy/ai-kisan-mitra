// src/pages/Home.jsx
import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Namaste Farmer! मैं आपका AI Kisan Mitra हूँ। Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { sender: "farmer", text: input }]);

    setTimeout(() => {
      const reply =
        language === "en"
          ? "🌱 Here’s a farming tip in English."
          : language === "hi"
          ? "🌱 यह एक खेती का सुझाव है (हिंदी में)।"
          : "🌱 Voici un conseil agricole (français).";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 bg-gray-800 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-green-400 font-bold">🤖 AI Kisan Mitra</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-2 py-1 text-sm"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-xs p-3 rounded-xl ${
              msg.sender === "farmer"
                ? "ml-auto bg-green-500 text-gray-900"
                : "mr-auto bg-gray-800 text-gray-200"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-gray-800 flex gap-3 border-t border-gray-700"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            language === "en"
              ? "Type here..."
              : language === "hi"
              ? "यहाँ लिखें..."
              : "Écrivez ici..."
          }
          className="flex-1 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-gray-900 rounded-lg"
        >
          Send
        </motion.button>
      </form>

      {/* Expert Help Shortcut */}
      <div className="p-3 text-center">
        <Link
          to="/expert"
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          🤝 Need Human Expert Help?
        </Link>
      </div>
    </div>
  );
}
