

export interface Insight {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  isPremium: boolean;
  hasAudio: boolean;
  tags?: string[];
}

export const insightsData: Insight[] = [
  {
    id: "1",
    title: "Die Zukunft der nachhaltigen Geldanlage in Deutschland",
    category: "Nachhaltigkeit",
    summary:
      "Eine Analyse der aktuellen ESG-Trends und wie sie das Portfolio der Zukunft formen. Ein Muss für jeden vorausschauenden Investor.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isPremium: true,
    hasAudio: true,
    tags: ["ESG", "Green Finance", "Portfolio"],
  },
  {
    id: "2",
    title: "Immobilienmarkt Köln: Chancen und Risiken 2025",
    category: "Immobilien",
    summary:
      "Experten bewerten die Lage im Luxussegment und geben Einblicke, wo sich Investitionen jetzt noch lohnen.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1992&q=80",
    isPremium: true,
    hasAudio: false,
    tags: ["Luxusimmobilien", "Köln", "Investment"],
  },
  {
    id: "3",
    title: "Private Equity: Exklusiver Zugang zu Wachstumsunternehmen",
    category: "Anlagestrategie",
    summary:
      "Wie Sie als Privatanleger von den Renditechancen profitieren können, die bisher institutionellen Investoren vorbehalten waren.",
    image:
      "https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    isPremium: false,
    hasAudio: true,
    tags: ["Private Equity", "Wachstum", "Rendite"],
  },
  {
    id: "4",
    title: "Steueroptimierung zum Jahresende: Was Sie jetzt tun müssen",
    category: "Steuern & Recht",
    summary:
      "Konkrete Handlungsempfehlungen, um Ihre Steuerlast für das laufende Jahr legal und effektiv zu senken.",
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isPremium: false,
    hasAudio: false,
    tags: ["Steueroptimierung", "Jahresabschluss", "Gesetzgebung"],
  },
  {
    "id": "51",
    "title": "Kryptowährungen im Vermögensportfolio: Risikodiversifikation oder Spekulation?",
    "category": "Digital Assets",
    "summary": "Eine fundierte Analyse zur Integration von Bitcoin, Ethereum und anderen Kryptowährungen in konservative Anlagestrategien. Wir beleuchten Korrelationseffekte mit traditionellen Anlageklassen und regulatorische Entwicklungen.",
    "image": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "isPremium": true,
    "hasAudio": true,
    "tags": ["Bitcoin", "Ethereum", "Diversifikation"]
  },
  {
    "id": "52",
    "title": "Die Renaissance des Berliner Immobilienmarkts: Analyse und Prognose",
    "category": "Immobilien",
    "summary": "Nach Jahren der Stagnation zeigt der Berliner Immobilienmarkt neue Dynamik. Unsere Datenanalyse offenbart, welche Stadtteile das höchste Wertsteigerungspotenzial aufweisen.",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    "isPremium": false,
    "hasAudio": true,
    "tags": ["Berlin", "Wohnungsmarkt", "Prognose"]
  },
  {
    "id": "53",
    "title": "ESG-Integration in Familienunternehmen: Mehr als ein Trend",
    "category": "Nachhaltigkeit",
    "summary": "Wie deutsche Familienunternehmen Nachhaltigkeitskriterien in ihre Geschäftsmodelle integrieren und damit langfristige Wettbewerbsvorteile sichern. Eine Studie mit Fallbeispielen aus dem Mittelstand.",
    "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "isPremium": true,
    "hasAudio": false,
    "tags": ["ESG", "Mittelstand", "Familienunternehmen"]
  },
  {
    "id": "54",
    "title": "Stiftungsrecht 2025: Die wichtigsten Neuerungen für Vermögensinhaber",
    "category": "Steuern & Recht",
    "summary": "Die jüngsten Gesetzesänderungen bieten neue Gestaltungsmöglichkeiten für philanthropische Aktivitäten. Wir analysieren die steuerlichen Implikationen für Stifter und Begünstigte.",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "isPremium": false,
    "hasAudio": false,
    "tags": ["Stiftungsrecht", "Philanthropie", "Gesetzesänderung"]
  },
  {
    "id": "55",
    "title": "Impact Investing: Die Vermögensallokation der Zukunft",
    "category": "Philanthropie",
    "summary": "Wie die neue Generation von Vermögensinhabern soziale Rendite und finanzielle Erträge kombiniert. Datenbasierte Erkenntnisse zu Performance-Metriken im Vergleich zu traditionellen Anlagestrategien.",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    "isPremium": true,
    "hasAudio": true,
    "tags": ["Impact Investing", "Soziale Rendite", "Vermögensallokation"]
  },
  {
    "id": "56",
    "title": "Die Zukunft der Asset Allocation: KI-gestützte Portfoliooptimierung",
    "category": "Anlagestrategie",
    "summary": "Künstliche Intelligenz revolutioniert die strategische Vermögensallokation. Eine kritische Betrachtung der Chancen und Grenzen algorithmischer Entscheidungsprozesse für langfristig orientierte Investoren.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "isPremium": true,
    "hasAudio": false,
    "tags": ["KI", "Portfoliooptimierung", "Asset Allocation"]
  },
  {
    "id": "57",
    "title": "Klimarisiken in der Immobilienbewertung: Neue Methoden für Investoren",
    "category": "Immobilien",
    "summary": "Wie physische Klimarisiken und Übergangsrisiken die zukünftige Wertentwicklung von Immobilien beeinflussen. Praxisorientierte Bewertungsansätze für Investmententscheidungen.",
    "image": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    "isPremium": false,
    "hasAudio": true,
    "tags": ["Klimarisiko", "Immobilienbewertung", "Nachhaltigkeit"]
  },
  {
    "id": "58",
    "title": "Vermögensschutz in Zeiten geopolitischer Unsicherheit",
    "category": "Anlagestrategie",
    "summary": "Eine Analyse defensiver Strategien zur Absicherung gegen systemische Risiken. Wir untersuchen die Korrelation verschiedener Anlageklassen in historischen Krisenszenarien und leiten Handlungsempfehlungen ab.",
    "image": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "isPremium": false,
    "hasAudio": false,
    "tags": ["Risikomanagement", "Geopolitik", "Portfolio-Absicherung"]
  }
];
