

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
    text: string;
    author: string;
}

interface Props {
    testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: Props) => {
  return (
    <div className="space-y-8">
      {testimonials.map((testimonial, index) => {
        const [initial, ...rest] = testimonial.author.split(" - ");
        const description = rest.join(" - ");

        return (
          <Card key={index} className="bg-slate-50/90 border border-blue-200/50 rounded-lg shadow-sm hover:shadow-md transition-shadow relative p-6">
            <div className="absolute top-4 left-5 text-8xl text-blue-100 font-serif opacity-80 z-0 select-none">
              “
            </div>
            <div className="relative z-10">
              <blockquote className="italic text-slate-700 text-lg ml-8">
                "{testimonial.text}"
              </blockquote>
              <div className="flex items-center mt-6 ml-8">
                <Avatar className="h-10 w-10 bg-slate-200 border-2 border-white">
                  <AvatarFallback className="text-blue-900 font-semibold">{initial}</AvatarFallback>
                </Avatar>
                <p className="ml-4 text-slate-600 text-sm font-medium">
                  — {description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Testimonials;
