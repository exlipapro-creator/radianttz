import { VISION, MISSION, CORE_VALUES } from "@/lib/content";

export default function ValuesSection() {
  return (
    <section
      id="values"
      data-testid="values-section"
      className="py-16 lg:py-24 bg-[#14213c] text-white"
      aria-label="Vision, Mission and Core Values"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">Our Purpose</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            Vision, Mission &amp; Core Values
          </h2>
          <div className="gold-divider" />
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                <span className="text-[#14213c] font-bold text-sm">V</span>
              </div>
              <h3 className="font-display font-bold text-xl text-amber-400">Our Vision</h3>
            </div>
            <blockquote
              data-testid="vision-statement"
              className="text-slate-200 text-base leading-relaxed italic border-l-2 border-amber-400 pl-4"
            >
              &ldquo;{VISION}&rdquo;
            </blockquote>
          </div>

          {/* Mission */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                <span className="text-[#14213c] font-bold text-sm">M</span>
              </div>
              <h3 className="font-display font-bold text-xl text-amber-400">Our Mission</h3>
            </div>
            <blockquote
              data-testid="mission-statement"
              className="text-slate-200 text-base leading-relaxed italic border-l-2 border-amber-400 pl-4"
            >
              &ldquo;{MISSION}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-8">
          <h3 className="font-display font-bold text-2xl text-white mb-2">Core Values</h3>
          <div className="gold-divider" />
        </div>
        <div
          data-testid="core-values"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {CORE_VALUES.map((value) => (
            <div
              key={value.id}
              data-testid={`value-${value.id}`}
              className="rounded-xl bg-white/5 border border-white/10 p-5 text-center card-hover"
            >
              <div className="mb-3 flex justify-center">
                <value.icon className="w-8 h-8 text-amber-400" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h4 className="font-display font-bold text-amber-400 text-base mb-2">{value.name}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
