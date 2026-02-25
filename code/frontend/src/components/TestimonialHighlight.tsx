import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialHighlight() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  
  const fullText = "Investieren Sie in Ihre persönliche Transformation. Verstehen Sie die Grundprinzipien von KI, Blockchain und Co. Nicht im technischen Detail, aber in ihren strategischen Implikationen. Und noch wichtiger: Kultivieren Sie einen offenen Geist.";
  
  // Typewriter Effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      setTimeout(() => setShowAuthor(true), 500);
    }
  }, [currentIndex, fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image - Clearer and Brighter */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <img
            src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/gannaca_Rheinfluss_MASTER_SC_017.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.9) contrast(1.05) saturate(0.85)',
              opacity: 0.35
            }}
          />
          {/* Simple white overlay for readability */}
          <div className="absolute inset-0 bg-white/65" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-12 max-w-6xl py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Opening Quote Mark - Positioned Above */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-serif mb-8"
            style={{ color: 'hsl(41, 45%, 63%)' }}
          >
            "
          </motion.span>

          {/* Typewriter Text */}
          <div className="relative w-full max-w-5xl">
            <blockquote 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center"
              style={{ 
                color: 'hsl(224, 71%, 21%)',
                fontFamily: 'Georgia, serif',
                lineHeight: '1.6',
                minHeight: '200px'
              }}
            >
              {/* Formatted Text */}
              <span className="inline-block">
                {displayedText.split('. ').map((sentence, index, array) => (
                  <span key={index}>
                    {sentence}
                    {index < array.length - 1 && (
                      <>
                        .
                        {/* Add line break after first sentence for better formatting */}
                        {index === 0 && (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                        {index !== 0 && '. '}
                      </>
                    )}
                  </span>
                ))}
              </span>
              
              {/* Typing Cursor */}
              {!isTypingComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 md:h-8 ml-1 align-middle"
                  style={{ backgroundColor: 'hsl(41, 45%, 63%)' }}
                />
              )}
            </blockquote>
          </div>

          {/* Closing Quote Mark - Positioned Below */}
          <AnimatePresence>
            {isTypingComplete && (
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.3, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl md:text-8xl font-serif mt-6"
                style={{ color: 'hsl(41, 45%, 63%)' }}
              >
                "
              </motion.span>
            )}
          </AnimatePresence>

          {/* Author Info */}
          <AnimatePresence>
            {showAuthor && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mt-12"
              >
                {/* Divider Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-24 h-px mx-auto mb-8 origin-center"
                  style={{ backgroundColor: 'hsl(41, 45%, 63%)', opacity: 0.4 }}
                />
                
                {/* Author Name */}
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl md:text-3xl font-medium mb-3"
                  style={{ 
                    color: 'hsl(224, 71%, 21%)',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  Christopher Peterka
                </motion.h3>
                
                {/* Author Title */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg md:text-xl mb-2"
                  style={{ 
                    color: 'hsl(224, 71%, 21%)', 
                    opacity: 0.75 
                  }}
                >
                  Futurist, Unternehmer und Investor
                </motion.p>
                
                {/* Company */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-base md:text-lg font-medium"
                  style={{ 
                    color: 'hsl(41, 45%, 63%)',
                    letterSpacing: '0.05em'
                  }}
                >
                  gannaca
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}