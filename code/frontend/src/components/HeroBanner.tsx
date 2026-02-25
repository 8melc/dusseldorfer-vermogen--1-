// ui/src/components/HeroBanner.tsx
import React from "react";

interface HeroBannerProps {
  /** Hauptüberschrift – z. B. “Trusted Advisors” */
  title: string;
  /** Optionale Subline unterhalb des Titels */
  subtitle?: string;
  /** Höhe in Pixel    (Default: 300)   */
  height?: number;
}

/**
 * Wiederverwendbarer Seiten-Banner.
 * Blendet festen Background ein, legt ein dunkles Overlay darüber
 * und setzt Title / Subtitle zentriert links.
 */
export default function HeroBanner({
  title,
  subtitle,
  height = 300,
}: HeroBannerProps) {
  const BG =
    "https://cdn.midjourney.com/f302a578-6cf8-4183-8cbe-ba2eb3d77434/0_1.png";

  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})`, height }}
    >
      {/* dunkel-blaues Overlay */}
      <div className="absolute inset-0 bg-[#001732]/70 mix-blend-multiply" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
