"use client";

import ChatTerminal from "@/components/ChatTerminal";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatTerminal isMobile={true} />
    </div>
  );
}
