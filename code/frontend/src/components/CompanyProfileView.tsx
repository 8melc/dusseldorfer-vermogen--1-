import React from "react";
import { Advisor } from "types";
import { Button } from "@/components/ui/button";
import { PremiumAdvisorCard } from "./PremiumAdvisorCard";
import { useNavigate } from "react-router-dom";

interface CompanyProfileViewProps {
  company: string;
  advisors: Advisor[];
  onContactRequest: (advisor: Advisor) => void;
  onSaveInterest: (advisor: Advisor) => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({
  company,
  advisors,
  onContactRequest,
  onSaveInterest,
}) => {
  const navigate = useNavigate();

  // Rheinberg Privatbank Design
  const colors = {
    primary: "#1a1a1a", // Dark
    accent: "#8B7355", // Brown/Bronze
  };

  const companyInfo = {
    description: "Rheinberg Privatbank ist eine unabhängige Privatbank mit Sitz in Köln. Seit über 25 Jahren betreuen wir vermögende Privatkunden und Family Offices mit höchster Diskretion und Expertise. Unsere Werte – Vertrauen, Individualität und Exzellenz – prägen unser gesamtes Handeln.",
    esgFocus: "Wir sind überzeugt, dass die Berücksichtigung von ESG-Faktoren (Umwelt, Soziales und Unternehmensführung) für den langfristigen Anlageerfolg entscheidend ist. Unser Ziel ist es, nachhaltige Werte für unsere Kunden, die Gesellschaft und zukünftige Generationen zu schaffen.",
    kpis: [
      { label: "Assets under Management", value: "EUR 12,5 Mrd." },
      { label: "Nachhaltige Anlagen", value: "42% des Gesamtvermögens" },
      { label: "Regionale Präsenz", value: "Köln, Frankfurt, München" },
    ],
  };

  const handleProfileClick = () => {
    navigate('/rheinberg-privatbank-profile-page');
  };

  return (
    <div
      className="bg-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onClick={handleProfileClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Linke Spalte: Unternehmensinfos */}
        <div className="md:col-span-3 sticky top-24 space-y-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold" style={{ color: colors.accent }}>
              {company}
            </h1>
            <p className="text-xl mt-4" style={{ color: colors.primary }}>
              Exzellenz in Private Banking und Vermögensverwaltung
            </p>
          </header>

          {/* Company Description */}
          <section className="mb-12 bg-white/10 p-8 rounded-lg shadow-lg">
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ color: colors.accent }}
            >
              Unsere Philosophie
            </h2>
            <p className="leading-relaxed" style={{ color: colors.primary }}>
              {companyInfo.description}
            </p>
          </section>

          {/* ESG & KPIs Section */}
          <section className="mb-12 space-y-8">
            {/* ESG */}
            <div className="bg-white/10 p-8 rounded-lg shadow-lg">
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: colors.accent }}
              >
                Nachhaltigkeit im Fokus (ESG)
              </h3>
              <p className="leading-relaxed" style={{ color: colors.primary }}>
                {companyInfo.esgFocus}
              </p>
            </div>
            {/* KPIs */}
            <div className="bg-white/10 p-8 rounded-lg shadow-lg">
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: colors.accent }}
              >
                Kennzahlen
              </h3>
              <ul className="space-y-3">
                {companyInfo.kpis.map((kpi, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span style={{ color: colors.primary }}>{kpi.label}</span>
                    <span
                      className="font-bold text-lg"
                      style={{ color: colors.accent }}
                    >
                      {kpi.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Advisors Section */}
        <section className="md:col-span-9 space-y-8">
          <h2
            className="text-3xl font-semibold text-center mb-8"
            style={{ color: colors.accent }}
          >
            Ihre persönlichen Berater
          </h2>
          {advisors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisors.map((advisor) => (
                <PremiumAdvisorCard
                  key={advisor.id}
                  advisor={advisor}
                  onContactRequest={() => onContactRequest(advisor)}
                  onSaveInterest={() => onSaveInterest(advisor)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-white/80 py-12">
              Keine Berater für dieses Unternehmen gefunden.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
