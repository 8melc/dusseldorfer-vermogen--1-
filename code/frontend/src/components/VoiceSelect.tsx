
// ui/src/components/VoiceSelect.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const VoiceSelect: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = React.useState<"male" | "female">("female");

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">2. Stimme auswählen</h3>
      <div className="flex w-full rounded-lg border p-1">
        <button
          type="button"
          onClick={() => setSelectedVoice("female")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selectedVoice === "female"
              ? "bg-blue-600 text-white shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Weiblich
        </button>
        <button
          type="button"
          onClick={() => setSelectedVoice("male")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selectedVoice === "male"
              ? "bg-blue-600 text-white shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Männlich
        </button>
      </div>
    </div>
  );
};
