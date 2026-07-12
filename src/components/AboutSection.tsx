import { Settings2, Globe2, BadgeCheck } from "lucide-react";
import { ABOUT } from "@/lib/content";

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-16 lg:py-24 bg-white"
      aria-label="About Radiant Company Limited"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Who We Are</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#14213c] mb-4">
            About Us
          </h2>
          <div className="gold-divider" />
        </div>

        {/* Two-column: text + stat strip */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Body copy */}
          <div className="lg:col-span-2" data-testid="about-body">
            {ABOUT.body.map((para, i) => (
              <p
                key={i}
                className="text-slate-700 text-base leading-relaxed mb-5 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Stat strip */}
          <div className="flex flex-col gap-5">
            <div
              data-testid="stat-services"
              className="rounded-2xl bg-[#14213c] text-white p-6 shadow-md flex flex-col items-center text-center card-hover"
            >
              <Settings2 className="w-9 h-9 text-amber-400 mb-2" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-3xl font-bold text-amber-400 font-display">5</span>
              <span className="text-sm text-slate-300 mt-1 font-medium">Core Services</span>
            </div>
            <div
              data-testid="stat-coverage"
              className="rounded-2xl bg-[#1b2a4a] text-white p-6 shadow-md flex flex-col items-center text-center card-hover"
            >
              <Globe2 className="w-9 h-9 text-amber-400 mb-2" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-xl font-bold text-amber-400 font-display">East Africa</span>
              <span className="text-sm text-slate-300 mt-1 font-medium">Regional Coverage</span>
            </div>
            <div
              data-testid="stat-zma"
              className="rounded-2xl bg-[#233a63] text-white p-6 shadow-md flex flex-col items-center text-center card-hover"
            >
              <BadgeCheck className="w-9 h-9 text-amber-400 mb-2" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-xl font-bold text-amber-400 font-display">ZMA</span>
              <span className="text-sm text-slate-300 mt-1 font-medium">Certified & Registered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
