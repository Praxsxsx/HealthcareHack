"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./xray.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;
    const userMsg = { text: input || `Uploaded file: ${selectedFile?.name}`, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setImagePreview(null);
    let botText = "🤖 Analyzing your X-ray... Please wait.";

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        // Change this URL to your ngrok public URL if using ngrok; otherwise, localhost works if running locally
        const response = await fetch("http://localhost:8000/predict/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setPredictedImage(imageUrl);
          botText = "✅ Prediction complete!";
        } else {
          const data = await response.json();
          botText = `❌ Error: ${data?.error || "Unknown error"}`;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        botText = "❌ Error occurred while processing your X-ray. Please try again!";
      } finally {
        setSelectedFile(null);
      }
    } else if (input.trim()) {
      botText = "🤖 Sorry, I can only analyze X-ray images. Please upload an image.";
    }
    const botMsg = { text: botText, sender: "bot" };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="cb-container">
      <h1 className="cb-title">🩻 Upload Your X-ray</h1>
      <div className="cb-box">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`cb-message ${msg.sender === "user" ? "cb-message-user" : "cb-message-bot"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {msg.text}
          </motion.div>
        ))}
        {imagePreview && (
          <div className="cb-preview">
            <h3 className="cb-preview-title">🖼️ X-ray Preview</h3>
            <img src={imagePreview} alt="Preview" className="cb-preview-img" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {predictedImage && (
        <div className="cb-prediction">
          <h3>📸 Predicted X-ray:</h3>
          <img src={predictedImage} alt="Predicted Result" className="cb-prediction-img" />
        </div>
      )}
      <div className="cb-input-row">
        <input
          type="text"
          className="cb-input-field"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="file" accept="image/*" className="cb-file-upload" onChange={handleFileChange} />
        <button className="cb-send-btn" onClick={sendMessage}>📤 Send</button>
      </div>
    </div>
  );
}
