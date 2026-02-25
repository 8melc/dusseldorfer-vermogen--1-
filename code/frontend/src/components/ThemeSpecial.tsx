

import React from "react";
import { Insight } from "types";
import { FaPlayCircle } from "react-icons/fa";

interface ThemeSpecialProps {
  data: Insight;
  onInteraction: (interactionType: string, data?: any) => void;
}

export function ThemeSpecial({ data, onInteraction }: ThemeSpecialProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-accent-gold-light hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onInteraction("card_click")}
    >
      <div className="p-6">
        <p className="text-accent-gold font-semibold text-sm mb-2 uppercase tracking-wider">
          Themen-Spezial: {data.category}
        </p>
        <h3 className="font-primary text-xl font-bold text-primary-dark mb-3">
          {data.title}
        </h3>
        <p className="text-gray-600 text-sm font-secondary mb-4 h-16 overflow-hidden">
          {data.summary}
        </p>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInteraction("read_more");
            }}
            className="bg-primary-dark text-white font-bold py-2 px-4 rounded-md hover:bg-primary-light transition-colors duration-300"
          >
            Jetzt lesen
          </button>
          {data.has_audio && (
            <FaPlayCircle className="text-primary-light text-2xl" />
          )}
        </div>
      </div>
    </div>
  );
}
