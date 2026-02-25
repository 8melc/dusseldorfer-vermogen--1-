
// ui/src/components/AudioPageLayout.tsx
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AudioPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow relative pt-20">{children}</main>
    </div>
  );
};
