"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const hero = document.getElementById("home");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      data-testid="back-to-top"
      data-visible={visible ? "true" : "false"}
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-[#14213c] shadow-lg transition-all duration-300 flex items-center justify-center ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
