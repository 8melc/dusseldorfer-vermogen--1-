

import React from "react";
import { Insight } from "types";
import { FaStar } from "react-icons/fa";

interface PremiumContentProps {
  data: Insight;
  onInteraction: (interactionType: string, data?: any) => void;
}

export function PremiumContent({ data, onInteraction }: PremiumContentProps) {
  return (
    <div
      className="bg-primary-dark text-white rounded-lg shadow-lg overflow-hidden border-2 border-primary-dark hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onInteraction("card_click")}
    >
      <div
        className="h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <h3 className="font-primary text-2xl font-bold">{data.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm opacity-80 mb-4 h-12 overflow-hidden">
          {data.summary}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInteraction("read_premium");
          }}
          className="w-full bg-accent-gold text-primary-dark font-bold py-2 px-4 rounded-md hover:bg-accent-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <FaStar /> Premium-Inhalt lesen
        </button>
      </div>
    </div>
  );
}
