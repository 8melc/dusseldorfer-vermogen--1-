
import React from "react";
import { InsightCard } from "./InsightCard";
import { insightsData } from "../utils/insightsData";

export const PremiumSection = () => {
  const premiumInsights = insightsData.filter((item) => item.isPremium);

  return (
    <div className="py-12 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-primary font-bold text-primary-dark">
          Exklusive Premium-Einblicke
        </h2>
        <p className="text-lg text-gray-600 font-secondary mt-2 max-w-2xl mx-auto">
          Fundierte Analysen und exklusive Inhalte, die Ihnen einen
          entscheidenden Wissensvorsprung sichern.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {premiumInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
        {/* We can add more cards here or a call to action */}
      </div>
    </div>
  );
};
