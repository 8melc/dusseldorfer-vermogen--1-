

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ReviewProps {
  image: string;
  name: string;
  role: string;
  review: string;
}

const REVIEWS: ReviewProps[] = [
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Dr. Anna Müller",
    role: "Head of Wealth Management, FinX Bank",
    review: "Dank noomedia erhalten wir in Echtzeit Insights, die unser Private Banking auf ein neues Level heben.",
  },
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Thomas Becker",
    role: "CEO, Becker Consulting",
    review: "Die KI-gestützten Deep-Dives sparen uns Stunden bei der Marktanalyse – und liefern passgenaue Empfehlungen.",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Jessica Wagner",
    role: "Director Family Office, Wagner & Partner",
    review: "Mit Trusted Advisors & AI Assistant treffen wir schneller bessere Entscheidungen – Interaktion statt starrer Reports.",
  },
  {
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Michael Schmidt",
    role: "CFO, Mittelstandsbank AG",
    review: "Personalisierte Inhalte statt generischer PDFs: noomedia definiert Private Banking für unsere Kunden neu.",
  },
  {
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Laura Fischer",
    role: "Investment Lead, Tech Ventures GmbH",
    review: "Der 24/7 AI-Chat liefert uns spontane, diskrete Antworten zu komplexen Finanzfragen – ein Gamechanger.",
  },
];

const ReviewCard: React.FC<ReviewProps> = ({ image, name, role, review }) => {
  return (
    <div className="h-full flex flex-col flex-shrink-0 min-w-[320px] sm:min-w-[360px] md:min-w-[380px] bg-gradient-to-br from-[#F8F6F2] to-[#EFE9E1] rounded-2xl shadow-md border border-[#E6DFD4]/80 p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#B8954D] bg-white">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[#1A1A40] truncate">{name}</h3>
          <p className="text-sm text-[#707070] leading-snug">{role}</p>
        </div>
      </div>
      <div className="flex-grow">
        <div className="h-px bg-gray-200 my-4" />
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="text-3xl font-serif text-[#B8954D] -ml-2 mr-1">“</span>
          {review}
        </p>
      </div>
    </div>
  );
};

// Duplicated items to create the infinite effect
const ALL_REVIEWS = [...REVIEWS, ...REVIEWS];

export const AutoScrollCarousel: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerWidth = scrollerRef.current.scrollWidth;
    const movePercentage = (REVIEWS.length / ALL_REVIEWS.length) * 100;

    const styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);

    const animationName = `scrollAnimation-${Date.now()}`;
    styleSheet.sheet?.insertRule(`
      @keyframes ${animationName} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${movePercentage}%); }
      }
    `, 0);

    scrollerRef.current.style.animation = `${animationName} 40s linear infinite`;

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-0">
        <div className="text-center mb-12 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#1A1A40] mb-4"
          >
            Was unsere Partner sagen
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} // Added initial for consistency, optional
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#707070] max-w-2xl mx-auto"
          >
            Erfahren Sie, wie Partner und Branchenexperten den Erfolg von Noomedia beschreiben.
          </motion.p>
          <p className="text-[#B8954D] italic mt-4">
            Noomedia schafft Plattformen für den Austausch von Fachwissen und zukunftsweisenden Impulsen – branchenspezifisch und zielgruppengenau.
          </p>
        </div>

        <div ref={scrollerRef} className="flex overflow-hidden relative gap-x-4">
          {ALL_REVIEWS.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
