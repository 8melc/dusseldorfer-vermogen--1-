
import React, { useState } from "react";
import { ChevronDown, X, Filter, Calendar, Tag } from "lucide-react";

interface FilterBarProps {
  activeFilters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilters = {},
  onFilterChange,
}) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Primary filter options
  const categories = [
    "Alle Themen",
    "Nachhaltigkeit",
    "Immobilien",
    "Private Equity",
    "Märkte & Investments",
    "Technologie",
  ];

  const timeframes = [
    { label: "Neu", value: "Neu" },
    { label: "Eine Woche", value: "Eine Woche" },
    { label: "30 Tage", value: "30 Tage" },
  ];

  // Secondary filter options
  const formats = ["Artikel", "Audio", "PDF"];
  const sources = ["Interne Analysen", "Partnerberichte", "Marktforschung"];

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...activeFilters };
    if (category === "Alle Themen") {
      delete newFilters.category;
    } else {
      newFilters.category = category;
    }
    onFilterChange(newFilters);
  };

  const handleTimeframeChange = (timeframe: string) => {
    onFilterChange({ ...activeFilters, timeframe });
  };

  const handleSecondaryFilter = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterType] === value) {
      delete newFilters[filterType];
    } else {
      newFilters[filterType] = value;
    }
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
    setShowMoreFilters(false);
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const secondaryActiveCount = Object.keys(activeFilters).filter(
    (k) => !["category", "Veröffentlichungszeitraum"].includes(k)
  ).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
      {/* Primary Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Dropdown */}
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium text-slate-700"
            type="button"
          >
            <Tag className="w-4 h-4" />
            <span>{activeFilters.category || "Alle Themen"}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20 hidden group-hover:block">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                  activeFilters.category === cat ||
                  (!activeFilters.category && cat === "Alle Themen")
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-700"
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium text-slate-700"
            type="button"
          >
            <Calendar className="w-4 h-4" />
            <span>
              {timeframes.find((t) => t.value === activeFilters.timeframe)?.label ||
                "Zeitraum"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20 hidden group-hover:block">
            {timeframes.map((time) => (
              <button
                key={time.value}
                onClick={() => handleTimeframeChange(time.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                  activeFilters.timeframe === time.value
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-700"
                }`}
                type="button"
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>

        {/* More Filters Button */}
        <button
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors text-sm font-medium text-slate-600"
          type="button"
        >
          <Filter className="w-4 h-4" />
          <span>Weitere Filter</span>
          {secondaryActiveCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {secondaryActiveCount}
            </span>
          )}
        </button>

        {/* Active Filter Chips: Clear all */}
        {hasActiveFilters && (
          <>
            <div className="flex-1" />
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-600 transition-colors font-medium"
              type="button"
            >
              <X className="w-4 h-4" />
              <span>Alle löschen</span>
            </button>
          </>
        )}
      </div>

      {/* Secondary Filters (Expandable) */}
      {showMoreFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Format Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Format
              </label>
              <div className="flex flex-wrap gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => handleSecondaryFilter("format", format)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                      activeFilters.format === format
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    type="button"
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Quelle
              </label>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <button
                    key={source}
                    onClick={() => handleSecondaryFilter("Quelle", source)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                      activeFilters.source === source
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    type="button"
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Autor
              </label>
              <input
                type="text"
                placeholder="Autor suchen..."
                className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  if (e.target.value) {
                    handleSecondaryFilter("author", e.target.value);
                  } else {
                    const newFilters = { ...activeFilters };
                    delete newFilters.author;
                    onFilterChange(newFilters);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
            >
              <span className="font-medium capitalize">{key}:</span>
              <span>{String(value)}</span>
              <button
                onClick={() => {
                  const newFilters = { ...activeFilters };
                  delete newFilters[key];
                  onFilterChange(newFilters);
                }}
                className="ml-1 hover:text-blue-900"
                type="button"
                aria-label={`${key} Filter entfernen`}
                title={`${key} Filter entfernen`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};