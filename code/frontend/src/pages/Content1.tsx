import React, { useRef, useState } from "react";

const Interview: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const questionsAnswers = [
    {
      question: "Was ist die größte Herausforderung, der sich Unternehmen heute stellen müssen?",
      answer:
        "Die größte Herausforderung ist paradoxerweise oft die Komfortzone der Entscheider. In einer Welt, die sich exponentiell verändert, ist das Festhalten am Status quo der sicherste Weg in die Irrelevanz.",
    },
    {
      question: "Können Sie ein konkretes Beispiel nennen?",
      answer:
        "Ein Maschinenbauer aus dem Rheinland stand vor massivem Konkurrenzdruck durch digitale Disruptoren. Statt in Schockstarre zu verfallen, haben wir gemeinsam seine Kernkompetenzen analysiert und mit KI-Technologien verknüpft.",
    },
    {
      question: "Was ist Ihr Rat an Top-Entscheider?",
      answer:
        "Investieren Sie in Ihre persönliche Transformation. Verstehen Sie die Grundprinzipien von KI, Blockchain und Co. Die größten Chancen liegen oft jenseits der eigenen Komfortzone.",
    },
  ];

  const sidebarArticles = [
    {
      title: "KI als strategischer Wettbewerbsvorteil",
      excerpt: "Wie Unternehmen künstliche Intelligenz erfolgreich implementieren und dabei häufige Fallen vermeiden.",
    },
    {
      title: "Blockchain für Unternehmen",
      excerpt: "Praktische Anwendungsfälle der Blockchain-Technologie jenseits von Kryptowährungen.",
    },
    {
      title: "Digitale Transformation im Mittelstand",
      excerpt: "Erfolgsstrategien und Best Practices für mittelständische Unternehmen.",
    },
  ];

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Fehler beim Abspielen der Audiodatei:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="mb-8 md:flex md:gap-8">
          {/* Left Column */}
          <div className="md:w-2/3">
            {/* Hero Section */}
            <section className="bg-white p-8 rounded-lg shadow-lg text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A40]">Evolution statt Revolution</h1>
              <p className="text-lg md:text-xl text-[#B8954D] my-3">Der Schlüssel zur Zukunftsfähigkeit</p>
              <p className="text-gray-700 mb-6">
                Interview mit Christopher Peterka, Gründer und Geschäftsführer der Beratungsgesellschaft Gannaca.
              </p>

              {/* Audio Button */}
              <button
                onClick={handleAudioToggle}
                className="bg-[#B8954D] text-white py-3 px-6 rounded-full hover:bg-[#A27D3B] transition duration-300 ease-in-out shadow"
              >
                {isPlaying ? "⏸️ Pause" : "🎧 Hier das ganze Interview anhören"}
              </button>

              {/* Audio Element */}
              <audio
                ref={audioRef}
                src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/ElevenLabs_Interview_CP.mp3"
                preload="metadata"
              />
            </section>

            {/* Author Section */}
            <section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 bg-[#1A1A40] text-white p-6 rounded-lg shadow-lg mb-8 md:mb-0">
              {/* Bild mit gleichmäßigen Abständen */}
              <div className="flex justify-center items-center mb-4 sm:mb-0">
                <img
                  src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/image_cp_interview.jpeg"
                  alt="Christopher Peterka"
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">Christopher Peterka</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Innovationsstratege und Experte für digitale Transformation. Gründer und Geschäftsführer der Beratungsgesellschaft Gannaca.
                </p>
                <button className="bg-[#B8954D] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#A27D3B] transition duration-300 ease-in-out shadow">
                  Mehr über Christopher erfahren
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 overflow-y-auto">
            <h3 className="text-xl font-semibold text-[#1A1A40] mb-6">Weitere Insights zum Thema</h3>
            {sidebarArticles.map((article, index) => (
              <div key={index} className="bg-[#F5F1EB] p-4 rounded-md shadow mb-4 cursor-pointer hover:bg-[#EDE9E3] transition-shadow">
                <h4 className="font-semibold text-[#1A1A40]">{article.title}</h4>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
              </div>
            ))}
          </aside>
        </div>

        {/* Bottom Section */}
        <div className="mt-8">
          {/* Quote Section */}
          <section className="bg-[#1A1A40] text-white p-6 rounded-lg shadow-lg mb-8 italic text-center">
            „ES GEHT NICHT DARUM, ALLES ÜBER BORD ZU WERFEN, SONDERN SCHRITTWEISE NEUE KOMPETENZEN AUFZUBAUEN.“
          </section>

          {/* Interview Questions */}
          <div>
            {questionsAnswers.map((item, index) => (
              <div key={index} className="bg-white border-l-4 border-[#B8954D] p-4 mb-4 shadow rounded-r-lg">
                <h4 className="font-semibold text-[#1A1A40] mb-1">{item.question}</h4>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;