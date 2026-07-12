"use client";

import { useState, useRef } from "react";
import { Phone, Smartphone, Mail, Globe, CheckCircle2, AlertTriangle } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/content";

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!validateEmail(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          message: form.message.trim(),
          website: form.website,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        if (data.errors) {
          setErrors(data.errors);
          setStatus("idle");
        } else {
          setServerError(data.error || "Something went wrong. Please try again or contact us directly.");
          setStatus("error");
        }
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-16 lg:py-24 bg-[#f1f4f9]"
      aria-label="Contact Radiant Company Limited"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#14213c] mb-4">
            Contact Us
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h3 className="font-display font-bold text-xl text-[#14213c] mb-6">
              Reach Us Directly
            </h3>

            <div className="space-y-5">
              {/* Phone 1 */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#14213c]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-0.5 font-medium">Primary Phone</p>
                  <a
                    data-testid="contact-phone-1"
                    href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
                    className="text-[#14213c] font-semibold hover:text-amber-600 transition-colors"
                  >
                    {COMPANY.phones[0]}
                  </a>
                </div>
              </div>

              {/* Phone 2 */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-[#14213c]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-0.5 font-medium">Secondary Phone</p>
                  <a
                    data-testid="contact-phone-2"
                    href={`tel:${COMPANY.phones[1].replace(/\s/g, "")}`}
                    className="text-[#14213c] font-semibold hover:text-amber-600 transition-colors"
                  >
                    {COMPANY.phones[1]}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#14213c]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-0.5 font-medium">Email</p>
                  <a
                    data-testid="contact-email"
                    href={`mailto:${COMPANY.email}`}
                    className="text-[#14213c] font-semibold hover:text-amber-600 transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-[#14213c]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-0.5 font-medium">Website</p>
                  <a
                    data-testid="contact-website"
                    href={`https://${COMPANY.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#14213c] font-semibold hover:text-amber-600 transition-colors"
                  >
                    {COMPANY.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Location blurb */}
            <div className="mt-8 rounded-2xl bg-[#14213c] text-white p-6">
              <h4 className="font-display font-bold text-lg text-amber-400 mb-2">Based in Zanzibar</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Radiant Company Limited is headquartered in Zanzibar, Tanzania, with operations spanning the East African coastline. We serve regional and international clients across the Indian Ocean shipping corridor.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div>
            <h3 className="font-display font-bold text-xl text-[#14213c] mb-6">
              Service Inquiry / Quote Request
            </h3>

            {/* Success banner */}
            {status === "success" && (
              <div
                data-testid="inquiry-success"
                className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-5 flex items-start gap-3"
                role="alert"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-emerald-800 mb-1">Inquiry Sent Successfully!</p>
                  <p className="text-emerald-700 text-sm">
                    Thank you for reaching out. Our team will review your inquiry and get back to you shortly at the email address you provided.
                  </p>
                </div>
              </div>
            )}

            {/* Server error banner */}
            {status === "error" && serverError && (
              <div
                data-testid="inquiry-error"
                className="mb-6 rounded-xl bg-red-50 border border-red-200 p-5 flex items-start gap-3"
                role="alert"
              >
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-red-800 mb-1">Submission Failed</p>
                  <p className="text-red-700 text-sm">{serverError}</p>
                </div>
              </div>
            )}

            <form
              ref={formRef}
              data-testid="inquiry-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 max-w-2xl"
            >
              {/* Honeypot - hidden from humans */}
              <input
                type="text"
                name="website"
                data-testid="input-website"
                value={form.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
              />

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#14213c] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  data-testid="input-fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={`w-full rounded-lg border px-4 py-3 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                    errors.fullName ? "border-red-500 bg-red-50" : "border-slate-300 bg-white"
                  }`}
                />
                {errors.fullName && (
                  <p data-testid="error-fullName" className="mt-1.5 text-sm text-red-600" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#14213c] mb-1.5">
                  Company Name <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  data-testid="input-company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company or organisation"
                  autoComplete="organization"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Email & Phone row */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#14213c] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="input-email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full rounded-lg border px-4 py-3 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.email ? "border-red-500 bg-red-50" : "border-slate-300 bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p data-testid="error-email" className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#14213c] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    data-testid="input-phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+255 7XX XXX XXX"
                    autoComplete="tel"
                    className={`w-full rounded-lg border px-4 py-3 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                      errors.phone ? "border-red-500 bg-red-50" : "border-slate-300 bg-white"
                    }`}
                  />
                  {errors.phone && (
                    <p data-testid="error-phone" className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Service dropdown */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-[#14213c] mb-1.5">
                  Service of Interest <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  data-testid="select-service"
                  value={form.service}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors appearance-none bg-white cursor-pointer ${
                    errors.service ? "border-red-500 bg-red-50" : "border-slate-300"
                  } ${!form.service ? "text-slate-400" : "text-slate-800"}`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 0.75rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.25em 1.25em", paddingRight: "2.5rem" }}
                >
                  <option value="" disabled>Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p data-testid="error-service" className="mt-1.5 text-sm text-red-600" role="alert">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#14213c] mb-1.5">
                  Message / Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  data-testid="textarea-message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Please describe your requirements, shipment details, quantities, or any other relevant information..."
                  className={`w-full rounded-lg border px-4 py-3 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-vertical ${
                    errors.message ? "border-red-500 bg-red-50" : "border-slate-300 bg-white"
                  }`}
                />
                {errors.message && (
                  <p data-testid="error-message" className="mt-1.5 text-sm text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                data-testid="inquiry-submit"
                disabled={status === "submitting"}
                className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-[#14213c] font-bold text-base rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {status === "submitting" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Inquiry"
                )}
              </button>

              <p className="text-slate-500 text-xs text-center">
                By submitting this form you agree to be contacted by Radiant Company Limited regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
