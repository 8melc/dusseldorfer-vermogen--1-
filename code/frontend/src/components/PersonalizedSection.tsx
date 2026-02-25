import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InsightCard } from "./InsightCard";
import { Insight } from "../utils/insightsData";
import { FaStar, FaInfoCircle, FaUserLock } from "react-icons/fa";

interface PersonalizedSectionProps {
  isLoggedIn: boolean;
  userInterests: string[];
  readingHistory: Partial<Insight>[];
  allArticles: Insight[];
}

export const PersonalizedSection: React.FC<PersonalizedSectionProps> = ({
  isLoggedIn,
  userInterests,
  readingHistory,
  allArticles,
}) => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState(userInterests);
  const [activeSection, setActiveSection] = useState<"recommended" | "similar">(
    "recommended",
  );

  if (!allArticles || allArticles.length === 0) {
    return null;
  }

  const toggleFilter = (interest: string) => {
    setActiveFilters((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  const filteredArticles =
    activeFilters.length > 0
      ? allArticles.filter((article) =>
          activeFilters.some(
            (filter) =>
              article.category
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
              article.tags?.some((tag) =>
                tag.toLowerCase().includes(filter.toLowerCase()),
              ),
          ),
        )
      : [];

  const recommendedArticles = filteredArticles
    .filter((article) =>
      readingHistory.some(
        (hist) =>
          (hist.category &&
            article.category.toLowerCase() === hist.category.toLowerCase()) ||
          article.tags?.some((tag) =>
            hist.tags?.some(
              (histTag) => histTag.toLowerCase() === tag.toLowerCase(),
            ),
          ),
      ),
    )
    .slice(0, 3);

  const similarArticles = filteredArticles
    .filter(
      (article) =>
        !recommendedArticles.some(
          (recArticle) => recArticle.id === article.id,
        ),
    )
    .slice(0, 3);

  const articlesToShow =
    activeSection === "recommended" ? recommendedArticles : similarArticles;

  // Guest View with CTA
  if (!isLoggedIn) {
    return (
      <div className="bg-white py-12 mb-8 rounded-lg border border-gray-200/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-primary font-bold text-primary-dark">
              Für Sie relevant – Ihre aktuellen Themen-Spezial
            </h2>
            <p className="text-lg text-gray-600 font-secondary mt-4 max-w-2xl mx-auto">
              Melden Sie sich an, um personalisierte Inhalte zu entdecken.
            </p>
          </div>
          <div className="bg-primary-extralight border-2 border-dashed border-primary-light p-12 mt-8 rounded-lg text-center">
            <FaUserLock className="text-primary-light mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-primary-dark font-primary mb-2">
              Schalten Sie Ihre persönliche Insight-Zentrale frei
            </h3>
            <p className="text-gray-700 font-secondary mb-6 max-w-lg mx-auto">
              Erhalten Sie Empfehlungen, die genau auf Ihre Interessen und Ihre
              Lesehistorie zugeschnitten sind.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-primary-dark text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all text-lg shadow-lg"
            >
              Jetzt Anmelden oder Registrieren
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in View
  return (
    <div className="bg-white py-12 mb-8 rounded-lg border border-gray-200/80">
      <div className="container mx-auto px-4">
        {/* Header and Filter Tags */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-primary font-bold text-primary-dark">
            Für Sie relevant – Ihre aktuellen Themen-Spezial
          </h2>
          <p className="text-lg text-gray-600 font-secondary mt-4 max-w-2xl mx-auto">
            Basierend auf Ihren Interessen. Wählen Sie Filter ab, um die Auswahl
            zu verfeinern.
          </p>
          <div className="mt-6 flex justify-center flex-wrap gap-2">
            {userInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleFilter(interest)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeFilters.includes(interest)
                    ? "bg-primary-light text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveSection("recommended")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold text-lg transition-all ${
              activeSection === "recommended"
                ? "text-primary-dark border-b-2 border-primary-dark"
                : "text-gray-500"
            }`}
          >
            Für Sie ausgewählt
            <span className="bg-primary-light text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {recommendedArticles.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSection("similar")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold text-lg transition-all ${
              activeSection === "similar"
                ? "text-primary-dark border-b-2 border-primary-dark"
                : "text-gray-500"
            }`}
          >
            Ähnliche Themen
            <span className="bg-gray-300 text-gray-700 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {similarArticles.length}
            </span>
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesToShow.map((article) => (
            <InsightCard key={article.id} insight={article} />
          ))}
        </div>

        {/* Reading Progress */}
        <div className="mt-20 bg-gray-50 p-8 rounded-lg shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold font-secondary text-primary-dark">
              Ihre Lesezeit heute
            </h4>
            <span className="font-bold text-lg text-primary-light">
              23 Min
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-light h-2.5 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Sie haben 65% Ihres täglichen Leseziels erreicht.
          </p>
        </div>

        {/* AI Explanation & CTA */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center gap-4 bg-background-light p-6 rounded-lg">
            <div className="flex-shrink-0">
              <FaInfoCircle className="text-primary-light" size={24} />
            </div>
            <div>
              <p className="font-bold text-primary-dark font-secondary">
                Warum diese Empfehlungen?
              </p>
              <p className="text-gray-600 font-secondary text-sm">
                Unsere KI kombiniert Ihre Interessen mit Ihrer Lesehistorie für
                maßgeschneiderte Vorschläge.
              </p>
            </div>
          </div>
          <div className="bg-accent-gold-light p-6 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="font-bold text-primary-dark">
                Erweiterte Personalisierung
              </h4>
              <p className="text-sm text-primary-dark/80">
                Schalten Sie noch präzisere Analysen frei.
              </p>
            </div>
            <button className="bg-primary-dark text-white font-bold py-2 px-4 rounded-md text-sm inline-flex items-center gap-2 hover:bg-opacity-90 transition-colors">
              <FaStar /> Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
