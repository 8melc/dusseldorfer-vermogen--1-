

import React, { useState } from 'react';
import { Clock, Headphones } from 'lucide-react';

// TypeScript-Interface für die Struktur der Artikel-Daten
interface Article {
  id: number;
  title: string;
  imageUrl: string;
  readTime: number; // Lesezeit in Minuten
  hasAudio: boolean;
  articleUrl: string; // Ziel-URL für den Klick
}

// Statische Beispieldaten für die Artikel (mit korrigierten URLs)
const articlesData: Article[] = [
  {
    id: 1,
    title: 'Die Kunst der Diversifikation im modernen Portfolio',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=338&q=80',
    readTime: 7,
    hasAudio: true,
    articleUrl: '#',
  },
  {
    id: 2,
    title: 'Nachhaltige Geldanlagen: Ein Leitfaden für Einsteiger',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=338&q=80',
    readTime: 5,
    hasAudio: false,
    articleUrl: '#',
  },
  {
    id: 3,
    title: 'Immobilien als Kapitalanlage: Chancen und Risiken 2024',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=338&q=80',
    readTime: 9,
    hasAudio: true,
    articleUrl: '#',
  },
];

/**
 * Eine Komponente, die relevante Artikel anzeigt und eine Filterung nach Audio-Verfügbarkeit ermöglicht.
 */
const RelevantArticles: React.FC = () => {
  const [showOnlyAudio, setShowOnlyAudio] = useState(false);

  // Filtert die Artikel basierend auf dem Status des Toggles
  const filteredArticles = articlesData.filter(article => 
    showOnlyAudio ? article.hasAudio : true
  );

  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header mit Titel und Filter-Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Passend zu Ihren Interessen
          </h2>
          <div className="flex items-center">
            <label htmlFor="audio-toggle" className="mr-3 text-sm font-medium text-gray-700">
              Nur Artikel mit Audio anzeigen
            </label>
            <button
              onClick={() => setShowOnlyAudio(!showOnlyAudio)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${showOnlyAudio ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label="Filter-Toggle"
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showOnlyAudio ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>

        {/* Responsives Grid für die Artikel-Karten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id} /* Korrekte Key-Referenz */
              onClick={() => window.location.href = article.articleUrl}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              {/* Vorschaubild */}
              <div className="relative">
                <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                {/* Audio-Badge für Artikel mit Audio-Snippet */}
                {article.hasAudio && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                    <Headphones size={16} />
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                {/* Titel */}
                <h3 className="text-md font-semibold text-gray-900 mb-2 flex-grow">
                  {article.title}
                </h3>
                
                {/* Lesezeit-Anzeige */}
                <div className="flex items-center text-xs text-gray-500 mt-auto">
                  <Clock size={14} className="mr-1.5" />
                  <span>{article.readTime} min Lesezeit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelevantArticles;
