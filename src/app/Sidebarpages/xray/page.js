"use client";
import { useRouter } from "next/navigation"; // Use this in app directory
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./xray.css";

export default function Chatbot() {
  const router = useRouter(); // Initialize router for navigation
  const [messages, setMessages] = useState([
    {
      text: " Upload your X-ray image and discover the invisible! ✨",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      e.target.value = "";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
    }

    if (selectedFile) {
      setMessages((prev) => [
        ...prev,
        { text: ` ᵔ ᵕ ᵔ   File uploaded for processing: ${fileName}`, sender: "user" },
      ]);
    }

    setLoading(true);

    // Bot's "Processing..." message
    setMessages((prev) => [
      ...prev,
      { text: " Analyzing... Please wait.", sender: "bot" },
    ]);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await fetch(
        "https://4d92-34-148-72-96.ngrok-free.app/analyze_xray",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error();

      if (selectedFile) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { text: " Oh my! You've got fractures consult a professional", sender: "bot" },
          { image: imageUrl, sender: "bot" },
        ]);
      } else {
        const data = await response.json();
        const botText = `✅ Response: ${data.answer || "No response received."}`;
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { text: botText, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error processing:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          text: "Error occurred while processing. Please try again!",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
      setSelectedFile(null);
      setFileName(""); 
    }
  };

  return (
    <div>
    <button 
        onClick={() => router.push('/')} // Navigate to the main page on click
        className="back-btn"
      >
         Go back to Main Page
      </button>
    <div className="cb-container">
      {/* Go to Main Page / Back Button */}

      <h1 className="cb-title"> Upload Your X-ray</h1>
      <div className="cb-box">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`cb-message ${
              msg.sender === "user" ? "cb-message-user" : "cb-message-bot"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {msg.text && <p>{msg.text}</p>}
            {msg.image && (
              <div className="cb-img-container">
                <img src={msg.image} alt="Processed X-ray" className="cb-img" />
                <a
                  href={msg.image}
                  download="processed_xray.jpg"
                  className="cb-download-btn"
                >
                  💾 Download Image
                </a>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="cb-input-row">
        {/* Custom File Input */}
        <label htmlFor="file-upload" className="cb-file-label">
          🗁 Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="cb-file-upload"
          onChange={handleFileChange}
          disabled={loading}
        />

        {fileName && <span className="cb-file-name">🗀  {fileName}</span>}

        <button className="cb-send-btn" onClick={sendMessage} disabled={loading}>
          {loading ? "⏱ Sending..." : "Send ⌯⌲"}
        </button>
      </div>
    </div>
    </div>
  );
}
