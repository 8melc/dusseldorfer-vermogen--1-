import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import brain from "brain";
import { Advisor } from "brain/data-contracts";
import { ContactRequestModal } from "components/ContactRequestModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  CheckCircle2,
  Compass,
  Landmark,
  Layers,
  Lightbulb,
  Loader2,
  MapPin,
  Network,
  Sparkles,
  Users,
} from "lucide-react";

const palette = {
  night: "#0B0E28",
  gold: "#C8A96F",
  sand: "#F5F1EB",
  slate: "#4E4C58",
  fog: "rgba(200, 169, 111, 0.12)",
};

const heroBackground =
  "https://images.unsplash.com/photo-1533749987336-67e41d25d42d?q=80&w=1920&auto=format&fit=crop";

const DrMarkusVossProfilePage: React.FC = () => {
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  useEffect(() => {
    const fetchAdvisor = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await brain.get_advisors();
        if (!response.ok) {
          throw new Error("Profil konnte nicht geladen werden.");
        }
        const advisors: Advisor[] = await response.json();
        const markus = advisors.find((item) => item.id === "markus-voss");
        if (!markus) {
          throw new Error("Dr. Markus Voss ist aktuell nicht verfügbar.");
        }
        setAdvisor(markus);
      } catch (err: any) {
        setError(err.message || "Etwas ist schiefgelaufen.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvisor();
  }, []);

  const positioning = useMemo(
    () => [
      {
        title: "Rheinberg Persönlichkeit im WerteNetzwerk",
        description:
          "Dr. Markus Voss repräsentiert die Rheinberg Privatbank in Köln. Er verbindet die Bankteams mit Unternehmerfamilien, überführt Corporate Governance in persönliche Beziehungen und sorgt dafür, dass Rheinberg im WerteNetzwerk sichtbar bleibt.",
        icon: Compass,
      },
      {
        title: "Mandate aktivieren & begleiten",
        description:
          "Profile wie dieses zeigen, wie Rheinberg Beratungsqualität in messbare Ergebnisse verwandelt: warme Einführungen, strukturierte Erstgespräche und langfristige Mandatsbeziehungen mit klarer Wertstory.",
        icon: Landmark,
      },
      {
        title: "Wirkung für Unternehmerfamilien",
        description:
          "Unternehmerfamilien und Stiftungen erleben Wirkung statt Worthülse. Dr. Voss kombiniert Vermögenssteuerung, Impact-Ansätze und die Governance-Standards der Rheinberg Privatbank zu Lösungen, die Vertrauen schaffen.",
        icon: Sparkles,
      },
    ],
    []
  );

  const networkBenefits = useMemo(
    () => [
      {
        label: "Multi-Banken-Orchestrierung",
        detail:
          "Koordiniert kompetenzbasierte Teams aus Private Banking, Spezialfinanzierungen und unabhängigen Expert:innen.",
        icon: Network,
      },
      {
        label: "Impact-orientierte Kapitalstrategien",
        detail:
          "Verbindet Vermögenswachstum mit ESG- und Impact-Metriken, die Unternehmerfamilien transparent nachvollziehen können.",
        icon: Lightbulb,
      },
      {
        label: "Unternehmerische Nachfolge",
        detail:
          "Moderiert Nachfolgeprozesse wertschonend, verbindet steuerliche, emotionale und kommunikative Dimensionen.",
        icon: Layers,
      },
      {
        label: "Kuratiertes WerteNetzwerk",
        detail:
          "Bündelt Kölner Exzellenz: Family Offices, Stiftungsberatung, Kunst & Kultur, Immobilien, NextGen.",
        icon: Building,
      },
    ],
    []
  );

  const activateContact = () => {
    if (advisor) {
      setSelectedAdvisor(advisor);
      setIsModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1EB]">
        <Loader2 className="animate-spin w-10 h-10 text-[#C8A96F]" />
        <p className="mt-4 text-sm text-gray-600 tracking-wide uppercase">
          Profil wird geladen...
        </p>
      </div>
    );
  }

  if (error || !advisor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1EB] text-center px-6">
        <p className="text-lg text-[#0B0E28] font-semibold mb-2">
          {error || "Profil nicht verfügbar."}
        </p>
        <p className="text-sm text-gray-600 max-w-xl">
          Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt,
          um Zugang zum WerteNetzwerk zu erhalten.
        </p>
        <Button
          className="mt-6"
          style={{ backgroundColor: palette.gold, color: "white" }}
          onClick={activateContact}
        >
          Kontakt aufnehmen
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EB] text-[#0B0E28] min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#4E5058] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Avatar */}
          <div className="w-44 h-44 mx-auto rounded-full border-4 border-[#C8A96F] shadow-lg overflow-hidden mb-8">
            <img
              src={
                advisor.avatarUrl ||
                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=640&auto=format&fit=crop"
              }
              alt={advisor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Badge className="bg-white/10 border border-white/30 text-white uppercase tracking-widest text-xs px-4 py-1.5">
              Rheinberg Privatbank
            </Badge>
            {advisor.premium && (
              <Badge className="bg-[#C8A96F] text-[#0B0E28] uppercase tracking-widest text-xs px-4 py-1.5">
                Premium Profil
              </Badge>
            )}
          </div>

          {/* Name */}
          <h1 className="text-5xl font-semibold text-white mb-6">
            {advisor.name}
          </h1>

          {/* Location & Zielgruppen */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 mb-8">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {advisor.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="w-4 h-4" />
              {advisor.clientTargets?.join(" · ") || "Unternehmerfamilien · Stiftungen · NextGen"}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              className="rounded-full px-8 py-3 bg-white text-[#0B0E28] hover:bg-white/90 font-medium"
              onClick={activateContact}
            >
              Rückruf arrangieren
            </Button>
            <Button
              className="rounded-full px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0B0E28] font-medium transition-colors"
              onClick={() =>
                window.open(
                  "mailto:dialog@koelnervermoegen.de?subject=Anfrage%20Dr.%20Markus%20Voss"
                )
              }
            >
              Direktmail schreiben
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <Link
          to="/trusted-advisors-page"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4E4C58] hover:text-[#C8A96F] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zum WerteNetzwerk
        </Link>
        <div className="flex items-center gap-2 mt-2 text-sm text-[#4E4C58]">
          <Link to="/" className="hover:text-[#C8A96F] transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <Link to="/trusted-advisors-page" className="hover:text-[#C8A96F] transition-colors">
            WerteNetzwerk
          </Link>
          <span>/</span>
          <span className="text-[#0B0E28] font-medium">Dr. Markus Voss</span>
        </div>
      </section>

      {/* Nutzen */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Was dieses Profil für Bankpartner leistet
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Rheinberg Privatbank wird im Kölner Vermögen erlebbar: Das
            Profil macht sichtbar, wie das Haus Beziehungen strukturiert,
            Mandate gewinnt und Unternehmerfamilien entlang ihrer Werte
            begleitet.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {positioning.map((item) => (
            <Card
              key={item.title}
              className="h-full bg-white/80 border border-[#C8A96F30] shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-[#C8A96F20] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#C8A96F]" />
                </div>
                <CardTitle className="text-lg font-semibold text-[#0B0E28]">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#4E4C58] leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="max-w-[90%] mx-auto border-[#C8A96F30]" />

      {/* Timeline: Wie Rheinberg Sie begleitet */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Wie Rheinberg Sie begleitet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Heute",
              desc: "Termin mit Dr. Markus Voss anfragen – persönliches Onboarding",
            },
            {
              title: "+2 Wochen",
              desc: "Mandatsarchitektur gemeinsam mit Rheinberg Kompetenzteam",
            },
            {
              title: "+6 Wochen",
              desc: "Impact- & ESG-Reporting für Ihre Strategie abgestimmt",
            },
            {
              title: "+3 Monate",
              desc: "Review, Events & Co-Investment-Chancen im WerteNetzwerk",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white/85 rounded-2xl border border-[#C8A96F30] p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-[#0B0E28] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#4E4C58] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-[90%] mx-auto border-[#C8A96F30]" />

      {/* Kompetenzen */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-6">Kompetenzfelder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {networkBenefits.map((benefit) => (
              <div
                key={benefit.label}
                className="bg-white/80 rounded-2xl p-6 border border-[#C8A96F25] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <benefit.icon className="w-6 h-6 text-[#C8A96F]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#0B0E28]">
                      {benefit.label}
                    </h3>
                    <p className="text-sm text-[#4E4C58] leading-relaxed">
                      {benefit.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="bg-white/90 rounded-3xl border border-[#C8A96F25] shadow-lg p-8 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C8A96F] mb-3">
              WerteNetzwerk
            </p>
            <h3 className="text-xl font-semibold text-[#0B0E28]">
              Rheinberg Privatbank im WerteNetzwerk
            </h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Dr. Markus Voss macht den Auftritt der Rheinberg Privatbank im
              WerteNetzwerk erlebbar: Er führt Erstgespräche, bündelt die
              richtigen Rheinberg-Teams und entwickelt aus Markenwerten konkrete
              Projekte mit Unternehmerfamilien.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96F]" />
              <span className="text-sm text-gray-700">
                Rheinberg Story erlebbar machen
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96F]" />
              <span className="text-sm text-gray-700">
                Profile als Akquise- und Relationship-Asset
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96F]" />
              <span className="text-sm text-gray-700">
                Werte & Strategien statt Produktverkauf
              </span>
            </div>
          </div>
          <Button
            className="w-full rounded-full py-3 text-sm tracking-wide"
            style={{ backgroundColor: palette.night, color: "white" }}
            onClick={activateContact}
          >
            Gespräch koordinieren
          </Button>
        </aside>
      </section>

      <Separator className="max-w-[90%] mx-auto border-[#C8A96F30]" />

      {/* Details */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C8A96F] mb-3">
              Profil Essentials
            </p>
            <h2 className="text-3xl font-semibold mb-4">
              Fakten und Haltung auf einen Blick
            </h2>
            <p className="text-base text-[#4E4C58] leading-relaxed mb-6">
              Dieses Profil zeigt, wie die Rheinberg Privatbank Unternehmernähe, messbare Wirkung und Verantwortung für Familienvermögen lebt – transparent präsentiert im Kölner WerteNetzwerk.
            </p>
            <div className="flex flex-wrap gap-2">
              {(advisor.focusAreas || []).map((area) => (
                <Badge
                  key={area}
                  className="bg-[#C8A96F20] text-[#0B0E28] border border-[#C8A96F40]"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl border border-[#C8A96F30] shadow-sm p-8 space-y-4">
            <DetailRow label="Rolle" value={advisor.title} />
            <DetailRow
              label="Bank / Plattform"
              value="Kölner Vermögen – kuratierendes WerteNetzwerk"
            />
            <DetailRow
              label="Sprachen"
              value={advisor.languages?.join(" · ") || "Deutsch · Englisch"}
            />
            <DetailRow
              label="Zielgruppen"
              value={advisor.clientTargets?.join(" · ")}
            />
            <DetailRow
              label="Qualifikationen"
              value={advisor.certifications?.join(" · ")}
            />
            <DetailRow
              label="Tags"
              value={advisor.tags?.join(" · ")}
              withDivider={false}
            />
          </div>
        </div>
      </section>

      <Separator className="max-w-[90%] mx-auto border-[#C8A96F30]" />

      {/* Testimonials & Awards */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-semibold">Vertrauen, das bleibt</h2>
          <blockquote className="bg-white/85 border border-[#C8A96F30] p-6 rounded-2xl shadow-sm">
            <p className="text-[#0B0E28] italic">
              „Die Rheinberg Privatbank hat unsere Nachfolge strukturiert, ohne
              unseren Unternehmensspirit zu verlieren.“
            </p>
            <footer className="mt-4 text-sm text-[#4E4C58]">
              Familienunternehmerin · Industrie
            </footer>
          </blockquote>
          <blockquote className="bg-white/85 border border-[#C8A96F30] p-6 rounded-2xl shadow-sm">
            <p className="text-[#0B0E28] italic">
              „Impact-Investments wurden messbar – dank klarer Governance und
              Berater, die zuhören.“
            </p>
            <footer className="mt-4 text-sm text-[#4E4C58]">
              Stiftungsvorstand · Kulturfonds
            </footer>
          </blockquote>
        </div>
        <aside className="space-y-4">
          <h3 className="text-xl font-semibold text-[#0B0E28]">
            Auszeichnungen & Ratings
          </h3>
          <div className="bg-white/85 border border-[#C8A96F30] p-6 rounded-2xl shadow-sm space-y-3">
            <Badge className="bg-[#C8A96F20] text-[#0B0E28] border-[#C8A96F40]">
              Private Banking Award 2024
            </Badge>
            <Badge className="bg-[#C8A96F20] text-[#0B0E28] border-[#C8A96F40]">
              CESGA zertifiziert
            </Badge>
            <Badge className="bg-[#C8A96F20] text-[#0B0E28] border-[#C8A96F40]">
              NPS 9.2
            </Badge>
          </div>
        </aside>
      </section>

      <Separator className="max-w-[90%] mx-auto border-[#C8A96F30]" />

      {/* Galerie */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Rheinberg im WerteNetzwerk
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop",
              caption: "NextGen Roundtable – Köln",
            },
            {
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
              caption: "Impact Lab Workshop mit Rheinberg Research",
            },
            {
              img: "https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=1400&auto=format&fit=crop",
              caption: "Family Office Matching – Kunst & Kultur",
            },
            {
              img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
              caption: "Governance Retreat für Unternehmerfamilien",
            },
          ].map((item, idx) => (
            <figure
              key={idx}
              className="overflow-hidden rounded-2xl border border-[#C8A96F30] shadow-sm"
            >
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-64 object-cover"
              />
              <figcaption className="p-4 text-sm text-[#4E4C58]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Separator className="max-w-[90%] mx-auto border-[#C8A96F30]" />

      {/* Call to action */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(11,14,40,0.85), rgba(11,14,40,0.65)), url('https://images.unsplash.com/photo-1533749987336-67e41d25d42d?q=80&w=1920&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center text-white max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide mb-6">
              Unsere Präsenz im WerteNetzwerk
            </h2>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Gemeinsam zeigen wir, wie die Rheinberg Privatbank in Köln
              wahrgenommen wird. Kuratierte Profile machen unsere Expertise,
              Haltung und Wirkung sichtbar und bringen uns an den Tisch mit den
              Unternehmer- und Stiftungsfamilien, die wir erreichen wollen.
            </p>
          </div>
        </div>
        
        {/* Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-16">
            <path
              fill="#F5F1EB"
              d="M0,40 C240,70 480,10 720,35 C960,60 1200,60 1440,40 L1440,80 L0,80 Z"
            />
          </svg>
        </div>
      </section>

      {isModalOpen && selectedAdvisor && (
        <ContactRequestModal
          advisor={selectedAdvisor}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value?: string | null;
  withDivider?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  withDivider = true,
}) => {
  if (!value) return null;
  return (
    <div>
      <div className="flex justify-between items-start gap-6">
        <span className="text-sm uppercase tracking-[0.3em] text-[#C8A96F]">
          {label}
        </span>
        <span className="text-sm text-[#0B0E28] font-medium leading-relaxed mt-1">
          {value}
        </span>
      </div>
      {withDivider && <div className="mt-4 border-b border-[#C8A96F25]" />}
    </div>
  );
};

export default DrMarkusVossProfilePage;
