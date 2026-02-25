// components/EnhancedFilters.tsx
import React from 'react';

interface EnhancedFiltersProps {
  banks: string[];
  expertises: string[];
  locations: string[];
  languages: string[];
  genders: string[];
  seniorities: string[];
  focusAreas: string[];
  certifications: string[];
  clientTargets: string[];
  onFilterChange: (filters: any) => void;
  activeFilters: any;
  selectedBank?: string | null;
}

export const EnhancedFilters: React.FC<EnhancedFiltersProps> = ({
  banks,
  expertises,
  locations,
  languages,
  genders,
  seniorities,
  focusAreas,
  certifications,
  clientTargets,
  onFilterChange,
  activeFilters,
  selectedBank,
}) => {
  
  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({
      ...activeFilters,
      [key]: value
    });
  };

  // Sortierte und bereinigte Banken
  const sortedBanks = [
    'Rheinberg Privatbank',
    'Triversa Private Clients',
    'Lindenhof Finanzhaus',
    'Aurora Handelsbank',
    'Novaris Capital',
    'Helvetia Struktur AG',
    'Nordquell Vermögen',
    'Meridian Global Advisory',
    'Altmuehl & Partner',
    'Eichenstein Conseil',
    'Velorum Aachen'
  ].filter(bank => banks.includes(bank));

  // Vereinfachte Fachgebiete
  const simplifiedExpertises = [
    'Vermögensverwaltung',
    'Family Office',
    'Nachfolgeplanung',
    'Immobilien',
    'Nachhaltigkeit & ESG',
    'Internationale Vermögen',
    'Stiftungen',
    'Alternative Investments'
  ];

  // Standardisierte Zertifizierungen
  const standardCertifications = [
    'CFA (Chartered Financial Analyst)',
    'CFP (Certified Financial Planner)',
    'MBA',
    'Doktortitel',
    'TEP (Trust and Estate Practitioner)'
  ];

  // Vereinfachte Kundengruppen
  const simplifiedClientTargets = [
    'Privatanleger',
    'Unternehmer',
    'Family Offices',
    'Stiftungen',
    'Internationale Kunden'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Bank Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank
          </label>
          <select
            value={activeFilters.bank || selectedBank || ''}
            onChange={(e) => handleFilterChange('bank', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96F] focus:border-transparent"
          >
            <option value="">Alle Banken</option>
            {sortedBanks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Fachgebiet Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fachgebiet
          </label>
          <select
            value={activeFilters.expertise || ''}
            onChange={(e) => handleFilterChange('expertise', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96F] focus:border-transparent"
          >
            <option value="">Alle Fachgebiete</option>
            {simplifiedExpertises.map((expertise) => (
              <option key={expertise} value={expertise}>
                {expertise}
              </option>
            ))}
          </select>
        </div>

        {/* Kundengruppe Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kundengruppe
          </label>
          <select
            value={activeFilters.clientTarget || ''}
            onChange={(e) => handleFilterChange('clientTarget', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96F] focus:border-transparent"
          >
            <option value="">Alle Kundengruppen</option>
            {simplifiedClientTargets.map((target) => (
              <option key={target} value={target}>
                {target}
              </option>
            ))}
          </select>
        </div>

        {/* Qualifikation Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualifikation
          </label>
          <select
            value={activeFilters.certification || ''}
            onChange={(e) => handleFilterChange('certification', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96F] focus:border-transparent"
          >
            <option value="">Alle Qualifikationen</option>
            {standardCertifications.map((cert) => (
              <option key={cert} value={cert}>
                {cert}
              </option>
            ))}
          </select>
        </div>

        {/* Sprache Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sprache
          </label>
          <select
            value={activeFilters.language || ''}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96F] focus:border-transparent"
          >
            <option value="">Alle Sprachen</option>
            <option value="Deutsch">Deutsch</option>
            <option value="Englisch">Englisch</option>
            <option value="Französisch">Französisch</option>
            <option value="Italienisch">Italienisch</option>
            <option value="Spanisch">Spanisch</option>
            <option value="Mandarin">Mandarin</option>
          </select>
        </div>

        {/* Nachhaltigkeits-Fokus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spezialisierung
          </label>
          <div className="flex items-center space-x-3 mt-3">
            <input
              type="checkbox"
              id="esg-filter"
              checked={activeFilters.esg || false}
              onChange={(e) => handleFilterChange('esg', e.target.checked)}
              className="h-4 w-4 text-[#C8A96F] focus:ring-[#C8A96F] border-gray-300 rounded"
            />
            <label htmlFor="esg-filter" className="text-sm text-gray-700">
              Nur ESG/Nachhaltigkeit
            </label>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {Object.values(activeFilters).some(v => v && v !== 'Köln') && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onFilterChange({
              bank: '',
              expertise: '',
              location: 'Köln',
              esg: false,
              gender: '',
              seniority: '',
              focusArea: '',
              language: '',
              certification: '',
              clientTarget: ''
            })}
            className="text-sm text-[#C8A96F] hover:text-[#A08755] font-medium transition-colors"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
};
