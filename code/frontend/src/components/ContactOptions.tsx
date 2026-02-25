
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Calendar, Briefcase, Star } from "lucide-react";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface Props {
  contactInfo: ContactInfo;
  locations: string[];
  onCallbackRequest: (time: string) => void;
}

export const ContactOptions = ({ contactInfo, locations, onCallbackRequest }: Props) => {
  return (
    <div className="space-y-6">
      {/* Direkter Kontakt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Phone className="mr-3 h-5 w-5 text-blue-700" /> Direkter Kontakt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="flex items-center">
            <Mail className="mr-3 h-4 w-4 text-gray-500" /> 
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
              {contactInfo.email}
            </a>
          </p>
          <p className="flex items-center">
            <Phone className="mr-3 h-4 w-4 text-gray-500" /> 
            {contactInfo.phone}
          </p>
          <p className="flex items-center">
            <MapPin className="mr-3 h-4 w-4 text-gray-500" /> 
            {contactInfo.address}
          </p>
        </CardContent>
      </Card>
      
      {/* Rückrufservice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="mr-3 h-5 w-5 text-blue-700" /> Rückrufservice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            Wählen Sie eine bevorzugte Zeit und wir melden uns bei Ihnen.
          </p>
          <RadioGroup onValueChange={onCallbackRequest} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Vormittags (9-12 Uhr)" id="vormittag" />
              <Label htmlFor="vormittag">Vormittags (9-12 Uhr)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nachmittags (13-17 Uhr)" id="nachmittag" />
              <Label htmlFor="nachmittag">Nachmittags (13-17 Uhr)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Flexibel" id="flexibel" />
              <Label htmlFor="flexibel">Flexibel</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      {/* Persönliches Beratungsgespräch */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Briefcase className="mr-3 h-5 w-5 text-blue-700" /> Persönliches Beratungsgespräch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            Besuchen Sie uns an einem unserer Standorte:
          </p>
          <ul className="space-y-2 text-sm">
            {locations.map((location, index) => (
              <li key={index} className="flex items-center">
                <MapPin className="mr-3 h-4 w-4 text-gray-500" /> {location}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactOptions;
