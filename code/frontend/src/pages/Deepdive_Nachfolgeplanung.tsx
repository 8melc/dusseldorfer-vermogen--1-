import React, { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useNavigate } from 'react-router-dom'; // Hinzugefügt
import DataButton from '@/components/DataButton';
import { Header } from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";

Chart.register(...registerables);

// ChartComponent mit automatischem Cleanup
const ChartComponent = ({ id, type, data, options }: {
  id: string;
  type: "bar" | "doughnut";
  data: any;
  options?: any;
}) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    if (!ctx) return;
    chartRef.current = new Chart(ctx, { type, data, options });
    return () => chartRef.current?.destroy();
  }, [id, type, JSON.stringify(data), JSON.stringify(options)]);

  return <canvas id={id} className="w-full h-48" />;
};

export default function DeepdivePage() {
  const sections = [
    { key: "einleitung", title: "1. Einleitung" },
    { key: "marktanalyse", title: "2. Marktanalyse & Trends" },
    { key: "fallbeispiele", title: "3. Fallbeispiele" },
    { key: "strategien", title: "4. Strategien & Handlungsempfehlungen" },
    { key: "steuerliche_optimierung", title: "5. Steuerliche Optimierung" },
    { key: "esg_investments", title: "6. Nachfolgeplanung & ESG-Investments" },
    { key: "abschluss_cta", title: "7. Abschluss & Call-to-Action" },
  ] as const;
  type SectionKey = typeof sections[number]["key"];
  const [active, setActive] = useState<SectionKey>("einleitung");

  // Chart-Daten
  const marketData = {
    labels: ["2019","2020","2021","2022","2023","2024","2025"],
    datasets: [
      { label: "Unternehmen in Nachfolge", data: [150,160,180,200,220,240,250], backgroundColor: "#C8A96F" }
    ]
  };
  const assetsData = {
    labels: ["Liquide", "Illiquide"],
    datasets: [
      { data: [40,60], backgroundColor: ["#C8A96F","#1A1A40"] }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] py-16 px-4">
      <HeroBanner
        title="Deep Dive: Nachfolgeplanung 2025 – Ihre Zukunft gestalten"
        subtitle="Strategien, Zahlen & nachhaltige Modelle im Überblick"
        height={280}
      />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-12">
        {/* Navigation */}
        <nav className="space-y-2 sticky top-24">
          {sections.map(sec => (
            <DataButton
              key={sec.key}
              label={sec.title}
              variant={active === sec.key ? 'solid' : 'outline'}
              className={`w-full text-left ${active === sec.key ? 'bg-[#D4CBB5]' : 'bg-white'} text-[#1A1A40] transition min-h-[4rem] p-3 whitespace-normal break-words flex items-start justify-start`}
              panelContent={null}
              onClick={() => setActive(sec.key)}
            />
          ))}
        </nav>

        {/* Inhalte */}
        <div className="space-y-12">
          {active === "einleitung" && (
            <section className="bg-white p-8 rounded-lg shadow">
              <h1 className="text-3xl font-bold text-[#1A1A40] mb-6">
                Einleitung – Warum Nachfolgeplanung 2025 entscheidend ist
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Die Unternehmensnachfolge in Deutschland steht vor einem historischen Umbruch. Über 250.000 Unternehmen müssen bis 2025 eine Nachfolgelösung finden. Die Übergabe des Lebenswerks erfordert nicht nur eine strategische Planung, sondern auch ein tiefes Verständnis für steuerliche, finanzielle und emotionale Aspekte.
              </p>
              <h2 className="text-2xl font-semibold text-[#1A1A40] mb-4">Doch was passiert, wenn kein Nachfolger gefunden wird?</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 pl-4">
                <li>67 % der Unternehmer über 55 Jahre haben noch keinen klaren Nachfolgeplan.</li>
                <li>30 % der Betriebe stehen vor der Schließung, weil es keinen Nachfolger gibt.</li>
                <li>20 % der Unternehmen planen einen Notverkauf – ein drastischer Schritt, der oft unter Wert erfolgt.</li>
              </ul>
              <p className="text-lg text-gray-700 mb-8 font-semibold">
                Die zentrale Frage lautet: Wie kann der Übergang so gestaltet werden, dass das Lebenswerk erhalten bleibt und gleichzeitig steuerliche Vorteile genutzt werden?
              </p>
              {/* Balkendiagramm - bleibt vorerst erhalten */}
              <ChartComponent id="chart-einleitung" type="bar" data={marketData}
                options={{ responsive: true, plugins: { legend: { display: false } } }}
              />
            </section>
          )}

          {active === "esg_investments" && (
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-[#1A1A40] mb-6">
                Nachfolgeplanung & ESG-Investments – Nachhaltig Werte sichern
              </h2>
              <p className="text-gray-700 mb-6">
                ESG-Kriterien (Umwelt, Soziales, Governance) gewinnen in der Vermögensanlage an Bedeutung.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Vorteile von ESG-Investments:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  <li>Risikomanagement: Reduktion von Reputationsrisiken.</li>
                  <li>Renditechancen: Nachhaltige Geschäftsmodelle sind oft resilienter.</li>
                  <li>Werterhalt: Langfristige Sicherung des Vermögens durch zukunftsorientierte Anlagen.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Integration in die Nachfolgeplanung:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  <li>Vermögensübergabe mit Sinn: Junge Generationen legen Wert auf nachhaltige Anlagen.</li>
                  <li>ESG-konforme Stiftungen: Förderung gemeinnütziger Zwecke.</li>
                  <li>Impact Investing: Gezielte Investitionen in soziale und ökologische Projekte.</li>
                </ul>
              </div>
            </section>
          )}

          {active === "marktanalyse" && (
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-[#1A1A40] mb-6">
                Marktanalyse und Trends – Der Nachfolgestau in Deutschland
              </h2>
              {/* Accordion Abschnitt: Demografischer Wandel und Nachfolgestau */}
              <details className="mb-6 group" open>
                <summary className="flex justify-between items-center px-4 py-3 bg-[#F5F1EB] rounded-md group-open:bg-[#D4CBB5] transition cursor-pointer">
                  <span className="font-medium text-[#1A1A40]">Demografischer Wandel und Nachfolgestau</span>
                  <span className="text-lg transform group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <div className="mt-4 px-4 text-gray-700 space-y-4">
                  <p>
                    Die Altersstruktur in Deutschland hat sich in den letzten Jahren drastisch verändert. Während die Gruppe der über 55-Jährigen um 23 % wächst, stagniert die Nachfolgegeneration.
                    Die Folge: Ein Nachfolgestau, der besonders den Mittelstand betrifft.
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A1A40] mb-2">Daten und Fakten:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>40 % der Unternehmer haben keine klar definierte Nachfolgeregelung.</li>
                      <li>25 % der Familienunternehmen droht die Schließung – ein Verlust an Arbeitsplätzen und Know-how.</li>
                      <li>15 % der Firmen müssen aus Mangel an Nachfolgern unter Wert verkauft werden.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A1A40] mb-2">Konsequenzen:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Wertverlust: Notverkäufe führen oft zu einem Verlust von bis zu 30 % des Unternehmenswerts.</li>
                      <li>Liquidationsrisiko: Vor allem kleine Unternehmen und Betriebe in ländlichen Regionen sind besonders gefährdet.</li>
                      <li>Know-how-Verlust: Der Verlust langjähriger Mitarbeiter und Führungskräfte schwächt die Wettbewerbsfähigkeit.</li>
                    </ul>
                  </div>
                  {/* Donut-Diagramm - bleibt vorerst erhalten */}
                  <div className="mt-6">
                     <ChartComponent id="chart-assets" type="doughnut" data={assetsData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                  </div>
                </div>
              </details>

          {/* Fallbeispiele werden in der nächsten Sektion behandelt, daher hier entfernt */}
            </section>
          )}

          {active === "fallbeispiele" && (
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-[#1A1A40] mb-6">
                Fallbeispiele: Hauck Aufhäuser Lampe & Bethmann Bank
              </h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Hauck Aufhäuser Lampe:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  <li>Family Office Modelle: Hauck Aufhäuser Lampe bietet umfassende Vermögensstrukturierungen an, die sowohl Betriebsvermögen als auch private Vermögenswerte umfassen.</li>
                  <li>ESG-Investments: Nachhaltige Investments als strategisches Element der Nachfolgeplanung.</li>
                  <li>Nachfolgestiftungen: Gründung von Stiftungen, um Pflichtteilsansprüche zu minimieren und den Fortbestand des Unternehmens zu sichern.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Bethmann Bank:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  <li>Doppelstiftungen: Die Bank setzt auf eine Kombination aus gemeinnützigen und privatnützigen Stiftungen, um Betriebsvermögen steuerlich begünstigt zu übertragen.</li>
                  <li>Hybride Nachfolgemodelle: Teilverkauf an externe Investoren und Teilübertragung an die nächste Generation.</li>
                  <li>Digitalisierung: Nutzung digitaler Plattformen zur Verwaltung von Nachfolgeplänen und zur Kommunikation mit Nachfolgern.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Lerneffekt:</h3>
                <p className="text-gray-700">
                  Die führenden Privatbanken setzen auf hybride Modelle, die Vermögenssicherung und steuerliche Optimierung kombinieren. Dabei spielen ESG-Investments eine zentrale Rolle, um nachhaltige Renditen zu erzielen.
                </p>
              </div>
            </section>
          )}

          {active === "strategien" && (
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-[#1A1A40] mb-6">
                Strategien & Handlungsempfehlungen – Ihre Nachfolge aktiv gestalten
              </h2>

              {/* Vermögensstrukturierung */}
              <details className="mb-6 group" open>
                <summary className="flex justify-between items-center px-4 py-3 bg-[#F5F1EB] rounded-md group-open:bg-[#D4CBB5] transition cursor-pointer">
                  <span className="font-medium text-[#1A1A40]">Vermögensstrukturierung – Was bleibt, was geht?</span>
                  <span className="text-lg transform group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <div className="mt-4 px-4 text-gray-700 space-y-4">
                  <p>
                    Die Strukturierung des Vermögens ist ein zentrales Element der Nachfolgeplanung. Es geht darum, steuerliche Vorteile zu nutzen und gleichzeitig Liquidität für Erben und Nachfolger zu sichern.
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A1A40] mb-2">Family Holding Modelle:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Gründung einer Holding, die Betriebsvermögen und private Vermögenswerte bündelt.</li>
                      <li>Steuerliche Vorteile durch Thesaurierung von Gewinnen.</li>
                      <li>Schutz vor Zersplitterung des Unternehmens durch Minderheitsbeteiligungen.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A1A40] mb-2">Stiftungsmodelle:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Familienstiftung: Überführung von Betriebsvermögen in eine Stiftung, um Pflichtteilsansprüche zu minimieren.</li>
                      <li>Doppelstiftung: Kombination aus privatnütziger und gemeinnütziger Stiftung – steuerlich begünstigt.</li>
                      <li>Nießbrauchrechte: Der Seniorchef bleibt wirtschaftlicher Nutznießer, während die Anteile bereits auf die Nachfolger übergehen.</li>
                    </ul>
                  </div>
                </div>
              </details>
              
              {/* Weitere Accordions für "Steuerliche Optimierung" und "ESG-Investments" werden in separaten Sektionen behandelt */}
            </section>
          )}

          {active === "steuerliche_optimierung" && (
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-[#1A1A40] mb-6">
                Steuerliche Optimierung – Mehr als eine Zahl
              </h2>
              <p className="text-gray-700 mb-6">
                Die Erbschaftsteuerreform 2024 hat den Spielraum für steuerliche Gestaltungsmöglichkeiten erweitert. Dennoch ist der steuerliche Druck für große Vermögen erheblich.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Optimierungsmöglichkeiten:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  <li>Schenkungssteuer-Staffelung: Übertragung von Vermögenswerten in 10-Jahres-Intervallen, um Freibeträge mehrfach auszuschöpfen.</li>
                  <li>Thesaurierungsbegünstigungen: Gewinne in der Holding reinvestieren, statt sie sofort auszuschütten.</li>
                  <li>Nießbrauchrechte: Steuerfreie Übertragungen bei gleichzeitiger Einkommenssicherung für den Seniorchef.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1A1A40] mb-3">Erbschaftsteuerreform 2024 – Die wichtigsten Änderungen:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  <li>Erhöhung der Freibeträge für Unternehmensnachfolger auf 500.000 Euro.</li>
                  <li>Einführung einer Mindestbesteuerung für große Betriebsvermögen.</li>
                  <li>Anpassung der Lohnsummenregelung, um kleine Unternehmen zu entlasten.</li>
                </ul>
              </div>
            </section>
          )}

          {active === "abschluss_cta" && (
            <section className="bg-[#1A1A40] text-[#F5F1EB] p-8 rounded-lg shadow text-center">
              <h2 className="text-3xl font-bold mb-4">Abschluss & Call-to-Action – Ihre Zukunft aktiv gestalten</h2>
              <p className="mb-6 text-lg">
                Die Nachfolgeplanung ist ein Marathon, kein Sprint. Beginnen Sie frühzeitig, um alle Optionen sorgfältig zu prüfen.
              </p>
              <p className="mb-8 text-lg">
                Kontaktieren Sie uns für eine individuelle Beratung.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <DataButton
                  label="Jetzt Erstgespräch vereinbaren"
                  variant="solid"
                  panelContent={ // Placeholder, da keine spezifische Aktion definiert wurde
                    <div className="p-4 bg-white text-gray-800 rounded shadow-lg">
                      <p className="font-semibold">Kontaktinformationen:</p>
                      <p>Telefon: [Ihre Telefonnummer]</p>
                      <p>E-Mail: [Ihre E-Mail-Adresse]</p>
                      <p>Wir freuen uns auf Ihre Kontaktaufnahme!</p>
                    </div>
                  }
                  className="bg-[#C8A96F] hover:bg-[#B08D57] text-[#1A1A40] transition duration-150 ease-in-out w-full sm:w-auto"
                />
                <DataButton
                  label="Zu den Trusted Advisors"
                  variant="outline" // Outline, da sekundärer CTA
                  onClick={() => navigate("/TrustedAdvisorsPage")} // Annahme: Navigation zur TrustedAdvisorsPage
                  className="border-[#C8A96F] text-white hover:bg-[#C8A96F] hover:text-[#1A1A40] transition duration-150 ease-in-out w-full sm:w-auto"
                  panelContent={null}
                />
              </div>
               <p className="mt-8 text-lg">
                Erfahren Sie mehr über unsere Trusted Advisors und deren Expertise.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
