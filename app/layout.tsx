import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Newton IPTV – Best IPTV Subscription UK | Free Trial | 20,000+ Channels",
    template: "%s | Newton IPTV",
  },
  description:
    "Newton IPTV – #1 IPTV subscription UK. Stream 20,000+ live channels, 80,000+ VOD in 4K Ultra HD. Best IPTV provider UK with 24-hour free trial. No credit card required.",
  keywords: [
    "iptv subscription uk",
    "best iptv uk",
    "iptv free trial",
    "united kingdom iptv",
    "iptv providers uk",
    "iptv services uk",
    "iptv provider uk",
    "best iptv provider uk",
    "iptv subscription",
    "smart iptv uk",
    "iptv reseller uk",
    "cheap iptv uk",
    "premium iptv uk",
    "iptv trial uk",
    "iptv with subscription",
  ],
  authors: [{ name: "Newton IPTV" }],
  creator: "Newton IPTV",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://newtoniptv.com",
    siteName: "Newton IPTV",
    title: "Newton IPTV – Best IPTV Subscription UK | Free Trial",
    description:
      "Stream 20,000+ live channels in 4K. Best IPTV subscription service in the UK. Try free for 24 hours. No credit card required.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Newton IPTV – Best IPTV UK" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newton IPTV – Best IPTV Subscription UK | Free Trial",
    description: "20,000+ live channels, 80,000+ VOD in 4K. Best IPTV UK. Try free 24 hours – no credit card.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://newtoniptv.com"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-brand-dark antialiased">
        <ScrollReveal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
