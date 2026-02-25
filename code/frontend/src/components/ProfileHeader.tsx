import React from "react";
import { useCurrentUser } from "app";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Generates avatar initials from a full name.
 * Examples:
 * - "Melissa Conrads" → "MC"
 * - "John" → "J"
 * - "" → "??"
 */
const getInitials = (fullName: string | null | undefined): string => {
  if (!fullName || fullName.trim() === "") {
    return "??";
  }
  
  const parts = fullName.trim().split(/\s+/);
  const initials = parts
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  
  return initials || "??";
};

interface ProfileHeaderProps {
  className?: string;
}

export default function ProfileHeader({ className = "" }: ProfileHeaderProps) {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();
  
  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 animate-pulse" />
          <div>
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  
  // Extract name from Firebase user object
  const fullName = user?.displayName || user?.email?.split("@")[0] || "";
  const initials = getInitials(fullName);
  
  const greeting = fullName 
    ? `Willkommen zurück, ${fullName}` 
    : "Willkommen zurück";

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left: Avatar + Greeting */}
      <div className="flex items-center gap-4">
        {/* Avatar with Initials */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white text-lg font-semibold shadow-md">
          {initials}
        </div>
        
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{greeting}</h2>
          <p className="text-sm text-slate-600">Ihr persönlicher Dashboard-Überblick</p>
        </div>
      </div>
      
      {/* Right: Settings Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/profile-settings")}
        className="flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        Einstellungen
      </Button>
    </div>
  );
}
