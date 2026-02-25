import React from 'react';

// TypeScript-Interface für die Struktur der Experten-Daten
interface Expert {
  id: number;
  name: string;
  title: string;
  expertise: string;
}

// Statische Daten für zwei Experten, direkt in der Komponente definiert
const expertsData: Expert[] = [
  {
    id: 1,
    name: 'Dr. Helena Voss',
    title: 'Chefstrategin für Vermögen',
    expertise: 'Nachfolgeplanung & Stiftungsrecht',
  },
  {
    id: 2,
    name: 'Maximilian Berger',
    title: 'Spezialist für Kapitalmärkte',
    expertise: 'Alternative Investments & Risikomanagement',
  },
];

/**
 * Eine vereinfachte, in sich geschlossene Komponente zur Anzeige von Experten.
 * Sie verwendet statische Daten und grundlegendes Tailwind CSS für das Styling.
 */
const SimplifiedExpertsList: React.FC = () => {
  return (
    <section className="w-full py-8">
      {/* 1. Überschrift */}
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Unsere Experten zu diesem Thema
      </h2>
      
      {/* 2. Responsives Grid/Flex-Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {expertsData.map((expert) => (
          // 3. Experten-Karte
          <div
            key={expert.id}
            className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
          >
            {/* Profilbild-Platzhalter (Kreis) */}
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>

            {/* Name und Titel des Experten */}
            <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{expert.title}</p>
            
            {/* Expertise-Bereich */}
            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">{expert.expertise}</p>

            {/* "Kontakt (coming soon)"-Button */}
            <button
              disabled
              className="mt-auto bg-gray-200 text-gray-400 font-semibold py-2 px-4 rounded-md cursor-not-allowed text-sm"
            >
              Kontakt (coming soon)
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimplifiedExpertsList;
