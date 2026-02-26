/**
 * Mock Brain Module – Static Data Only
 *
 * Replaces the real Brain HTTP client with a mock that returns
 * all data statically. No network calls, no backend required.
 */

// ──────────────────────────────────────────────
// Response helper
// ──────────────────────────────────────────────

function mockResponse<T>(data: T): Promise<any> {
  const body = JSON.stringify(data);
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers({ "Content-Type": "application/json" }),
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(body),
    data,
    error: null,
  });
}

// ──────────────────────────────────────────────
// Advisors Data (ported from backend/app/apis/advisors)
// ──────────────────────────────────────────────

const BANK_LOGOS: Record<string, string> = {
  "Rheinberg Privatbank": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%231D2A44%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23D9C48B%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2726%27%3ERheinberg%3C/text%3E%3C/svg%3E",
  "Triversa Private Clients": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%231B3A2B%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23ECF4E8%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3ETriversa%3C/text%3E%3C/svg%3E",
  "Lindenhof Finanzhaus": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232F3E4F%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F4E3B2%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3ELindenhof%3C/text%3E%3C/svg%3E",
  "Aurora Handelsbank": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232F2545%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F7E9C7%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3EAurora%3C/text%3E%3C/svg%3E",
  "Novaris Capital": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%230F3B57%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%239FD4FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3ENovaris%3C/text%3E%3C/svg%3E",
  "Helvetia Struktur AG": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%23293D2A%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23D8F2D1%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2723%27%3EHelvetia%3C/text%3E%3C/svg%3E",
  "Nordquell Vermögen": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%231B2E3F%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%237FD2FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3ENordquell%3C/text%3E%3C/svg%3E",
  "Meridian Global Advisory": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232C2F4D%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23E6D9FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EMeridian%3C/text%3E%3C/svg%3E",
  "Altmuehl & Partner": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%233B2A1F%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F5D7A8%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EAltmuehl%3C/text%3E%3C/svg%3E",
  "Eichenstein Conseil": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232F2A24%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23EEDDBF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EEichenstein%3C/text%3E%3C/svg%3E",
  "Velorum Aachen": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%233A1F3D%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F9C7FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EVelorum%3C/text%3E%3C/svg%3E",
};

const ADVISORS_DATA = [
  { id: "markus-voss", name: "Dr. Markus Voss", title: "Leiter Unternehmerfamilien & Stiftungen", bank: "Rheinberg Privatbank", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Rheinberg Privatbank"], premium: false, tags: ["Rheinberg Privatbank", "Wertebasiert", "Premium"], focusAreas: ["Unternehmerische Nachfolge", "Werteorientierte Vermögensstrukturierung", "Impact-Banking Strategien"], languages: ["Deutsch", "Englisch"], gender: "male", seniority: "executive", certifications: ["Dr. rer. pol.", "Certified European Financial Analyst (CEFA)"], clientTargets: ["Unternehmerfamilien", "Stiftungen", "NextGen"] },
  { id: "rb-002", name: "Julia Brandt", title: "Senior-Beraterin, Köln", bank: "Rheinberg Privatbank", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Rheinberg Privatbank"], premium: false, tags: ["Nachhaltigkeit"], focusAreas: ["Philanthropie", "Stiftungsmanagement", "Impact Investing"], languages: ["Deutsch", "Englisch"], gender: "female", seniority: "senior", certifications: ["Stiftungsberater (DSA)"], clientTargets: ["Stiftungen", "Privatpersonen"] },
  { id: "tp-001", name: "Thomas Richter", title: "Wealth Advisor", bank: "Triversa Private Clients", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Triversa Private Clients"], premium: false, tags: ["Cross-Border"], focusAreas: ["Multi-Asset-Strategien", "Portfoliomanagement"], languages: ["Deutsch", "Englisch"], gender: "male", seniority: "professional", certifications: ["Chartered Financial Analyst (CFA)"], clientTargets: ["Internationales Vermögen", "Expats"] },
  { id: "lf-001", name: "Sandra Becker", title: "Anlageberaterin", bank: "Lindenhof Finanzhaus", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1758518727592-706e80ebc354?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Lindenhof Finanzhaus"], premium: false, tags: ["Immobilien"], focusAreas: ["Portfoliomanagement", "Immobilieninvestments"], languages: ["Deutsch"], gender: "female", seniority: "professional", certifications: ["Diplom-Betriebswirtin (FH)"], clientTargets: ["Privatkunden", "Vermögensaufbau"] },
  { id: "ah-001", name: "Elena Vogt", title: "Director Wealth Advisory", bank: "Aurora Handelsbank", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Aurora Handelsbank"], premium: false, tags: ["NextGen"], focusAreas: ["NextGen Advisory", "Multi-Asset-Strategien"], languages: ["Deutsch", "Englisch", "Französisch"], gender: "female", seniority: "senior", certifications: ["Chartered Wealth Manager"], clientTargets: ["NextGen", "Unternehmerfamilien"] },
  { id: "ah-002", name: "Nikolai Berger", title: "Senior Relationship Manager", bank: "Aurora Handelsbank", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1713946598186-8e28275719b9?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Aurora Handelsbank"], premium: false, tags: ["ESG", "Philanthropie"], focusAreas: ["Family Office Services", "Impact Investing"], languages: ["Deutsch", "Englisch", "Russisch"], gender: "male", seniority: "senior", certifications: ["Certified Impact Advisor"], clientTargets: ["Stiftungen", "Family Offices"] },
  { id: "nc-001", name: "Amelie Krauss", title: "Head of Research Europe", bank: "Novaris Capital", location: "München", avatarUrl: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Novaris Capital"], premium: false, tags: ["Research"], focusAreas: ["Makroökonomie", "Multi-Asset-Strategien"], languages: ["Deutsch", "Englisch"], gender: "female", seniority: "executive", certifications: ["CIIA"], clientTargets: ["Institutionelle Anleger", "Family Offices"] },
  { id: "nc-002", name: "Friedrich Sommerfeld", title: "Senior Investment Strategist", bank: "Novaris Capital", location: "Frankfurt", avatarUrl: "https://images.unsplash.com/photo-1549473448-5d7196c91f48?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Novaris Capital"], premium: false, tags: ["Digitale Assets"], focusAreas: ["Portfoliomanagement", "Alternative Anlagen"], languages: ["Deutsch", "Englisch"], gender: "male", seniority: "senior", certifications: ["CAIA"], clientTargets: ["Tech-Unternehmer", "NextGen"] },
  { id: "hs-001", name: "Maya Reuter", title: "Head of Sustainable Finance", bank: "Helvetia Struktur AG", location: "Zürich", avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Helvetia Struktur AG"], premium: false, tags: ["ESG"], focusAreas: ["Sustainable Finance", "Impact Investing"], languages: ["Deutsch", "Englisch", "Italienisch"], gender: "female", seniority: "executive", certifications: ["CESGA"], clientTargets: ["Stiftungen", "Ultra High Net Worth"] },
  { id: "hs-002", name: "Jonas Keller", title: "Senior Portfolio Architect", bank: "Helvetia Struktur AG", location: "Basel", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Helvetia Struktur AG"], premium: false, tags: ["Family Office"], focusAreas: ["Family Office Services", "Vermögensstrukturierung"], languages: ["Deutsch", "Englisch"], gender: "male", seniority: "senior", certifications: ["TEP"], clientTargets: ["Family Offices", "Unternehmerfamilien"] },
  { id: "nv-001", name: "Dr. Lea Hartwig", title: "Partnerin Vermögensstrategie", bank: "Nordquell Vermögen", location: "Hamburg", avatarUrl: "https://plus.unsplash.com/premium_photo-1661589856899-6dd0871f9db6?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Nordquell Vermögen"], premium: false, tags: ["International"], focusAreas: ["Internationale Vermögen", "Währungsmanagement"], languages: ["Deutsch", "Englisch", "Spanisch"], gender: "female", seniority: "executive", certifications: ["Chartered Market Technician (CMT)"], clientTargets: ["Expats", "Global Entrepreneurs"] },
  { id: "mg-001", name: "Victor Albrecht", title: "Managing Director Europe", bank: "Meridian Global Advisory", location: "Luxemburg", avatarUrl: "https://images.unsplash.com/photo-1656399910089-b7ead999bf23?auto=format&fit=crop&w=400&h=400&q=60", bankLogoUrl: BANK_LOGOS["Meridian Global Advisory"], premium: false, tags: ["Global"], focusAreas: ["Cross-Border Wealth Planning", "Philanthropie"], languages: ["Deutsch", "Englisch", "Französisch"], gender: "male", seniority: "executive", certifications: ["STEP"], clientTargets: ["International Clients", "Stiftungen"] },
  { id: "ap-001", name: "Sophia Altmayer", title: "Partnerin Private Office", bank: "Altmuehl & Partner", location: "Köln", avatarUrl: "https://images.unsplash.com/photo-1748666948369-d8eb966959c8?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Altmuehl & Partner"], premium: false, tags: ["Tradition"], focusAreas: ["Generationenplanung", "Family Governance"], languages: ["Deutsch", "Englisch"], gender: "female", seniority: "senior", certifications: ["Certified Family Officer"], clientTargets: ["Traditionsfamilien", "Family Offices"] },
  { id: "ec-001", name: "Henri Dupont", title: "Head of Private Clients", bank: "Eichenstein Conseil", location: "Paris", avatarUrl: "https://images.unsplash.com/photo-1738566061505-556830f8b8f5?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Eichenstein Conseil"], premium: false, tags: ["Europa"], focusAreas: ["Vermögensstrukturierung", "Tax Advisory"], languages: ["Französisch", "Deutsch", "Englisch"], gender: "male", seniority: "executive", certifications: ["CPA Europe"], clientTargets: ["Cross-Border Families", "Unternehmer"] },
  { id: "va-001", name: "Henrik Falkenhayn", title: "Managing Partner", bank: "Velorum Aachen", location: "Aachen", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80", bankLogoUrl: BANK_LOGOS["Velorum Aachen"], premium: false, tags: ["Innovation"], focusAreas: ["Venture Banking", "Corporate Finance"], languages: ["Deutsch", "Englisch"], gender: "male", seniority: "partner", certifications: ["CFA"], clientTargets: ["Scale-ups", "Innovationsführer"] },
];

// ──────────────────────────────────────────────
// Personal Dashboard Data
// ──────────────────────────────────────────────

const PERSONAL_DASHBOARD = {
  user: { fullName: "Dr. Anna Schmidt", role: "Senior Wealth Advisor", segments: ["Private Banking", "UHNWI"], nextMeeting: "2025-11-18T14:30:00" },
  weeklyFocus: [
    "Jahresgespräche mit Top-5-Mandaten vorbereiten",
    "ESG-Portfolio-Review für Familie Müller abschließen",
    "Neue Immobilienfonds-Strategie mit Team abstimmen",
  ],
  personalRecommendations: [
    { title: "Folgeberatung empfohlen", description: "Familie Berger hat vor 6 Wochen Immobilienkauf getätigt – idealer Zeitpunkt für Anschlussfinanzierung", actionLabel: "Termin vorschlagen" },
    { title: "Neue Research-Insights verfügbar", description: "3 neue Reports zu Alternative Investments passen zu Ihren Top-Mandaten", actionLabel: "Reports ansehen" },
    { title: "Netzwerk erweitern", description: "2 potenzielle Mandanten in Ihrer Region haben Interesse an Private Banking signalisiert", actionLabel: "Kontakte ansehen" },
  ],
  lastUpdated: "2025-11-16T09:45:00",
  goals: [
    { label: "Neukundenakquise", target: "15 neue Mandate", progress: 0.53 },
    { label: "AuM-Wachstum", target: "€25M", progress: 0.68 },
    { label: "ESG-Quote", target: "40% Portfolio", progress: 0.35 },
  ],
  clientHighlights: [
    { name: "Familie Müller", status: "Intensive Betreuung", lastContact: "2025-11-16", nextStep: "ESG-Portfolio Review Q1" },
    { name: "Dr. Weber", status: "Follow-up erforderlich", lastContact: "2025-11-15", nextStep: "Jahresgespräch vereinbaren" },
    { name: "Unternehmen Schneider GmbH", status: "Akquise-Phase", lastContact: "2025-11-17", nextStep: "Erstgespräch Nachfolgeplanung" },
  ],
  favorites: [
    { title: "Alternative Investments Q4 2024", type: "Report", link: "#" },
    { title: "ESG-Kriterien Immobilienfonds", type: "Dokument", link: "#" },
    { title: "Nachfolgeplanung: Best Practices", type: "Präsentation", link: "#" },
  ],
  schedule: [
    { title: "Jahresgespräch Familie Müller", datetime: "2025-11-18T14:30:00", type: "Kundentermin" },
    { title: "Team-Meeting Private Banking", datetime: "2025-11-19T10:00:00", type: "Intern" },
    { title: "Webinar: Neue Steuerreform", datetime: "2025-11-20T15:00:00", type: "Weiterbildung" },
  ],
  development: [
    { title: "Certified ESG Advisor", provider: "CFA Institute", status: "geplant" },
    { title: "Advanced Estate Planning", provider: "IWI", status: "offen" },
    { title: "Digital Wealth Management", provider: "Frankfurt School", status: "abgeschlossen" },
  ],
};

// ──────────────────────────────────────────────
// Dashboard KPIs / Actions / AI Insight (personal)
// ──────────────────────────────────────────────

const now = new Date().toISOString();
const futureDate = (days: number) => new Date(Date.now() + days * 86400000).toISOString();

const DASHBOARD_KPIS = {
  assetsUnderAdvisory: { value: 245000000, currency: "EUR", changePercentage: 12.5, trend: "up", previousValue: 217777778 },
  activeClients: { value: 127, changePercentage: 8.5, trend: "up", previousValue: 117 },
  conversionRate: { value: 34.2, changePercentage: -2.1, trend: "down", previousValue: 34.9 },
  ytdGrowth: { value: 18.7, changePercentage: 3.2, trend: "up", previousValue: 18.1 },
  period: "Letzte 30 Tage",
  lastUpdated: now,
};

const DASHBOARD_ACTIONS = [
  { id: "ACT-001", title: "Follow-up: Portfolio-Review Dr. Weber", description: "Quartalsweise Portfolio-Überprüfung geplant für Q4 2024", priority: "high", deadline: futureDate(3), category: "client_meeting", clientName: "Dr. Michael Weber", status: "pending" },
  { id: "ACT-002", title: "Compliance: Risikobewertung aktualisieren", description: "Jährliche Risikobewertungs-Dokumentation erforderlich", priority: "medium", deadline: futureDate(7), category: "compliance", status: "in_progress" },
  { id: "ACT-003", title: "Angebot: Nachhaltige Investmentstrategie", description: "ESG-Portfolio-Vorschlag für Familie Schmidt vorbereiten", priority: "high", deadline: futureDate(5), category: "proposal", clientName: "Family Office Schmidt", status: "pending" },
  { id: "ACT-004", title: "Dokumenten-Upload: Steueroptimierungsbericht", description: "Q3-Steueroptimierungsanalyse ins Kundenportal hochladen", priority: "low", deadline: futureDate(10), category: "documentation", status: "pending" },
  { id: "ACT-005", title: "Neuer Lead: Rheinberg-Services vorstellen", description: "Erstgespräch mit potenziellem UHNW-Kunden", priority: "high", deadline: futureDate(2), category: "lead", clientName: "Vertraulich - UHNW-Interessent", status: "pending" },
];

const DASHBOARD_AI_INSIGHT = {
  summary: "Ihre Client-Pipeline zeigt starkes Wachstum im Premium-Segment. Wir empfehlen, sich auf Nachfolgeplanung und ESG-Strategien zu fokussieren, um das Potenzial optimal auszuschöpfen.",
  insights: [
    { type: "opportunity", title: "Nachfolgeplanung-Potenzial", description: "3 Ihrer Top-Kunden (> 65 Jahre) haben noch keine dokumentierte Nachfolgestrategie. Durchschnittliches Vermögen: 8.5M EUR.", confidence: 0.87, actionLabel: "Gespräche planen" },
    { type: "trend", title: "ESG-Interesse steigt", description: "42% Ihrer Kunden haben in den letzten 3 Monaten nach nachhaltigen Anlagestrategien gefragt.", confidence: 0.92, actionLabel: "ESG-Portfolio erstellen" },
    { type: "risk", title: "Conversion-Rate rückläufig", description: "Ihre Conversion-Rate ist um 2.1% gesunken. Hauptgrund: längere Response-Zeiten bei Erstanfragen.", confidence: 0.78, actionLabel: "Prozess optimieren" },
  ],
  recommendedActions: [
    "Organisieren Sie einen Workshop zum Thema 'Nachfolgeplanung im Familienunternehmen'",
    "Führen Sie ein ESG-Screening für Ihre bestehenden Portfolios durch",
    "Automatisieren Sie Ihren Follow-up-Prozess für neue Leads",
  ],
  generatedAt: now,
  model: "GPT-4o Advisor Assistant",
};

// ──────────────────────────────────────────────
// Corporate Rheinberg Dashboard Data
// ──────────────────────────────────────────────

const CORPORATE_KPIS = {
  assetsUnderAdvisory: { value: 12400000000, changePercentage: 3.1, trend: "up", previousValue: 12025000000, currency: "EUR" },
  premiumClients: { value: 318, changePercentage: 3.9, trend: "up", previousValue: 306, currency: null },
  conversionRate: { value: 31.6, changePercentage: 4.0, trend: "up", previousValue: 30.4, currency: null },
  clientSatisfaction: { value: 68, changePercentage: 7.9, trend: "up", previousValue: 63, currency: null },
  esgQuote: { value: 46.0, changePercentage: 15.0, trend: "up", previousValue: 40.0, currency: null },
  period: "Letzte 30 Tage",
  lastUpdated: now,
};

const CORPORATE_ACTIONS = {
  actions: [
    { id: "corp-action-1", title: "KYC-Update Schmidt Family Office", description: "Jährliche Aktualisierung der Kundendaten und Risikoprofil-Review", priority: "high", deadline: now, category: "compliance", clientName: "Schmidt Family Office", status: "pending" },
    { id: "corp-action-2", title: "Nachfolge-Workshop Dr. Weber", description: "Strukturierte Vermögensübergabe und steueroptimierte Nachfolgeplanung", priority: "high", deadline: futureDate(2), category: "advisory", clientName: "Dr. Weber", status: "in_progress" },
    { id: "corp-action-3", title: "MiFID II Suitability Review", description: "Quartalsweise Überprüfung der Anlageeignung für Premium-Kunden", priority: "medium", deadline: futureDate(5), category: "compliance", clientName: null, status: "pending" },
    { id: "corp-action-4", title: "ESG-Reporting Q3 finalisieren", description: "Nachhaltigkeitsbericht für institutionelle Mandate abschließen", priority: "high", deadline: futureDate(7), category: "esg_sustainability", clientName: null, status: "in_progress" },
    { id: "corp-action-5", title: "Portfolio-Neuausrichtung NextGen", description: "Strategische Asset Allocation für NextGen-Programm anpassen", priority: "medium", deadline: futureDate(9), category: "portfolio_management", clientName: "NextGen Program", status: "pending" },
  ],
  totalCount: 5,
  pendingCount: 3,
  highPriorityCount: 3,
};

const CORPORATE_AI_INSIGHT = {
  summary: "Ihre Premium-Segmente verzeichnen 14% Wachstum, gleichzeitig steigt der ESG-Anteil auf 46%. Die Client Satisfaction erreicht mit einem NPS von 68 Spitzenwerte.",
  insights: [
    { type: "opportunity", title: "Nachfolgeplanung-Potenzial identifiziert", description: "5 Premium-Mandate ohne finalisierten Übergabeplan mit durchschnittlichem Vermögen von 9,1 Mio. EUR.", confidence: 0.87, actionLabel: "Beratungsgespräche planen" },
    { type: "trend", title: "ESG-Interest steigt signifikant", description: "38% mehr ESG-Anfragen in den letzten 90 Tagen. Nachhaltige Investments werden zum Standard bei Neugeschäft.", confidence: 0.92, actionLabel: "ESG-Portfolio erstellen" },
    { type: "risk", title: "Conversion Rate rückläufig in Region Süd", description: "Die Lead-to-Mandat Conversion ist in der Region Süd um 3 Prozentpunkte gesunken.", confidence: 0.78, actionLabel: "Sales-Prozess überprüfen" },
    { type: "recommendation", title: "NextGen-Programm ausbauen", description: "95% Bindungsrate bei NextGen-Teilnehmern. Skalierung könnte langfristige Mandatssicherung stärken.", confidence: 0.85, actionLabel: "Programm erweitern" },
  ],
  recommendedActions: [
    "Workshop Nachfolgeplanung für identifizierte Premium-Mandate organisieren",
    "ESG-Screening für Bestandsportfolios durchführen und Optimierungspotenziale aufzeigen",
    "Prozess-Automation für Lead-Follow-ups implementieren",
    "Regionsspezifische Sales-Performance-Analyse durchführen",
    "NextGen-Programm auf weitere Standorte ausrollen",
  ],
  generatedAt: now,
  model: "GPT-4o Corporate Advisory Analytics",
};

// ──────────────────────────────────────────────
// Insights Feed Data
// ──────────────────────────────────────────────

const INSIGHTS_DATA = [
  { id: "1", title: "Die Zukunft der nachhaltigen Geldanlage in Deutschland", category: "Nachhaltigkeit", summary: "Eine Analyse der aktuellen ESG-Trends...", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2940&auto=format&fit=crop", isPremium: true, hasAudio: true, tags: ["ESG", "Green Finance", "Portfolio"] },
  { id: "2", title: "Immobilienmarkt Köln: Chancen und Risiken 2025", category: "Immobilien", summary: "Experten bewerten die Lage im Luxussegment...", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716", isPremium: true, hasAudio: false, tags: ["Luxusimmobilien", "Köln", "Investment"] },
  { id: "3", title: "Private Equity: Exklusiver Zugang zu Wachstumsunternehmen", category: "Anlagestrategie", summary: "Wie Sie als Privatanleger von den Renditechancen profitieren...", image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2940&auto=format&fit=crop", isPremium: false, hasAudio: true, tags: ["Private Equity", "Wachstum", "Rendite"] },
  { id: "53", title: "ESG-Integration in Familienunternehmen: Mehr als ein Trend", category: "Nachhaltigkeit", summary: "Wie deutsche Familienunternehmen Nachhaltigkeitskriterien integrieren...", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop", isPremium: true, hasAudio: false, tags: ["ESG", "Mittelstand", "Familienunternehmen"] },
  { id: "4", title: "Künstliche Intelligenz im Portfoliomanagement", category: "Technologie", summary: "Wie KI die Anlagestrategien revolutioniert.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", isPremium: false, hasAudio: true, tags: ["KI", "Fintech", "Portfolio"] },
  { id: "5", title: "Market Outlook zur Jahresmitte 2025", category: "Märkte & Investments", summary: "Die USA verlieren an Dominanz, während Europa und Asien zu neuen Vorreitern werden.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2938&auto=format&fit=crop", isPremium: false, hasAudio: true, tags: ["Wirtschaftsausblick", "Europa", "Asien"] },
  { id: "6", title: "Der Aufstieg von alternativen Proteinen", category: "Food & Beverage", summary: "Investitionsmöglichkeiten im Markt für Fleischalternativen.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", isPremium: false, hasAudio: true, tags: ["Foodtech", "Nachhaltigkeit", "Investment"] },
];

// ──────────────────────────────────────────────
// Streaming helper for chat
// ──────────────────────────────────────────────

async function* mockChatStream(): AsyncGenerator<string> {
  const message =
    "Vielen Dank für Ihre Anfrage. Der KI-Assistent ist aktuell im Demo-Modus. " +
    "Bitte nutzen Sie die vordefinierten Fragen in der Seitenleiste oder kontaktieren " +
    "Sie einen unserer Berater für eine persönliche Beratung. " +
    "Sie finden alle Ansprechpartner unter 'Trusted Advisors'.";
  const words = message.split(" ");
  for (const word of words) {
    yield word + " ";
    await new Promise((r) => setTimeout(r, 40));
  }
}

// ──────────────────────────────────────────────
// Mock Brain – same method names as Brain class
// ──────────────────────────────────────────────

const brain = {
  // Health
  check_health: () => mockResponse({ status: "ok" }),

  // Advisors
  get_advisors: () => mockResponse(ADVISORS_DATA),

  // Personal Dashboard
  get_personal_dashboard_overview: () => mockResponse(PERSONAL_DASHBOARD),
  save_personal_dashboard_settings: () => mockResponse({ status: "ok", message: "Settings saved (demo mode)" }),

  // Dashboard KPIs / Actions / AI Insight
  get_dashboard_kpis: () => mockResponse(DASHBOARD_KPIS),
  get_dashboard_actions: () => mockResponse(DASHBOARD_ACTIONS),
  get_dashboard_ai_insight: () => mockResponse(DASHBOARD_AI_INSIGHT),

  // Corporate Rheinberg Dashboard
  get_corporate_rheinberg_dashboard_kpis: () => mockResponse(CORPORATE_KPIS),
  get_corporate_rheinberg_dashboard_actions: () => mockResponse(CORPORATE_ACTIONS),
  get_corporate_rheinberg_dashboard_ai_insight: () => mockResponse(CORPORATE_AI_INSIGHT),

  // OpenAI Chat (streaming)
  handle_openai_chat: () => mockChatStream(),

  // Insights Feed
  get_insights: () => mockResponse(INSIGHTS_DATA.filter((i) => !i.isPremium && !["Nachhaltigkeit", "Anlagestrategie", "Märkte & Investments"].includes(i.category))),
  get_theme_specials: () => mockResponse(INSIGHTS_DATA.filter((i) => !i.isPremium && ["Nachhaltigkeit", "Anlagestrategie", "Märkte & Investments"].includes(i.category))),
  get_premium_content: () => mockResponse(INSIGHTS_DATA.filter((i) => i.isPremium)),
  track_interaction: () => mockResponse({ status: "ok" }),

  // Articles
  get_articles: () => mockResponse([]),

  // Stripe (feature disabled, but stub for safety)
  get_stripe_public_keys: () => mockResponse({ pricingTableId: "", publishableKey: "" }),
  get_subscription_status: () => mockResponse({ status: "inactive" }),
  stripe_webhook: () => mockResponse({ status: "ok" }),
  test_firestore: () => mockResponse({ status: "ok" }),

  // Firestore schema (admin, not used in UI)
  generate_schema: () => mockResponse({ status: "ok" }),
  get_structure_diagram: () => mockResponse({ diagram: "" }),
  get_schema: () => mockResponse({ schema: {} }),
};

export default brain;
