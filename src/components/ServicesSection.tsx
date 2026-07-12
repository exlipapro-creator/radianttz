"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { SERVICES } from "@/lib/content";

export default function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const closeModal = useCallback(() => setOpenSlug(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  const scrollToContact = (slug?: string) => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (slug) {
      setTimeout(() => {
        const select = document.querySelector<HTMLSelectElement>('[data-testid="select-service"]');
        if (select) {
          select.value = slug;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 600);
    }
  };

  const openModal = SERVICES.find((s) => s.slug === openSlug);

  return (
    <>
      <section
        id="services"
        data-testid="services-section"
        className="py-16 lg:py-24 bg-[#f1f4f9]"
        aria-label="Our Services"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#14213c] mb-4">
              Our Services
            </h2>
            <div className="gold-divider" />
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Comprehensive maritime, logistics, and construction support services — all under one roof.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                data-testid={`service-card-${service.slug}`}
                className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6 card-hover flex flex-col"
              >
                {/* Icon chip */}
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-4 flex-shrink-0">
                  <service.icon className="w-7 h-7 text-[#14213c]" strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  data-testid={`service-card-${service.slug}-title`}
                  className="font-display font-bold text-xl text-[#14213c] mb-3 leading-snug"
                >
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">
                  {service.short}
                </p>

                {/* Building materials product list preview */}
                {service.slug === "materials" && service.products && (
                  <div
                    data-testid="materials-products"
                    className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200"
                  >
                    <p className="text-xs font-semibold text-amber-800 mb-2 uppercase tracking-wide">Products include:</p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {service.products.map((p) => (
                        <li key={p} className="flex items-center gap-1.5">
                          <span className="text-amber-500">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    data-testid={`service-inquire-${service.slug}`}
                    onClick={() => scrollToContact(service.slug)}
                    className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#14213c] font-semibold text-sm rounded-lg transition-colors"
                  >
                    Inquire Now
                  </button>
                  <button
                    onClick={() => setOpenSlug(service.slug)}
                    className="px-4 py-2.5 border border-[#14213c] text-[#14213c] hover:bg-[#14213c] hover:text-white font-semibold text-sm rounded-lg transition-colors"
                    aria-label={`View details for ${service.title}`}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {openSlug && openModal && (
        <div
          data-testid="service-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={openModal.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal panel */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#14213c] text-white p-6 rounded-t-2xl flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <openModal.icon className="w-7 h-7 text-amber-400 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <h2 className="font-display font-bold text-xl leading-snug">{openModal.title}</h2>
              </div>
              <button
                data-testid="service-modal-close"
                onClick={closeModal}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              <div
                data-testid={`service-detail-${openModal.slug}`}
                className="prose prose-slate max-w-none"
              >
                {openModal.detail.split("\n\n").map((block, i) => {
                  if (block.startsWith("•") || block.includes("\n•")) {
                    const lines = block.split("\n");
                    return (
                      <div key={i} className="mb-4">
                        {lines.map((line, j) =>
                          line.startsWith("•") ? (
                            <div key={j} className="flex items-start gap-2 mb-1">
                              <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                              <span className="text-slate-700 text-sm">{line.slice(2)}</span>
                            </div>
                          ) : (
                            <p key={j} className="text-slate-700 text-base leading-relaxed mb-2">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-slate-700 text-base leading-relaxed mb-4">
                      {block}
                    </p>
                  );
                })}

                {/* Materials product list in detail */}
                {openModal.slug === "materials" && openModal.products && (
                  <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-3 text-sm uppercase tracking-wide">
                      Complete Product Range:
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {openModal.products.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA in modal */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => { closeModal(); scrollToContact(openModal.slug); }}
                  className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-[#14213c] font-bold rounded-lg transition-colors"
                >
                  Request a Quote
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
