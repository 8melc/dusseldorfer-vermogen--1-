
import React from "react";
import { Insight } from "types";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  Headphones,
  FileDown,
} from "lucide-react";

interface InsightCardProps {
  insight: Insight;
  isGated?: boolean;
  onInteraction?: (type: string, data: any) => void;
}

// Format icons mapping
const formatIcons = {
  article: FileText,
  audio: Headphones,
  pdf: FileDown,
};

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  isGated = false,
  onInteraction,
}) => {
  const {
    id,
    title,
    category,
    image,
    summary,
    date,
    format = "article",
    readTime = "5 Min",
  } = insight;

  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Track interaction
    if (onInteraction) {
      onInteraction("click", { contentId: id, isGated });
    }

    // Check if content is gated and feature flag is enabled
    if (isGated && process.env.REACT_APP_CONTENT_GATE_ENABLED === "true") {
      navigate(`/zugang/${id}`);
    } else {
      navigate(`/artikel/${id}`);
    }
  };

  const FormatIcon =
    formatIcons[format as keyof typeof formatIcons] || FileText;

  // Apply subtle dimming for gated content without revealing it's gated
  const cardOpacity = isGated ? "opacity-95" : "";

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 ${cardOpacity}`}
      onClick={handleCardClick}
    >
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.style.display = "none";
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FormatIcon className="w-16 h-16 text-slate-300" />
          </div>
        )}

        {/* Category Badge - Top Left */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {category}
          </span>
        </div>

        {/* Format Icon - Top Right */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <FormatIcon className="w-4 h-4 text-slate-700" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date || "Heute"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-lg text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
            isGated ? "opacity-90" : ""
          }`}
        >
          {title}
        </h3>

        {/* Summary */}
        <p
          className={`text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed ${
            isGated ? "opacity-90" : ""
          }`}
        >
          {typeof summary === "string" &&
          !/<\/?[a-z][\s\S]*>/i.test(summary)
            ? summary
            : "Entdecken Sie tiefgehende Einblicke und Analysen zu diesem Thema."}
        </p>

        {/* CTA Button - Unified for all content */}
        <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
          <span>Weiterlesen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};