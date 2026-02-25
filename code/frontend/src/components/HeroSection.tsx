import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative text-white py-20 md:py-32 mb-12 overflow-hidden rounded-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-dark opacity-70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-primary font-bold leading-tight md:leading-snug mb-4">
          WissensPlattform für anspruchsvolle Ziele
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 font-secondary">
          Exklusive Marktanalysen, tiefgehende Fachbeiträge und personalisierte
          Empfehlungen, die wirklich einen Unterschied für Ihr Vermögen machen.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => navigate("#")}
            className="bg-[#1A365D] text-white font-semibold hover:bg-[#1A365D]/90"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Für Vermögensinhaber
          </Button>
          <Button
            onClick={() => navigate("#")}
            variant="outline"
            className="border-white text-white font-semibold hover:bg-white hover:text-[#1A365D]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Für Finanzexperten
          </Button>
        </div>
      </div>
    </div>
  );
};
