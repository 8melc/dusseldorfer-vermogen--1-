import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [selectedHero, setSelectedHero] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const heroImages = [
    {
      url: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/hero_startseite_duesseldorf_panorama.jpg",
      position: "center center",
      title: "Köln Panorama"
    },
    {
      url: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/hero_startseite_duesseldorf_rheinturm.jpg", 
      position: "center center",
      title: "Kölner Dom Skyline"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setSelectedHero((prev) => (prev + 1) % heroImages.length);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [isTransitioning, heroImages.length]);

  const handleImageChange = (index: number) => {
    if (index !== selectedHero && !isTransitioning) {
      setIsTransitioning(true);
      setSelectedHero(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('philosophy-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[100vh] flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedHero}
            className="absolute inset-0 w-full h-full bg-cover"
            style={{
              backgroundImage: `url(${heroImages[selectedHero].url})`,
              backgroundPosition: heroImages[selectedHero].position,
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                opacity: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                scale: { duration: 8, ease: "easeOut" }
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
          />
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(135deg, rgba(11,14,40,0.75) 0%, rgba(11,14,40,0.45) 40%, rgba(11,14,40,0.85) 100%)"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 sm:mb-16 flex justify-center"
        >
          <img
            src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/logo_duesseldorfervermoegen_900x350.png"
            alt="Kölner Vermögen Logo"
            className="w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
            style={{ 
              filter: 'brightness(0) invert(1) drop-shadow(0 6px 20px rgba(0,0,0,0.4))'
            }}
          />
        </motion.div>
      
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 tracking-wide leading-tight" 
             style={{ 
               fontFamily: 'Georgia, serif',
               textShadow: '0 2px 8px rgba(0,0,0,0.6)',
               letterSpacing: '0.02em'
             }}>
            Neu definiert.
          </p>
        </motion.div>
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-100 max-w-4xl mx-auto leading-relaxed px-2"
             style={{ 
               textShadow: '0 1px 4px rgba(0,0,0,0.7)',
               letterSpacing: '0.01em'
             }}>
            Nachhaltiges Denken für verantwortungsvolles Kapital.
          </p>
        </motion.div>
      </div>
      
      {/* Image Selector - Hidden on Mobile */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden"
      >
        {heroImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`group relative overflow-hidden transition-all duration-700 ${
              index === selectedHero 
                ? 'w-24 h-16 ring-2 ring-white/80' 
                : 'w-20 h-12 ring-1 ring-white/40 hover:ring-white/60'
            }`}
            style={{
              borderRadius: '4px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className={`absolute inset-0 transition-all duration-500 ${
              index === selectedHero 
                ? 'bg-black/20' 
                : 'bg-black/40 group-hover:bg-black/30'
            }`} />
            
            {index === selectedHero && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-1 left-1/2 w-8 h-1 bg-white rounded-full"
                style={{ transform: 'translateX(-50%)' }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Mobile Dots Indicator */}
      <div className="flex md:hidden absolute top-4 right-4 gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedHero 
                ? 'bg-white w-6' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 1, delay: 1.5 }
        }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer group"
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-6 h-10 sm:w-8 sm:h-14 rounded-full border-2 border-white/60 flex items-start justify-center pt-2 sm:pt-3 backdrop-blur-sm group-hover:border-white group-hover:bg-white/10 transition-all duration-300"
          animate={{ 
            y: [0, 10, 0],
            transition: { 
              duration: 2.5,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          <motion.div 
            className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300"
            animate={{
              opacity: [0.4, 1, 0.4],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}