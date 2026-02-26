import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, TrendingUp, Palette, Network, Trophy, Scale, Building2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface PhilosophyCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const PHILOSOPHY_CARDS: PhilosophyCardProps[] = [
  {
    number: 1,
    title: "Internationales Dorf",
    description: "Wir pflegen das internationale Dorf als Heimat von Toleranz und Weltoffenheit, um ein Fundament für globalen Austausch und gegenseitiges Verständnis zu schaffen.",
    icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_01_internationales_dorf_silhouetten.jpg"
  },
  {
    number: 2,
    title: "Persönliche Beziehungen",
    description: "Wir begreifen persönliche Beziehungen als Kernbestandteil unserer Arbeit und setzen auf langfristige Partnerschaften, die auf Vertrauen und Integrität basieren.",
    icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_02_persoenliche_beziehungen_handschlag.jpg"
  },
  {
    number: 3,
    title: "Nachhaltiger Beitrag",
    description: "Wir leisten einen nachhaltigen Beitrag zum Erhalt und zur Steigerung der Lebensqualität sowie des Wohlstands unserer Kunden durch maßgeschneiderte Finanzlösungen.",
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_03_nachhaltiger_beitrag_daemmerung.jpg"
  },
  {
    number: 4,
    title: "Kunst & Kultur",
    description: "Kunst und Kultur in unserem Stadtraum haben für uns einen besonderen Stellenwert als kreativer Mehrwert und Inspirationsquelle für Innovation und gesellschaftlichen Fortschritt.",
    icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_04_kunst_kultur_architektur.jpg"
  },
  {
    number: 5,
    title: "Professionelles Netzwerken",
    description: "Wir verstehen Netzwerken als professionellen Bestandteil unseres gemeinsamen Handelns, um Synergien zu schaffen und Expertise zum Vorteil unserer Kunden zu bündeln.",
    icon: <Network className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_05_netzwerken_meeting.jpg"
  },
  {
    number: 6,
    title: "Internationaler Wettbewerb",
    description: "Wir nutzen den internationalen Wettbewerb als Ansporn, vor Ort Höchstleistungen für unsere Kunden zu erbringen und uns kontinuierlich weiterzuentwickeln.",
    icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_06_wettbewerb_lichtstrahlen.jpg"
  },
  {
    number: 7,
    title: "Balance & Transparenz",
    description: "Wir halten die Balance zwischen Diskretion und Offenheit, um das Vertrauen unserer Kunden zu wahren und gleichzeitig Transparenz in unserem Handeln zu gewährleisten.",
    icon: <Scale className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_07_transparenz_auge_digital.jpg"
  },
  {
    number: 8,
    title: "Regionale Investitionen",
    description: "Wir fördern Investitionen in regionale Unternehmen und lokale Immobilien-Assets, um nachhaltiges Wachstum und die Stärkung des Wirtschaftsstandorts zu unterstützen.",
    icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_08_regional_klassisches_gebaeude.jpg"
  }
];

export type Props = {};

export const PhilosophyGrid: React.FC<Props> = (props) => {
  const [viewState, setViewState] = useState<'main' | 'grid' | 'detail'>('main');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay || viewState !== 'detail') return;
    
    const interval = setInterval(() => {
      const currentIndex = PHILOSOPHY_CARDS.findIndex(card => card.number === selectedCard);
      const nextIndex = currentIndex === PHILOSOPHY_CARDS.length - 1 ? 0 : currentIndex + 1;
      handleCardClick(PHILOSOPHY_CARDS[nextIndex].number);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay, selectedCard, viewState]);

  const handleMainClick = () => {
    setViewState('grid');
  };

  const handleCardClick = (cardNumber: number) => {
    setSelectedCard(cardNumber);
    setViewState('detail');
    setAutoPlay(false);
  };

  const handleBack = () => {
    if (viewState === 'detail') {
      setAutoPlay(false);
      setSelectedCard(null);
      setViewState('grid');
    } else if (viewState === 'grid') {
      setViewState('main');
    }
  };

  const handlePrevious = () => {
    const currentIndex = PHILOSOPHY_CARDS.findIndex(card => card.number === selectedCard);
    const prevIndex = currentIndex === 0 ? PHILOSOPHY_CARDS.length - 1 : currentIndex - 1;
    handleCardClick(PHILOSOPHY_CARDS[prevIndex].number);
  };

  const handleNext = () => {
    const currentIndex = PHILOSOPHY_CARDS.findIndex(card => card.number === selectedCard);
    const nextIndex = currentIndex === PHILOSOPHY_CARDS.length - 1 ? 0 : currentIndex + 1;
    handleCardClick(PHILOSOPHY_CARDS[nextIndex].number);
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const selectedCardData = selectedCard ? PHILOSOPHY_CARDS[selectedCard - 1] : null;

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <AnimatePresence mode="wait">
        {/* Main Phil Hero View */}
        {viewState === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative min-h-screen flex items-center justify-center cursor-pointer group"
            onClick={handleMainClick}
          >
            <div className="absolute inset-0 w-full h-full z-0">
              <motion.div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(/images/henki-J53aYMclSTw-unsplash.jpg)",
                }}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: 1.08,
                  transition: { 
                    duration: 12, 
                    ease: "easeOut" 
                  }
                }}
                whileHover={{ 
                  scale: 1.12,
                  transition: { 
                    duration: 2, 
                    ease: "easeOut" 
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-700" />
            </div>
            
            {/* Scroll Indicator */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer z-20 group"
              style={{ 
                top: '5%'
              }}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              onClick={(e) => {
                e.stopPropagation();
                scrollToNextSection();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-10 sm:w-8 sm:h-14 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5 sm:pt-4 group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
                <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300" />
              </div>
            </motion.div>
            
            {/* Content Container */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-full text-center px-4 sm:px-6" 
                     style={{ 
                       bottom: '10%',
                       top: 'auto'
                     }}>
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-4xl mx-auto"
                  >
                    <img
                      src="/images/logo_investmentphilosophie_900x350.png"
                      alt="Die Kölner Investmentphilosophie"
                      className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto mx-auto mb-6 sm:mb-8 md:mb-10"
                      style={{
                        filter: 'brightness(0) invert(1) drop-shadow(0 4px 16px rgba(0,0,0,0.5))'
                      }}
                    />
                    <p className="text-white/90 font-light mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-sm sm:text-base md:text-lg lg:text-xl"
                       style={{ 
                         lineHeight: '1.4',
                         textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                         letterSpacing: '0.02em'
                       }}>
                      Acht Thesen, die unser Handeln leiten und die Basis für nachhaltigen<br className="hidden sm:inline" />
                      Erfolg und vertrauensvolle Partnerschaften bilden.
                    </p>
                    
                    <motion.button
                      className="inline-flex items-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 font-medium backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-500 pointer-events-auto text-xs sm:text-sm md:text-base"
                      style={{ 
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMainClick();
                      }}
                    >
                      Philosophie erkunden
                      <motion.div 
                        className="ml-2 sm:ml-3"
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid View */}
        {viewState === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: 'hsl(38, 29%, 95%)' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.button
                onClick={handleBack}
                className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex items-center text-sm sm:text-base lg:text-lg font-medium px-3 sm:px-4 lg:px-6 py-2 sm:py-3 transition-all duration-500"
                style={{ 
                  color: 'hsl(224, 71%, 21%)',
                  backgroundColor: 'transparent',
                  border: '1px solid hsl(224, 71%, 21%)/20',
                  borderRadius: '6px'
                }}
                whileHover={{ 
                  backgroundColor: 'hsl(224, 71%, 21%)/5',
                  transform: 'translateX(-5px)' 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="mr-2" size={18} />
                Zurück zur Übersicht
              </motion.button>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif mb-3 sm:mb-4 md:mb-6 px-2" 
                    style={{ color: 'hsl(224, 71%, 21%)' }}>
                  Acht Grundpfeiler unserer Philosophie
                </h2>
                <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4" 
                   style={{ color: 'hsl(224, 71%, 21%)', opacity: 0.8 }}>
                  Klicken Sie auf eine Karte, um mehr zu erfahren
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                {PHILOSOPHY_CARDS.map((card, index) => (
                  <motion.div
                    key={card.number}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    onMouseEnter={() => setHoveredCard(card.number)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCardClick(card.number)}
                    className="group cursor-pointer"
                  >
                    <motion.div 
                      className="relative h-48 sm:h-56 md:h-60 lg:h-64 flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8"
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid hsl(38, 29%, 90%)'
                      }}
                      whileHover={{ 
                        y: -12,
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                      }}
                    >
                      <motion.div
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4 md:mb-6"
                        style={{ color: 'hsl(41, 45%, 63%)' }}
                        animate={hoveredCard === card.number ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.number.toString().padStart(2, '0')}
                      </motion.div>

                      <motion.div 
                        className="mb-3 sm:mb-4 md:mb-6"
                        style={{ color: 'hsl(224, 71%, 21%)' }}
                        animate={hoveredCard === card.number ? { y: -5 } : { y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.icon}
                      </motion.div>

                      <h3 className="text-base sm:text-lg lg:text-xl font-serif leading-tight" 
                          style={{ color: 'hsl(224, 71%, 21%)' }}>
                        {card.title}
                      </h3>

                      <motion.div
                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={hoveredCard === card.number ? 
                          { opacity: 1, y: 0 } : 
                          { opacity: 0, y: 10 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-xs sm:text-sm font-medium flex items-center"
                             style={{ color: 'hsl(41, 45%, 63%)' }}>
                          Mehr erfahren →
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Detail View */}
        {viewState === 'detail' && selectedCardData && (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8"
            style={{ backgroundColor: 'hsl(38, 29%, 95%)' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative mb-4 sm:mb-6 md:mb-8"
                style={{ height: '40vh', minHeight: '250px', maxHeight: '500px' }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center rounded-lg sm:rounded-xl md:rounded-2xl"
                  style={{ 
                    backgroundImage: `url(${selectedCardData.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg sm:rounded-xl md:rounded-2xl" />
                
                <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12 text-white">
                  <button
                    onClick={handleBack}
                    className="self-start flex items-center text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                    style={{ 
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.10)'
                    }}
                  >
                    <ArrowLeft className="mr-1 sm:mr-1.5 lg:mr-2" size={12} />
                    Zurück
                  </button>

                  <div className="absolute top-4 sm:top-6 md:top-8 lg:top-12 right-4 sm:right-6 md:right-8 lg:right-12">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif" 
                          style={{ color: 'hsl(41, 45%, 70%)' }}>
                      {selectedCardData.number.toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif mb-2 sm:mb-3 lg:mb-4 leading-tight max-w-3xl"
                        style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                      {selectedCardData.title}
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/90 max-w-3xl"
                       style={{ 
                         textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                         wordBreak: 'break-word',
                         overflowWrap: 'break-word'
                       }}>
                      {selectedCardData.description}
                    </p>

                    {/* Navigation Arrows */}
                    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 flex gap-2 sm:gap-3">
                      <button
                        onClick={handlePrevious}
                        className="p-1.5 sm:p-2 lg:p-3 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                        style={{ 
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.10)'
                        }}
                      >
                        <ChevronLeft size={14} className="text-white" />
                      </button>
                      
                      <button
                        onClick={handleNext}
                        className="p-1.5 sm:p-2 lg:p-3 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                        style={{ 
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.10)'
                        }}
                      >
                        <ChevronRight size={14} className="text-white" />
                      </button>
                    
                      <button
                        onClick={() => setAutoPlay(!autoPlay)}
                        className="p-1.5 sm:p-2 lg:p-3 ml-1 sm:ml-2 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                        style={{ 
                          borderRadius: '50%',
                          backgroundColor: autoPlay ? 'hsl(41, 45%, 63%)' : 'rgba(255, 255, 255, 0.10)'
                        }}
                      >
                        {autoPlay ? (
                          <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-sm" />
                        ) : (
                          <div className="w-0 h-0 border-l-[4px] sm:border-l-[6px] lg:border-l-[8px] border-r-0 border-t-[3px] sm:border-t-[4px] lg:border-t-[5px] border-b-[3px] sm:border-b-[4px] lg:border-b-[5px] border-l-white border-t-transparent border-b-transparent ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif mb-4 sm:mb-6 lg:mb-8 px-2" 
                    style={{ color: 'hsl(224, 71%, 21%)' }}>
                  Unsere Grundpfeiler
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {PHILOSOPHY_CARDS.map((card) => (
                    <motion.div
                      key={card.number}
                      className={`p-3 sm:p-4 lg:p-6 cursor-pointer transition-all duration-500 flex items-center gap-2 sm:gap-3 lg:gap-4 ${
                        card.number === selectedCard ? 'opacity-60' : ''
                      }`}
                      style={{
                        backgroundColor: card.number === selectedCard ? 'hsl(41, 45%, 63%)/10' : 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                        border: card.number === selectedCard ? '2px solid hsl(41, 45%, 63%)' : 'none'
                      }}
                      onClick={() => card.number !== selectedCard && handleCardClick(card.number)}
                      whileHover={card.number !== selectedCard ? { 
                        y: -4,
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: { duration: 0.3 }
                      } : {}}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-serif" 
                              style={{ color: 'hsl(41, 45%, 63%)' }}>
                          {card.number.toString().padStart(2, '0')}
                        </span>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" style={{ color: 'hsl(41, 45%, 63%)' }}>
                          {React.cloneElement(card.icon as React.ReactElement, { className: "w-full h-full" })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base lg:text-lg font-serif" 
                            style={{ color: 'hsl(224, 71%, 21%)' }}>
                          {card.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};