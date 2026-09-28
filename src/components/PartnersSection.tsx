import Image from "next/image";
import { PARTNERS } from "@/lib/content";

export default function PartnersSection() {
  return (
    <section
      id="partners"
      data-testid="partners-section"
      className="py-16 lg:py-24 bg-white"
      aria-label="Our Partners"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Trusted Network</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#14213c] mb-4">
            Our Partners
          </h2>
          <div className="gold-divider" />
          <p className="text-slate-600 mt-4 max-w-xl mx-auto">
            We collaborate with leading organisations across East Africa to deliver comprehensive, integrated solutions for our clients.
          </p>
        </div>

        {/* Partner cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              data-testid={`partner-${partner.id}`}
              className="rounded-2xl bg-[#f1f4f9] ring-1 ring-slate-200 p-6 card-hover flex flex-col items-center text-center"
            >
              {/* Partner logo */}
              <div className="w-full h-20 rounded-xl bg-white ring-1 ring-slate-200 flex items-center justify-center p-3 mb-4">
                <Image
                  data-testid={`partner-${partner.id}-logo`}
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={200}
                  height={80}
                  className="max-h-full w-auto object-contain max-w-[180px]"
                />
              </div>

              {/* Name */}
              <h3 className="font-display font-bold text-[#14213c] text-base mb-2 leading-snug">
                {partner.name}
              </h3>

              {/* Tagline */}
              <p className="text-slate-500 text-sm italic">
                {partner.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
