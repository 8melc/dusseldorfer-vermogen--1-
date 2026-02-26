import React, { useState, useRef, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useChatStore, Message } from "utils/chatStore";
import brain from "../brain";
import { useCurrentUser } from "app";
import { ChatRequest, ChatMessage } from "../brain/data-contracts";
import { Button } from '@/components/ui/button';
import { Markdown } from "./Markdown";

// --- Definitionen für Finanzkompass-Ansicht ---
interface FinanzCategory {
  id: string;
  title: string;
  questions: string[];
}

export function initWithArticleQuestion(question: string) {
  const { openChat } = useChatStore.getState();
  // KI-Funktion deaktiviert – Panel öffnen ohne Frage zu stellen
  openChat({ view: "finanzKompass", sidebarOnly: false });
}

type ChatView = "default" | "finanzKompass";

type Props = {
  view?: ChatView;
};

// Schnellstart-Buttons für das Willkommensfenster
const quickStartButtons = [
  {
    label: "Vermögensstrategie entwickeln",
    query: "Wie kann ich eine langfristige Vermögensstrategie entwickeln, die zu meinen Zielen passt?"
  },
  {
    label: "Werterhaltende Anlagen entdecken",
    query: "Welche werterhaltenden Anlagen bieten aktuell die besten Perspektiven?"
  },
  {
    label: "Vermögensnachfolge planen",
    query: "Wie kann ich mein Vermögen optimal für die nächste Generation planen?"
  }
];

const FINANZ_CATEGORIES: FinanzCategory[] = [
  {
    id: 'portfolio',
    title: 'Portfolio-Optimierung',
    questions: [
      'Wie passt dieser Artikel zu meiner Anlagestrategie?',
      'Welche Risiken sollte ich beachten?',
      'Welche Anlageklassen werden beeinflusst?'
    ]
  },
  {
    id: 'markets',
    title: 'Markttrends',
    questions: [
      'Was bedeutet dieser Trend für die kommenden 6 Monate?',
      'Wie unterscheiden sich die regionalen Auswirkungen?',
      'Welche Sektoren profitieren am meisten?'
    ]
  },
  {
    id: 'concepts',
    title: 'Finanzkonzepte erklärt',
    questions: [
      'Was bedeutet dieser Fachbegriff genau?',
      'Wie funktioniert dieses Finanzinstrument?',
      'Warum ist dieser Indikator wichtig?'
    ]
  },
  {
    id: 'strategy',
    title: 'Strategische Planung',
    questions: [
      'Wie sollte ich langfristig planen?',
      'Welche steuerlichen Aspekte sind relevant?',
      'Was sind die Vor- und Nachteile dieser Strategie?'
    ]
  },
  {
    id: 'personal',
    title: 'Persönliche Finanzfragen',
    questions: [
      'Wie viel sollte ich in dieser Phase investieren?',
      'Wie balanciere ich Risiko und Rendite?',
      'Wann sollte ich meine Strategie anpassen?'
    ]
  }
];

export function ChatPanel({ view = "default" }: Props) {
  const {
    closeChat,
    messages,
    addMessage,
    updateMessage,
    showWelcome,
    setShowWelcome,
    isChatOpen,
    pendingQuestion,
    setPendingQuestion,
    clearChat,
  } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Finanzkompass-Ansicht States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<
    Array<{ type: "user" | "assistant"; content: string }>
  >([]);
  const [fkInputValue, setFkInputValue] = useState("");
  const [isFkLoading, setIsFkLoading] = useState(false);

  // Gemeinsamen Reset-Handler
  const handleResetChat = () => {
    clearChat();
    setPendingQuestion(null);
    setInputValue("");
    setIsLoading(false);

    // FinanzKompass-spezifische States ebenfalls leeren
    setSelectedCategory(null);
    setChatHistory([]);
    setFkInputValue("");
    setIsFkLoading(false);

    // Welcome-Screen aktiv lassen
    setShowWelcome(true);
  };

  const handleQuestionSelect = async (question: string) => {
    const trimmedInput = question.trim();
    if (trimmedInput === "") return;

    if (false) { // Auth deaktiviert für Demo
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Sie müssen angemeldet sein, um diesen Dienst nutzen zu können.",
        },
      ]);
      return;
    }

    setChatHistory((prev) => [...prev, { type: "user", content: trimmedInput }]);
    setIsFkLoading(true);

    const aiMessageId = Date.now().toString();
    setChatHistory((prev) => [...prev, { type: "assistant", content: "" }]);

    try {
      const historyForAPI: ChatMessage[] = chatHistory.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      const requestBody: ChatRequest = {
        prompt: `Nutzername: Melissa. Nachricht: ${trimmedInput}`,
        history: historyForAPI,
      };

      let accumulatedResponse = "";
      for await (const chunk of brain.handle_openai_chat(requestBody)) {
        if (typeof chunk === "string") {
          accumulatedResponse += chunk;
          setChatHistory((prev) => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].content = accumulatedResponse;
            return newHistory;
          });
        }
      }
    } catch (error) {
      console.error("Fehler im FinanzKompass-Chat:", error);
      setChatHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].content =
          "Ich konnte leider keine Verbindung herstellen. Bitte versuchen Sie es später erneut.";
        return newHistory;
      });
    } finally {
      setIsFkLoading(false);
    }
  };

  useEffect(() => {
    if (isChatOpen && pendingQuestion) {
      if (view === "finanzKompass") {
        handleQuestionSelect(pendingQuestion);
      } else {
        setInputValue(pendingQuestion);
        setTimeout(() => {
          handleSendMessage(pendingQuestion);
        }, 100);
      }
      setPendingQuestion(null);
    }
  }, [isChatOpen, pendingQuestion, setPendingQuestion, view]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Welche Strategien sichern mein Lebenswerk?",
    "Welche Künstler gewinnen 2025 an Wert?",
    "Was schützt mein Portfolio vor Marktschwankungen?",
    "Wie entwickelt sich der Kunstmarkt – Chancen und Risiken?",
    "Was bedeutet ESG für meine Investmentstrategie?",
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const hideWelcome = () => {
    setShowWelcome(false);
  };

  const handleQuickButtonClick = (query: string) => {
    setInputValue(query);
    hideWelcome();
    setTimeout(() => {
      handleSendMessage(query);
    }, 100);
  };

  const handleQuickQuestionClick = (question: string) => {
    setInputValue(question);
    if (showWelcome) {
      hideWelcome();
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const finalMessage = messageText || inputValue.trim();
    
    if (finalMessage === "") return;

    if (showWelcome) {
      setShowWelcome(false);
    }

    if (false) { // Auth deaktiviert für Demo
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sie müssen angemeldet sein, um den AI-Assistenten nutzen zu können.",
        sender: "error",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
      setInputValue(finalMessage);
      return;
    }

    try {
      const token = "demo-token";
      console.log("AUTH_DEBUG: Firebase Auth Token before sending chat message:", token ? token.substring(0, 20) + '...' : 'No token');
      if (!token) {
        console.warn("AUTH_DEBUG: No Firebase token available. User might not be properly logged in or token fetch failed.");
      }
    } catch (e) {
      console.error("AUTH_DEBUG: Error getting auth token for logging:", e);
    }

    const userName = "Melissa";
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: finalMessage,
      sender: "user",
      timestamp: new Date(),
    };
    addMessage(newUserMessage);
    setInputValue("");
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    const initialAiMessage: Message = {
      id: aiMessageId,
      text: "",
      sender: "ai",
      timestamp: new Date(),
    };
    addMessage(initialAiMessage);

    try {
      const historyForAPI: ChatMessage[] = messages
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : ("assistant" as "user" | "assistant"),
          content: msg.text
            .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
            .replace(/<em>(.*?)<\/em>/gi, "$1")
            .replace(/<br \/>/gi, "\n")
            .replace(/<p>(.*?)<\/p>/gi, "$1\n")
            .replace(/<[^>]+>/g, "")
            .trim(),
        }));

      const requestBody: ChatRequest = {
        prompt: `Nutzername: ${userName}. Nachricht: ${finalMessage}`,
        history: historyForAPI
      };

      let accumulatedResponse = "";
      for await (const chunk of brain.handle_openai_chat(requestBody)) {
        if (typeof chunk === 'string') {
          accumulatedResponse += chunk;
          updateMessage(aiMessageId, accumulatedResponse);
        } else {
          console.warn("Received non-string chunk:", chunk);
        }
      }

    } catch (error) {
      console.error("Fehler bei der AI-Verbindung oder beim Streaming:", error);
      const errorText = "Ich konnte leider keine Verbindung herstellen. Bitte versuchen Sie es später erneut.";
      updateMessage(aiMessageId, errorText);
    } finally {
      setIsLoading(false);
    }
  };

  // Finanzkompass Ansicht - KI deaktiviert
  if (view === 'finanzKompass') {
    return (
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#F5F1E6] via-[#F7F3EA] to-[#EFE8D6]">
        {/* Header */}
        <div className="p-6 border-b border-transparent flex items-center justify-between bg-white/90 backdrop-blur rounded-t-3xl shadow-lg shadow-[#d4c7aa]/40 mx-6 mt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96F]/80">FinanzKompass</p>
            <h3 className="text-2xl font-serif text-[#0B0E28]">Ihr persönlicher Navigator</h3>
          </div>
          <button
            className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B0E28] to-[#121740] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            onClick={closeChat}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Deaktiviert */}
        <div className="flex-1 overflow-hidden px-6 pb-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white/90 border border-white/50 rounded-3xl shadow-xl shadow-[#d4c7aa]/40 p-8">
            <div className="flex justify-center mb-5">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0B0E28] to-[#161b45] shadow-md shadow-[#0b0e28]/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#C8A96F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-[1.75rem] leading-tight font-serif text-center mb-2 text-[#0B0E28]">
              FinanzKompass
            </h2>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8F5ED] to-[#F2E9D4] border border-[#E8D9B9]/70 shadow-inner">
              <p className="text-[#0B0E28]/85 text-center">
                Aktuell ist die KI-Funktion deaktiviert.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#F5F1E6] via-[#F6F2EA] to-[#EDE4D3]">
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="p-6 flex items-center justify-between bg-white/90 backdrop-blur border border-transparent rounded-3xl shadow-xl shadow-[#d4c7aa]/30">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96F]/80">FinanzKompass</p>
            <h2 className="text-2xl font-serif text-[#0B0E28]">
              Ihr persönlicher FinanzKompass
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetChat}
              className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#F7F3EA] to-[#E5DAC0] text-[#0B0E28] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              aria-label="Reset Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              type="button"
              onClick={closeChat}
              className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B0E28] to-[#121740] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              aria-label="Chat schließen"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-4 overflow-hidden">
        <div className="flex flex-col h-full rounded-3xl border border-white/65 bg-white/55 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex-grow overflow-y-auto px-5 pt-5 pb-1 space-y-4 relative">
            <div className="flex flex-col space-y-4">
              {/* Willkommensfenster */}
              {messages.length === 0 && !isLoading && (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <div className="max-w-2xl w-full bg-white/90 border border-white/50 rounded-3xl shadow-xl shadow-[#d4c7aa]/40 p-8 md:p-9">
                    <div className="flex justify-center mb-5">
                      <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0B0E28] to-[#161b45] shadow-md shadow-[#0b0e28]/40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#C8A96F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                    </div>

                    <h2 className="text-[1.75rem] leading-tight font-serif text-center mb-2 text-[#0B0E28]">
                      FinanzKompass
                    </h2>

                    <div className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-[#F8F5ED] to-[#F2E9D4] border border-[#E8D9B9]/70 shadow-inner">
                      <p className="text-[#0B0E28]/85 text-center">
                        Aktuell ist die KI-Funktion deaktiviert.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-5 py-4 rounded-3xl shadow-md transition-all duration-300 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-[#C8A96F] to-[#B08A55] text-white rounded-tr-sm"
                        : "bg-white/95 text-[#0B0E28] border border-[#E8D9B9]/60 rounded-tl-sm"
                    }`}
                  >
                    {msg.sender === "ai" || msg.sender === "error" ? (
                      <Markdown>{msg.text}</Markdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-5 py-4 rounded-3xl rounded-tl-sm bg-white/95 text-[#0B0E28] border border-[#E8D9B9]/60 shadow-md">
                    Ich denke nach...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

          </div>

          {/* Input Area - KI deaktiviert */}
          <div className="border-t border-white/55 bg-white/80 backdrop-blur px-6 py-3">
            <div className="relative flex items-center">
              <textarea
                className="w-full p-3.5 pr-14 border border-transparent rounded-3xl resize-none outline-none bg-[#F7F3EA] text-[#0B0E28]/40 transition-all duration-300 shadow-inner cursor-not-allowed"
                placeholder="KI-Funktion aktuell deaktiviert"
                rows={1}
                value=""
                readOnly
                disabled
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0B0E28] to-[#121740] text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Nachricht senden"
                disabled
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 transform rotate-[90deg]"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
