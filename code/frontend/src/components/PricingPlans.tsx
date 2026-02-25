



import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Info } from "lucide-react";

export function PricingPlans() {
  // Stripe Payment Links
  const stripeLinks = {
    basisZugang: "https://buy.stripe.com/test_dRmeVd4iachi43n9Nj2VG00",
    beraterProfileAddOn: "https://buy.stripe.com/test_8x2dR9eWOdlmarLgbH2VG02",
    audioFeatureAddOn: "https://buy.stripe.com/test_dRm28rg0Sbde9nHf7D2VG01"
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50 border-2 border-accent/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Maßgeschneiderte WissensPlattform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir verbinden Sie mit fundierten Finanzanalysen und erfahrenen Beratern für eine zukunftsorientierte Vermögensplanung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Basis-Zugang */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-slate-300 hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Basis-Zugang</h3>
                <p className="text-lg font-semibold text-gray-700">5.000 € <span className="text-sm font-normal text-gray-500">/ Jahr</span></p>
              </div>
              <div className="bg-slate-100 text-slate-700 text-xs py-1 px-3 rounded-full">Verfügbar</div>
            </div>
            <div className="h-px w-full bg-gray-200 my-4"></div>
            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>1 Berater-Profil</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Grundlegende Profilinhalte</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Standard-Kontaktformular</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Basislistung im Verzeichnis</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Self-Service Rückruf-Management</span>
              </li>
            </ul>
            <Button
              asChild
              className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-bold py-3"
              variant="outline"
              >
              <a href={stripeLinks.basisZugang} target="_blank" rel="noopener noreferrer">Jetzt buchen</a>
            </Button>
            <div className="mt-6 space-y-4">
              <p className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-2">Optionale Add-ons:</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Zusätzliche Berater-Profile (je 2)</span>
                  </div>
                  <Button asChild size="sm" variant="outline" className="text-xs">
                    <a href={stripeLinks.beraterProfileAddOn} target="_blank" rel="noopener noreferrer">1.500 €</a>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Audio-Feature für alle Inhalte</span>
                  </div>
                  <Button asChild size="sm" variant="outline" className="text-xs">
                    <a href={stripeLinks.audioFeatureAddOn} target="_blank" rel="noopener noreferrer">1.500 €</a>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">SLA-Rückruf-Management</span>
                  </div>
                  <span className="text-xs text-gray-500">1.500 €</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Unternehmensprofil mit Logo</span>
                  </div>
                  <span className="text-xs text-gray-500">1.500 €</span>
                </div>
              </div>
              <div className="mt-2 bg-slate-50 p-3 rounded-lg text-center">
                <p className="text-xs text-slate-700 font-medium">Mit dem Premium-Zugang sparen Sie 29% gegenüber den Einzelbuchungen</p>
              </div>
            </div>
          </div>

          {/* Premium-Zugang (Coming Soon) */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-500 relative hover:shadow-2xl transition-shadow transform scale-105">
            <div className="absolute top-0 right-4 -mt-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Empfohlen</div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Premium-Zugang</h3>
                <p className="text-lg font-semibold text-gray-700">10.000 € <span className="text-sm font-normal text-gray-500">/ Jahr</span></p>
              </div>
              <div className="bg-slate-100 text-slate-700 text-xs py-1 px-3 rounded-full">In Kürze</div>
            </div>
            <div className="h-px w-full bg-gray-200 my-4"></div>
            <ul className="space-y-4 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Alles aus dem Basis-Zugang</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Bis zu 5 Berater-Profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Unternehmensprofil mit Logo</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>SLA-Rückruf-Management</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Audio-Interviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Buchungsintegration</span>
              </li>
            </ul>
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Gesamtwert:</span>
                <span className="font-semibold text-gray-700">14.000 €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Sie sparen:</span>
                <span className="text-slate-700 font-semibold">4.000 € (29%)</span>
              </div>
            </div>
            <Button
              onClick={() => handleComingSoonClick("Premium-Zugang")}
              className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-bold py-3"
              variant="outline"
            >
              Interesse vormerken
            </Button>
          </div>

          {/* Unternehmens-Zugang (Coming Soon) */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-slate-300 hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Unternehmens-Zugang</h3>
                <p className="text-lg font-semibold text-gray-700">15.000 € <span className="text-sm font-normal text-gray-500">/ Jahr</span></p>
              </div>
              <div className="bg-slate-100 text-slate-700 text-xs py-1 px-3 rounded-full">In Kürze</div>
            </div>
            <div className="h-px w-full bg-gray-200 my-4"></div>
            <ul className="space-y-4 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Alle Features des Premium-Zugangs</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Unbegrenzte Berater-Profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Premium-Platzierung in Suchergebnissen</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Externe Verlinkungen zu Ihrer Website</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Analytics-Dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Zufriedenheits-Checks nach Beratung</span>
              </li>
            </ul>
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Gesamtwert:</span>
                <span className="font-semibold text-gray-700">23.000 €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Sie sparen:</span>
                <span className="text-slate-700 font-semibold">8.000 € (35%)</span>
              </div>
            </div>
            <Button
              onClick={() => handleComingSoonClick("Unternehmens-Zugang")}
              className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-bold py-3"
              variant="outline"
            >
              Interesse vormerken
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          {/* Hier könnte ein zusätzlicher Call-to-Action oder eine Information stehen */}
        </div>
        
      </div>
    </section>
  );
}
