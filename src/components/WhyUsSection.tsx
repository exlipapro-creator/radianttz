import { WHY_US } from "@/lib/content";

export default function WhyUsSection() {
  return (
    <section
      id="why"
      data-testid="why-section"
      className="py-16 lg:py-24 bg-white"
      aria-label="Why Choose Radiant Company Limited"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Advantage</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#14213c] mb-4">
            Why Choose Us
          </h2>
          <div className="gold-divider" />
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Seven compelling reasons why regional and international clients choose Radiant Company Limited as their trusted East African maritime and logistics partner.
          </p>
        </div>

        {/* Feature blocks grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((item) => (
            <div
              key={item.id}
              data-testid={`why-item-${item.id}`}
              className="rounded-2xl bg-[#f1f4f9] p-6 ring-1 ring-slate-200 card-hover flex gap-4"
            >
              {/* Icon chip */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#14213c]" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#14213c] text-lg mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
