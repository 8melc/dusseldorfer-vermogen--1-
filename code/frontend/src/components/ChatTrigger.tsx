import React from "react";
import { useChatStore } from "utils/chatStore";
import { ChatMessagesIcon } from "./ChatMessagesIcon";

export const ChatTrigger = () => {
  const { isChatOpen, openChat, closeChat } = useChatStore();
  
  const handleToggle = () => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat({ sidebarOnly: false });
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleToggle}
      className="hidden sm:flex group fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out z-[1000] border-2 border-accent"
      aria-label="FinanzKompass öffnen"
    >
      <ChatMessagesIcon />
    </button>
  );
};