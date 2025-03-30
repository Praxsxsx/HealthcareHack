"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./gs.css"; // Import your custom CSS

export default function ChatbotPage() {
  // Chat state
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Alpha, your AI assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [faqOpen, setFaqOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Mute/Unmute state
  const [voices, setVoices] = useState([]); // Available voices
  const [isSpeaking, setIsSpeaking] = useState(false); // Control GIF state
  const [gifKey, setGifKey] = useState(0); // Key to reset GIF

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Speak Text with TTS (Female Voice)
  const speakText = (text) => {
    if (isMuted) return;
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      // Find and select a female voice
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Google UK English Female") ||
          voice.name.includes("Microsoft Zira")
      );

      // Set female voice if available
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        console.warn("Female voice not found. Using default voice.");
      }

      utterance.lang = "en-US"; // Set language
      utterance.rate = 1; // Normal speed
      utterance.pitch = 1.1; // Slightly higher pitch for a more natural female voice

      // Start and stop GIF control
      utterance.onstart = () => {
        setIsSpeaking(true);
        setGifKey((prevKey) => prevKey + 1); // Change key to reset GIF
      };
      utterance.onend = () => setIsSpeaking(false);

      synth.speak(utterance);
    } else {
      console.error("Speech Synthesis not supported in this browser.");
    }
  };

  // Handle Sending Message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message
    const userMessage = input;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60-second timeout

    try {
      setMessages((prev) => [...prev, { sender: "bot", text: "⏳ Processing..." }]);

      const response = await fetch("https://8c62-34-127-36-42.ngrok-free.app/alpha_bot80", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error();

      const data = await response.json();

      // Speak bot's response
      speakText(data.answer); // Speak response

      setMessages((prev) => [...prev.slice(0, -1), { sender: "bot", text: data.answer }]);
    } catch (error) {
      const errorMessage = "An error occurred. Try again!";
      setMessages((prev) => [...prev.slice(0, -1), { sender: "bot", text: errorMessage }]);
      speakText(errorMessage); // Speak error message if needed
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h4 className="sidebar-title">Menu</h4>
        <ul className="sidebar-menu">
          <li>
            <Link href="/Sidebarpages/Dashboard" aria-label="Go to Dashboard">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/dashboard-2-48.png" width="20" height="20" />
              </span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/settings" aria-label="Go to Settings">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/gear-48.png" width="20" height="20" />
              </span>
              Settings
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/ai-doctor" aria-label="Go to AI Doctor">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/appointment-reminders-48.png" width="20" height="20" />
              </span>
              Appointments
            </Link>
          </li>
          <li>
            <Link href="/myhealth-tracker" aria-label="Go to MyHealth Tracker">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/report-2-48.png" width="20" height="20" />
              </span>
              MyHealth Tracker
            </Link>
          </li>
          <li>
            <Link href="/special-care" aria-label="Go to Special Care Hub">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/baby-48.png" width="20" height="20" />
              </span>
              Special Care Hub
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/xray">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/xray-48.png" width="20" height="20" />
              </span>
              AI X-Ray Analyzer
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/article" aria-label="Go to Disease Prevention">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/virus.png" width="20" height="20" />
              </span>
              Disease Prevention
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/profile" aria-label="Go to Profile">
              <span className="menu-icon" style={{ margin: "5px" }}>
                <img src="/user-48.png" width="20" height="20" />
              </span>
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-light bg-light fixed-top d-flex justify-content-between align-items-center px-3">
        <div className="d-flex align-items-center">
          <button
            className="btn bg-black text-white me-2"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="navbar-brand">AlphaWell</div>
        </div>
        <div className="d-flex align-items-center">
          {/* Mute/Unmute Button */}
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>

          {/* Profile Icon */}
          <Link href="/profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-circle"
            />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ marginTop: "80px" }}>
        {/* AI Avatar Section */}
        <div className="ai-avatar">
          <div className="avatar-wrapper">
            {/* Static Image as Base */}
            <Image
              src="/doc.jpg"
              alt="AI Avatar"
              width={200}
              height={200}
              className="avatar-image static-image"
            />
            {/* GIF Overlay when Speaking */}
            {isSpeaking && (
              <Image
                key={gifKey} // Reset GIF with key change
                src="/doc.gif"
                alt="AI Speaking Animation"
                width={200}
                height={200}
                className="avatar-image gif-overlay"
              />
            )}
          </div>
        </div>

        {/* Chat Box */}
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button className="send-btn" onClick={handleSend} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`faq-section ${faqOpen ? "open" : ""}`}>
          <button className="faq-toggle" onClick={() => setFaqOpen(!faqOpen)}>
            {faqOpen ? "❌ Close FAQ" : "❓ FAQ"}
          </button>
          {faqOpen && (
            <div className="faq-content">
              <h3>Frequently Asked Questions</h3>
              <ul>
                <li>
                  <strong>How does this chatbot work?</strong>
                  <br />
                  It uses AI to provide real-time responses.
                </li>
                <li>
                  <strong>Can I talk about medical issues?</strong>
                  <br />
                  Yes, but always consult a doctor for serious concerns.
                </li>
                <li>
                  <strong>Is my data safe?</strong>
                  <br />
                  Yes, we do not store personal data.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
