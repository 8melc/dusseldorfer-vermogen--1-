export interface Insight {
  id: string;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  isPremium: boolean;
  hasAudio: boolean;
  author: string;
  date: string;
  section: "markt" | "vertiefung" | "empfehlung";
}

export const insightsData: Insight[] = [
  // Sektion: Aktuelle Marktinformationen
  {
    id: "markt-1",
    category: "Marktkommentar",
    title: "Zinswende 2.0: Was die jüngsten Entscheidungen für Ihr Portfolio bedeuten",
    summary:
      "Die Zentralbanken setzen neue Signale. Wir analysieren die kurz- und mittelfristigen Auswirkungen auf Anleihen und Aktien.",
    imageUrl: "https://images.unsplash.com/photo-1665686306574-1ace09918530?q=80&w=2070&auto=format&fit=crop",
    isPremium: false,
    hasAudio: true,
    author: "Dr. Klaus Müller",
    date: "15. August 2024",
    section: "markt",
  },
  {
    id: "markt-2",
    category: "Technologie-Sektor",
    title: "KI-Aktien: Hype oder nachhaltige Investition?",
    summary: "Eine nüchterne Betrachtung der aktuellen Bewertungen und Zukunftschancen im Bereich der künstlichen Intelligenz.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-285f7267a89c?q=80&w=2070&auto=format&fit=crop",
    isPremium: true,
    hasAudio: false,
    author: "Julia Brandt",
    date: "12. August 2024",
    section: "markt",
  },
  // Sektion: Vertiefende Fachbeiträge
  {
    id: "vertiefung-1",
    category: "Nachfolgeplanung",
    title: "Unternehmensnachfolge erfolgreich gestalten: Ein Leitfaden in 5 Schritten",
    summary:
      "Die Übergabe eines Lebenswerks erfordert mehr als nur einen Vertrag. Wir zeigen die wichtigsten steuerlichen und rechtlichen Weichenstellungen auf.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    isPremium: true,
    hasAudio: true,
    author: "Markus Weber",
    date: "10. August 2024",
    section: "vertiefung",
  },
  {
    id: "vertiefung-2",
    category: "Immobilien-Strategie",
    title: "Betongold in Köln: Wann sich der Einstieg noch lohnt",
    summary: "Analyse der aktuellen Marktlage, Renditeerwartungen und Risiken für Immobilien-Investments in der Rheinmetropole.",
    imageUrl: "https://images.unsplash.com/photo-1582463143926-a0f2d4878a87?q=80&w=1974&auto=format&fit=crop",
    isPremium: false,
    hasAudio: false,
    author: "Dr. Klaus Müller",
    date: "05. August 2024",
    section: "vertiefung",
  },
  // Sektion: Personalisierte Empfehlungen (Beispielhaft)
  {
    id: "empfehlung-1",
    category: "Für Sie empfohlen",
    title: "Diversifikation Ihres Technologie-Portfolios: Chancen außerhalb der 'Magnificent Seven'",
    summary:
      "Basierend auf Ihrer aktuellen Depot-Zusammensetzung zeigen wir Ihnen alternative Wachstumswerte im Small- und Mid-Cap-Tech-Segment auf.",
    imageUrl: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop",
    isPremium: true,
    hasAudio: false,
    author: "Ihr Beratungsteam",
    date: "17. August 2024",
    section: "empfehlung",
  },
    {
    id: "empfehlung-2",
    category: "Für Sie empfohlen",
    title: "Steueroptimierung zum Jahresende: Jetzt die richtigen Weichen stellen",
    summary:
      "Handlungsempfehlungen zur Reduzierung Ihrer Steuerlast für das laufende Jahr, zugeschnitten auf Ihre Einkommenssituation.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop",
    isPremium: true,
    hasAudio: true,
    author: "Ihr Beratungsteam",
    date: "16. August 2024",
    section: "empfehlung",
  },
];
