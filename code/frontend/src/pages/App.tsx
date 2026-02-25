import { TestimonialHighlight } from "components/TestimonialHighlight";
import React from "react";
import { Features } from "components/Features";
// import { PricingPlans } from "components/PricingPlans";
import { PhilosophyGrid } from "components/PhilosophyGrid";
import { Hero } from "components/Hero";

export default function Home() {
  return (
    <main className="w-full m-0 p-0">
      <section id="hero-section">
        <Hero />
      </section>
      <section id="philosophy-section">
        <PhilosophyGrid />
      </section>
      <section id="features-section" className="overflow-hidden m-0 p-0">
        <Features />
      </section>
      <section id="testimonial-section">
        <TestimonialHighlight />
      </section>
      {/* <PricingPlans /> */}
    </main>
  );
}