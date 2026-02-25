
import React, { useState, useEffect } from "react";
import brain from "brain";
import {
  Insight,
  Interaction,
  GetInsightsApiInsightsGetParams,
} from "types";

import { InsightCard } from "./InsightCard";

// Tracking function remains the same
async function trackUserInteraction(
  contentId: string,
  interactionType: string,
  additionalData = {},
) {
  try {
    const interactionData: Interaction = {
      contentId,
      interactionType,
      timestamp: new Date().toISOString(),
      additionalData,
    };
    await brain.track_interaction(interactionData);
    console.log("Interaction tracked:", interactionData);
  } catch (error) {
    console.error("Failed to track interaction:", error);
  }
}

// Dummy Data für MVP
const dummyInsights: Insight[] = [
  {
    id: "1",
    title: "KI-Revolution im Portfolio-Management",
    category: "TECHNOLOGIE",
    summary:
      "Wie künstliche Intelligenz die Vermögensverwaltung revolutioniert und welche Chancen sich für Anleger ergeben. Eine Analyse der neuesten Entwicklungen.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    date: "Heute",
    format: "article",
    readTime: "8 Min",
    entitled: true,
  },
  {
    id: "2",
    title: "Nachhaltige Investments 2025",
    category: "NACHHALTIGKEIT",
    summary:
      "ESG-Kriterien werden zum Marktstandard. Wir analysieren die profitabelsten grünen Anlagemöglichkeiten und deren Langzeitpotenzial.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    date: "Gestern",
    format: "article",
    readTime: "6 Min",
    entitled: true,
  },
  {
    id: "3",
    title: "Der Aufstieg von alternativen Proteinen",
    category: "FOOD & BEVERAGE",
    summary:
      "Investitionsmöglichkeiten im Markt für Fleischalternativen. Eine detaillierte Analyse der Wachstumschancen.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    date: "2 Tage",
    format: "article",
    readTime: "5 Min",
    entitled: true,
  },
];

const dummyThemeSpecials: Insight[] = [
  {
    id: "jb-market-outlook",
    title:
      "Markt Outlook zur Jahresmitte 2025: Wachstumsgelegenheiten in Europa und Asien im Fokus",
    category: "ANLAGESTRATEGIE",
    summary:
      "Die USA verlieren an Dominanz, während Europa und Asien durch offene Handelspolitik und wachstumsfördernde Politik zu neuen Vororten...",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    date: "Neu",
    format: "article",
    readTime: "12 Min",
    entitled: true,
  },
  {
    id: "4",
    title: "Private Equity: Exklusiver Zugang zu Wachstumsunternehmen",
    category: "ANLAGESTRATEGIE",
    summary:
      "Wie Sie als Privatanleger von den Renditen des Private-Equity-Marktes profitieren. Einblicke von den Renditeerwartungen.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    date: "3 Tage",
    format: "article",
    readTime: "10 Min",
    entitled: true,
  },
  {
    id: "5",
    title: "Immobilienmarkt Köln: Chancen und Risiken 2025",
    category: "IMMOBILIEN",
    summary:
      "Eine umfassende Analyse des lokalen Immobilienmarktes mit Fokus auf Gewerbeimmobilien und nachhaltige Bauprojekte.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    date: "1 Woche",
    format: "article",
    readTime: "15 Min",
    entitled: true,
  },
];

const dummyDeepAnalysis: Insight[] = [
  {
    id: "6",
    title: "Die Zukunft der nachhaltigen Geldanlage in Deutschland",
    category: "NACHHALTIGKEIT",
    summary:
      "Eine Analyse der aktuellen ESG-Trends und deren Auswirkungen auf die deutsche Finanzlandschaft. Welche Chancen ergeben sich für Anleger?",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    date: "Neu",
    format: "pdf",
    readTime: "20 Min",
    entitled: false, // Gated content
  },
  {
    id: "7",
    title: "Immobilienmarkt Köln: Chancen und Risiken 2025",
    category: "IMMOBILIEN",
    summary:
      "Experten bewerten die Lage im Luxussegment. Detaillierte Marktanalyse mit Prognosen für die kommenden Jahre.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    date: "2 Tage",
    format: "pdf",
    readTime: "25 Min",
    entitled: false, // Gated content
  },
  {
    id: "8",
    title: "ESG-Integration in Familienunternehmen: Mehr als ein Trend",
    category: "NACHHALTIGKEIT",
    summary:
      "Wie deutsche Familienunternehmen Nachhaltigkeit erfolgreich integrieren und dabei ihre Werte wahren.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    date: "1 Woche",
    format: "audio",
    readTime: "18 Min",
    entitled: false, // Gated content
  },
];

export function InsightsFeed({
  userId,
  userPreferences,
  activeFilters,
}: {
  userId: string;
  userPreferences: any;
  activeFilters?: any;
}) {
  const [insights, setInsights] = useState<Insight[]>(dummyInsights);
  const [themeSpecials, setThemeSpecials] =
    useState<Insight[]>(dummyThemeSpecials);
  const [deepAnalysis, setDeepAnalysis] =
    useState<Insight[]>(dummyDeepAnalysis);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        // Apply filters if any
        let filteredInsights = [...dummyInsights];
        let filteredTheme = [...dummyThemeSpecials];
        let filteredDeep = [...dummyDeepAnalysis];

        if (activeFilters?.category && activeFilters.category !== "Alle Themen") {
          const cat = String(activeFilters.category).toLowerCase();
          const byCat = (i: Insight) =>
            String(i.category || "").toLowerCase().includes(cat);
          filteredInsights = filteredInsights.filter(byCat);
          filteredTheme = filteredTheme.filter(byCat);
          filteredDeep = filteredDeep.filter(byCat);
        }

        if (activeFilters?.format) {
          const formatMap: Record<string, Insight["format"]> = {
            Artikel: "article",
            Audio: "audio",
            PDF: "pdf",
          };
          const targetFormat = formatMap[activeFilters.format];
          if (targetFormat) {
            const byFmt = (i: Insight) => i.format === targetFormat;
            filteredInsights = filteredInsights.filter(byFmt);
            filteredTheme = filteredTheme.filter(byFmt);
            filteredDeep = filteredDeep.filter(byFmt);
          }
        }

        setInsights(filteredInsights);
        setThemeSpecials(filteredTheme);
        setDeepAnalysis(filteredDeep);
        setLoading(false);
      }, 1000);

      // Optional: Still try to fetch real data if available
      try {
        const insightParams: GetInsightsApiInsightsGetParams = {
          userId,
          ...activeFilters,
        };

        // Uncomment when API is ready
        // const [insightsRes, themeSpecialsRes, deepAnalysisRes] =
        //   await Promise.all([
        //     brain.get_insights(insightParams),
        //     brain.get_theme_specials({ userId }),
        //     brain.get_deep_analysis({ userId }),
        //   ]);
        //
        // const realInsights = await insightsRes.json();
        // if (realInsights && realInsights.length > 0) {
        //   setInsights(realInsights);
        // }
      } catch (error) {
        console.error("Failed to fetch insights data:", error);
        // Use dummy data as fallback
      }
    };

    fetchData();
  }, [userId, userPreferences, activeFilters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500">Inhalte werden geladen...</p>
        </div>
      </div>
    );
  }

  // Show empty state if no content after filtering
  if (
    insights.length === 0 &&
    themeSpecials.length === 0 &&
    deepAnalysis.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-xl text-gray-500 mb-4">
          Keine Inhalte gefunden, die Ihren Filterkriterien entsprechen.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Filter zurücksetzen
        </button>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Modern Grid Layout with Better Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Aktuelle Insights Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Aktuelle Insights
            </h2>
            <span className="text-sm text-slate-500">
              {insights.length} Artikel
            </span>
          </div>
          <div className="space-y-6">
            {insights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onInteraction={(type, data) =>
                  trackUserInteraction(insight.id, type, data)
                }
              />
            ))}
          </div>
        </div>

        {/* Themen-Fokus Column (formerly Theme Specials) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Themen-Fokus
            </h2>
            <span className="text-sm text-slate-500">
              {themeSpecials.length} Artikel
            </span>
          </div>
          <div className="space-y-6">
            {themeSpecials.map((theme) => (
              <InsightCard
                key={theme.id}
                insight={theme}
                onInteraction={(type, data) =>
                  trackUserInteraction(theme.id, type, data)
                }
              />
            ))}
          </div>
        </div>

        {/* Vertiefende Analysen Column (formerly Premium) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Vertiefende Analysen
            </h2>
            <span className="text-sm text-slate-500">
              {deepAnalysis.length} Artikel
            </span>
          </div>
          <div className="space-y-6">
            {deepAnalysis.map((analysis) => (
              <InsightCard
                key={analysis.id}
                insight={analysis}
                isGated={!analysis.entitled}
                onInteraction={(type, data) =>
                  trackUserInteraction(analysis.id, type, data)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}