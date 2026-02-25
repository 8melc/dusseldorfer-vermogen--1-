
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Globe, Star } from "lucide-react";

interface Benefit {
    title: string;
    description: string;
}

const benefitIcons: { [key: string]: React.ReactNode } = {
  "Maßgeschneiderte Beratung": <Star className="h-6 w-6 text-blue-700" />,
  "Globale Präsenz": <Globe className="h-6 w-6 text-blue-700" />,
  "Unabhängige Perspektive": <Briefcase className="h-6 w-6 text-blue-700" />,
};

interface Props {
    benefits: Benefit[];
}

export const CompanyBenefits = ({ benefits }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {benefits.map((benefit, index) => (
        <Card key={index} className="bg-blue-50/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-full">
                {benefitIcons[benefit.title] || <Star className="h-6 w-6 text-blue-700" />}
              </div>
              <CardTitle className="text-lg font-bold text-blue-900">{benefit.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{benefit.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompanyBenefits;
