
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";

interface Services {
    digital: string[];
    events: string[];
    advisory: string[];
}

interface Props {
    services: Services;
}

const ServiceList = ({ services }: { services: string[] }) => (
  <ul className="space-y-3">
    {services.map((service, index) => (
      <li key={index} className="flex items-start">
        <CheckCircle className="h-5 w-5 text-blue-700 mr-3 mt-1 flex-shrink-0" />
        <span className="text-gray-700">{service}</span>
      </li>
    ))}
  </ul>
);

export const AdditionalServices = ({ services }: Props) => {
  return (
    <Tabs defaultValue="digital" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-blue-50">
        <TabsTrigger value="digital">Digitale Services</TabsTrigger>
        <TabsTrigger value="events">Exklusive Events & Insights</TabsTrigger>
        <TabsTrigger value="advisory">Zusätzliche Beratungsfelder</TabsTrigger>
      </TabsList>
      <TabsContent value="digital" className="mt-6">
        <ServiceList services={services.digital} />
      </TabsContent>
      <TabsContent value="events" className="mt-6">
        <ServiceList services={services.events} />
      </TabsContent>
      <TabsContent value="advisory" className="mt-6">
        <ServiceList services={services.advisory} />
      </TabsContent>
    </Tabs>
  );
};

export default AdditionalServices;
