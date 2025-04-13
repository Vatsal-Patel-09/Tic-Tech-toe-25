"use client";

import { useState, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

// A simple helper function to detect greetings
function isGreeting(message) {
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
  const normalized = message.toLowerCase().trim();
  return greetings.includes(normalized);
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // When the chat opens and there are no messages, add a welcome message.
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome = "Welcome to **Career GPT**! I'm your career assistant. Ask me anything about career advice, interview tips, resume guidance, and more.";
      setMessages([{ sender: "ai", text: welcome }]);
      setChatHistory("AI: " + welcome);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    // Append the new message to our temporary conversation context.
    const updatedHistory = chatHistory + "\nUser: " + userMessage;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    // Check if the user message is a greeting
    if (isGreeting(userMessage)) {
      const greetingResponse = "Hello! Welcome to **Career GPT**. How can I assist you today?";
      setMessages((prev) => [...prev, { sender: "ai", text: greetingResponse }]);
      setChatHistory(updatedHistory + "\nAI: " + greetingResponse);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/career-advisory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          chatHistory: updatedHistory,
        }),
      });
      const data = await res.json();
      const advisory = data.advisory;
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: advisory },
      ]);
      // Append the AI response to the conversation context.
      setChatHistory(updatedHistory + "\nAI: " + advisory);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-8 max-w-xl bg-white shadow-lg rounded-lg border p-4 z-50 mb-5">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h4 className="font-bold">Career Advisor</h4>
            <button onClick={toggleChat} className="text-gray-600">
              &times;
            </button>
          </div>
          <div className="h-60 overflow-y-auto mb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.sender === "ai" ? "text-gray-600" : "text-black"
                }`}
              >
                <strong>{msg.sender === "ai" ? "AI:" : "You:"}</strong>{" "}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your career query..."
              className="flex-1 border rounded-md px-2 py-1"
            />
            <button
              onClick={sendMessage}
              className="bg-black ml-2 text-white px-3 rounded-md flex items-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
      {/* Persistent Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-black px-[17px] text-white py-4 rounded-full shadow-lg z-50 animate-bounce"
      >
        💬
      </button>
    </>
  );
}