"use client";

import { useState, useEffect, useRef } from "react";
import { useAgent } from "./hooks/useAgent";
import ReactMarkdown from "react-markdown";

/**
 * Home page for the Superman AI Agent
 *
 * @returns {React.ReactNode} The home page
 */
export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isThinking } = useAgent();

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main Chat Container */}
      <div className="glass rounded-3xl p-6 shadow-2xl h-[80vh] flex flex-col">
        {/* Chat Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium">
              Superman AI is online
            </span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-4 p-2 scrollbar-thin">
          {messages.length === 0 ? (
            <div className="text-center text-white/70 mt-16">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">S</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Welcome to Superman AI
              </h3>
              <p className="text-sm opacity-80">
                Ask me about the weather, get a gym day pass, or anything else
                you need!
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-500/80 to-purple-600/80 text-white"
                      : "bg-white/15 text-white border border-white/20"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      a: (props) => (
                        <a
                          {...props}
                          className="text-blue-300 underline hover:text-blue-200 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>

                  {/* Display QR Code if available */}
                  {msg.qrCode && (
                    <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30">
                      <div className="text-center">
                        <img
                          src={msg.qrCode}
                          alt="QR Code"
                          className="mx-auto max-w-48 h-auto border rounded-lg shadow-md"
                        />
                        <p className="text-xs text-gray-600 mt-3 font-medium">
                          📱 Scan this QR code at the gym entrance
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-400"></div>
                  </div>
                  <span className="text-white/70 text-sm">
                    Superman AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Invisible div to track the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="mt-6 flex items-center space-x-3">
          <div className="flex-grow relative">
            <input
              type="text"
              className="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              placeholder="Ask Superman AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
              disabled={isThinking}
            />
          </div>
          <button
            onClick={onSendMessage}
            className={`px-6 py-4 rounded-2xl font-semibold transition-all backdrop-blur-sm ${
              isThinking
                ? "bg-white/10 cursor-not-allowed text-white/50 border border-white/20"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
            disabled={isThinking}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
