import React, { useRef } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

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
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover"
          style={{
            backgroundImage: "url(/images/koelner-dom-hohenzollernbruecke-nacht.jpg)",
            backgroundPosition: "center center",
          }}
          initial={{ scale: 1.05 }}
          animate={{
            scale: 1,
            transition: {
              scale: { duration: 8, ease: "easeOut" }
            }
          }}
        />

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
            src="/images/logo_koelnervermoegen_900x350.png"
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