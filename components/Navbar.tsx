"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { WA_TRIAL } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/free-trial", label: "Free Trial" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="animate-nav sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Newton IPTV" width={870} height={830} className="h-48 w-auto object-contain" priority />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-brand-gray hover:text-brand-dark transition-colors text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={WA_TRIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              Start Free Trial
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-brand-gray hover:text-brand-dark"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-brand-border px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-brand-gray hover:text-brand-dark text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WA_TRIAL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2 rounded-full text-sm font-semibold text-center transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      )}
    </nav>
  );
}
