import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import VODSection from "@/components/VODSection";
import PricingCards from "@/components/PricingCards";
import HowItWorks from "@/components/HowItWorks";
import SportsChannels from "@/components/SportsChannels";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: { absolute: "Newton IPTV – Best IPTV Subscription UK | Free Trial | 20,000+ Channels" },
  description:
    "Newton IPTV – UK's #1 IPTV provider. Get the best IPTV subscription UK with 20,000+ live channels, 80,000+ VOD in 4K Ultra HD. Start your free IPTV trial today – no credit card required.",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Newton IPTV",
  url: "https://newtoniptv.co.uk",
  description:
    "Premium IPTV subscription service for the United Kingdom. 20,000+ channels, 80,000+ VOD.",
  areaServed: "GB",
  serviceType: "IPTV Subscription",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Hero />
      <StatsBar />
      <Features />
      <VODSection />
      <SportsChannels />

      <section className="py-20 bg-brand-bg2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="reveal delay-100 text-brand-gray max-w-xl mx-auto">
              Choose the IPTV subscription plan that suits you. All plans include full access
              with no hidden fees.
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
