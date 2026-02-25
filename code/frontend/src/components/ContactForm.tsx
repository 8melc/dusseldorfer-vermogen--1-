
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
    name: string;
    phone: string;
    email: string;
    time: string;
    message: string;
}

interface Props {
    onSubmit: (data: FormData) => void;
    callbackTime?: string;
    showForm: boolean;
}

export const ContactForm = ({ onSubmit, callbackTime = "", showForm }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    time: callbackTime,
    message: ""
  });

  useEffect(() => {
    if (callbackTime) {
      setFormData(prev => ({ ...prev, time: callbackTime }));
    }
  }, [callbackTime]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!showForm) {
    return null;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 transition-all duration-500">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ihr Name"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Ihre Telefonnummer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Ihre E-Mail-Adresse"
          />
        </div>
      </div>
      
      {callbackTime && (
        <Card className="bg-white/70 p-3">
          <CardContent className="p-0">
            <p className="text-sm">
              <strong>Gewünschte Rückrufzeit:</strong> {callbackTime}
            </p>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="message">Nachricht (optional)</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          placeholder="Ihre Nachricht an uns"
        />
      </div>
      
      <div>
        <Button 
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800"
        >
          Anfrage senden
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
