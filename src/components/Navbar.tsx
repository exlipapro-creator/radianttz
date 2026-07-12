"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { COMPANY } from "@/lib/content";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why Us" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
      let current = "home";
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= 80) current = section.id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#14213c]/95 backdrop-blur-md shadow-lg"
          : "bg-[#14213c]/90 backdrop-blur-sm"
      }`}
      style={{ height: "64px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="Go to top"
        >
          <div className="w-14 h-14 relative flex-shrink-0 rounded-full bg-white shadow-sm p-1.5">
            <Image
              data-testid="navbar-logo"
              src={COMPANY.logoAsset}
              alt="Radiant Company Limited logo"
              fill
              sizes="56px"
              className="object-contain p-1.5"
              priority
            />
          </div>
          <span className="font-display font-bold text-white text-sm sm:text-base leading-tight hidden xs:block">
            RADIANT COMPANY<br />
            <span className="text-amber-400">LIMITED</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              data-testid={`nav-link-${link.id}`}
              data-active={activeSection === link.id ? "true" : "false"}
              onClick={() => scrollTo(link.id)}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === link.id
                  ? "text-amber-400"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            data-testid="nav-cta"
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-[#14213c] font-semibold text-sm rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          data-testid="nav-hamburger"
          className="md:hidden flex flex-col gap-1.5 p-2 text-white"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          data-testid="mobile-menu"
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-[#1b2a4a] border-t border-white/10 shadow-xl"
        >
          <nav className="flex flex-col py-3" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                data-testid={`nav-link-${link.id}`}
                data-active={activeSection === link.id ? "true" : "false"}
                onClick={() => scrollTo(link.id)}
                className={`px-6 py-3 text-left text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-amber-400 bg-white/5"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="px-6 py-3">
              <button
                data-testid="nav-cta"
                onClick={() => scrollTo("contact")}
                className="w-full px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#14213c] font-semibold text-sm rounded-lg transition-colors"
              >
                Get a Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
