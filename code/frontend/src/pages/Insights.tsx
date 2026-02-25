import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FilterBar } from 'components/FilterBar';
import {
  Bell,
  UserCircle,
  Sparkles,
  ChevronRight,
  Heart,
  Bookmark,
  Share2,
  TrendingUp,
  Clock,
  Eye,
  Target,
  Zap,
  Star,
  ThumbsUp,
  Shield,
  Award,
  BarChart3,
  Globe,
  Lock,
  Crown,
  TrendingDown,
  Briefcase,
  RefreshCw,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const BankingInsightsPlatform = () => {
  const navigate = useNavigate();
  const mockUserId = 'user-123';
  const mockUserPreferences = {
    interests: ['Nachhaltigkeit', 'Immobilien'],
  };
  const [activeFilters, setActiveFilters] = useState({});
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [userInterests, setUserInterests] = useState(['ANLAGESTRATEGIE', 'IMMOBILIEN']);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [likes, setLikes] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [personalizedInsights, setPersonalizedInsights] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(2.4); // in Millionen

  // Farbpalette basierend auf dem bestehenden Design
  const colors = {
    primary: 'hsl(224, 71%, 21%)', // Dunkles Corporate Blau
    secondary: 'hsl(41, 45%, 63%)', // Warmes Gold
    background: 'hsl(38, 29%, 95%)', // Helles Beige
    accent: 'hsl(41, 45%, 90%)', // Helles Gold
  };

  // Hintergrund-SVG (korrekt encodiert)
  const bgSvg = encodeURIComponent(
    "<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg' fill='none' fill-rule='evenodd'><g fill='#224771' fill-opacity='0.4'><path d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/></g></svg>"
  );

  // Main Criteria – leicht interaktiv, mit Tooltip und Hover (mit Lucide-Icons)
  const criteria = [
    {
      id: 'fresh',
      Icon: RefreshCw,
      title: 'Tagesaktuelle Inhalte',
      subcopy:
        'Unsere Analysen und Marktberichte werden fortlaufend aktualisiert, damit Sie immer auf dem neuesten Stand der Entwicklungen sind.',
      tooltip:
        'Wir prüfen und aktualisieren unsere Beiträge kontinuierlich, um die Relevanz und Genauigkeit der bereitgestellten Informationen sicherzustellen.',
    },
    {
      id: 'experts',
      Icon: BookOpen,
      title: 'Expertise von Fachleuten',
      subcopy:
        'Wir wählen unsere Beiträge von unabhängigen Fachleuten und qualifizierten Partnern sorgfältig aus.',
      tooltip:
        'Alle Inhalte stammen von verlässlichen Quellen, die von unseren hauseigenen Experten auf Qualität und Relevanz geprüft werden.',
    },
    {
      id: 'ai',
      Icon: Sparkles,
      title: 'Intelligente Empfehlungen',
      subcopy:
        'Unsere KI analysiert Ihre Interessen und schlägt Ihnen passende Beiträge vor, die für Sie relevant sind.',
      tooltip:
        'Ein KI‑Assistent hilft Ihnen, die passenden Inhalte zu finden. Die Entscheidung über die Relevanz treffen Sie am Ende immer selbst.',
    },
  ];

  function CriteriaCard({ c, idx }) {
    const [isHovered, setIsHovered] = useState(false);
    const IconComp = c.Icon;
    return (
      <div
        key={c.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: `${colors.secondary}40`, backgroundColor: '#fff' }}
      >
        <div className="w-full p-5 text-left">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: '#fff',
              }}
            >
              <IconComp className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className="text-base font-bold"
                  style={{ color: colors.primary }}
                >
                  {(idx + 1 < 10 ? `0${idx + 1}` : idx + 1)} · {c.title}
                </h3>
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: colors.primary }}>
                {c.label}
              </div>
              <div
                className={`transition-all duration-300`}
                style={{ 
                  maxHeight: isHovered ? '500px' : '0',
                  opacity: isHovered ? 1 : 0,
                  overflow: 'hidden',
                }}
              >
                <div className="mt-2 text-sm text-gray-600">
                  {c.subcopy}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-1 w-full rounded-b-2xl transition-all duration-300"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`
              : `${colors.secondary}55`,
          }}
        />
      </div>
    );
  }

  const bankingInsights = [
    {
      id: '1',
      title: 'Private Wealth Management Trends 2025',
      category: 'VERMÖGENSVERWALTUNG',
      summary: 'Exklusive Strategien für High Net Worth Individuals. Neue Ansätze in der Vermögensstrukturierung und Risikodiversifizierung.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      date: 'Heute',
      readTime: '12 Min',
      confidence: 96,
      trending: true,
      aiReason: 'Basierend auf Ihrem Vermögensportfolio von €2.4M',
      engagement: 847,
      newInsight: true,
      riskLevel: 'Moderat',
      minInvestment: '€500k+',
      exclusivity: 'Private Banking'
    },
    {
      id: '2',
      title: 'ESG-Compliance in Family Offices',
      category: 'NACHHALTIGKEIT',
      summary: 'Nachhaltigkeitskriterien als Werttreiber. Wie Family Offices ESG-Standards implementieren ohne Rendite zu opfern.',
      image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80',
      date: 'Gestern',
      readTime: '15 Min',
      confidence: 91,
      trending: false,
      aiReason: 'Ihre Nachhaltigkeits-Präferenzen im Fokus',
      engagement: 623,
      newInsight: false,
      riskLevel: 'Konservativ',
      expectedReturn: '6-8% p.a.',
      exclusivity: 'Family Office'
    },
    {
      id: '3',
      title: 'Schweizer Immobilienmarkt: Luxussegment-Analyse',
      category: 'IMMOBILIEN',
      summary: 'Detaillierte Marktanalyse für Premium-Immobilien. Chancen und Risiken im europäischen Luxusimmobilienmarkt.',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
      date: '2 Tage',
      readTime: '18 Min',
      confidence: 88,
      trending: true,
      aiReason: 'Passend zu Ihren Immobilien-Investments',
      engagement: 492,
      newInsight: false,
      priceRange: '€2M - €15M',
      location: 'Zürich, Genf',
      exclusivity: 'Exklusiv'
    }
  ];

  const themeSpecials = [
    {
      id: 'rp-01',
      title: 'Rheinberg Privatbank Marktausblick 2025: Zinsen, Chancen, Risiken',
      category: 'ANLAGESTRATEGIE',
      summary:
        'Kernaussagen des aktuellen Rheinberg Privatbank Outlooks und ihre Implikationen für vermögende Privatpersonen.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      date: 'Neu',
      readTime: '12 Min',
      confidence: 90,
      trending: true,
      aiReason: 'Auf Basis Ihrer Interessen und aktueller Marktdaten empfohlen.',
      engagement: 1247,
      featured: true,
      analyst: 'Fabian Reuther',
      bankRating: 'AAA',
    },
    {
      id: 'market-outlook',
      title: 'Zentralbank-Politik 2025: Auswirkungen auf Portfolios',
      category: 'ANLAGESTRATEGIE',
      summary:
        'Fed, EZB und SNB im Fokus. Wie sich Zinsentscheidungen auf verschiedene Asset-Klassen auswirken werden.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      date: 'Neu',
      readTime: '25 Min',
      confidence: 94,
      trending: true,
      aiReason: 'Top-Empfehlung unserer Chefanalysten',
      engagement: 1247,
      featured: true,
      analyst: 'Dr. Klaus Weber, CFA',
      bankRating: 'AAA',
    },
    {
      id: '4',
      title: 'Alternative Investments: Art & Collectibles',
      category: 'ALTERNATIVE ANLAGEN',
      summary:
        'Kunstmarkt als Diversifikationsstrategie. ROI-Analyse von Blue-Chip-Kunstwerken und seltenen Sammlerobjekten.',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
      date: '3 Tage',
      readTime: '20 Min',
      confidence: 83,
      trending: false,
      aiReason: 'Alternative Assets für Ihr Portfolio',
      engagement: 368,
      minInvestment: '€100k+',
      liquidityRisk: 'Niedrig',
    }
  ];

  const premiumAnalysis = [
    {
      id: '6',
      title: 'Steueroptimierung für Multimillionäre',
      category: 'STEUERSTRATEGIE',
      summary: 'Legale Steueroptimierungsstrategien für vermögende Privatpersonen. Internationale Strukturen und Compliance.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      date: 'Neu',
      readTime: '45 Min',
      confidence: 98,
      aiReason: 'Exklusiv für Private Banking Kunden',
      engagement: 156,
      taxSaving: 'Bis zu 30%',
      jurisdiction: 'CH, LI, LU'
    }
  ];

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarks(newBookmarks);
  };

  const toggleLike = (id) => {
    const newLikes = new Set(likes);
    if (newLikes.has(id)) {
      newLikes.delete(id);
    } else {
      newLikes.add(id);
    }
    setLikes(newLikes);
  };

  const refreshRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setPersonalizedInsights([...bankingInsights].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setPersonalizedInsights(bankingInsights);
  }, []);

  function InsightCard({ insight, bookmarks, likes, toggleBookmark, toggleLike }) {
    const navigate = useNavigate();
    
    // HARTE REGEL: Nur Artikel mit ID 1 ist klickbar.
    const isClickable = insight.id === 'rp-01';

    return (
      <div
        className={`relative group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${insight.featured ? 'ring-2 ring-opacity-30' : ''}`}
        style={insight.featured ? { ringColor: colors.secondary } : {}}
      >
        {insight.newInsight && (
          <div className="absolute top-3 right-3 z-10">
            <div
              className="text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
        )}

        {insight.trending && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              Im Fokus
            </div>
          </div>
        )}

        <div className="relative h-48 overflow-hidden">
          <img
            src={insight.image}
            alt={insight.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {insight.exclusivity && (
            <div className="absolute bottom-3 left-3">
              <div
                className="text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              >
                <Crown className="w-3 h-3 text-yellow-400" />
                {insight.exclusivity}
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white`}
              style={{ backgroundColor: colors.primary }}
            >
              {insight.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              {insight.engagement}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {insight.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {insight.summary}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            {insight.minInvestment && (
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-500">Min. Investment</div>
                <div className="font-semibold" style={{ color: colors.primary }}>
                  {insight.minInvestment}
                </div>
              </div>
            )}
          </div>

          <div
            className="border rounded-lg p-3 mb-4"
            style={{ backgroundColor: `${colors.background}`, borderColor: colors.secondary }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" style={{ color: colors.secondary }} />
              <span className="text-xs font-semibold" style={{ color: colors.primary }}>
                FinanzKompass
              </span>
              {typeof insight.confidence === 'number' && (
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold" style={{ color: colors.primary }}>
                    {insight.confidence}%
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs" style={{ color: colors.primary }}>
              {insight.aiReason}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <span>{insight.date}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {insight.readTime}
              </div>
            </div>
            {insight.analyst && (
              <div className="text-xs font-medium" style={{ color: colors.primary }}>
                {insight.analyst}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleLike(insight.id)}
                className={`flex items-center gap-1 text-sm transition-colors hover:scale-105 ${
                  likes.has(insight.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Award className={`w-4 h-4 ${likes.has(insight.id) ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => toggleBookmark(insight.id)}
                className={`flex items-center gap-1 text-sm transition-colors hover:scale-105 ${
                  bookmarks.has(insight.id) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarks.has(insight.id) ? 'fill-current' : ''}`} />
              </button>

              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors hover:scale-105">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {isClickable ? (
              <button
                onClick={() => navigate('/v2-artikel-rheinberg')}
                className="text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                Beitrag öffnen
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div
                className="text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 opacity-70"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  cursor: 'not-allowed'
                }}
              >
                Beitrag öffnen
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
  <>
    {/* Hero Section */}
    <div className="relative overflow-hidden" style={{ backgroundColor: colors.background, color: colors.primary }}>
      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <img 
          src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/features_wissen_blaue_kugel.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8F4EB]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: colors.primary }}>
            Ihre Ziele. <br /> Ihre WissensPlattform.
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: colors.primary, opacity: 0.8 }}>
            Entdecken Sie unsere Empfehlungen für Sie, die wirklich zu Ihnen passen.
            <br /><br />
          </p>

          {/* MAIN CRITERIA – direkt unter den Buttons */}
            <div className="container mx-auto px-4 relative z-10">
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:items-start">
                {criteria.map((c, i) => (
                  <CriteriaCard key={c.id} c={c} idx={i} />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Button
                onClick={() => setShowInterestModal(true)}
                className="font-semibold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                style={{ backgroundColor: colors.primary, color: colors.accent }}
              >
                <UserCircle className="w-5 h-5" />
                Themen festlegen
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={() => navigate('/benachrichtigungen')}
                variant="outline"
                className="backdrop-blur-sm font-semibold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border-2"
                style={{ borderColor: colors.secondary, color: colors.primary, backgroundColor: 'transparent' }}
              >
                <Bell className="w-5 h-5" />
                Updates aktivieren
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
            <path
              fill={colors.background}
              d="M0,64 C240,96 480,32 720,48 C960,64 1200,96 1440,64 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content mit Banking-Focus */}
      <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4 py-12">
          

          {/* Wealth Dashboard */}
          <div className="rounded-2xl p-6 mb-8 border shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                    Grundlage Ihrer Empfehlungen
                  </h2>
                  <div className="mt-1 flex flex-col gap-0.5">
                    <span className="text-xs text-gray-600">Portfolio: €{portfolioValue}M</span>
                    <span className="text-xs text-gray-600">Risiko: Ausgewogen</span>
                    <span className="text-xs text-gray-600">
                      Schwerpunkte: {userInterests.map(interest => interest.charAt(0) + interest.slice(1).toLowerCase()).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={refreshRecommendations}
                disabled={loading}
                className="border-2 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                style={{ borderColor: colors.secondary, color: colors.primary, backgroundColor: 'white' }}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: colors.primary }}></div>
                    Analysiere Märkte...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Empfehlungen aktualisieren
                  </>
                )}
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-32 mb-8">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: colors.primary }}></div>
                <p className="text-gray-500">Aura analysiert gerade für Sie aktuelle Marktdaten...</p>
              </div>
            </div>
          )}

          {/* Banking Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Persönliche Empfehlungen */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 pb-3" style={{ borderColor: `${colors.secondary}40` }}>
                <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                  <Shield className="w-6 h-6" style={{ color: colors.secondary }} />
                  Insights
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{personalizedInsights.length} Analysen</span>
                  <div className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: colors.secondary }}>
                    Live
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {personalizedInsights.map((insight) => (
                  <InsightCard 
                    key={insight.id} 
                    insight={insight}
                    bookmarks={bookmarks}
                    likes={likes}
                    toggleBookmark={toggleBookmark}
                    toggleLike={toggleLike}
                  />
                ))}
              </div>
            </div>

            {/* Market Intelligence */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 pb-3" style={{ borderColor: `${colors.secondary}40` }}>
                <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                  <Globe className="w-6 h-6" style={{ color: colors.secondary }} />
                  Marktanalysen
                </h2>
                <span className="text-sm text-gray-500">{themeSpecials.length} Berichte</span>
              </div>

              <div className="space-y-6">
                {themeSpecials.map((theme) => (
                  <InsightCard 
                    key={theme.id} 
                    insight={theme}
                    bookmarks={bookmarks}
                    likes={likes}
                    toggleBookmark={toggleBookmark}
                    toggleLike={toggleLike}
                  />
                ))}
              </div>
            </div>

            {/* Vertiefungen */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 pb-3" style={{ borderColor: `${colors.secondary}40` }}>
                <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                  <Crown className="w-6 h-6" style={{ color: colors.secondary }} />
                  Vertiefungen
                </h2>
                <span className="text-sm text-gray-500">{premiumAnalysis.length} Dokumente</span>
              </div>

              <div className="space-y-6">
                {premiumAnalysis.map((analysis) => (
                  <InsightCard 
                    key={analysis.id} 
                    insight={analysis} 
                    bookmarks={bookmarks}
                    likes={likes}
                    toggleBookmark={toggleBookmark}
                    toggleLike={toggleLike}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 bg-white rounded-2xl p-8 text-center shadow-sm border">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6" style={{ color: colors.secondary }} />
              <span className="text-xl font-bold" style={{ color: colors.primary }}>
                Was Ihnen wirklich weiterhilft
              </span>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Wir verbinden geprüfte Fachbeiträge mit KI-gestützter Auswertung. So
              finden Sie schnell die Inhalte, die zu Ihren Interessen und
              Entscheidungen passen.
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.secondary }} />
                <span>Verlässliche Quellen</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.secondary }} />
                <span>Neutrale Kuration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.secondary }} />
                <span>Aktuelle Analysen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
              Wählen Sie Ihre Insight-Präferenzen
            </h2>
            <p className="text-gray-600 mb-6">
              Erhalten Sie personalisierte Inhalte basierend auf Ihren Interessen und Zielen.
            </p>

            {/* Investment Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'wealth', label: 'Vermögensverwaltung', icon: Shield },
                { id: 'real-estate', label: 'Immobilien', icon: Globe },
                { id: 'sustainability', label: 'Nachhaltige Anlagen', icon: Award },
                { id: 'alternatives', label: 'Alternative Investments', icon: TrendingUp },
                { id: 'tax', label: 'Steueroptimierung', icon: Briefcase },
                { id: 'succession', label: 'Nachfolgeplanung', icon: Crown }
              ].map((category) => {
                const Icon = category.icon;
                const isSelected = userInterests.includes(category.id.toUpperCase());
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (isSelected) {
                        setUserInterests(prev => prev.filter(interest => interest !== category.id.toUpperCase()));
                      } else {
                        setUserInterests(prev => [...prev, category.id.toUpperCase()]);
                      }
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 hover:shadow-md ${
                      isSelected ? 'border-opacity-100 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={isSelected ? {
                      borderColor: colors.secondary,
                      backgroundColor: `${colors.background}`
                    } : {}}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? '' : 'text-gray-400'}`}
                          style={isSelected ? { color: colors.primary } : {}} />
                    <span className={`text-sm font-medium text-center ${isSelected ? '' : 'text-gray-600'}`}
                          style={isSelected ? { color: colors.primary } : {}}>
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Portfolio Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                Ihr Investmentvolumen
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '100k', label: '€100k - €500k' },
                  { value: '500k', label: '€500k - €2M' },
                  { value: '2m', label: '€2M - €10M' },
                  { value: '10m', label: '€10M+' }
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPortfolioValue(range.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      portfolioValue === range.value
                        ? 'border-2 shadow-sm'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    style={portfolioValue === range.value ? {
                      borderColor: colors.secondary,
                      backgroundColor: colors.background,
                      color: colors.primary
                    } : { color: '#6B7280' }}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Profile */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                Ihr Risikoprofil
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'conservative', label: 'Konservativ', desc: 'Kapitalerhalt steht im Vordergrund' },
                  { id: 'balanced', label: 'Ausgewogen', desc: 'Balance zwischen Sicherheit und Rendite' },
                  { id: 'growth', label: 'Wachstumsorientiert', desc: 'Höhere Renditen bei mehr Risiko' }
                ].map((profile) => (
                  <button
                    key={profile.id}
                    className={`p-4 rounded-lg border text-left transition-all hover:shadow-sm ${
                      profile.id === 'balanced'
                        ? 'border-2 shadow-sm'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    style={profile.id === 'balanced' ? {
                      borderColor: colors.secondary,
                      backgroundColor: colors.background
                    } : {}}
                  >
                    <div className={`font-medium mb-1 ${profile.id === 'balanced' ? '' : 'text-gray-700'}`}
                         style={profile.id === 'balanced' ? { color: colors.primary } : {}}>
                      {profile.label}
                    </div>
                    <div className="text-xs text-gray-500">{profile.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setShowInterestModal(false)}
                className="px-6 py-2"
                style={{ borderColor: colors.secondary, color: colors.primary }}
              >
                Abbrechen
              </Button>
              <Button
                onClick={() => {
                  // Save preferences logic
                  setShowInterestModal(false);
                  refreshRecommendations();
                }}
                className="px-6 py-2 font-semibold"
                style={{ backgroundColor: colors.primary, color: colors.accent }}
              >
                Präferenzen speichern
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BankingInsightsPlatform;
