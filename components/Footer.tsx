import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Service: [
    { href: "/pricing", label: "Pricing" },
    { href: "/free-trial", label: "Free Trial" },
    { href: "/blog", label: "Blog" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/refund", label: "Refund Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/5 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.png" alt="Newton IPTV" width={870} height={830} className="h-12 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-white/50 text-sm leading-6 max-w-xs">
              The UK&apos;s premium IPTV subscription service. 20,000+ live channels,
              80,000+ VOD titles, crystal-clear 4K streaming.
            </p>
            <p className="mt-4 text-xs text-white/25">
              Newton IPTV is for legally licensed content only. We do not endorse
              the use of our service to access unlicensed material.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Newton IPTV. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Serving customers across the United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
