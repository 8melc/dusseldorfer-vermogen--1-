// components/ContactRequestModal.tsx
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Advisor } from "types";

interface ContactRequestModalProps {
  advisor: Advisor;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ContactRequestModal: React.FC<ContactRequestModalProps> = ({
  advisor,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredTime: "vormittags"
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Fehler zurücksetzen wenn Feld bearbeitet wird
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validierung
    const newErrors = {
      name: !formData.name,
      email: !formData.email || !/\\S+@\\S+\\.\\S+/.test(formData.email),
      phone: !formData.phone
    };
    
    setErrors(newErrors);
    
    // Wenn keine Fehler, dann submitten
    if (!Object.values(newErrors).some(Boolean)) {
      onSubmit({
        ...formData,
        advisorId: advisor.id,
        advisorName: advisor.name,
        timestamp: new Date().toISOString()
      });
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rückrufbitte an {advisor.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-xs">Bitte geben Sie Ihren Namen ein</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
              E-Mail *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-xs">Bitte geben Sie eine gültige E-Mail-Adresse ein</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>
              Telefon *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-xs">Bitte geben Sie Ihre Telefonnummer ein</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredTime">Bevorzugte Rückrufzeit</Label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="vormittags">Vormittags (9-12 Uhr)</option>
              <option value="nachmittags">Nachmittags (13-17 Uhr)</option>
              <option value="flexibel">Flexibel</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Ihre Nachricht (optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Worüber möchten Sie sprechen?"
              className="resize-none"
              rows={3}
            />
          </div>
          
          <DialogFooter className="flex justify-between gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" className="bg-[#C8A96F] hover:bg-[#B69960]">
              Rückruf anfordern
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
