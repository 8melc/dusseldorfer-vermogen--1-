import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Advisor } from "types";
import { ArrowRight } from "lucide-react";

interface PremiumAdvisorCardProps {
  advisor: Advisor;
  onContactRequest: () => void;
  onSaveInterest: () => void;
}

const PLACEHOLDER_AVATAR =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=240&q=80";

export const PremiumAdvisorCard: React.FC<PremiumAdvisorCardProps> = ({
  advisor,
  onContactRequest,
  onSaveInterest,
}) => {
  const isEsgCertified = advisor.tags?.includes("ESG");
  const avatarSrc = advisor.avatarUrl || PLACEHOLDER_AVATAR;

  // Map advisor IDs to their profile pages
  const getProfilePath = (advisorId: string) => {
    const profileMap: Record<string, string> = {
      "markus-voss": "/dr-markus-voss-profile-page",
      "rb-001": "/dr-markus-voss-profile-page",
      // Add more mappings as needed
    };
    return profileMap[advisorId] || null;
  };

  const profilePath = getProfilePath(advisor.id);

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-24 w-24 rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-50">
            <img
              src={avatarSrc}
              alt={advisor.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="relative">
            <h3 className="text-xl font-bold text-gray-800">{advisor.name}</h3>
            {advisor.premium && (
              <div className="absolute -top-2 -right-4">
                <Badge className="bg-[#C8A96F] text-white">Premium</Badge>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600">{advisor.title}</p>

          <Link
            to={`/corporate-profile?bank=${encodeURIComponent(advisor.bank)}`}
            className="text-sm font-semibold text-gray-800 hover:underline"
          >
            {advisor.bank}
          </Link>

          <p className="text-xs text-gray-500">{advisor.location}</p>

          {isEsgCertified && (
            <Badge className="bg-green-100 text-green-800">ESG-zertifiziert</Badge>
          )}
        </div>

        {advisor.focusAreas?.length ? (
          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
              Spezialisierung
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {advisor.focusAreas.map((spec, i) => (
                <Badge key={i} variant="outline" className="text-gray-700">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        {advisor.excerpt && (
          <p className="mt-6 text-sm leading-relaxed text-gray-600">{advisor.excerpt}</p>
        )}

        <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-6">
          {profilePath && (
            <Link to={profilePath}>
              <Button
                variant="outline"
                className="w-full border-[#0B0E28] text-[#0B0E28] hover:bg-[#0B0E2810] group"
              >
                Profil ansehen
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
          <Button
            onClick={onContactRequest}
            className="w-full bg-[#C8A96F] text-white hover:bg-[#B69960]"
          >
            Rückrufbitte
          </Button>
          <Button
            variant="outline"
            onClick={onSaveInterest}
            className="w-full border-[#C8A96F] text-[#C8A96F] hover:bg-gray-100"
          >
            Interesse speichern
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
