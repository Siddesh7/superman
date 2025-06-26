"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useWallet } from "@/lib/hooks/useWallet";

interface ChatTerminalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: string;
  qrCode?: string;
}

const ChatTerminal = ({
  isOpen: propIsOpen,
  onClose,
  isMobile = false,
}: ChatTerminalProps) => {
  const { data: session, status } = useSession();
  const {
    data: walletData,
    isLoading: isLoadingWalletData,
    error: walletError,
  } = useWallet(session?.user?.id);

  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm your GymGather assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  // Don't render anything if user is not authenticated with Google
  if (status === "loading") {
    return null; // Show nothing while loading
  }

  if (status === "unauthenticated" || !session?.user) {
    return null; // Don't show chat terminal for unauthenticated users
  }

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    try {
      // Prepare the message with wallet address appended if available
      let messageWithWallet = currentMessage;
      if (walletData?.account?.address) {
        messageWithWallet = `${currentMessage} [Wallet Address: ${walletData.account.address}]`;
        console.log(messageWithWallet);
      }

      // Call the agent API
      const response = await fetch("http://localhost:3002/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: messageWithWallet,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Process the response to extract QR codes and format gym pass responses
      let formattedResponse = data.response;
      let qrCodeData = null;

      if (
        data.response &&
        (data.response.includes("gym day pass") ||
          data.response.includes("QR Code"))
      ) {
        // Extract QR code data if present
        const qrMatch = data.response.match(
          /!\[QR Code\]\(data:image\/png;base64,([^)]+)\)/
        );
        if (qrMatch) {
          qrCodeData = qrMatch[1];
          formattedResponse =
            "✅ Gym pass created! I paid for your pass. Here's your QR code:";
        }
      }

      // Add bot response
      const botResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        text:
          formattedResponse ||
          "I received your message, but I couldn't process it properly. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
        qrCode: qrCodeData,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling agent API:", error);

      // Add error message
      const errorResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        text: "Sorry, I'm having trouble connecting to the agent service. Please try again later.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // For mobile, render only the chat window content
  if (isMobile) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center glass justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-glow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">GymGather Assistant</h3>
              <p className="text-xs text-white/60">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.type === "bot"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                }`}
              >
                {msg.type === "bot" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] ${
                  msg.type === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    msg.type === "bot"
                      ? "bg-white/10 text-white"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.qrCode && (
                    <div className="mt-3 flex justify-center">
                      <img
                        src={`data:image/png;base64,${msg.qrCode}`}
                        alt="Gym Pass QR Code"
                        className="w-32 h-32 rounded-lg border-2 border-white/20"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/50 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 glass border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // For desktop, render the floating chat button and window
  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg animate-glow z-50 border border-black/10 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 text-gray-800 dark:text-white" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl z-50 flex flex-col animate-scale-in border border-black/10 dark:border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md flex items-center justify-center animate-glow border border-black/10 dark:border-white/20">
                <Bot className="w-5 h-5 text-gray-800 dark:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  GymGather Assistant
                </h3>
                <p className="text-xs text-gray-600 dark:text-white/60">
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 dark:text-white/60 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/10 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/20 ${
                    msg.type === "bot"
                      ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 dark:from-purple-500/50 dark:to-pink-500/50"
                      : "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 dark:from-blue-500/50 dark:to-cyan-500/50"
                  }`}
                >
                  {msg.type === "bot" ? (
                    <Bot className="w-4 h-4 text-gray-800 dark:text-white" />
                  ) : (
                    <User className="w-4 h-4 text-gray-800 dark:text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] ${
                    msg.type === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-md ${
                      msg.type === "bot"
                        ? "border border-black/10 dark:border-white/20"
                        : "bg-gradient-to-r from-purple-500/30 to-pink-500/30 dark:from-purple-500/50 dark:to-pink-500/50 border border-black/10 dark:border-white/20"
                    }`}
                  >
                    <p className="text-sm text-gray-800 dark:text-white">
                      {msg.text}
                    </p>
                    {msg.qrCode && (
                      <div className="mt-3 flex justify-center">
                        <img
                          src={`data:image/png;base64,${msg.qrCode}`}
                          alt="Gym Pass QR Code"
                          className="w-32 h-32 rounded-lg border-2 border-gray-300 dark:border-white/20"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-white/50 mt-1">
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 dark:bg-white/5 backdrop-blur-md border-black/10 dark:border-white/20 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatTerminal;
