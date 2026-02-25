import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  
  const colors = {
    primary: "hsl(224, 71%, 21%)",
    secondary: "hsl(41, 45%, 63%)",
    background: "hsl(38, 29%, 95%)",
    accent: "hsl(41, 45%, 90%)"
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setEmail("");
    }
  };

  return (
    <footer className="w-full relative overflow-hidden" style={{ backgroundColor: colors.background }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}40, transparent)` }}></div>

      <div className="container mx-auto px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-serif mb-4" style={{ color: colors.primary }}>Kölner Vermögen</h3>
            <p className="leading-relaxed mb-6" style={{ color: `${colors.primary}CC` }}>Nachhaltiges Denken für verantwortungsvolles Kapital.</p>
            
            <div className="flex gap-4">
              <motion.a 
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ backgroundColor: `${colors.secondary}20`, color: colors.primary }}
                whileHover={{ backgroundColor: colors.secondary, color: "white", scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </motion.a>
              
              <motion.a 
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ backgroundColor: `${colors.secondary}20`, color: colors.primary }}
                whileHover={{ backgroundColor: colors.secondary, color: "white", scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"></path>
                </svg>
              </motion.a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>Newsletter</h4>
            <p className="text-sm mb-4" style={{ color: `${colors.primary}B3` }}>Erhalten Sie Einblicke in die Welt des wertebasierten Investierens.</p>
            <form onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  className="w-full px-4 py-3 pr-12 rounded-lg border bg-white/80 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: `${colors.secondary}30` }}
                  required
                />
                <motion.button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: colors.secondary, color: "white" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.button>
              </div>
              <p className="text-xs mt-2" style={{ color: `${colors.primary}80` }}>Mit Ihrer Anmeldung stimmen Sie unseren Datenschutzbestimmungen zu.</p>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>Services</h4>
            <ul className="space-y-2">
              {["WissensPlattform", "WerteNetzwerk", "FinanzKompass"].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-sm transition-colors"
                    style={{ color: `${colors.primary}B3` }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary}
                    onMouseLeave={(e) => e.currentTarget.style.color = `${colors.primary}B3`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>Kontakt</h4>
            <div className="space-y-2 text-sm" style={{ color: `${colors.primary}B3` }}>
              <p>Köln, Deutschland</p>
              <p>info@koelnervermoegen.de</p>
              <p>+49 221 123 456</p>
            </div>
          </div>
          
        </div>

        <div className="pt-8 border-t space-y-4" style={{ borderColor: `${colors.secondary}20` }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: `${colors.primary}80` }}>© {currentYear} Kölner Vermögen - Alle Rechte vorbehalten</p>
            
            <div className="flex gap-6 text-sm">
              <NavLink to="/impressum" className="transition-colors" style={{ color: `${colors.primary}80` }} onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary} onMouseLeave={(e) => e.currentTarget.style.color = `${colors.primary}80`}>Impressum</NavLink>
              <NavLink to="/datenschutz" className="transition-colors" style={{ color: `${colors.primary}80` }} onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary} onMouseLeave={(e) => e.currentTarget.style.color = `${colors.primary}80`}>Datenschutz</NavLink>
              <a href="https://www.gannaca.de/agb" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: `${colors.primary}80` }} onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary} onMouseLeave={(e) => e.currentTarget.style.color = `${colors.primary}80`}>AGB</a>
            </div>
          </div>
          
          <p className="text-xs text-center" style={{ color: `${colors.primary}66` }}>
            Ihr Besuch auf unserer Website wird nicht durch Cookies nachverfolgt.<br />
            Wir setzen weder technisch notwendige Cookies noch Tracking-, Analyse- oder Marketing-Cookies ein.
          </p>
        </div>
      </div>
    </footer>
  );
}