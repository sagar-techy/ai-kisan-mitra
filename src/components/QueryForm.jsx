import { useState, useRef } from "react";
import { motion } from "motion/react";
import api from "../services/api";

export default function QueryForm() {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (e) => {
      setQuestion((prev) => prev + " " + e.results[0][0].transcript);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopVoice = () => recognitionRef.current?.stop();

  const handleImage = (e) => setImage(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    if (!question && !image) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("farmerId", "demo-farmer");
      form.append("question", question);
      if (image) form.append("image", image);
      await api.post("/query/ask", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setQuestion("");
      setImage(null);
      window.dispatchEvent(new Event("new-query"));
    } catch (err) {
      alert("Error submitting query");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={submit}
      className="space-y-3"
    >
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
        rows={3}
        placeholder="Type your question..."
      />
      <div className="flex gap-2 items-center">
        <label className="px-3 py-1.5 bg-gray-700 text-gray-200 rounded cursor-pointer hover:bg-gray-600">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
          📸 Upload
        </label>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          onClick={startVoice}
          className="px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-md shadow hover:bg-yellow-500"
        >
          🎙 Start
        </motion.button>
        <button
          type="button"
          onClick={stopVoice}
          className="px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
        >
          ⏹ Stop
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          disabled={loading}
          className="ml-auto px-4 py-1.5 bg-gradient-to-r from-green-500 to-green-400 text-gray-900 font-medium rounded-lg shadow-md"
        >
          {loading ? "Sending..." : "Ask AI"}
        </motion.button>
      </div>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2"
        >
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-40 rounded-xl shadow-lg border border-gray-700"
          />
        </motion.div>
      )}
    </motion.form>
  );
}
