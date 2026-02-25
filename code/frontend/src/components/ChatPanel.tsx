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
  const { openChat, setShowWelcome, setPendingQuestion } = useChatStore.getState();
  setPendingQuestion(question);
  setShowWelcome(false);
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

  // Finanzkompass Ansicht
  if (view === 'finanzKompass') {
    const handleCategorySelect = (categoryId: string) => {
      setSelectedCategory(categoryId);
    };

    return (
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#F5F1E6] via-[#F7F3EA] to-[#EFE8D6]">
        {/* Header */}
        <div className="p-6 border-b border-transparent flex items-center justify-between bg-white/90 backdrop-blur rounded-t-3xl shadow-lg shadow-[#d4c7aa]/40 mx-6 mt-6">
          <div className="flex items-center gap-3">
            {(selectedCategory || chatHistory.length > 0) && (
              <button
                className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#C8A96F] to-[#B08A55] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => {
                  setSelectedCategory(null);
                  setChatHistory([]);
                  setFkInputValue('');
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C8A96F]/80">FinanzKompass</p>
              <h3 className="text-2xl font-serif text-[#0B0E28]">Ihr persönlicher Navigator</h3>
            </div>
          </div>
          <button
            className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B0E28] to-[#121740] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            onClick={closeChat}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden px-6 pb-4">
          <div className="h-full overflow-y-auto rounded-3xl bg-white/70 backdrop-blur-lg border border-white/60 shadow-xl shadow-[#d4c7aa]/30 px-6 pt-5 pb-2">
            {chatHistory.length === 0 ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg font-serif mb-2 text-[#0B0E28]">
                    Wie kann ich Ihnen heute helfen?
                  </p>
                  <p className="text-sm text-[#0B0E28]/70">
                    Wählen Sie eine Kategorie oder stellen Sie eine spezifische Frage
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {FINANZ_CATEGORIES.map(category => (
                    <div
                      key={category.id}
                      className="p-6 bg-white border border-[#E8D9B9]/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A96F]/70 hover:bg-gradient-to-br hover:from-white hover:to-[#F5EFD9]"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <h4 className="font-serif text-lg text-[#0B0E28]">
                        {category.title}
                      </h4>
                      <div className="mt-3 mb-4 h-[2px] w-10 bg-gradient-to-r from-[#C8A96F] to-[#E3D4B2]" />
                      <p className="text-sm text-[#0B0E28]/70">
                        Spezialisierte Beratung in diesem Bereich
                      </p>
                    </div>
                  ))}
                </div>

                {selectedCategory && (
                  <div className="mt-6 p-6 bg-white/90 border border-[#E8D9B9]/70 rounded-2xl shadow-lg">
                    <h4 className="font-serif text-lg mb-4 text-[#0B0E28]">
                      Häufige Fragen:
                    </h4>
                    <div className="space-y-3">
                      {FINANZ_CATEGORIES.find(c => c.id === selectedCategory)?.questions.map((q, i) => (
                        <button
                          key={i}
                          className="w-full text-left p-4 bg-gradient-to-r from-[#F8F5ED] to-[#F3EBD8] border border-[#E8D9B9]/60 rounded-2xl text-[#0B0E28] hover:border-[#C8A96F] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          onClick={() => handleQuestionSelect(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-md transition-all duration-300 ${
                        msg.type === "user"
                          ? "bg-gradient-to-br from-[#C8A96F] to-[#B08A55] text-white rounded-tr-sm"
                          : "bg-white text-[#0B0E28] border border-[#E8D9B9]/60 rounded-tl-sm"
                      }`}
                    >
                      {msg.type === "assistant" ? (
                        <Markdown>{msg.content}</Markdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isFkLoading && (
                  <div className="flex justify-start">
                    <div className="px-5 py-4 rounded-3xl rounded-tl-sm bg-white text-[#0B0E28] border border-[#E8D9B9]/60 shadow-md">
                      Ich denke nach...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-white/90 backdrop-blur border border-white/70 shadow-xl shadow-[#d4c7aa]/30 rounded-3xl">
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="flex-1 px-4 py-3 border border-transparent rounded-2xl bg-[#F7F3EA] text-[#0B0E28] focus:outline-none focus:ring-2 focus:ring-[#C8A96F]/50 focus:border-[#C8A96F]/40 transition-all duration-300"
                placeholder="Stellen Sie Ihre Frage..."
                value={fkInputValue}
                onChange={(e) => setFkInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && fkInputValue.trim() && !isFkLoading) {
                    handleQuestionSelect(fkInputValue);
                    setFkInputValue('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (fkInputValue.trim() && !isFkLoading) {
                    handleQuestionSelect(fkInputValue);
                    setFkInputValue('');
                  }
                }}
                disabled={isFkLoading}
                className="px-6 py-3 font-medium bg-gradient-to-br from-[#0B0E28] to-[#121740] text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60"
              >
                Senden
              </button>
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
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96F]/80">Aura Assistent</p>
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
              {messages.length === 0 && !isLoading && showWelcome && (
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
                      Willkommen bei Ihrem persönlichen FinanzKompass
                    </h2>

                    <p className="text-sm text-center mb-5 text-[#0B0E28]/70">
                      Ihr digitaler Experte für die Kölner Vermögensphilosophie
                    </p>

                    <div className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-[#F8F5ED] to-[#F2E9D4] border border-[#E8D9B9]/70 shadow-inner">
                      <p className="text-[#0B0E28]/85">
                        Guten Tag! Ich bin Aura, Ihr persönlicher FinanzKompass-Assistent. Wie kann ich Sie heute in Vermögensfragen unterstützen?
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {quickStartButtons.map((button, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickButtonClick(button.query)}
                          className="w-full py-3.5 px-5 text-left bg-gradient-to-r from-[#F7F3EA] to-[#EDE3D0] border border-transparent rounded-3xl text-[#0B0E28] hover:border-[#C8A96F] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                        >
                          <span className="h-8 w-8 flex items-center justify-center rounded-2xl bg-[#C8A96F]/15 text-[#C8A96F] font-semibold">→</span>
                          <span>{button.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 text-center">
                      <button
                        onClick={hideWelcome}
                        className="text-xs text-[#0B0E8]/55 hover:text-[#0B0E28] transition-colors"
                      >
                        Oder stellen Sie Ihre eigene Frage...
                      </button>
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

            {messages.length === 0 && !isLoading && !showWelcome && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/90 border border-white/70 shadow-xl shadow-[#d4c7aa]/35">
                  <h3 className="text-lg font-serif mb-2 text-[#0B0E28]">
                    Wie kann ich Ihnen behilflich sein?
                  </h3>
                  <p className="text-sm text-[#0B0E28]/70">
                    Stellen Sie Ihre Frage zu Vermögensthemen oder wählen Sie eines der Themen unten.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {quickQuestions.map((q, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleQuickQuestionClick(q)}
                      className="inline-flex items-center gap-2 py-3 px-5 text-sm bg-gradient-to-r from-[#F8F5ED] to-[#F1E8D3] border border-transparent text-[#0B0E28] rounded-3xl hover:border-[#C8A96F]/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span className="h-6 w-6 flex items-center justify-center rounded-2xl bg-[#C8A96F]/15 text-[#C8A96F] font-semibold">+</span>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/55 bg-white/80 backdrop-blur px-6 py-3">
            <div className="relative flex items-center">
              <textarea
                className="w-full p-3.5 pr-14 border border-transparent rounded-3xl resize-none outline-none bg-[#F7F3EA] text-[#0B0E28] focus:border-[#C8A96F]/40 focus:ring-2 focus:ring-[#C8A96F]/25 transition-all duration-300 shadow-inner"
                placeholder="Ihre Frage eingeben..."
                rows={1}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0B0E28] to-[#121740] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Nachricht senden"
                disabled={inputValue.trim() === "" || isLoading}
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
