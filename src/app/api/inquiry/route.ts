export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { sendInquiry } from "@/lib/email";

// Simple in-memory rate limiter: configurable via env, default 50 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = Number(process.env.INQUIRY_RATE_LIMIT || 50);
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const VALID_SERVICES = ["freight", "materials", "zma", "chandling", "cargo"] as const;
type ServiceSlug = (typeof VALID_SERVICES)[number];

interface InquiryBody {
  fullName?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
}

function validateInquiry(body: InquiryBody): { errors: Record<string, string> | null; data: Parameters<typeof sendInquiry>[0] | null } {
  const errors: Record<string, string> = {};

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  if (!fullName) errors.fullName = "Full name is required.";
  else if (fullName.length > 120) errors.fullName = "Full name must be 120 characters or fewer.";

  const company = typeof body.company === "string" ? body.company.trim() : "";
  if (company.length > 160) errors.company = "Company name must be 160 characters or fewer.";

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 160) errors.email = "Email address is too long.";

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!phone) errors.phone = "Phone number is required.";
  else if (phone.length < 5) errors.phone = "Please enter a valid phone number.";
  else if (phone.length > 40) errors.phone = "Phone number is too long.";

  const service = typeof body.service === "string" ? body.service.trim() : "";
  if (!service) errors.service = "Please select a service.";
  else if (!VALID_SERVICES.includes(service as ServiceSlug)) errors.service = "Please select a valid service.";

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) errors.message = "Message is required.";
  else if (message.length > 2000) errors.message = "Message must be 2000 characters or fewer.";

  if (Object.keys(errors).length > 0) {
    return { errors, data: null };
  }

  return {
    errors: null,
    data: {
      fullName,
      company: company || undefined,
      email,
      phone,
      service: service as ServiceSlug,
      message,
    },
  };
}

export async function POST(req: NextRequest) {
  // Require JSON content-type for cookie-less/CSRF posture (blocks simple form CSRF).
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
  }

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: InquiryBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          fullName: "Full name is required.",
          email: "Email address is required.",
          phone: "Phone number is required.",
          message: "Message is required.",
        },
      },
      { status: 400 }
    );
  }

  // Honeypot check — silently drop spam
  if (body.website && typeof body.website === "string" && body.website.trim() !== "") {
    console.log("[inquiry] Honeypot triggered — silently dropping submission");
    return NextResponse.json({ ok: true });
  }

  const { errors, data } = validateInquiry(body);
  if (errors) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Email delivery is best-effort: a valid inquiry is always accepted (HTTP 200) even if
  // the outbound SMTP transport is unreachable or misconfigured. Delivery failures are
  // logged for ops visibility but never surfaced to the visitor as a submission failure.
  try {
    await sendInquiry(data!);
  } catch (err) {
    console.error("[inquiry] Email send error (non-fatal, inquiry still accepted):", err);
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
