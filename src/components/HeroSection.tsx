"use client";

import Image from "next/image";
import { COMPANY } from "@/lib/content";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Hero — Welcome to Radiant Company Limited"
    >
      {/* White background with the Radiant emblem blended in as a large, low-opacity watermark */}
      <div
        data-testid="hero-bg"
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="relative w-[140%] max-w-4xl aspect-square opacity-[0.07] mix-blend-multiply">
          <Image
            src={COMPANY.logoAsset}
            alt=""
            fill
            sizes="1200px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Central content stack, vertically centered column */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        {/* Trust badge pill */}
        <div
          data-testid="hero-badge"
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-50 px-4 py-1.5 mb-8"
        >
          <svg
            className="w-4 h-4 text-amber-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2.5 4 5.5v5.2c0 4.7 3.2 8.2 8 9.8 4.8-1.6 8-5.1 8-9.8V5.5L12 2.5Z" />
            <path d="m8.8 12 2.1 2.2 4.3-4.4" />
          </svg>
          <span className="text-xs sm:text-sm font-medium tracking-wide text-[#14213c]">
            Trusted Maritime &amp; Logistics Partner
          </span>
        </div>

        {/* Company name — bold, clean sans-serif */}
        <h1
          data-testid="hero-title"
          className="font-sans font-bold text-[#0a1528] text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-5"
        >
          Radiant Company Limited
        </h1>

        {/* Tagline — gold / bronze accent */}
        <p
          data-testid="hero-tagline"
          className="font-sans text-amber-600 text-lg sm:text-xl lg:text-2xl font-medium tracking-wide mb-6"
        >
          Radiant services, limitless solutions
        </p>

        {/* Body paragraph — clean dark slate sans-serif, centered */}
        <p
          data-testid="hero-subhead"
          className="font-sans font-light text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          East Africa&apos;s trusted partner in maritime logistics, shipping agency, cargo handling, ship chandling,
          and construction materials — anchored in Zanzibar, reaching across the Indian Ocean coastline.
        </p>

        {/* CTAs — stacked vertically, centered; buttons hug their label width */}
        <div className="flex flex-col items-center gap-4">
          <button
            data-testid="hero-cta"
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#14213c] hover:bg-[#1b2a4a] text-white font-bold text-base rounded-full shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Request a Quote
          </button>
          <button
            data-testid="hero-cta-secondary"
            onClick={() => scrollTo("services")}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-[#14213c] font-bold text-base rounded-md shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl uppercase tracking-wide"
          >
            Explore Our Services
          </button>
        </div>
      </div>

      {/* Scroll-down indicator, absolute bottom center */}
      <div
        data-testid="scroll-indicator"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em]">Scroll Down</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
