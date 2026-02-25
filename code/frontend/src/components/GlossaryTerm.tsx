import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GlossaryTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export function GlossaryTerm({
  term,
  definition,
  children,
}: GlossaryTermProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="text-primary-dark font-bold underline decoration-dotted cursor-help"
            tabIndex={0}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-white p-3 max-w-xs rounded-md shadow-lg">
          <p className="font-bold text-lg">{term}</p>
          <p>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
