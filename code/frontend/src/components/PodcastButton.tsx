// ui/src/components/PodcastButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PodcastButton: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            style={{ backgroundColor: "#9c27b0", color: "white" }}
            className="transition-transform hover:scale-105"
          >
            Mehr als Podcast hören
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Coming Soon!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
