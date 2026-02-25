

// ui/src/components/RheinbergPrivatbankProfileBase.tsx
import React, { useEffect, useState } from "react";
import brain from "brain";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare, Share2, BookmarkPlus, Play, Building, Info, Star,
  Clock, ChevronRight, Award, GraduationCap, Globe, Plus, ExternalLink, Check
} from "lucide-react";
import { ContactRequestModal } from "components/ContactRequestModal";
import CorporateDashboardKpiSummary from "components/CorporateDashboardKpiSummary";
import CorporateDashboardActionCenter from "components/CorporateDashboardActionCenter";
import CorporateDashboardAiInsights from "components/CorporateDashboardAiInsights";
import CorporateDashboardPublications from "components/CorporateDashboardPublications";
import type {
  CorporateDashboardKpisResponse,
  DashboardActionsResponse,
  DashboardAiInsightResponse,
} from "types";

type AdvisorLite = {
  id: string;
  name: string;
  avatarUrl: string;
  bank?: string;
};

const colors = {
  primary: "#C8A96F",
  primaryHover: "#B69960",
  dark: "#333333",
  light: "#F5F5F5",
  white: "#FFFFFF",
  primaryLight: "#C8A96F20",
  primaryLighter: "#C8A96F10",
  border: "#C8A96F30",
};

const RHEINBERG_LOGO = "/images/banks/rheinberg-logo-dark.svg";
const HEADER_IMAGE =
  "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_08_regional_klassisches_gebaeude.jpg";

const companyInfo = {
  description:
    "Die Rheinberg Privatbank ist eine traditionsreiche deutsche Privatbank mit Fokus auf individuelle Vermögensverwaltung und ganzheitliche Finanzberatung. Seit unserer Gründung stehen wir für persönliche Betreuung, Verlässlichkeit und Expertise in allen Fragen rund um Vermögensaufbau und -erhalt.",
  esgFocus:
    "Nachhaltigkeit ist für uns mehr als ein Trend – es ist Teil unserer Unternehmensphilosophie. Wir integrieren ESG-Kriterien systematisch in unsere Anlagestrategien und unterstützen unsere Kunden dabei, verantwortungsvoll zu investieren und gleichzeitig ihre finanziellen Ziele zu erreichen.",
  kpis: [
    { label: "Assets under Management", value: "EUR 12 Mrd." },
    { label: "Nachhaltige Anlagen", value: "40% des Gesamtvermögens" },
    { label: "Standorte in Deutschland", value: "8 Niederlassungen" },
  ],
};

const additionalServices = [
  "Individuelle Vermögensverwaltung",
  "Generationenplanung und Nachfolge",
  "Stiftungsberatung",
  "Immobilienfinanzierung",
  "Private Equity und alternative Investments",
];

const locations = ["Köln", "Frankfurt", "München", "Hamburg"];

type BaseProps = { mode: "user" | "corporate" };

export default function RheinbergPrivatbankProfileBase({ mode }: BaseProps) {
  const navigate = useNavigate();
  const [advisors, setAdvisors] = useState<AdvisorLite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorLite | null>(null);

  // Corporate Dashboard State
  const [kpisData, setKpisData] = useState<CorporateDashboardKpisResponse | null>(null);
  const [actionsData, setActionsData] = useState<DashboardActionsResponse | null>(null);
  const [aiInsightData, setAiInsightData] = useState<DashboardAiInsightResponse | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  // Dummy publications data for Corporate Dashboard
  const publicationsData = [
    {
      id: 'pub-1',
      title: 'Vermögensstrategien für die Zukunft',
      description: 'Unsere Experten analysieren aktuelle Markttrends und entwickeln nachhaltige Anlagestrategien...',
      imageUrl: HEADER_IMAGE,
      readTime: '5 Min. Lesezeit',
      status: 'Aktuelle Publikation',
      link: '/insights',
    },
  ];

  useEffect(() => {
    const fetchAdvisors = async () => {
      setIsLoading(true);
      try {
        const response = await brain.get_advisors();
        if (response.ok) {
          const allAdvisors: Advisor[] = await response.json();
          const rheinbergAdvisors = (allAdvisors || [])
            .filter((a) => a.bank === "Rheinberg Privatbank")
            .map((a) => ({
              id: a.id,
              name: a.name,
              avatarUrl: a.avatarUrl,
              bank: a.bank,
            }));
          setAdvisors(rheinbergAdvisors);
        } else {
          setError("Berater konnten nicht geladen werden.");
        }
      } catch (e) {
        console.error(e);
        setError("Ein Fehler ist aufgetreten.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  // Fetch Corporate Dashboard Data
  useEffect(() => {
    if (mode === "corporate") {
      const fetchDashboardData = async () => {
        try {
          setDashboardLoading(true);

          const [kpisResponse, actionsResponse, aiInsightResponse] = await Promise.all([
            brain.get_corporate_rheinberg_dashboard_kpis(),
            brain.get_corporate_rheinberg_dashboard_actions(),
            brain.get_corporate_rheinberg_dashboard_ai_insight(),
          ]);

          const kpis = await kpisResponse.json();
          const actions = await actionsResponse.json();
          const aiInsight = await aiInsightResponse.json();

          setKpisData(kpis);
          setActionsData(actions);
          setAiInsightData(aiInsight);
        } catch (err) {
          console.error("Failed to load corporate dashboard data:", err);
        } finally {
          setDashboardLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [mode]);

  const isCorporate = mode === "corporate";

  const handleContactRequest = (advisor: AdvisorLite) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  const handleSaveInterest = (advisor: AdvisorLite) => {
    alert(`Ihr Interesse an ${advisor.name} wurde gespeichert!`);
  };

  const handleModalSubmit = (data: any) => {
    console.log("Kontaktanfrage gesendet:", data);
    setIsModalOpen(false);
    alert("Ihre Rückrufbitte wurde erfolgreich versendet.");
  };

  const PremiumAdvisorCard = ({
    advisor,
    onContactRequest,
    onSaveInterest,
  }: {
    advisor: AdvisorLite;
    onContactRequest: (a: AdvisorLite) => void;
    onSaveInterest: (a: AdvisorLite) => void;
  }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative">
        <div className="h-40 bg-gray-200" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 transform">
          <Avatar className="h-32 w-32 border-4 border-white shadow-md">
            <AvatarImage
              src={advisor.avatarUrl || "https://via.placeholder.com/128"}
              alt={advisor.name}
              className="object-contain object-center"
            />
            <AvatarFallback style={{ backgroundColor: colors.primary, color: colors.white }}>
              {advisor.name?.split(" ").map((n) => n[0]).join("") || "RP"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="pt-20 pb-6 px-6 text-center">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{advisor.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{advisor.position || "Private Banker"}</p>
        <div className="flex justify-center mb-4">
          <span
            className="px-2 py-1 text-xs rounded-full"
            style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
          >
            {advisor.specialty || "Vermögensverständnis"}
          </span>
        </div>
        <div className="space-y-1 mb-6 text-sm text-gray-600">
          <div className="flex items-center justify-center">
            <GraduationCap className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
            <span>{advisor.qualifications || "Certified Financial Planner"}</span>
          </div>
          <div className="flex items-center justify-center">
            <Globe className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
            <span>
              {Array.isArray(advisor.languages)
                ? advisor.languages.join(", ")
                : advisor.languages || "Deutsch, Englisch"}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Award className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
            <span>{advisor.experience || "15+ Jahre Erfahrung"}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="flex items-center justify-center gap-1"
            style={{ backgroundColor: colors.primary, color: colors.white }}
            onClick={() => onContactRequest(advisor)}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Kontakt</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-1 border"
            style={{ borderColor: colors.primary, color: colors.primary }}
            onClick={() => onSaveInterest(advisor)}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span className="text-sm">Merken</span>
          </Button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ background: colors.light }}>
        <div className="text-center">
          <img src={RHEINBERG_LOGO} alt="Rheinberg Privatbank Logo" className="mx-auto mb-8 w-48" />
          <div className="animate-pulse text-xl" style={{ color: colors.primary }}>
            Lade Unternehmensprofil...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_08_regional_klassisches_gebaeude.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-block px-3 py-1 mb-4 rounded-full text-sm font-medium"
              style={{ backgroundColor: colors.primary, color: colors.white }}
            >
              {isCorporate ? "Corporate Partner" : "Profilansicht"}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Rheinberg Privatbank
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
              Tradition trifft Innovation in der Vermögensverwaltung
            </p>

            {/* View Switcher */}
            <div className="mt-4 flex justify-center gap-2">
              <Link
                to="/rheinberg-privatbank-user-page"
                className={`px-3 py-1 rounded-md border text-sm backdrop-blur-sm ${
                  mode === "user"
                    ? "bg-white/90 text-black border-white/90"
                    : "bg-white/20 text-white border-white/40 hover:bg-white/30"
                }`}
              >
                Nutzer-Ansicht
              </Link>
              <Link
                to="/rheinberg-privatbank-corporate-page"
                className={`px-3 py-1 rounded-md border text-sm backdrop-blur-sm ${
                  mode === "corporate"
                    ? "bg-white/90 text-black border-white/90"
                    : "bg-white/20 text-white border-white/40 hover:bg-white/30"
                }`}
              >
                Corporate-Ansicht
              </Link>
            </div>
            
            <div className="flex justify-center gap-3 mt-4">
              <button className="flex items-center text-sm text-white/80 hover:text-white">
                <Share2 className="w-4 h-4 mr-1" />
                <span>Teilen</span>
              </button>
              {mode === "user" && (
                <button className="flex items-center text-sm text-white/80 hover:text-white">
                  <BookmarkPlus className="w-4 h-4 mr-1" />
                  <span>Merken</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Wave transition to main content */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
            <path
              fill="#F9FAFB"
              d="M0,64 C240,96 480,32 720,48 C960,64 1200,96 1440,64 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Corporate Dashboard Section - Only show in corporate mode */}
        {isCorporate ? (
          <div className="space-y-8">
            {dashboardLoading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-lg" style={{ color: colors.primary }}>
                  Lade Dashboard-Daten...
                </div>
              </div>
            ) : (
              <>
                {/* KPIs */}
                {kpisData && (
                  <CorporateDashboardKpiSummary
                    assetsUnderAdvisory={kpisData.assetsUnderAdvisory}
                    premiumClients={kpisData.premiumClients}
                    conversionRate={kpisData.conversionRate}
                    clientSatisfaction={kpisData.clientSatisfaction}
                    esgQuote={kpisData.esgQuote}
                    period={kpisData.period}
                  />
                )}

                {/* Publications Section */}
                <CorporateDashboardPublications
                  publications={publicationsData}
                  onCreateArticle={() => alert('Artikel-Editor wird geöffnet (MVP-Simulation)')}
                />

                {/* Action Center & AI Insights Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Action Center */}
                  {actionsData && (
                    <div>
                      <CorporateDashboardActionCenter
                        actions={actionsData.actions}
                        totalCount={actionsData.totalCount}
                        pendingCount={actionsData.pendingCount}
                        highPriorityCount={actionsData.highPriorityCount}
                      />
                    </div>
                  )}

                  {/* AI Insights */}
                  {aiInsightData && (
                    <div>
                      <CorporateDashboardAiInsights
                        summary={aiInsightData.summary}
                        insights={aiInsightData.insights}
                        recommendedActions={aiInsightData.recommendedActions}
                        generatedAt={aiInsightData.generatedAt}
                        model={aiInsightData.model}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          /* User View - Show traditional profile sections */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Linke Spalte */}
            <div className="lg:col-span-2 space-y-8">
              {/* Philosophie */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-white border-b pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center text-gray-800">
                    <Info className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    Unsere Philosophie
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">{companyInfo.description}</p>
                </CardContent>
              </Card>

              {/* ESG */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-white border-b pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center text-gray-800">
                    <Info className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    Nachhaltigkeit im Fokus (ESG)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">{companyInfo.esgFocus}</p>
                </CardContent>
              </Card>

              {/* Publikationen */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-white border-b pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center text-gray-800">
                    <Star className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    Publikationen
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div
                    className="bg-gray-50 rounded-lg p-4 flex gap-4 items-center cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => navigate("/insights")}
                  >
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                      <img src={HEADER_IMAGE} alt="Insights" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Vermögensstrategien für die Zukunft
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        Unsere Experten analysieren aktuelle Markttrends und entwickeln nachhaltige Anlagestrategien...
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Aktuelle Publikation</span>
                        <span className="mx-2">•</span>
                        <span>5 Min. Lesezeit</span>
                      </div>
                    </div>
                    <button
                      className="flex-shrink-0 p-2 rounded-full"
                      style={{ backgroundColor: colors.primary, color: colors.white }}
                      aria-label="Abspielen"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Corporate-only: Artikel hinzufügen */}
                  {isCorporate && (
                    <div
                      className="mt-6 border border-dashed rounded-lg p-6 text-center"
                      style={{ borderColor: colors.primary, backgroundColor: colors.primaryLighter }}
                    >
                      <Plus className="w-10 h-10 mx-auto mb-3" style={{ color: colors.primary }} />
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>
                        Weitere Artikel hinzufügen
                      </h3>
                      <p className="text-gray-700 mb-4 max-w-md mx-auto">
                        Erweitern Sie Ihr Unternehmensprofil mit wertvollen Inhalten für Ihre Zielgruppe.
                      </p>
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium"
                        style={{ backgroundColor: colors.primary, color: colors.white }}
                        onClick={() => alert("Artikel-Editor (MVP-Simulation)")}
                      >
                        Artikel erstellen
                      </button>
                    </div>
                  )}

                  {mode === "user" && (
                    <div className="mt-4 text-center">
                      <button
                        className="inline-flex items-center text-sm font-medium"
                        style={{ color: colors.primary }}
                        onClick={() => alert("Weitere Publikationen (Demo)")}
                      >
                        <span>Weitere Publikationen anzeigen</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Berater */}
              <div className="mt-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 inline-block relative" style={{ color: colors.primary }}>
                    Ihre persönlichen Berater
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                    Unsere Experten stehen Ihnen für eine individuelle und umfassende Beratung zur Verfügung.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {advisors.length > 0 ? (
                    advisors.map((advisor) => (
                      <PremiumAdvisorCard
                        key={(advisor.id as any) ?? advisor.name}
                        advisor={advisor}
                        onContactRequest={handleContactRequest}
                        onSaveInterest={handleSaveInterest}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      Keine Berater für dieses Unternehmen gefunden.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rechte Spalte */}
            <div className="space-y-8">
              {/* KPIs */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4" style={{ backgroundColor: colors.primary, color: colors.white }}>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Kennzahlen im Überblick
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {companyInfo.kpis.map((kpi, index) => (
                      <div key={index} className="text-center">
                        <p className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
                          {kpi.value}
                        </p>
                        <p className="text-sm text-gray-500">{kpi.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-white border-b pb-4">
                  <CardTitle className="text-xl font-bold flex items-center text-gray-800">
                    <Check className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    Unsere Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {additionalServices.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-2"
                          style={{ backgroundColor: colors.primaryLight }}
                        >
                          <Check className="w-3 h-3" style={{ color: colors.primary }} />
                        </div>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Standorte */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-white border-b pb-4">
                  <CardTitle className="text-xl font-bold flex items-center text-gray-800">
                    <Building className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    Unsere Standorte
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-2">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="py-2 px-3 rounded-md text-center"
                        style={{ backgroundColor: colors.primaryLighter }}
                      >
                        <span className="text-gray-800">{location}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      className="inline-flex items-center text-sm font-medium"
                      style={{ color: colors.primary }}
                      onClick={() => alert("Standorte (Demo)")}
                    >
                      <span>Alle Standorte anzeigen</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Kontakt */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: colors.primaryLighter }}>
                <CardHeader className="pb-4" style={{ backgroundColor: colors.primary, color: colors.white }}>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Kontaktieren Sie uns
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    Haben Sie Fragen oder wünschen Sie ein persönliches Gespräch? Wir sind für Sie da.
                  </p>
                  <Button
                    className="w-full mb-2"
                    style={{ backgroundColor: colors.primary, color: colors.white }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Rückruf anfordern
                  </Button>
                  {mode === "user" && (
                    <Button variant="outline" className="w-full" style={{ borderColor: colors.primary, color: colors.primary }}>
                      E-Mail senden
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <ContactRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          advisor={selectedAdvisor}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
