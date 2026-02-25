// Profil-Editor Komponente
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Save, Settings, Heart, MessageSquare, Link } from "lucide-react";

// Noomedia Farbschema - angepasst an Rheinberg Privatbank Farben
const colors = {
  primary: "#8B7355",     // Rheinberg Bronze
  primaryHover: "#76614A", // Dunkleres Bronze für Hover
  dark: "#1a1a1a",        // Dunkles Schwarz
  light: "#F5F5F5",       // Hellgrau für Hintergründe
  white: "#FFFFFF",       // Weiß
  primaryLight: "#8B735520", // Transparentes Bronze für Hintergründe
  border: "#8B735530"     // Für Ränder
};

const ProfileEditor = () => {
  const [profileData, setProfileData] = useState({
    name: "Melissa Conrads",
    bio: "",
    interests: ["nachfolge", "kunst", "esg", "finanzen"],
    aiTone: "du",
    aiStyle: "freundlich",
    aiRole: "coach",
    preferences: {
      newsletter: true,
      audio: false,
      articles: true,
      contact: "email"
    }
  });

  const handleSave = () => {
    toast.success("Ihr Profil wurde erfolgreich gespeichert");
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{color: colors.dark}}>
          Profil anpassen
        </h1>
        <Avatar className="w-16 h-16 border-2" style={{borderColor: colors.primary}}>
          <AvatarImage src="/avatars/melissa.jpg" />
          <AvatarFallback style={{backgroundColor: colors.primaryLight}}>MC</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Hier folgen die Formularfelder entsprechend der Struktur */}
      
      <div className="mt-8">
        <Button 
          className="w-full py-6 text-lg font-semibold flex items-center justify-center gap-3"
          style={{
            backgroundColor: colors.primary, 
            color: colors.white,
            borderRadius: "9999px"
          }}
          onClick={handleSave}
        >
          <Save className="w-5 h-5" />
          Profil speichern
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditor;
