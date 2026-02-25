import React, { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import brain from "brain";
import { EnhancedFilters } from "components/EnhancedFilters";
import { PremiumAdvisorCard } from "components/PremiumAdvisorCard";
import { ContactRequestModal } from "components/ContactRequestModal";
import { Advisor } from "types";

export const TrustedAdvisorsPage = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [auraProcessing, setAuraProcessing] = useState(false);
  const [auraMessage, setAuraMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedBankFromUrl = queryParams.get("bank");

  const [activeFilters, setActiveFilters] = useState({
    bank: selectedBankFromUrl || "",
    expertise: "",
    location: "Köln",
    esg: false,
    gender: "",
    seniority: "",
    focusArea: "",
    language: "",
    certification: "",
    clientTarget: ""
  });

  const [showManualFilters, setShowManualFilters] = useState(false);

  const colors = {
    primary: "hsl(224, 71%, 21%)",
    secondary: "hsl(41, 45%, 63%)",
    background: "hsl(38, 29%, 95%)",
    accent: "hsl(41, 45%, 90%)"
  };

  useEffect(() => {
    const fetchAdvisors = async () => {
      setIsLoading(true);
      try {
        const response = await brain.get_advisors();
        if (response.ok) {
          let data: Advisor[] = await response.json();
          if (selectedBankFromUrl) {
            data = data.filter((a) => a.bank === selectedBankFromUrl);
          }
          setAdvisors(data);
        } else {
          setError("Profile konnten nicht geladen werden.");
          console.error("Failed to fetch advisors:", response.statusText);
        }
      } catch (err) {
        setError("Profile konnten nicht geladen werden.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvisors();
  }, [selectedBankFromUrl]);

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  const handleContactRequest = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  const handleSaveInterest = (advisor: Advisor) => {
    console.log(`Interesse an ${advisor.name} gespeichert.`);
    alert(`Ihr Interesse an ${advisor.name} wurde gespeichert!`);
  };

  const handleModalSubmit = (data: any) => {
    console.log("Kontaktanfrage gesendet:", data);
    setIsModalOpen(false);
    alert("Ihre Rückrufbitte wurde erfolgreich versendet.");
  };

  const analyzeUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    const newFilters = { ...activeFilters };
    const detectedFeatures = new Set<string>();

    newFilters.expertise = "";
    newFilters.bank = "";
    newFilters.clientTarget = "";
    newFilters.language = "";
    newFilters.seniority = "";
    newFilters.esg = false;

    const keywordMappings: Record<string, () => void> = {
      "erbe|erbschaft|nachlass|vererbung": () => {
        newFilters.expertise = "Vermögensnachfolge & Generationenplanung";
        detectedFeatures.add("Vermögensnachfolge");
      },
      "nachhaltig|esg|grün|ethisch|verantwortung|sustainable|green|sdg": () => {
        newFilters.esg = true;
        detectedFeatures.add("ESG/Nachhaltigkeit");
      },
      "vermögensnachfolge|generationenplanung|nachfolge": () => {
        newFilters.expertise = "Vermögensnachfolge & Generationenplanung";
        detectedFeatures.add("Vermögensnachfolge");
      },
      "internationale.?vermögen|cross.?border|offshore": () => {
        newFilters.expertise = "Internationale Vermögensstrukturierung";
        detectedFeatures.add("Internationales Vermögen");
      },
      "family.?office": () => {
        newFilters.expertise = "Family Office Services";
        detectedFeatures.add("Family Office");
      },
      "impact|nachhaltige anlagen": () => {
        newFilters.expertise = "Impact Investing";
        detectedFeatures.add("Impact Investing");
      },
      "portfolio|vermögensverwaltung": () => {
        newFilters.expertise = "Portfoliomanagement";
        detectedFeatures.add("Portfoliomanagement");
      },
      "stiftung|philanthrop": () => {
        newFilters.expertise = "Philanthropie";
        detectedFeatures.add("Philanthropie");
      },
      "kunst|collectibles": () => {
        newFilters.expertise = "Alternative Anlagen";
        detectedFeatures.add("Alternative Anlagen");
      },
      "unternehmer|entrepreneur|firma": () => {
        newFilters.clientTarget = "Unternehmer";
        detectedFeatures.add("Unternehmer");
      },
      "familie|family": () => {
        newFilters.clientTarget = "Family Offices";
        detectedFeatures.add("Family Offices");
      },
      "englisch|english": () => {
        newFilters.language = "Englisch";
        detectedFeatures.add("Englischsprachig");
      },
      "französisch|french": () => {
        newFilters.language = "Französisch";
        detectedFeatures.add("Französischsprachig");
      },
      "erfahren|senior|executive": () => {
        newFilters.seniority = "senior";
        detectedFeatures.add("Senior Level");
      },
      "rheinberg|premiumbank": () => {
        newFilters.bank = "Rheinberg Privatbank";
        detectedFeatures.add("Rheinberg Privatbank");
      },
      "lindenhof": () => {
        newFilters.bank = "Lindenhof Finanzhaus";
        detectedFeatures.add("Lindenhof Finanzhaus");
      },
      "aurora": () => {
        newFilters.bank = "Aurora Handelsbank";
        detectedFeatures.add("Aurora Handelsbank");
      },
      "triversa": () => {
        newFilters.bank = "Triversa Private Clients";
        detectedFeatures.add("Triversa Private Clients");
      },
      "novaris": () => {
        newFilters.bank = "Novaris Capital";
        detectedFeatures.add("Novaris Capital");
      },
      "helvetia": () => {
        newFilters.bank = "Helvetia Struktur AG";
        detectedFeatures.add("Helvetia Struktur AG");
      },
      "nordquell": () => {
        newFilters.bank = "Nordquell Vermögen";
        detectedFeatures.add("Nordquell Vermögen");
      },
      "meridian": () => {
        newFilters.bank = "Meridian Global Advisory";
        detectedFeatures.add("Meridian Global Advisory");
      },
      "altmuehl|altmühl": () => {
        newFilters.bank = "Altmuehl & Partner";
        detectedFeatures.add("Altmuehl & Partner");
      },
      "eichenstein": () => {
        newFilters.bank = "Eichenstein Conseil";
        detectedFeatures.add("Eichenstein Conseil");
      },
      "velorum": () => {
        newFilters.bank = "Velorum Aachen";
        detectedFeatures.add("Velorum Aachen");
      },
      "rheinwest": () => {
        newFilters.bank = "RheinWest Privatbank";
        detectedFeatures.add("RheinWest Privatbank");
      },
      "nordrhein|trust": () => {
        newFilters.bank = "Nordrhein Trust Bank";
        detectedFeatures.add("Nordrhein Trust Bank");
      },
      "hanse.?rhein": () => {
        newFilters.bank = "Privatbankhaus Hanse-Rhein";
        detectedFeatures.add("Privatbankhaus Hanse-Rhein");
      }
    };

    Object.entries(keywordMappings).forEach(([pattern, action]) => {
      const regex = new RegExp(pattern, "i");
      if (regex.test(lowerInput)) {
        action();
      }
    });

    return { filters: newFilters, features: Array.from(detectedFeatures) };
  };

  const processAuraInput = (input: string) => {
    setAuraProcessing(true);

    setTimeout(() => {
      const result = analyzeUserInput(input);
      setActiveFilters(result.filters);

      const matchingAdvisors = advisors.filter((advisor) => {
        const filters = result.filters;
        if (filters.bank && advisor.bank !== filters.bank) return false;
        if (filters.expertise && !advisor.focusAreas?.includes(filters.expertise)) return false;
        if (filters.esg && !advisor.tags?.includes("ESG")) return false;
        if (filters.language && !advisor.languages?.includes(filters.language)) return false;
        if (filters.seniority && advisor.seniority !== filters.seniority) return false;
        if (filters.clientTarget && !advisor.clientTargets?.includes(filters.clientTarget)) return false;
        return true;
      });

      let message = "";
      if (result.features.length > 0) {
        message = `Perfekt, ich habe ${result.features.length} relevante Kriterien identifiziert: ${result.features.join(", ")}. Ich habe ${matchingAdvisors.length} passende Berater gefunden.`;
      } else {
        message = `Ihre Anfrage wird analysiert. Bitte geben Sie mir mehr Details zu Ihren Bedürfnissen. Aktuell zeige ich Ihnen ${matchingAdvisors.length} Berater.`;
      }

      setAuraMessage(message);
      setAuraProcessing(false);

      setTimeout(() => {
        setAuraMessage("");
      }, 5000);
    }, 800);
  };

  const filteredAdvisors = useMemo(() => {
    return advisors.filter((advisor) => {
      const {
        bank,
        expertise,
        esg,
        gender,
        seniority,
        focusArea,
        language,
        certification,
        clientTarget
      } = activeFilters;

      if (bank && advisor.bank !== bank) return false;
      if (expertise && !advisor.focusAreas?.includes(expertise)) return false;
      if (esg && !advisor.tags?.includes("ESG")) return false;
      if (gender && advisor.gender !== gender) return false;
      if (seniority && advisor.seniority !== seniority) return false;
      if (focusArea && !advisor.focusAreas?.includes(focusArea)) return false;
      if (language && !advisor.languages?.includes(language)) return false;
      if (certification && !advisor.certifications?.includes(certification)) return false;
      if (clientTarget && !advisor.clientTargets?.includes(clientTarget)) return false;

      return true;
    });
  }, [advisors, activeFilters]);

  const filterOptions = useMemo(() => {
    const banks = [...new Set(advisors.map((a) => a.bank))];
    const expertises = [...new Set(advisors.flatMap((a) => a.focusAreas || []))];
    const locations = ["Köln"];
    const languages = [...new Set(advisors.flatMap((a) => a.languages || []))];
    const genders = [...new Set(advisors.map((a) => a.gender).filter(Boolean))];
    const seniorities = [...new Set(advisors.map((a) => a.seniority).filter(Boolean))];
    const focusAreas = expertises;
    const certifications = [...new Set(advisors.flatMap((a) => a.certifications || []))];
    const clientTargets = [...new Set(advisors.flatMap((a) => a.clientTargets || []))];

    return {
      banks,
      expertises,
      locations,
      languages,
      genders,
      seniorities,
      focusAreas,
      certifications,
      clientTargets
    };
  }, [advisors]);

  const pageTitle =
    activeFilters.bank === "Rheinberg Privatbank" || selectedBankFromUrl === "Rheinberg Privatbank"
      ? "Rheinberg Privatbank Ansprechpartner in Köln"
      : "Ihre Finanzexperten in Köln";

  const pageSubtitle =
    activeFilters.bank || selectedBankFromUrl
      ? `${activeFilters.bank || selectedBankFromUrl} - Standort Köln`
      : "Willkommen im Kölner WerteNetzwerk.";

  const isRheinbergSelected = (activeFilters.bank || selectedBankFromUrl || "")
    .toLowerCase()
    .includes("rheinberg");

  const [teaserDismissed, setTeaserDismissed] = useState<boolean>(() => {
    return sessionStorage.getItem("rb-teaser-dismissed") === "1";
  });

  const showTeaser = isRheinbergSelected && !teaserDismissed;

  const dismissTeaser = () => {
    setTeaserDismissed(true);
    sessionStorage.setItem("rb-teaser-dismissed", "1");
  };

  const stats = [
    { label: "Experten vor Ort", value: filteredAdvisors.length },
    { label: "Banken vertreten", value: [...new Set(advisors.map((a) => a.bank))].length },
    { label: "Fachgebiete", value: 8 },
    { label: "Sprachen", value: 6 }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <header className="relative overflow-hidden" style={{ backgroundColor: colors.background }}>
        <div className="absolute inset-0">
          <img
            src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/features_berater_beratungsszene.jpg"
            alt="Kölner Finanzszene – Auswahl an Ansprechpartnern"
            className="w-full h-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 0%, transparent 60%, ${colors.background} 100%)`
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{ color: colors.primary }}
            >
              Werte verbinden Menschen, Kapital und Perspektiven.
              <br />
            </h1>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
              style={{ color: colors.primary, opacity: 0.8 }}
            >
              {pageSubtitle}
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <div
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                style={{ borderColor: `${colors.secondary}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  >
                    <span className="text-white font-serif text-lg"></span>
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: colors.primary }}>
                      Ihr KI-Finanzkompass
                    </div>
                    <div className="text-xs" style={{ color: `${colors.primary}60` }}>
                      Sie suchen einen Experten? Erklären Sie mir kurz, worum es geht.
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    placeholder="Beschreiben Sie Ihre Situation: z.B. 'Ich benötige Hilfe bei der nachhaltigen Vermögensstrukturierung mit internationalem Fokus und Stiftungsplanung'"
                    className="w-full px-4 py-3 pr-12 rounded-lg border bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none"
                    rows={3}
                    style={{ borderColor: `${colors.secondary}30`, focusRingColor: colors.secondary }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        const input = e.currentTarget.value;
                        if (input.trim()) {
                          processAuraInput(input);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />

                  <button
                    className="absolute right-3 bottom-3 p-2 rounded-lg hover:bg-gray-100 transition-all group"
                    onClick={(e) => {
                      const textarea = e.currentTarget.parentElement?.querySelector("textarea");
                      if (textarea && textarea.value.trim()) {
                        processAuraInput(textarea.value);
                        textarea.value = "";
                      }
                    }}
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      style={{ color: colors.secondary }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                </div>

                {auraProcessing && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: colors.secondary, animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: colors.secondary, animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: colors.secondary, animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span className="text-sm" style={{ color: colors.primary }}>
                      Ich analysiere Ihre Anfrage...
                    </span>
                  </div>
                )}

                {auraMessage && !auraProcessing && (
                  <div
                    className="mt-3 p-3 rounded-lg animate-fadeIn"
                    style={{ backgroundColor: `${colors.accent}50`, borderLeft: `3px solid ${colors.secondary}` }}
                  >
                    <p className="text-sm" style={{ color: colors.primary }}>
                      {auraMessage}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs" style={{ color: `${colors.primary}60` }}>
                    Häufige Anfragen:
                  </span>
                  {[
                    "Nachhaltige Investments",
                    "Family Office",
                    "Internationale Vermögen",
                    "Rheinberg Privatbank Insights",
                    "Stiftungsberatung"
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => processAuraInput(suggestion)}
                      className="px-3 py-1 rounded-full text-xs border transition-all hover:shadow-md"
                      style={{ borderColor: `${colors.secondary}30`, backgroundColor: "white", color: colors.primary }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.accent}`;
                        e.currentTarget.style.borderColor = colors.secondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.borderColor = `${colors.secondary}30`;
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: `${colors.secondary}20` }}>
                  <button
                    onClick={() => setShowManualFilters(!showManualFilters)}
                    className="flex items center gap-2 text-sm font-medium transition-colors"
                    style={{ color: colors.primary }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.secondary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.primary)}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${showManualFilters ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Filter manuell anpassen
                  </button>
                </div>
              </div>

              {showManualFilters && (
                <div
                  className="mt-4 p-4 bg-white/80 rounded-xl border animate-fadeIn"
                  style={{ borderColor: `${colors.secondary}20` }}
                >
                  <EnhancedFilters
                    {...filterOptions}
                    onFilterChange={handleFilterChange}
                    activeFilters={activeFilters}
                    selectedBank={selectedBankFromUrl}
                    compact={true}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ borderColor: `${colors.secondary}30` }}
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12">
            <path
              fill={colors.background}
              d="M0,30 C240,45 480,15 720,25 C960,35 1200,45 1440,30 L1440,60 L0,60 Z"
            />
          </svg>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
              style={{ borderColor: colors.secondary }}
            ></div>
            <p className="text-gray-600">Lade Kölner Profile...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <main>
            {filteredAdvisors.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <p className="text-gray-600 font-medium">
                      {filteredAdvisors.length} {filteredAdvisors.length === 1 ? "Profil" : "Profile"} gefunden
                    </p>
                    {auraMessage && (
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium animate-pulse"
                        style={{ backgroundColor: `${colors.secondary}20`, color: colors.primary }}
                      >
                        KI-optimiert
                      </div>
                    )}
                  </div>

                  <select
                    className="px-4 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: `${colors.secondary}30` }}
                  >
                    <option>Relevanz</option>
                    <option>Name (A-Z)</option>
                    <option>Erfahrung</option>
                    <option>Bewertung</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAdvisors.map((advisor, index) => (
                    <div
                      key={advisor.id}
                      className="transform transition-all duration-300 hover:scale-102"
                      style={{ animationDelay: `${index * 50}ms`, animation: "fadeInUp 0.5s ease-out forwards" }}
                    >
                      <PremiumAdvisorCard
                        advisor={advisor}
                        onContactRequest={() => handleContactRequest(advisor)}
                        onSaveInterest={() => handleSaveInterest(advisor)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                  Keine Profile gefunden
                </h3>
                <p className="text-gray-600 mb-6">Passen Sie Ihre Filterkriterien an, um mehr Ergebnisse zu sehen.</p>
                <button
                  onClick={() =>
                    setActiveFilters({
                      bank: "",
                      expertise: "",
                      location: "Köln",
                      esg: false,
                      gender: "",
                      seniority: "",
                      focusArea: "",
                      language: "",
                      certification: "",
                      clientTarget: ""
                    })
                  }
                  className="px-6 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
                  style={{ backgroundColor: colors.secondary, color: "white" }}
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </main>
        )}
      </div>

      {isModalOpen && selectedAdvisor && (
        <ContactRequestModal
          advisor={selectedAdvisor}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}

      {showTeaser && (
        <div className="hidden md:block fixed right-6" style={{ bottom: 96, zIndex: 1201 }}>
          <div
            className="w-[320px] rounded-xl shadow-2xl overflow-hidden border bg-white animate-slideIn"
            style={{ borderColor: `${colors.secondary}33` }}
          >
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              <div className="font-semibold text-sm text-white">Corporate-Profil</div>
              <button onClick={dismissTeaser} className="text-white opacity-90 hover:opacity-100 transition-opacity">
                ✕
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4">
                Sie möchten mehr über <strong>Rheinberg Privatbank</strong> erfahren? Erhalten Sie alle Neuigkeiten über
                Publikationen & KPI&apos;s und lernen Sie Ihre persönlichen Ansprechpartner kennen.
              </p>
              <Link
                to="/rheinberg-privatbank-corporate-page"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: "white" }}
              >
                Zum Corporate-Profil →
              </Link>
              <button
                onClick={dismissTeaser}
                className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Nicht mehr anzeigen
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TrustedAdvisorsPage;
