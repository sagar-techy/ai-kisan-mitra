import React, { useEffect, useState } from "react";
import api from "../services/api";
import ChatBubble from "./ChatBubble";

export default function ChatList() {
  const [messages, setMessages] = useState([]);
  const farmerId = "demo-farmer-id";

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/query/history/${farmerId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const handler = () => fetchHistory();
    window.addEventListener("new-query", handler);
    return () => window.removeEventListener("new-query", handler);
  }, []);

  return (
    <div className="space-y-3">
      {messages.length === 0 && (
        <div className="text-center text-sm text-slate-500">No history yet</div>
      )}
      {messages.map((m) => (
        <ChatBubble key={m._id} item={m} />
      ))}
    </div>
  );
}
