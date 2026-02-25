import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const PiaKemperLinkCard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/PiaKemperProfile");
  };

  const profile = {
    name: "Pia Kemper",
    title: "Leitung Finanz- und Wirtschafts-Extras, Rheinische Post Mediengruppe",
    imageUrl: "https://www.rp-forum.de/wp-content/uploads/2015/04/Pia-Kemper.jpg",
  };

  return (
    <Card className="w-full max-w-sm bg-[#1A202C] text-white rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
      <div className="relative h-56 sm:h-64">
        <img 
          src={profile.imageUrl} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      <CardContent className="p-6 text-center space-y-4">
        <Avatar className="w-24 h-24 mx-auto -mt-16 border-4 border-[#1A202C] shadow-lg">
          <AvatarImage src={profile.imageUrl} alt={profile.name} />
          <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
          <p className="text-sm text-gray-300">{profile.title}</p>
        </div>
        <Button
          onClick={handleNavigate}
          variant="outline"
          className="w-full bg-transparent border-white text-white hover:bg-white hover:text-[#1A202C] transition-colors duration-300"
        >
          Profil ansehen
        </Button>
      </CardContent>
    </Card>
  );
};
