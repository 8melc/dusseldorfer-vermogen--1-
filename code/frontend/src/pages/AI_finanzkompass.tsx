import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/Markdown";
import { Send, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import brain from "../brain";
import type { ChatRequest, ChatMessage } from "../brain/data-contracts";

const PITCH_QUESTIONS = [
  {
    category: "Geschäftsmodell & Strategie",
    questions: [
      {
        id: "monetization",
        question: "Wie monetarisiert Kölner Vermögen den FinanzKompass?",
        answer:
          "Der FinanzKompass folgt einem mehrstufigen Monetarisierungsmodell: \n\n1. **B2B-Partnerschaften** mit Vermögensverwaltern und Finanzinstituten, die für die Integration des FinanzKompass auf ihren Plattformen lizenzieren\n\n2. **Premium-Funktionen** für Endnutzer, die über die Basisfunktionalität hinausgehen\n\n3. **Lead-Generierung** durch qualifizierte Weiterleitungen an Berater\n\nDieses hybride Modell sichert multiple Einnahmequellen und macht die Plattform nachhaltig profitabel.",
      },
      {
        id: "scaling",
        question: "Welche Skalierungsmöglichkeiten bietet die Plattform?",
        answer:
          "Die Skalierungsstrategie von Kölner Vermögen basiert auf drei Säulen:\n\n1. **Regionale Expansion**: Nach Etablierung in Köln Ausweitung auf weitere Finanzzentren wie Frankfurt, München und Hamburg, jeweils mit lokalem Expertennetzwerk\n\n2. **Internationale Anpassung**: Mittelfristig Expansion in den DACH-Raum mit Anpassung an lokale Finanzphilosophien und Regulierungen\n\n3. **Produkttiefe**: Erweiterung der KI-Funktionen von einfachen Q&A zu komplexen Szenario-Analysen und individueller Strategieberatung\n\nDie modulare Architektur ermöglicht diese Skalierung ohne vollständige Neuentwicklung.",
      },
      {
        id: "differentiation",
        question: "Wie differenziert sich Kölner Vermögen von bestehenden Finanz-Plattformen?",
        answer:
          "Kölner Vermögen unterscheidet sich durch vier zentrale Alleinstellungsmerkmale:\n\n1. **Regionale Expertise**: Die Kölner Vermögensphilosophie als einzigartiger Ansatz\n\n2. **KI + Mensch**: Nahtlose Integration von KI-Assistenz und persönlicher Expertenberatung\n\n3. **Content-First**: Hochwertige Finanzinhalte statt reiner Transaktionsfokus\n\n4. **Wertebasiert**: Fokus auf nachhaltige Vermögenssicherung statt kurzfristiger Renditeoptimierung\n\nDiese Kombination adressiert eine bisher unterversorgte Nische zwischen generischen Robo-Advisors und klassischer Privatbank.",
      },
    ],
  },
  {
    category: "Technologie & Entwicklung",
    questions: [
      {
        id: "security",
        question: "Wie wird die Datensicherheit bei Finanzfragen gewährleistet?",
        answer:
          "Die Datensicherheitsarchitektur von Kölner Vermögen folgt dem Prinzip \"Security by Design\":\n\n1. **Keine Speicherung sensibler Finanzdaten**: Der FinanzKompass arbeitet primär mit anonymisierten Metadaten\n\n2. **End-to-End-Verschlüsselung**: Alle Nutzergespräche werden verschlüsselt übertragen\n\n3. **DSGVO-Compliance**: Vollständige Umsetzung europäischer Datenschutzstandards\n\n4. **Regelmäßige Sicherheitsaudits**: Externe Überprüfung der Sicherheitsarchitektur\n\nZudem werden alle Large Language Models (LLMs) so konfiguriert, dass keine personenbezogenen Daten in deren Trainingsprozess einfließen.",
      },
      {
        id: "ai-tech",
        question: "Welche KI-Technologie kommt beim FinanzKompass zum Einsatz?",
        answer:
          "Der FinanzKompass nutzt eine mehrschichtige KI-Architektur:\n\n1. **Basis-LLM**: GPT-4o als Grundmodell für natürliche Sprachverarbeitung\n\n2. **Finetuning**: Spezialisierung auf Finanzthemen und die Kölner Vermögensphilosophie\n\n3. **RAG-System**: Retrieval-Augmented Generation für aktuelle und präzise Informationen\n\n4. **Kontextuelle Intelligenz**: Berücksichtigung der Nutzerhistorie und -präferenzen\n\nDiese Kombination ermöglicht Antworten, die sowohl technisch korrekt als auch persönlich relevant sind.",
      },
      {
        id: "quality-assurance",
        question: "Wie wird die Qualität der KI-Antworten sichergestellt?",
        answer:
          "Die Qualitätssicherung erfolgt durch ein mehrstufiges System:\n\n1. **Experten-Review**: Alle Basis-Antworten werden von Finanzexperten geprüft\n\n2. **Prompt-Engineering**: Präzise Anweisungen zur Vermeidung von Halluzinationen und Ungenauigkeiten\n\n3. **Feedback-Schleife**: Kontinuierliche Verbesserung durch Nutzer- und Expertenrückmeldungen\n\n4. **Regelmäßige Updates**: Integration aktueller Marktentwicklungen und Finanztrends\n\nZudem gibt es klare Grenzen, bei denen der FinanzKompass an menschliche Experten verweist, statt unzureichende Antworten zu liefern.",
      },
    ],
  },
  {
    category: "Nutzer & Markt",
    questions: [
      {
        id: "target-audience",
        question: "Welche Zielgruppe wird mit dem FinanzKompass angesprochen?",
        answer:
          "Der FinanzKompass adressiert primär drei Zielgruppen:\n\n1. **Vermögende Privatpersonen (HNWI)**: Personen mit signifikantem Anlagevermögen, die ein wertebasiertes Verständnis von Vermögen suchen\n\n2. **Angehende Vermögensaufbauer**: Jüngere Zielgruppe (35-50), die langfristigen Vermögensaufbau plant\n\n3. **Finanzinstitute und Berater**: Als B2B-Kunden, die den FinanzKompass als Ergänzung ihrer Beratungsleistung einsetzen\n\nDie Kernzielgruppe zeichnet sich durch Wertschätzung für regionale Expertise, Qualitätsbewusstsein und langfristiges Denken aus.",
      },
      {
        id: "advisor-integration",
        question: "Wie funktioniert die Anbindung an Berater und Vermögensverwalter?",
        answer:
          "Die Beraterintegration erfolgt auf drei Ebenen:\n\n1. **Nahtlose Übergabe**: KI erkennt komplexe Anfragen und leitet bei Bedarf an passende Experten weiter\n\n2. **Vorkategorisierung**: Nutzeranfragen werden inhaltlich eingeordnet, sodass Berater optimal vorbereitet sind\n\n3. **White-Label-Lösung**: Vermögensverwalter können den FinanzKompass in ihre eigene Plattform integrieren\n\n4. **Datengestützte Beratung**: Berater erhalten (mit Nutzereinwilligung) Einblick in vorangegangene KI-Gespräche\n\nDies schafft einen echten Mehrwert sowohl für Endnutzer als auch für Finanzexperten.",
      },
      {
        id: "metrics",
        question: "Welche Metriken nutzt Kölner Vermögen zur Erfolgsmessung?",
        answer:
          "Kölner Vermögen verfolgt einen ganzheitlichen Ansatz zur Erfolgsmessung:\n\n1. **Engagement-Metriken**: Nutzungstiefe, Wiederkehrer, Session-Dauer\n\n2. **Qualitätsmetriken**: Nutzerbewertungen, Genauigkeit der Antworten, Weiterleitungsrate\n\n3. **Geschäftsmetriken**: Lead-Konversionen, Partner-Akquisition, Umsatz pro Nutzer\n\n4. **Inhaltliche Metriken**: Themenpopularität, Content-Engagement, Saisonale Trends\n\nDiese Metriken werden in einem zentralen Dashboard zusammengeführt und ermöglichen datengetriebene Entscheidungen.",
      },
      {
        id: "customer-journey",
        question: "Wie unterstützt der FinanzKompass die Customer Journey?",
        answer:
          "Der FinanzKompass begleitet Nutzer durch die gesamte Customer Journey:\n\n1. **Awareness**: Niedrigschwelliger Einstieg durch allgemeine Finanzfragen\n\n2. **Education**: Vertiefung des Finanzwissens durch individuelle Erklärungen\n\n3. **Consideration**: Vergleich verschiedener Anlagestrategien und -ansätze\n\n4. **Decision**: Qualifizierte Weiterleitung an passende Berater für konkrete Umsetzung\n\n5. **Retention**: Kontinuierliche Begleitung und Aktualisierung der Finanzstrategie\n\nDurch diese nahtlose Integration wird der FinanzKompass zum langfristigen Begleiter statt einmaligem Touchpoint.",
      },
    ],
  },
];

type Msg = { type: "user" | "assistant"; content: string; pending?: boolean };

export default function AI_FinanzkompassPage() {
  // Globales Widget-Icon ausblenden
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".group.fixed.bottom-6.right-6");
    if (el) el.style.display = "none";
    return () => {
      if (el) el.style.display = "flex";
    };
  }, []);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Accordion State pro Kategorie
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const c of PITCH_QUESTIONS) init[c.category] = true; // standardmäßig offen
    return init;
  });

  const toggleCategory = (cat: string) =>
    setExpandedCategories((s) => ({ ...s, [cat]: !s[cat] }));

  const expandAll = () =>
    setExpandedCategories(() => {
      const next: Record<string, boolean> = {};
      for (const c of PITCH_QUESTIONS) next[c.category] = true;
      return next;
    });

  const collapseAll = () =>
    setExpandedCategories(() => {
      const next: Record<string, boolean> = {};
      for (const c of PITCH_QUESTIONS) next[c.category] = false;
      return next;
    });

  const [chatHistory, setChatHistory] = useState<Msg[]>([
    {
      type: "assistant",
      content:
        "Ihr Wegweiser durch die Finanzwelt. Wählen Sie eine vordefinierte Frage oder formulieren Sie Ihr individuelles Anliegen.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  // Chat immer ans Ende scrollen
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);

  // Textarea auto-grow
  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [inputValue]);

  const allQuestionsFlat = useMemo(
    () => PITCH_QUESTIONS.flatMap((c) => c.questions.map((q) => ({ ...q, category: c.category }))),
    []
  );

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;

    setChatHistory((p) => [...p, { type: "user", content: text }]);
    setInputValue("");

    setChatHistory((p) => [...p, { type: "assistant", content: "", pending: true }]);
    setIsLoading(true);

    try {
      const historyForAPI: ChatMessage[] = chatHistory
        .filter((m) => !m.pending)
        .filter(
          (m) =>
            m.content !==
            "Willkommen beim FinanzKompass. Wählen Sie eine Frage aus oder stellen Sie Ihre eigene Frage."
        )
        .map((m) => ({ role: m.type === "user" ? "user" : "assistant", content: m.content }));

      const requestBody: ChatRequest = {
        prompt: `Nutzername: Melissa. Nachricht: ${text}`,
        history: historyForAPI,
      };

      let acc = "";
      for await (const chunk of brain.handle_openai_chat(requestBody)) {
        if (typeof chunk === "string") {
          acc += chunk;
          setChatHistory((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.type === "assistant" && last.pending) {
              next[next.length - 1] = { type: "assistant", content: acc, pending: true };
            }
            return next;
          });
        }
      }
      setChatHistory((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.type === "assistant" && last.pending) {
          next[next.length - 1] = { type: "assistant", content: last.content, pending: false };
        }
        return next;
      });
    } catch {
      setChatHistory((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        next[next.length - 1] =
          last && last.type === "assistant" && last.pending
            ? {
                type: "assistant",
                content: "Ich konnte leider keine Verbindung herstellen. Bitte versuchen Sie es später erneut.",
                pending: false,
              }
            : { type: "assistant", content: "Ich konnte leider keine Verbindung herstellen. Bitte versuchen Sie es später erneut." };
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSelect = (id: string) => {
    setSelectedQuestion(id);
    const qa = allQuestionsFlat.find((q) => q.id === id);
    if (!qa) return;

    setChatHistory((p) => [...p, { type: "user", content: qa.question }]);
    setTimeout(() => setChatHistory((p) => [...p, { type: "assistant", content: qa.answer }]), 250);
    if (window.innerWidth < 768) setSidebarCollapsed(true);
  };

  const resetChat = () => {
    setChatHistory([
      {
        type: "assistant",
        content:
          "Willkommen beim FinanzKompass. Wählen Sie eine Frage aus oder stellen Sie Ihre eigene Frage.",
      },
    ]);
    setSelectedQuestion(null);
  };

  // Slash fokussiert Eingabe
  useEffect(() => {
    const onSlash = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        textRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onSlash);
    return () => window.removeEventListener("keydown", onSlash);
  }, []);

  return (
    <div className="relative w-full min-h-[85dvh]">
      {/* Outer container: links/rechts Luft */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* KEINE min-h hier, Spalten bekommen feste Höhe */}
        <div className="flex w-full overflow-hidden">
          {/* Sidebar */}
          <div
            className={`bg-white border-r transition-all duration-300 flex flex-col ${
              sidebarCollapsed ? "w-0 overflow-hidden" : "w-80"
            }`}
          >
            <div className="flex h-[70vh] md:h-[74vh] flex-col">
              {/* Header mit sauberen Abständen */}
              <div className="px-5 pt-5 pb-3">
                <h2 className="text-[22px] md:text-2xl font-extrabold tracking-tight text-[#0B0E28]">
                  FinanzKompass FAQ
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-gray-700">
                  Entdecken Sie die wichtigsten Fragen rund um{" "}
                  <span className="font-semibold">Kölner Vermögen</span> Von Strategien über
                  Technologie bis hin zu Markt & Nutzen. Wählen Sie ein Thema oder stellen Sie Ihre eigene Frage.
                </p>

                {/* Controls */}
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="h-8 px-3 text-xs" onClick={expandAll}>
                    Alle öffnen
                  </Button>
                  <Button variant="outline" className="h-8 px-3 text-xs" onClick={collapseAll}>
                    Alle schließen
                  </Button>
                </div>
              </div>

              <div className="border-t" />

              {/* Fragenliste: eigener Scroll, bleibt immer sichtbar */}
              <div className="flex-1 overflow-y-auto pr-2 pl-5 py-3">
                <div className="space-y-3">
                  {PITCH_QUESTIONS.map((category) => {
                    const open = expandedCategories[category.category];
                    return (
                      <div key={category.category} className="rounded-lg border bg-white">
                        <button
                          onClick={() => toggleCategory(category.category)}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50"
                          aria-expanded={open}
                          aria-controls={`panel-${category.category}`}
                        >
                          <span className="text-[14px] font-semibold text-[#0B0E28]">
                            {category.category}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${open ? "rotate-0" : "-rotate-90"}`}
                          />
                        </button>

                        <div
                          id={`panel-${category.category}`}
                          className={`transition-[max-height,opacity] duration-300 ease-in-out ${
                            open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                        >
                          <div className="px-3 pb-3 pt-1 space-y-2">
                            {category.questions.map((q) => (
                              <button
                                key={q.id}
                                onClick={() => handleQuestionSelect(q.id)}
                                className={`w-full text-left rounded-md px-3 py-2 text-[13px] transition shadow-sm border ${
                                  selectedQuestion === q.id
                                    ? "bg-[#C8A96F] text-white border-[#C8A96F]"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-transparent"
                                }`}
                              >
                                {q.question}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reset-Button bleibt unten fix innerhalb der Sidebar-Höhe */}
              {chatHistory.length > 1 && (
                <div className="border-t px-5 py-3">
                  <Button onClick={resetChat} className="w-full" variant="outline">
                    Gespräch zurücksetzen
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Chat-Spalte */}
          <div className="flex-grow flex flex-col bg-white">
            {/* Header */}
            <div className="px-5 py-4 border-b bg-[#0B0E28]/5">
              <h2 className="text-lg font-semibold text-[#0B0E28]">Ihr persönlicher FinanzKompass</h2>
              <p className="text-sm text-gray-600">
                Intelligentes Vermögensverständnis nach der Kölner Philosophie
              </p>
            </div>

            {/* Fixe Spaltenhöhe: Messages scrollen, Input bleibt sichtbar */}
            <div className="flex h-[70vh] md:h-[74vh] flex-col">
              {/* Verlauf */}
              <div ref={listRef} className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-4xl xl:max-w-5xl px-6 py-5 md:py-6 space-y-4">
                  {chatHistory.map((msg, i) => {
                    const isUser = msg.type === "user";
                    return (
                      <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                        {!isUser && (
                          <div className="mr-2 mt-1 h-8 w-8 shrink-0 rounded-full bg-[#0B0E28] text-white grid place-items-center text-xs font-semibold">
                            
                          </div>
                        )}
                        <div
                          className={[
                            "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm",
                            isUser
                              ? "bg-gray-200 text-[#0B0E28] rounded-br-sm"
                              : "bg-[#F4F1EB] text-[#0B0E28] rounded-bl-sm",
                          ].join(" ")}
                        >
                          {msg.type === "assistant" && msg.pending ? (
                            <div className="animate-pulse space-y-2">
                              <div className="h-3 bg-gray-200 rounded w-3/4" />
                              <div className="h-3 bg-gray-200 rounded w-5/6" />
                              <div className="h-3 bg-gray-200 rounded w-2/3" />
                            </div>
                          ) : msg.type === "assistant" ? (
                            <div className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0">
                              <Markdown>{msg.content}</Markdown>
                            </div>
                          ) : (
                            <div>{msg.content}</div>
                          )}
                        </div>
                        {isUser && (
                          <div className="ml-2 mt-1 h-8 w-8 shrink-0 rounded-full bg-[#E8D9B9] text-[#0B0E28] grid place-items-center text-xs font-semibold">
                            Sie
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Input */}
              <div className="border-t bg-white">
                <div className="mx-auto w-full max-w-3xl px-4 py-3 md:py-4">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={textRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        const enter = e.key === "Enter" && !e.shiftKey;
                        const cmdEnter = e.key === "Enter" && (e.metaKey || e.ctrlKey);
                        if (enter || cmdEnter) {
                          e.preventDefault();
                          if (!isLoading) handleSendMessage();
                        }
                      }}
                      placeholder="Stellen Sie Ihre Frage zum Thema Finanzen…"
                      className="flex-grow p-3 md:p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96F] min-h-[52px] max-h-[160px] resize-none text-[15px] leading-6"
                      rows={1}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-[#C8A96F] hover:bg-[#B69960] text-white h-[52px] w-[52px] grid place-items-center rounded-lg"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter senden • Shift+Enter Zeilenumbruch • ⌘/Ctrl+Enter senden
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle: fix links außen, ragt nie in den Chat */}
      <button
        onClick={() => setSidebarCollapsed((v) => !v)}
        className="fixed left-2 top-1/2 -translate-y-1/2 bg-[#C8A96F] text-white p-3 rounded-r-md shadow-md hover:bg-[#B69960] transition-colors z-40"
        aria-label={sidebarCollapsed ? "Fragen anzeigen" : "Fragen ausblenden"}
      >
        {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>
    </div>
  );
}
