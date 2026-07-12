import { COMPANY } from "@/lib/content";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why Us" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-[#0e1830] text-white py-12"
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <h3
              data-testid="footer-name"
              className="font-display font-bold text-white text-lg mb-1"
            >
              RADIANT COMPANY LIMITED
            </h3>
            <p
              data-testid="footer-tagline"
              className="text-amber-400 italic text-sm mb-4"
            >
              Radiant services, limitless solutions
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premier maritime, logistics, and construction support services headquartered in Zanzibar, Tanzania — serving East Africa and beyond.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    data-testid={`footer-link-${link.id}`}
                    href={`#${link.id}`}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-200 text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Phone</p>
                <a
                  data-testid="footer-phone"
                  href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
                  className="text-slate-300 hover:text-amber-400 text-sm transition-colors"
                >
                  {COMPANY.phones[0]}
                </a>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Email</p>
                <a
                  data-testid="footer-email"
                  href={`mailto:${COMPANY.email}`}
                  className="text-slate-300 hover:text-amber-400 text-sm transition-colors break-all"
                >
                  {COMPANY.email}
                </a>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">Website</p>
                <a
                  href={`https://${COMPANY.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-amber-400 text-sm transition-colors"
                >
                  {COMPANY.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p data-testid="footer-copyright">
            &copy; 2026 Radiant Company Limited. All rights reserved.
          </p>
          <p>
            Zanzibar, Tanzania | East Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
