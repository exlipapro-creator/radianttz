import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const LOGO_ASSET = "/assets/SAVE_20260711_203949.jpg";
const BASE_URL = process.env.DROIDBOT_PUBLIC_URL || "https://www.radianttz.com";

export const metadata: Metadata = {
  title: "Radiant Company Limited — Maritime, Logistics & Construction Services in East Africa",
  description:
    "Radiant Company Limited provides premier maritime, logistics, and construction support services across East Africa. Shipping agency (ZMA), cargo handling, ship chandling, freight transport, and building materials in Zanzibar and Tanzania.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Radiant Company Limited — Radiant services, limitless solutions",
    description:
      "Premier maritime, logistics, and construction support services across East Africa — shipping agency, cargo handling, ship chandling, building materials.",
    url: BASE_URL,
    siteName: COMPANY.name,
    images: [
      {
        url: LOGO_ASSET,
        width: 1200,
        height: 630,
        alt: "Radiant Company Limited logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Company Limited",
    description: "Radiant services, limitless solutions — East Africa's premier maritime and logistics partner.",
    images: [LOGO_ASSET],
  },
  icons: {
    icon: LOGO_ASSET,
    shortcut: LOGO_ASSET,
    apple: LOGO_ASSET,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
