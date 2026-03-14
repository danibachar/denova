import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalyticsProvider } from "@danova/analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const LEAD_SITE_URL = "https://lead.danovarenovations.com/";

export const metadata: Metadata = {
  metadataBase: new URL(LEAD_SITE_URL),
  title: "Get a Free Quote | Danova Renovations",
  description:
    "Tell us about your paint or flooring project. We'll get back within 24 hours.",
  openGraph: {
    title: "Get a Free Quote | Danova Renovations",
    description:
      "Tell us about your paint or flooring project. We'll get back within 24 hours.",
    images: ["https://danovarenovations.com/images/hero-renovation.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <GoogleAnalyticsProvider trackPageViews />
        {children}
      </body>
    </html>
  );
}
