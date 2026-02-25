import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../utils/chatStore";

export function Features() {
  const navigate = useNavigate();
  const { openChat } = useChatStore();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const featuresData = [
    {
      icon: <Sparkles size={24} strokeWidth={1.5} />,
      title: "Relevantes Finanzwissen",
      subline: "Fachlich kuratierte Finanzanalysen und Markteinschätzungen – ausgerichtet auf Ihre individuellen Vermögensziele.",
      imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/features_wissen_blaue_kugel.jpg",
      actionPath: "/insights",
      ctaText: "Wissen vertiefen"
    },
    {
      icon: <Zap size={24} strokeWidth={1.5} />,
      title: "Direkte Expertenkontakte",
      subline: "Zugang zu führenden Private-Banking-Experten der Region – mit ausgewiesener Expertise für Ihre spezifischen Vermögensfragen.",
      imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/features_berater_beratungsszene.jpg",
      actionPath: "/trusted-advisors-page",
      ctaText: "Experten finden"
    },
    {
      icon: <Shield size={24} strokeWidth={1.5} />,
      title: "Persönlicher FinanzKompass",
      subline: "Präzise Antworten auf Ihre komplexen Finanzfragen – unser digitaler Assistent bietet fundierte Orientierung.",
      imageUrl: "https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/features_kompass_lichteffekte.jpg",
      actionPath: "/ai-finanzkompass",
      ctaText: "FinanzKompass erleben",
      actionType: "openChat"
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % featuresData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, featuresData.length]);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0.8]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
      x: 100,
    },
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.8 },
        scale: { duration: 1.2 },
        x: { duration: 1.0 }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: -100,
      transition: {
        duration: 0.8,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.0,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % featuresData.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + featuresData.length) % featuresData.length);
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('testimonial-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const currentFeat = featuresData[currentFeature];

  return (
    <section className="overflow-hidden relative" style={{ margin: 0, padding: 0 }}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative min-h-screen w-full overflow-hidden flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Images */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{ y: bgY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${currentFeat.imageUrl}")`,
                backgroundPosition: 'center center'
              }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  opacity: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 12, ease: "easeOut" }
                }
              }}
              exit={{ 
                opacity: 0,
                transition: { duration: 1.0, ease: [0.55, 0.06, 0.68, 0.19] }
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Gradient Overlay - Angepasst für Mobile */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            background: window.innerWidth < 768 
              ? "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)"
              : "linear-gradient(115deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)",
            opacity 
          }}
        />

        {/* Scroll Indicator - Hidden on very small screens */}
        <motion.div
          className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 cursor-pointer z-30 group"
          style={{ 
            top: '3%'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 1, delay: 1.5 }
          }}
          onClick={scrollToNextSection}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-6 h-10 sm:w-8 sm:h-14 rounded-full border-2 border-white/50 flex items-start justify-center pt-2 sm:pt-4 group-hover:border-white group-hover:bg-white/10 transition-all duration-300"
            animate={{ 
              y: [0, 15, 0],
              transition: { 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300" />
          </motion.div>
        </motion.div>

        {/* Main Content - Flexbox Layout für Mobile */}
        <div className="relative z-10 flex-1 flex items-end pb-32 sm:pb-24 md:pb-20 lg:pb-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:pl-20 xl:pl-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-2xl text-white"
              >
                {/* Mobile Icon - Visible only on mobile */}
                <motion.div
                  className="flex sm:hidden items-center gap-3 mb-4"
                  style={{ color: 'hsl(41, 45%, 65%)' }}
                >
                  {currentFeat.icon}
                  <div className="h-px flex-1 bg-white/20" />
                </motion.div>

                {/* Content */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Title - Responsive sizing */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight"
                      style={{ 
                        fontFamily: 'Georgia, serif',
                        textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                        letterSpacing: '-0.02em'
                      }}>
                    {currentFeat.title}
                  </h3>

                  {/* Subline - Better mobile readability */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-6 sm:mb-8 lg:mb-10 leading-relaxed font-light"
                     style={{ 
                       textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                       letterSpacing: '0.01em',
                       lineHeight: '1.6'
                     }}>
                    {currentFeat.subline}
                  </p>

                  {/* CTA Button - Mobile optimized */}
                  <motion.button
                    onClick={() => {
                      if (currentFeat.actionType === "openChat") {
                        openChat("finanzKompass");
                      } else if (currentFeat.actionPath) {
                        navigate(currentFeat.actionPath);
                      }
                    }}
                    className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-medium text-sm sm:text-base md:text-lg transition-all duration-500 inline-flex items-center overflow-hidden"
                    style={{
                      backgroundColor: 'hsl(41, 45%, 63%)',
                      color: 'white',
                      borderRadius: '6px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px hsl(41, 45%, 63%)/20',
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 8px 24px hsl(41, 45%, 63%)/30',
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 mr-2 sm:mr-3">{currentFeat.ctaText}</span>
                    <motion.div
                      className="relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={16} className="sm:hidden" strokeWidth={2} />
                      <ArrowRight size={18} className="hidden sm:block" strokeWidth={2} />
                    </motion.div>
                    
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ 
                        x: ['-100%', '100%'],
                        transition: { 
                          duration: 3, 
                          repeat: Infinity, 
                          repeatDelay: 2 
                        }
                      }}
                    />
                  </motion.button>
                </motion.div>

                {/* Desktop Floating Icon */}
                <motion.div
                  className="hidden lg:block absolute -top-20 -right-4 opacity-30 text-8xl"
                  style={{ color: 'hsl(41, 45%, 65%)' }}
                  animate={{ 
                    y: [-15, 15, -15],
                    rotate: [0, 2, -2, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }}
                >
                  {currentFeat.icon}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls - Fixed positioning */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex items-center gap-3 sm:gap-4 md:gap-6 z-20">
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              onClick={prevFeature}
              className="p-2 sm:p-2.5 md:p-3 lg:p-4 backdrop-blur-md transition-all duration-400"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'hsl(41, 45%, 63%)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={14} className="sm:hidden" strokeWidth={2} />
              <ChevronLeft size={16} className="hidden sm:block" strokeWidth={2} />
            </motion.button>
            
            <motion.button
              onClick={nextFeature}
              className="p-2 sm:p-2.5 md:p-3 lg:p-4 backdrop-blur-md transition-all duration-400"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'hsl(41, 45%, 63%)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={14} className="sm:hidden" strokeWidth={2} />
              <ChevronRight size={16} className="hidden sm:block" strokeWidth={2} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 ml-2 sm:ml-3 md:ml-4">
            {featuresData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ${
                    index === currentFeature 
                      ? 'bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  style={{
                    boxShadow: index === currentFeature 
                      ? '0 0 20px rgba(255, 255, 255, 0.6)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                />
                {index === currentFeature && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -inset-1 sm:-inset-1.5 md:-inset-2 rounded-full border sm:border-2 border-white/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <motion.div
            className="h-full origin-left"
            style={{ backgroundColor: 'hsl(41, 45%, 65%)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: isPaused ? 0 : 8, 
              ease: "linear",
              repeat: isPaused ? 0 : Infinity 
            }}
            key={`${currentFeature}-${isPaused}`}
          />
        </div>
      </motion.div>
    </section>
  );
}