// UserInterestsSelector Komponente wird hier eingebunden
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AVAILABLE_INTERESTS = [
  { id: "finanzen_banking", name: "Finanzen & Banking" },
  { id: "investments", name: "Investments (Aktien, Immobilien, Private Equity, Krypto)" },
  { id: "karriere_business", name: "Karriere & Business" },
  { id: "kunst_kultur", name: "Kunst & Kultur" },
  { id: "wissenschaft_technologie", name: "Wissenschaft & Technologie" },
  { id: "nachhaltigkeit_esg", name: "Nachhaltigkeit & ESG" },
  { id: "lifestyle_gesundheit", name: "Lifestyle & Gesundheit" },
  { id: "politik_gesellschaft", name: "Politik & Gesellschaft" },
  { id: "reisen_globales", name: "Reisen & Globales" },
  { id: "persoenliche_entwicklung", name: "Persönliche Entwicklung" },
];

const UserInterestsSelector = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSaveInterests = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Interessen gespeichert: ${selectedInterests.join(", ")}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm max-w-xl mx-auto">
      <p className="text-sm text-gray-600 mb-6">
        Wählen Sie die Themen aus, die Sie interessieren.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {AVAILABLE_INTERESTS.map((interest) => (
          <button
            key={interest.id}
            type="button"
            onClick={() => toggleInterest(interest.id)}
            className={`p-3 border rounded-lg text-left transition-all duration-150 ease-in-out
              ${
                selectedInterests.includes(interest.id)
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300 shadow-md"
                  : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm"
              }`}
          >
            <span className={`font-medium ${selectedInterests.includes(interest.id) ? 'text-blue-700' : 'text-gray-700'}`}>
              {interest.name}
            </span>
            {selectedInterests.includes(interest.id) && (
              <Badge className="ml-2 mt-1 float-right bg-blue-500 text-white text-xs">
                Ausgewählt
              </Badge>
            )}
          </button>
        ))}
      </div>

      <Button
        onClick={handleSaveInterests}
        disabled={loading}
        className="w-full bg-[#C8A96F] hover:bg-[#B69960] text-white px-6 py-3 rounded-lg text-base font-medium transition-colors duration-150"
      >
        {loading ? "Speichern..." : "Interessen speichern"}
      </Button>
    </div>
  );
};

export default UserInterestsSelector;