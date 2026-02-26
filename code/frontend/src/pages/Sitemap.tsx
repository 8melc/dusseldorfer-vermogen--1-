import React from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Startseite",
    links: [
      { path: "/", label: "Startseite", description: "Landing Page mit Hero, Philosophie, Features & Testimonials" },
    ],
  },
  {
    title: "WissensPlattform (Beiträge)",
    links: [
      { path: "/insights", label: "WissensPlattform", description: "Übersicht aller Artikel & Insights" },
      { path: "/v2-artikel-rheinberg", label: "Artikel: Rheinberg Privatbank (Julius)", description: "Beitrag von Julius über die Rheinberg Privatbank" },
      { path: "/deepdive-nachfolgeplanung", label: "Deep Dive: Nachfolgeplanung", description: "Ausführlicher Beitrag zur Nachfolgeplanung" },
    ],
  },
  {
    title: "Profile & Unternehmensseiten",
    links: [
      { path: "/RheinbergPrivatbankUserPage", label: "Rheinberg Privatbank – User Page", description: "Nutzeransicht der Rheinberg Privatbank" },
      { path: "/rheinberg-privatbank-corporate-page", label: "Rheinberg Privatbank – Corporate Page", description: "Unternehmensseite der Rheinberg Privatbank" },
      { path: "/dr-markus-voss-profile-page", label: "Dr. Markus Voss – Profil", description: "Profilseite von Dr. Markus Voss" },
      { path: "/rheinberg-privatbank-profile-page", label: "Rheinberg Privatbank – Profil Page", description: "Profilseite der Rheinberg Privatbank" },
    ],
  },
  {
    title: "Tools & Features",
    links: [
      { path: "/ai-finanzkompass", label: "AI FinanzKompass (FAQ)", description: "KI-gestützter Finanzkompass – häufige Fragen & Antworten" },
      { path: "/trusted-advisors-page", label: "WerteNetzwerk (Trusted Advisors)", description: "Übersicht vertrauenswürdiger Berater" },
    ],
  },
  {
    title: "Dashboards",
    links: [
      { path: "/dashboard", label: "Persönliches Dashboard", description: "Individuelles Nutzer-Dashboard" },
      { path: "/corporate-dashboard", label: "Corporate Dashboard", description: "Unternehmens-Dashboard" },
    ],
  },
  {
    title: "Account & Rechtliches",
    links: [
      { path: "/login", label: "Login", description: "Anmeldeseite" },
      { path: "/signup", label: "Registrierung", description: "Neues Konto erstellen" },
      { path: "/impressum", label: "Impressum", description: "Rechtliche Angaben" },
      { path: "/datenschutz", label: "Datenschutz", description: "Datenschutzerklärung" },
    ],
  },
  {
    title: "Intern / Vorschau",
    links: [
      { path: "/user-interests-selector-preview", label: "Interessen-Selektor (Preview)", description: "Vorschau: Nutzerinteressen auswählen" },
      { path: "/content1", label: "Content 1", description: "Content-Seite" },
      { path: "/email-liste", label: "E-Mail-Liste (Christopher)", description: "Newsletter & E-Mail-Anmeldung" },
    ],
  },
];

const DOMAIN = "koelnervermoegen.de";

export default function Sitemap() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className="font-primary text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#0d2340" }}
          >
            Seitenübersicht
          </h1>
          <p
            className="font-secondary text-lg"
            style={{ color: "#0d2340", opacity: 0.7 }}
          >
            Alle Seiten auf einen Blick &mdash;{" "}
            <span style={{ color: "#C8A96F" }}>{DOMAIN}</span>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="font-primary text-2xl font-semibold mb-4 pb-2 border-b-2"
                style={{ color: "#0d2340", borderColor: "#C8A96F" }}
              >
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block rounded-lg p-4 transition-all hover:shadow-md"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="font-secondary font-semibold text-base"
                          style={{ color: "#0d2340" }}
                        >
                          {link.label}
                        </span>
                        <p
                          className="font-secondary text-sm mt-1"
                          style={{ color: "#0d2340", opacity: 0.6 }}
                        >
                          {link.description}
                        </p>
                      </div>
                      <span
                        className="font-secondary text-xs mt-1 shrink-0 px-2 py-1 rounded"
                        style={{
                          backgroundColor: "#f5f0e8",
                          color: "#C8A96F",
                        }}
                      >
                        {DOMAIN}{link.path === "/" ? "" : link.path}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p
            className="font-secondary text-sm"
            style={{ color: "#0d2340", opacity: 0.5 }}
          >
            Stand: Februar 2026 &middot; Kölner Vermögen
          </p>
        </div>
      </div>
    </div>
  );
}
