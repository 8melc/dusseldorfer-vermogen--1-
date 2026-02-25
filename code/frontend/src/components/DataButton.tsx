import React, { useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

/**
 * DataButton
 * Ein interaktives Klick-Modul mit Pfeil und rechtsseitigem Panel
 * unter Beibehaltung der UI-Varianten und Farbgebung.
 *
 * Props:
 * - label: Text auf dem Button
 * - panelContent: ReactNode für den Inhalt im Panel
 * - variant?: ButtonProps['variant'] - UI-Variante (z.B. 'solid' | 'outline')
 * - className?: string - zusätzliche Klassen für den Button
 */
export default function DataButton({
  label,
  panelContent,
  variant = 'solid',
  className = '',
  ...btnProps
}: {
  label: string;
  panelContent: React.ReactNode;
  variant?: ButtonProps['variant'];
  className?: string;
} & Omit<ButtonProps, 'variant' | 'className'>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <div className="flex items-start">
      {/* Klickbarer DataButton */}
      <Button
        variant={variant}
        onClick={toggleOpen}
        className={`flex items-center space-x-2 py-2 px-4 rounded-2xl shadow-md ${className}`}
        {...btnProps}
      >
        <span className="text-base font-medium text-[#1A1A40]">{label}</span>
      </Button>

      {/* Pfeil zur Anzeige des Panels */}
      {isOpen && (
        <ChevronRight
          size={24}
          className="ml-2 mt-1 transition-transform duration-200 text-[#C8A96F]"
        />
      )}

      {/* Rechtsseitiges Panel */}
      {isOpen && (
        <div className="ml-4 p-4 border border-[#E0DFDC] rounded-lg shadow-sm flex-1 transition-opacity duration-200 bg-white">
          <h3 className="text-lg font-semibold text-[#1A1A40] mb-2">{label}</h3>
          <div className="text-[#1A1A40]/90">{panelContent}</div>
        </div>
      )}
    </div>
  );
}
