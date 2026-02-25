import React from "react";
import { Compass } from "lucide-react";

export function ChatMessagesIcon() {
  return (
    <div className="hidden sm:inline-flex">
      <Compass className="h-6 w-6 text-white" />
    </div>
  );
}