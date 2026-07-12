import nodemailer from "nodemailer";

function getTransport() {
  const user = process.env.DROIDBOT_SMTP_USER;
  const pass = process.env.DROIDBOT_SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.DROIDBOT_SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.DROIDBOT_SMTP_PORT || 465),
    secure: Number(process.env.DROIDBOT_SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });
}

interface InquiryData {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const SERVICE_LABELS: Record<string, string> = {
  freight: "Sea & Coastal Freight Water Transport",
  materials: "Supply of Building Materials",
  zma: "Shipping Agency (ZMA)",
  chandling: "Ship Chandlers",
  cargo: "Cargo Handling",
};

// Escape arbitrary user-supplied strings before interpolating into HTML email body.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// For phone numbers used inside tel: hrefs — keep only digits, +, spaces, dashes, parens
function sanitizePhoneForHref(phone: string): string {
  return phone.replace(/[^0-9+\-()\s]/g, "");
}

export async function sendInquiry(data: InquiryData): Promise<{ sent: boolean }> {
  const transport = getTransport();
  if (!transport) {
    console.log("[email] SMTP not configured — skipping email delivery. Inquiry received from:", data.email);
    return { sent: false };
  }

  const to = process.env.INQUIRY_TO_EMAIL || "info@radianttz.co.tz";
  const from = process.env.INQUIRY_FROM_EMAIL || process.env.DROIDBOT_SMTP_USER || "noreply@radianttz.co.tz";
  const serviceLabel = SERVICE_LABELS[data.service] || data.service;

  const safeFullName = escapeHtml(data.fullName);
  const safeCompany = data.company ? escapeHtml(data.company) : "";
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safePhoneHref = escapeHtml(sanitizePhoneForHref(data.phone));
  const safeServiceLabel = escapeHtml(serviceLabel);
  const safeMessage = escapeHtml(data.message);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
      <div style="background: #0A1F44; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">New Service Inquiry</h1>
        <p style="margin: 5px 0 0; color: #C9A84C;">Radiant Company Limited</p>
      </div>
      <div style="background: white; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Full Name:</strong></td><td style="padding: 8px 0;">${safeFullName}</td></tr>
          ${safeCompany ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td><td style="padding: 8px 0;">${safeCompany}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;"><a href="tel:${safePhoneHref}">${safePhone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td><td style="padding: 8px 0; color: #0A1F44; font-weight: bold;">${safeServiceLabel}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h3 style="color: #0A1F44; margin: 0 0 10px;">Message / Details:</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
      </div>
      <p style="color: #888; font-size: 12px; margin-top: 15px; text-align: center;">This inquiry was submitted via the Radiant Company Limited website contact form.</p>
    </div>
  `;

  await transport.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `New Service Inquiry from ${safeFullName} — ${safeServiceLabel}`,
    html,
  });

  return { sent: true };
}
