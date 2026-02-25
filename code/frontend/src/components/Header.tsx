import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser } from "app/auth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  // Design System Colors
  const colors = {
    primary: 'hsl(224, 71%, 21%)', // Navy
    secondary: 'hsl(41, 45%, 63%)', // Gold
    background: 'hsl(38, 29%, 95%)', // Light Beige
    accent: 'hsl(41, 45%, 90%)', // Light Gold
  };

  // Links aufteilen: primär vs. Finanzkompass (abgesetzt)
  const primaryLinks = [
    { to: "/", text: "Startseite" },
    { to: "/insights", text: "WissensPlattform" },
    { to: "/trusted-advisors-page", text: "WerteNetzwerk" },
  ];
  const kompassLink = { to: "/ai-finanzkompass", text: "FinanzKompass" };

  const PrimaryLinks = ({ isMobile = false }) => (
    <>
      {primaryLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isMobile ? "py-2 text-lg" : ""
            }`
          }
          style={({ isActive }) => ({
            color: isActive ? colors.secondary : colors.primary,
          })}
          onMouseEnter={(e) => {
            if (!(e.target as HTMLElement).classList.contains('active')) {
              (e.target as HTMLElement).style.color = colors.secondary;
            }
          }}
          onMouseLeave={(e) => {
            if (!(e.target as HTMLElement).classList.contains('active')) {
              (e.target as HTMLElement).style.color = colors.primary;
            }
          }}
        >
          {link.text}
        </NavLink>
      ))}
    </>
  );

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{ 
        backgroundColor: 'hsla(38, 29%, 95%, 0.95)', // 95% opacity - fast undurchsichtig
        borderColor: `${colors.secondary}20`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)' // Safari Support
      }}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src="https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/logo_duesseldorfervermoegen_900x350.png"
            alt="Kölner Vermögen Logo"
            className="h-14 md:h-14 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center flex-1 justify-center mx-8">
          {/* Primäre Links */}
          <div className="flex items-center space-x-8">
            <PrimaryLinks />
          </div>

          {/* Abgesetzter Finanzkompass-Link */}
          <NavLink
            to={kompassLink.to}
            className={({ isActive }) =>
              `ml-10 pl-10 font-semibold transition-colors`
            }
            style={({ isActive }) => ({
              color: isActive ? colors.secondary : colors.primary,
              borderLeft: `1px solid ${colors.secondary}30`
            })}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = colors.secondary;
            }}
            onMouseLeave={(e) => {
              if (!(e.target as HTMLElement).classList.contains('active')) {
                (e.target as HTMLElement).style.color = colors.primary;
              }
            }}
          >
            {kompassLink.text}
          </NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading && user && (
            <NavLink
              to="/dashboard"
              className="font-medium transition-colors"
              style={({ isActive }) => ({
                color: isActive ? colors.secondary : colors.primary
              })}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = colors.secondary;
              }}
              onMouseLeave={(e) => {
                if (!(e.target as HTMLElement).classList.contains('active')) {
                  (e.target as HTMLElement).style.color = colors.primary;
                }
              }}
            >
              Mein Bereich
            </NavLink>
          )}
          {!loading && !user && (
            <Button
              onClick={() => navigate("/login")}
              className="px-6 py-2 rounded-md transition-all font-medium"
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = colors.secondary;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = colors.primary;
              }}
            >
              Anmelden
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü öffnen"
          style={{ color: colors.primary }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden p-4 shadow-lg border-t"
            style={{ 
              backgroundColor: colors.background,
              borderColor: `${colors.secondary}20`
            }}
          >
            <div className="flex flex-col space-y-4">
              {/* Primäre Links */}
              <PrimaryLinks isMobile />
              
              {/* Divider + abgesetzter Finanzkompass */}
              <hr style={{ borderColor: `${colors.secondary}20` }} className="my-2" />
              
              <NavLink
                to={kompassLink.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-lg font-semibold transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? colors.secondary : colors.primary
                })}
              >
                {kompassLink.text}
              </NavLink>

              <hr style={{ borderColor: `${colors.secondary}20` }} className="my-2" />
              
              {!loading && user && (
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium py-2 text-lg transition-colors"
                  style={{ color: colors.primary }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = colors.secondary;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = colors.primary;
                  }}
                >
                  Mein Bereich
                </NavLink>
              )}
              
              {!loading && !user && (
                <Button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md text-center transition-all font-medium w-full"
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white'
                  }}
                >
                  Anmelden
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}