import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessSchema, WebSiteSchema } from "@/components/shared/StructuredData";
import { GoogleAnalyticsProvider } from "@danova/analytics";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://danovarenovations.com"),
  title: {
    default: "Danova Renovations | Best Paint & Flooring in Fort Lauderdale & Miami",
    template: "%s | Danova Renovations",
  },
  description:
    "Premium paint, flooring, and renovation services in Fort Lauderdale and Miami. Interior, exterior, commercial painting. Hardwood, tile, laminate flooring. Licensed & insured.",
  keywords: [
    "renovation",
    "painting",
    "flooring",
    "Fort Lauderdale",
    "Miami",
    "interior painting",
    "exterior painting",
    "flooring installation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    images: ["/images/hero-renovation.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danova Renovations | Best Paint & Flooring in Fort Lauderdale & Miami",
    description:
      "Premium paint, flooring, and renovation services in Fort Lauderdale and Miami. Interior, exterior, commercial painting. Hardwood, tile, laminate flooring. Licensed & insured.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/json"
          href="https://danovarenovations.com/.well-known/llm-index.json"
          title="LLM Index"
        />
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Fort Lauderdale" />
      </head>
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        <GoogleAnalyticsProvider trackPageViews />
        <LocalBusinessSchema />
        <WebSiteSchema />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
