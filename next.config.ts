import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    // Permissive enough for a Next.js static marketing site with inline styles/scripts
    // emitted by the framework, but blocks framing and arbitrary external script hosts.
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Allow static SVG assets (e.g. partner logos) through the Next.js image optimizer.
  // Safe here: SVGs are only served from /public as static files, never user-uploaded.
  images: {
    dangerouslyAllowSVG: true,
    // Next's default is "attachment", which stops SVGs from rendering in <img>.
    // Safe to inline here: SVGs are static files from /public (no user uploads) and
    // the optimizer already serves them with script-src 'none' + sandbox CSP.
    contentDispositionType: "inline",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
