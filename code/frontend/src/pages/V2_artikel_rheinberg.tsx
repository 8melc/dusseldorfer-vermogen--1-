import React, { useState, useEffect, useRef } from "react";
import { initWithArticleQuestion } from "components/ChatPanel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RelevantArticles from "components/RelevantArticles";
import { AudioPlayer } from "components/AudioPlayer";
import { useNavigate } from "react-router-dom";
import { useChatStore } from 'utils/chatStore';
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Bell,
  Headphones,
  Share2,
  BookmarkPlus,
  Play,
  PieChart,
  ArrowRight,
  TrendingUp,
  Building,
  Info,
  Star,
  Download,
  Clock,
  AlertCircle,
  User,
  Volume2,
  VolumeX,
  Pause
} from "lucide-react";

// Hauptbild für den Market Outlook Artikel
const marketOutlookImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

// Expertenbilder
const expertImages = {
  andreas:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80",
  maria:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80",
};

// Haupttrends für die Visualisierung
const keyTrends = [
  {
    id: 1,
    title: "Deutschland vs. Europa",
    description: "Wirtschaftswachstum im Vergleich",
    data: {
      usa: 1.5,
      europa: 2.4,
    },
    color: "#4299E1"
  },
  {
    id: 2,
    title: "EUR/USD",
    description: "Handelsspanne",
    data: {
      min: 1.10,
      max: 1.20,
      current: 1.13
    },
    color: "#48BB78"
  },
  {
    id: 3,
    title: "Zinssenkungen 2025",
    description: "Erwartungen",
    data: {
      usa: 2,
      europa: 3,
      punkteUSA: 100,
      punkteEuropa: 75
    },
    color: "#F6AD55"
  }
];

// Artikel-Inhalt mit Kernaussagen
const articleContent = {
  introduction:
    "Aus makroökonomischer Sicht verschieben sich in der Weltwirtschaft gerade die Machtverhältnisse. Die USA haben das Ruder nicht mehr allein in der Hand; jetzt sind Europa und Asien in einer Vorreiterrolle. Anlegerinnen und Anleger müssen nun ihr Währungsexposure aktiv verwalten und eine robuste strategische Vermögensallokation umsetzen, um für die erhöhte geopolitische Unsicherheit gewappnet zu sein.",

  keyPoints: [
    "Europa und Asien übernehmen die Vorreiterrolle im globalen Wirtschaftswachstum",
    "US-Politik führt zu Unsicherheit und gedämpftem Wirtschaftswachstum",
    "Expansive Geldpolitik in Europa mit drei Zinssenkungen in 2025 erwartet",
    "EUR/USD-Wechselkurs wird voraussichtlich im Bereich 1.10-1.20 bleiben",
    "Gold bleibt wichtiger Bestandteil der Portfolios für Stabilität"
  ],

  fullContent: [
    {
      title: "Die neue globale Wirtschaftsdynamik",
      text: "Die Weltwirtschaft bewegt sich in unbekannten Gewässern, aber eins ist sicher: Die USA haben das Ruder nicht mehr allein in der Hand. Ihre unberechenbare Politik mit einer Flut von Dekreten hat einen Dominoeffekt ausgelöst, der die globale Handels- und Fiskalpolitik prägt. Diese Unberechenbarkeit hat das kurzfristige Wirtschaftswachstum gedämpft. Wir sehen zwar ein erhöhtes Risiko einer Rezession am Horizont, möchten aber betonen, dass solche Abschwünge wohl nicht lange dauern, da die US-Wirtschaft unter keinen größeren inländischen Ungleichgewichten leidet. Die US-Notenbank dürfte wegen der inflationären Auswirkungen der Zölle nur langsam reagieren: Wir erwarten bis Ende Jahr zwei Zinssenkungen um je 50 Basispunkte (Bp). Die Unternehmen legen ihre Investitionen und Neueinstellungen vorläufig auf Eis, bis sich die Wogen geglättet haben, was den Wachstumsausblick der USA trübt.",
    },
    {
      title: "Im Welthandel werden neue Allianzen geschmiedet",
      text: "Während die USA in ihrem globalen Handelskrieg auf Konfrontationskurs bleiben, ist der Rest der Welt damit beschäftigt, neue Allianzen zu schmieden und bestehende zu stärken. Insbesondere Europa und Asien sind bestrebt, offene Handelsbeziehungen aufrechtzuerhalten und eine wachstumsfördernde Politik zu betreiben. Dieser Wandel führt zu einem faszinierenden Phänomen: Es entstehen bilaterale Handelsabkommen, welche die Vereinigten Staaten außen vor lassen, da sich diese Regionen von den unvorhersehbaren Launen der US-Politik abschirmen wollen – eine Entwicklung, die wir gerade live miterleben können.",
    },
    {
      title: "Europa und Asien reagieren mit Stimulusmaßnahmen auf die US-Zölle",
      text: "Unterdessen sind die europäischen Länder bereit, die öffentlichen Ausgaben zu erhöhen, nachdem sie in den letzten Jahren eine bemerkenswerte Haushaltsdisziplin bewiesen haben. Durch die Lockerung von Vorschriften und den Abbau von Bürokratie schaffen sie ein günstiges Umfeld, in dem die Unternehmen gedeihen können. In der zweiten Jahreshälfte 2025 erwarten wir eine Zunahme der Bestrebungen, die regulatorische Belastung zu verringern, die Staatsausgaben zu erhöhen und das Wachstum anzukurbeln, ohne dabei die Inflation anzuheizen. Wir gehen davon aus, dass Europa 2025 eine expansive Geldpolitik betreiben und die Europäische Zentralbank auf ihren nächsten drei Sitzungen die Zinssätze um jeweils 25 Bp senken wird – all das dürfte mit einer wachstumsfördernden Fiskalpolitik einhergehen, die wir ab 2026 erwarten."
    },
    {
      title: "Ein aktives Management des Währungsrisikos ist unerlässlich",
      text: "Die globalen Kapitalströme verlagern sich, da die Anlegerinnen und Anleger jetzt vermehrt außerhalb der USA nach Rendite suchen. Das hat erhebliche Auswirkungen auf den Devisenmarkt und hat viel mit dem Status des US-Dollars als sicherer Hafen zu tun, der seit dem «Liberation Day» infrage steht. Wenn sich die USA im Epizentrum einer Krise befinden, profitiert der US-Dollar nicht in der Anfangsphase der Risikoaversion, sondern erst dann, wenn sich die Rezessionsrisiken von den USA aus über den gesamten Globus ausbreiten. Wir gehen daher davon aus, dass sich der EUR/USD-Wechselkurs im unteren Bereich seiner Handelsspanne von 1.10 bis 1.20 bewegen wird, wobei erhebliche Abwärtsrisiken bestehen."
    },
    {
      title: "Hoffnung ist keine Strategie – eine solide strategische Vermögensallokation aber sehr wohl",
      text: "Das Jahr 2025 bleibt aus Anlegersicht anspruchsvoll. Die Geopolitik, die US-Politik und mögliche fiskalpolitische Fehler, insbesondere in den USA, bereiten weiterhin große Sorgen. Der geopolitische Wandel ist ein komplexer Prozess, der zu Volatilität führt. Umso wichtiger ist eine breit diversifizierte Anlagestrategie, die in stürmischen Zeiten für Stabilität sorgt. Hoffen Sie das Beste, aber bereiten Sie sich auf das Schlimmste vor. Die strategische Vermögensallokation sorgt weiterhin für Stabilität, wenn die Unsicherheit zunimmt. Gold ist nach wie vor ein fester Bestandteil jeder Vermögensallokation, da es bei wirtschaftlichen und geopolitischen Risiken Schutz und Diversifikationsvorteile bietet."
    }
  ],
};

// Balkendiagramm-Komponente für die Schlüsseltrends
const BarChart = ({ data, color }) => {
  return (
    <div className="w-full h-10 bg-gray-100 rounded-lg relative mt-1">
      <div 
        className="h-full rounded-lg transition-all duration-500 ease-in-out" 
        style={{ 
          width: `${(data.europa / 4) * 100}%`, 
          backgroundColor: color,
          maxWidth: '100%'
        }}
      >
        <span className="absolute right-2 text-xs font-semibold text-white top-1/2 transform -translate-y-1/2">
          {data.europa}%
        </span>
      </div>
      <div className="absolute left-2 text-xs font-semibold text-gray-600 top-1/2 transform -translate-y-1/2">
        Europa
      </div>
    </div>
  );
};

// Slider-Komponente für die Währungsspanne
const RangeSlider = ({ data, color }) => {
  return (
    <div className="relative w-full h-8 mt-2">
      <div className="w-full h-2 bg-gray-200 rounded-full absolute top-3">
        <div 
          className="h-full rounded-full" 
          style={{ 
            width: '100%', 
            backgroundColor: 'rgba(0,0,0,0.05)' 
          }}
        ></div>
      </div>
      <div 
        className="absolute h-4 w-4 rounded-full top-2" 
        style={{ 
          left: '0%', 
          backgroundColor: color,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute -bottom-6 left-0 text-xs">{data.min}</div>
      </div>
      <div 
        className="absolute h-4 w-4 rounded-full top-2" 
        style={{ 
          left: '100%', 
          backgroundColor: color,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute -bottom-6 right-0 text-xs">{data.max}</div>
      </div>
      <div 
        className="absolute h-6 w-6 rounded-full top-1 border-2 border-white shadow-md" 
        style={{ 
          left: `${((data.current - data.min) / (data.max - data.min)) * 100}%`, 
          backgroundColor: color,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute -bottom-6 left-0 transform -translate-x-1/4 text-xs font-bold">{data.current}</div>
      </div>
    </div>
  );
};

// Zinssenkungen-Visualisierung
const RateChart = ({ data, color }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">USA: {data.usa}x ({data.punkteUSA}Bp)</span>
        <span className="text-xs font-medium">Europa: {data.europa}x ({data.punkteEuropa}Bp)</span>
      </div>
      <div className="w-full h-8 flex items-center gap-1">
        <div className="h-8 rounded-l-lg" style={{ backgroundColor: color, width: '40%' }}>
          <div className="h-full flex items-center justify-center text-white text-xs">
            {data.usa}
          </div>
        </div>
        <div className="h-8 rounded-r-lg" style={{ backgroundColor: `${color}80`, width: '60%' }}>
          <div className="h-full flex items-center justify-center text-white text-xs">
            {data.europa}
          </div>
        </div>
      </div>
    </div>
  );
};

const Artikel_Rheinberg = () => {
  const { openChat, setPendingQuestion } = useChatStore();
  // Audiodatei-Definition
  const audioContent = {
    url: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/audio-content.mp3",
    type: "audio/mpeg",
    previewUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/audio-content.mp3"
  };

  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("male");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showInsightPanel, setShowInsightPanel] = useState(true);
  const [showPremiumBadge, setShowPremiumBadge] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showMainPlayer, setShowMainPlayer] = useState(false);
  
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [isMainPlaying, setIsMainPlaying] = useState(false);
  
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const togglePlayPreview = () => {
    if (mainAudioRef.current && isMainPlaying) {
      mainAudioRef.current.pause();
      setIsMainPlaying(false);
    }
    
    if (previewAudioRef.current) {
        if (isPreviewPlaying) {
            previewAudioRef.current.pause();
        } else {
            previewAudioRef.current.play();
        }
        setIsPreviewPlaying(!isPreviewPlaying);
    }
  };

  const handlePlayMainAudio = () => {
    if (previewAudioRef.current && isPreviewPlaying) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
    }
    
    if (mainAudioRef.current) {
        if (isMainPlaying) {
            mainAudioRef.current.pause();
        } else {
            mainAudioRef.current.play();
        }
        setIsMainPlaying(!isMainPlaying);
    }
  };

  const handlePreviewAudioEnded = () => {
    setIsPreviewPlaying(false);
  };

  const handleMainAudioEnded = () => {
    setIsMainPlaying(false);
    setAudioProgress(0);
  };

  const handleMainAudioTimeUpdate = () => {
    if (mainAudioRef.current) {
      const progress = (mainAudioRef.current.currentTime / mainAudioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const handleMainAudioLoadedMetadata = () => {
    if (mainAudioRef.current) {
      setAudioDuration(mainAudioRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinanzkompassClick = (question) => {
    setPendingQuestion(question);
    openChat({ view: "finanzKompass" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPremiumBadge(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <audio
        ref={previewAudioRef}
        src={audioContent.previewUrl}
        onEnded={handlePreviewAudioEnded}
        preload="metadata"
      />
      
      <audio
        ref={mainAudioRef}
        src={audioContent.url}
        onTimeUpdate={handleMainAudioTimeUpdate}
        onLoadedMetadata={handleMainAudioLoadedMetadata}
        onEnded={handleMainAudioEnded}
        preload="metadata"
      />
      
      {showPremiumBadge && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#C8A96F] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
          <Star className="h-5 w-5" />
          <span className="font-medium">NEU: Smart Digest-Funktion entdecken!</span>
          <button
            onClick={() => setShowPremiumBadge(false)}
            className="ml-2 text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 relative">
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={marketOutlookImage}
                alt="Market Outlook 2025: Europa und Asien im Fokus"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

              <div className="absolute top-4 right-4 bg-[#C8A96F] px-4 py-2 rounded-md flex items-center shadow-md border border-[#C8A96F]/50 text-white animate-pulse">
                <Headphones className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">
                  Bald als Podcast verfügbar
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              {showMainPlayer && (
                <div className="bg-[#C8A96F]/10 rounded-lg p-4 mb-6 border border-[#C8A96F]/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                      <Headphones className="w-5 h-5 mr-2 text-[#C8A96F]" />
                      Express-Finanzwissen zum Hören 
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatTime(audioDuration)}</span>
                    </div>
                  </div>
            
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlayMainAudio}
                      className="bg-[#C8A96F] text-white rounded-full p-3 hover:bg-[#B69960] transition-colors"
                    >
                      {isMainPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>
            
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#C8A96F] h-2 rounded-full transition-all duration-100"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{formatTime((audioProgress / 100) * audioDuration)}</span>
                        <span>{formatTime(audioDuration)}</span>
                      </div>
                    </div>

                    <button className="text-[#C8A96F] hover:text-[#B69960]">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <img
                    src="/images/banks/rheinberg-logo-dark.svg"
                    alt="Rheinberg Privatbank Logo"
                    className="w-6 h-6 mr-2"
                  />
                  <span className="text-xs font-semibold text-[#333333]">
                    Rheinberg Privatbank
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    18. Juni 2025
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    4 Min. Lesezeit
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                Market Outlook zur Jahresmitte 2025: Wachstumsgelegenheiten in
                Europa und Asien im Fokus
              </h1>

              <div className="flex flex-wrap justify-center gap-3 mb-6 border-b border-gray-100 pb-4 opacity-60 cursor-not-allowed">
                <button className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 transition-all">
                  <BookmarkPlus className="h-4 w-4 text-[#C8A96F]" />
                  <span>Für später speichern</span>
                </button>
                <button className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 transition-all">
                  <BookmarkPlus className="h-4 w-4 text-[#C8A96F]" />
                  <span>Zum Portfolio hinzufügen</span>
                </button>
                <button className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 transition-all">
                  <BookmarkPlus className="h-4 w-4 text-[#C8A96F]" />
                  <span>Mit Berater teilen</span>
                </button>
                <button className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 transition-all">
                  <BookmarkPlus className="h-4 w-4 text-[#C8A96F]" />
                  <span>Als PDF herunterladen</span>
                </button>
              </div>

              <div className="flex items-center mb-6 bg-[#C8A96F]/5 p-3 rounded-lg border border-[#C8A96F]/20 group hover:bg-[#C8A96F]/10 transition-colors duration-200">
                <Avatar className="h-12 w-12 mr-3 ring-2 ring-[#C8A96F] ring-opacity-50">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&q=80"
                    alt="Fabian Reuther"
                  />
                  <AvatarFallback>FR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Fabian Reuther
                    </span>
                    <div className="ml-2 px-2 py-0.5 bg-[#C8A96F] text-white text-xs rounded-full flex items-center">
                      <span>Autor</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Head of Research, Rheinberg Privatbank
                  </p>
                  <div className="hidden group-hover:block text-xs text-gray-500 mt-1">
                    <span>
                      Experte für globale Wirtschaftstrends
                    </span>
                  </div>
                </div>
                <button className="text-[#C8A96F] hover:text-[#B69960] font-medium text-sm cursor-not-allowed">
                  Folgen
                </button>
              </div>

              <p className="text-gray-600 mb-4">{articleContent.introduction}</p>

              <div className="bg-[#C8A96F]/10 p-5 rounded-lg border border-[#C8A96F]/20 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center border-b border-[#C8A96F]/30 pb-2">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#C8A96F]" />
                  SCHLÜSSELTRENDS AUF EINEN BLICK
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-700">{keyTrends[0].title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{keyTrends[0].description}</p>
                    <BarChart data={keyTrends[0].data} color={keyTrends[0].color} />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-700">{keyTrends[1].title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{keyTrends[1].description}</p>
                    <RangeSlider data={keyTrends[1].data} color={keyTrends[1].color} />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-700">{keyTrends[2].title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{keyTrends[2].description}</p>
                    <RateChart data={keyTrends[2].data} color={keyTrends[2].color} />
                  </div>
                </div>
              </div>

              <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-[#C8A96F]-200 flex items-start">
                <AlertCircle className="w-5 h-5 text-[#C8A96F]-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700 font-semibold">Wichtig für Ihr Portfolio</p>
                  <p className="text-gray-700 font-medium">Die Verlagerung der Wachstumsdynamik von den USA nach Europa und Asien erfordert eine Anpassung Ihrer Anlagestrategie. Erfahren Sie mehr in der ausführlichen Analyse.</p>
                </div>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  showFullContent
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                {articleContent.fullContent.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600">{section.text}</p>

                    {index === 0 && (
                      <div className="mt-4 mb-6 bg-[#C8A96F]/10 p-3 rounded-lg border border-[#C8A96F]/30 text-sm">
                        <p className="text-gray-700 font-medium">
                          Wie wirkt sich diese Dynamik auf Ihr Portfolio aus?
                        </p>
                        <button 
                          onClick={() => initWithArticleQuestion(
                            "Wie beeinflusst die Neuausrichtung der globalen Lieferketten mein Portfolio?",
                          )
                        }
                          className="mt-2 bg-[#C8A96F] text-white px-3 py-1.5 rounded-md hover:bg-[#B69960] transition-colors inline-flex items-center"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span>Im Finanzkompass nachfragen</span>
                        </button>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="mt-4 mb-6 bg-[#C8A96F]/10 p-3 rounded-lg border border-[#C8A96F]/60 text-sm">
                        <p className="text-gray-700 font-medium">
                          Welche Anlagechancen ergeben sich aus den neuen Handelsallianzen zwischen Europa und Asien?
                        </p>
                        <button className="mt-2 bg-[#C8A96F] text-white px-3 py-1.5 rounded-md hover:bg-[#B69960] transition-colors inline-flex items-center cursor-not-allowed">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span>Im Finanzkompass nachfragen</span>
                        </button>
                      </div>
                    )}

                    {index === articleContent.fullContent.length - 1 && (
                      <div className="mt-6 mb-8 bg-[#C8A96F]/10 p-4 rounded-lg border border-[#C8A96F]/30 text-sm">
                        <p className="text-gray-700 font-semibold">
                          Haben Sie Fragen zur Ausrichtung Ihres Portfolios für die zweite Jahreshälfte 2025?
                        </p>
                        <p className="text-gray-600 mt-1">
                          Unser Finanzkompass bietet Ihnen personalisierte Antworten zu Ihrer individuellen Anlagestrategie.
                        </p>
                        <button className="mt-2 bg-[#C8A96F] text-white px-4 py-2 rounded-md hover:bg-[#B69960] transition-colors inline-flex items-center cursor-not-allowed">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span>Finanzkompass starten</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!showFullContent && (
                <div className="relative">
                  <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              )}

              <div className="text-center mt-4 mb-8">
                <button
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="inline-flex items-center px-6 py-3 border-2 border-[#C8A96F] rounded-md text-sm font-bold text-[#C8A96F] bg-white hover:bg-[#C8A96F]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A96F] transition-all duration-200"
                >
                  {showFullContent ? (
                    <>
                      <span>WENIGER ANZEIGEN</span>
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>AUSFÜHRLICHE ANALYSE LESEN</span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div
                className="mb-8 bg-[#C8A96F]/10 p-5 rounded-lg border-2 border-[#C8A96F]/30 shadow-md cursor-pointer"
                onClick={() => navigate("/RheinbergPrivatbankUserPage")}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#C8A96F] p-3 rounded-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">Über unseren Corporate Partner</h4>
                    <p className="text-sm text-gray-600 mt-1">Möchten Sie mehr über Rheinberg Privatbank erfahren? Dann klicken Sie hier und gelangen direkt zum Unternehmensprofil.</p>
                  </div>
                  <div className="bg-[#C8A96F] hover:bg-[#B69960] transition-colors p-3 rounded-full cursor-pointer">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <Button className="w-full flex items-center justify-center py-4 bg-[#C8A96F] hover:bg-[#B69960] text-white transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-bold rounded-lg">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  <span>
                    Haben Sie Fragen zu diesem Thema? Nutzen Sie unseren
                    Finanzkompass
                  </span>
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-[#C8A96F]" />
                  Unsere Experten zu diesem Thema
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center bg-[#C8A96F]/5 p-4 rounded-lg hover:shadow-md hover:bg-[#C8A96F]/10 transition-all duration-200 border border-[#C8A96F]/20">
                    <Avatar className="w-16 h-16 mr-4 ring-2 ring-[#C8A96F]/50 shadow-md">
                      <AvatarImage
                        src={expertImages.andreas}
                        alt="Dr. Andreas Schmidt"
                      />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-gray-900">
                          Dr. Andreas Schmidt
                        </h4>
                        <div className="ml-2 px-1.5 py-0.5 bg-[#C8A96F]/20 rounded text-xs text-[#C8A96F] font-medium">
                          TOP-EXPERTE
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Leiter Research Europa
                      </p>
                      <button className="mt-2 text-xs text-[#C8A96F] font-medium hover:text-[#B69960] transition-colors flex items-center">
                        <span>Experten folgen</span>
                        <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#C8A96F]/5 p-4 rounded-lg hover:shadow-md hover:bg-[#C8A96F]/10 transition-all duration-200 border border-[#C8A96F]/20">
                    <Avatar className="w-16 h-16 mr-4 ring-2 ring-[#C8A96F]/50 shadow-md">
                      <AvatarImage
                        src={expertImages.maria}
                        alt="Maria Chen"
                      />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-gray-900">Maria Chen</h4>
                        <div className="ml-2 px-1.5 py-0.5 bg-[#C8A96F]/20 rounded text-xs text-[#C8A96F] font-medium">
                          TOP-EXPERTIN
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Senior Portfoliomanagerin Asien
                      </p>
                      <button className="mt-2 text-xs text-[#C8A96F] font-medium hover:text-[#B69960] transition-colors flex items-center">
                        <span>Expertin folgen</span>
                        <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/4 transition-all duration-300 ${
            showInsightPanel ? "block" : "hidden lg:block"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-[#C8A96F] mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Headphones className="w-5 h-5 mr-2 text-[#C8A96F]" />
                Finanzwissen zum Hören
              </h3>
              <div className="bg-[#C8A96F]/20 text-[#C8A96F] px-2 py-0.5 rounded text-xs font-bold">
                NEU
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-medium mb-2">
                Wählen Sie Ihr bevorzugtes Format:
              </p>

              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center justify-between p-3 bg-[#C8A96F]/10 rounded-lg border border-[#C8A96F]/20 hover:bg-[#C8A96F]/20 transition-all duration-200 cursor-not-allowed">
                  <div className="flex items-center">
                    <div className="bg-[#C8A96F] rounded-full p-1.5 mr-2 text-white">
                      <div className="w-4 h-4 flex items-center justify-center">
                        ⚡
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-800">
                        Express
                      </span>
                      <p className="text-xs flex items-center justify-center text-gray-500">
                        Zusammenfassung
                      </p>
                    </div>
                  </div>
                  <Play className="h-4 w-4 text-[#C8A96F] cursor-not-allowed" />
                </button>

                <button className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed">
                  <div className="flex items-center">
                    <div className="bg-gray-300 rounded-full p-1.5 mr-2 text-white">
                      <div className="w-4 h-4 flex items-center justify-center">
                        🎧
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Volle Länge
                      </span>
                      <p className="text-xs text-gray-500">3-5 Min. Artikel</p>
                    </div>
                  </div>
                  <Bell className="h-4 w-4 text-gray-400" />
                </button>

                <button className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed">
                  <div className="flex items-center">
                    <div className="bg-gray-300 rounded-full p-1.5 mr-2 text-white">
                      <div className="w-4 h-4 flex items-center justify-center">
                        🎙️
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Podcast
                      </span>
                      <p className="text-xs text-gray-500">
                        15+ Min. Expertenanalyse
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Wählen Sie eine Stimme:
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 bg-[#C8A96F] text-white rounded-md flex items-center justify-center"
                    onClick={() => setSelectedVoice("male")}
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    <span className="text-xs font-medium">Doreen</span>
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors cursor-not-allowed"
                    onClick={() => setSelectedVoice("female")}
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    <span className="text-xs font-medium">Gregor</span>
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Hören Sie sich eine KI-gestützte Zusammenfassung in Ihrer
                bevorzugten Sprache an.
              </p>
              <button
                onClick={() => {
                  setShowMainPlayer(true);
                  setTimeout(() => {
                    if (mainAudioRef.current) {
                      mainAudioRef.current.play();
                      setIsMainPlaying(true);
                    }
                  }, 100);
                }}
                className="w-full mt-4 bg-[#C8A96F] text-white py-2 rounded-md hover:bg-[#B69960] transition-colors text-sm font-medium flex items-center justify-center"
              >
                <Headphones className="w-4 h-4 mr-1" />
                <span>Jetzt anhören</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-[#C8A96F]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Info className="w-5 h-5 mr-2 text-[#C8A96F]" />
                Finanzwissen auf einen Blick
              </h3>
              <button
                onClick={() => setShowInsightPanel(!showInsightPanel)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 italic border-l-2 border-[#C8A96F] pl-3 py-1 font-medium">
                Die wichtigsten Erkenntnisse auf einen Blick
              </p>
              <ul className="space-y-3">
                {articleContent.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 bg-[#C8A96F]/5 p-2 rounded-md border border-[#C8A96F]/10"
                  >
                    <div className="bg-[#C8A96F] rounded-full p-1 mt-0.5 flex-shrink-0">
                      <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-2 uppercase">
                  Verwandte Themen
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
                    Portfoliostrategie
                  </span>
                  <span className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
                    Währungsabsicherung
                  </span>
                  <span className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
                    Globale Märkte
                  </span>
                  <span className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
                    Zinspolitik
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-[#C8A96F] text-white py-2 rounded-md hover:bg-[#B69960] transition-colors text-sm font-medium flex items-center justify-center">
                  <Download className="w-4 h-4 mr-1" />
                  <span>Als PDF herunterladen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isScrolled && !showInsightPanel && (
          <div className="fixed bottom-20 right-6 z-50 lg:hidden">
            <button
              className="bg-white text-[#C8A96F] p-3 rounded-full shadow-lg border-2 border-[#C8A96F] hover:bg-[#C8A96F] hover:text-white transition-colors duration-200 flex items-center animate-pulse"
              title="Smart Digest öffnen"
            >
              <Info className="h-6 w-6" />
            </button>
          </div>
        )}

        {isScrolled && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              className="bg-[#C8A96F] text-white p-4 rounded-full shadow-lg hover:bg-[#B69960] transition-colors duration-200 flex items-center animate-pulse"
              title="Finanzkompass öffnen"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artikel_Rheinberg;
