"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/content";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const phone = COMPANY.phones[0].replace(/[^0-9+]/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          data-testid="chat-panel"
          className="w-64 rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden"
        >
          <div className="bg-[#14213c] px-4 py-3">
            <p className="text-white font-semibold text-sm">Chat with Radiant</p>
            <p className="text-amber-300 text-xs">We typically reply within minutes</p>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-sm text-slate-600">How can we help with your maritime or logistics needs?</p>
            <a
              data-testid="chat-call"
              href={`tel:${phone}`}
              className="block w-full text-center px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-[#14213c] font-semibold text-sm transition-colors"
            >
              Call us now
            </a>
            <a
              data-testid="chat-email"
              href={`mailto:${COMPANY.email}`}
              className="block w-full text-center px-4 py-2 rounded-lg border border-navy-800 text-navy-800 hover:bg-navy-50 font-semibold text-sm transition-colors"
            >
              Email us
            </a>
          </div>
        </div>
      )}

      <button
        data-testid="chat-widget"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        aria-expanded={open}
        className="w-14 h-14 rounded-full p-1 bg-amber-400 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
      >
        <span className="flex items-center justify-center w-full h-full rounded-full bg-[#14213c] text-amber-300">
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
