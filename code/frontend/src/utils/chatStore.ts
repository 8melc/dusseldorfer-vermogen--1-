// utils/chatStore.ts
import { create } from "zustand";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai" | "error";
  timestamp: Date;
}

export type ChatView = "default" | "finanzkompass" | "berater";

interface ChatState {
  // UI-Zustände
  isChatOpen: boolean;
  isFullScreen: boolean;
  isDetailView: boolean;
  activeView: ChatView | null;

  // Inhalte
  messages: Message[];
  showWelcome: boolean;

  // Übergabe aus Artikeln (wird beim Öffnen automatisch geschickt)
  pendingQuestion: string | null;

  // Actions
  openChat: (options?: { view?: ChatView; sidebarOnly?: boolean }) => void;
  closeChat: () => void;
  toggleFullScreen: () => void;
  toggleChat: () => void;

  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, newText: string) => void;
  clearChat: () => void;

  setShowWelcome: (show: boolean) => void;
  setPendingQuestion: (q: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  // Defaults
  isChatOpen: false,
  isFullScreen: false,
  isDetailView: false,
  activeView: null,

  messages: [],
  showWelcome: true,

  pendingQuestion: null,

  // Öffnet den Chat (optional in bestimmter Ansicht)
  openChat: (options = {}) =>
    set({
      isChatOpen: true,
      activeView: options.view ?? "default",
      isFullScreen: !options.sidebarOnly,
      showWelcome: true,
    }),

  closeChat: () =>
    set({
      isChatOpen: false,
      showWelcome: true,
    }),

  toggleFullScreen: () =>
    set((state) => ({ isFullScreen: !state.isFullScreen })),

  toggleChat: () =>
    set((state) => {
      if (state.isChatOpen) {
        return {
          isChatOpen: false,
          showWelcome: true,
          // optional: activeView zurücksetzen, falls gewünscht
        };
      }

      return {
        isChatOpen: true,
        isFullScreen: true,      // <- erzwingt Vollbild beim Öffnen
        activeView: "default",
        showWelcome: true,
      };
    }),

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
      showWelcome: false,
    })),

  updateMessage: (messageId: string, newText: string) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, text: newText } : m
      ),
    })),

  clearChat: () => set({ messages: [], showWelcome: true }),

  setShowWelcome: (show: boolean) => set({ showWelcome: show }),
  setPendingQuestion: (q: string | null) => set({ pendingQuestion: q }),
}));
