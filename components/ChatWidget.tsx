"use client";
import { useState, useRef, useEffect } from "react";
import { WA_TRIAL } from "@/lib/whatsapp";

interface Message {
  role: "user" | "assistant";
  content: string;
  isHtml?: boolean;
}

const WA_LINK = WA_TRIAL;

// FAQ knowledge base — keyword matching
const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["price", "pricing", "cost", "how much", "plan", "plans", "£", "monthly", "yearly", "annual"],
    answer: "Our plans:<br/>• <b>1 Month</b> — £9.99<br/>• <b>3 Months</b> — £27.99<br/>• <b>6 Months</b> — £49.99<br/>• <b>1 Year</b> — £79.99<br/><br/>All plans include 20,000+ channels &amp; 80,000+ VOD in 4K. 🎬",
  },
  {
    keywords: ["free trial", "trial", "test", "try"],
    answer: "Yes! We offer a <b>free 24-hour trial</b> — no credit card required. You get full access to all channels and VOD. Click below to start! 👇",
  },
  {
    keywords: ["channel", "channels", "bbc", "itv", "sky", "sport", "sports", "premier league", "football", "ufc", "boxing"],
    answer: "We have <b>20,000+ live channels</b> including:<br/>• BBC, ITV, Channel 4, Channel 5<br/>• Sky Sports (all), TNT Sports, BT Sport<br/>• Premier League, Champions League, UFC, Boxing<br/>• NFL, NBA, F1, Cricket, Tennis, Golf<br/>• International channels from 50+ countries 🌍",
  },
  {
    keywords: ["device", "devices", "fire stick", "firestick", "smart tv", "android", "iphone", "ios", "pc", "computer", "mac", "samsung", "lg"],
    answer: "Newton IPTV works on <b>all devices</b>:<br/>• Amazon Fire Stick &amp; Fire TV<br/>• Smart TV (Samsung, LG, Sony)<br/>• Android &amp; iOS phones/tablets<br/>• Windows &amp; Mac computers<br/>• MAG boxes &amp; Android TV boxes 📱",
  },
  {
    keywords: ["setup", "install", "how to", "configure", "app", "smarters", "tivimate", "m3u", "xtream"],
    answer: "Setup takes under 5 minutes:<br/>1. Download <b>IPTV Smarters Pro</b> or <b>TiviMate</b><br/>2. Select 'Login with Xtream Codes'<br/>3. Enter your credentials (sent after payment)<br/>4. Start streaming! 🚀<br/><br/>Need help? Contact us on WhatsApp.",
  },
  {
    keywords: ["buffering", "buffer", "freeze", "slow", "lag", "not working", "broken", "issue", "problem", "error"],
    answer: "For buffering issues:<br/>• Check your internet speed (need 10+ Mbps for HD)<br/>• Restart your device and router<br/>• Try a different server in the app<br/><br/>Still having issues? Contact our WhatsApp support for instant help! 💬",
  },
  {
    keywords: ["speed", "internet", "mbps", "broadband", "wifi", "4k"],
    answer: "Recommended internet speeds:<br/>• <b>HD streams</b> — 10 Mbps minimum<br/>• <b>4K streams</b> — 25 Mbps minimum<br/><br/>Most UK broadband handles this easily. 📶",
  },
  {
    keywords: ["reseller", "wholesale", "panel", "sell", "business", "partner"],
    answer: "We offer a <b>reseller programme</b> with a full panel to manage customers. Buy credits wholesale and sell at your own price. Contact us on WhatsApp to discuss reseller packages! 💼",
  },
  {
    keywords: ["payment", "pay", "paypal", "card", "credit card", "debit", "crypto"],
    answer: "Payment is handled securely via WhatsApp. Contact us to complete your order — we'll guide you through the payment process. 💳",
  },
  {
    keywords: ["vod", "movies", "movie", "series", "shows", "on demand", "netflix", "tv show"],
    answer: "We have <b>80,000+ movies &amp; TV series</b> on demand, updated daily with the latest releases. Full box sets, new movies, and exclusive content — all included in every plan. 🎬",
  },
  {
    keywords: ["uptime", "reliable", "reliability", "down", "server"],
    answer: "Newton IPTV maintains <b>99.9% uptime</b> with redundant server infrastructure. Even during peak times like Premier League matches, streams stay stable. ✅",
  },
  {
    keywords: ["refund", "money back", "cancel", "cancellation"],
    answer: "That's why we offer a free 24-hour trial first — so you can test everything before paying. If you have a specific concern after purchase, contact us on WhatsApp and we'll sort it out. 🤝",
  },
  {
    keywords: ["contact", "whatsapp", "support", "help", "human", "speak", "talk", "phone"],
    answer: "Our support team is available on <b>WhatsApp</b> for fast help. Click the button below to chat with us directly! 💬",
  },
];

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! 👋 I'm the Newton IPTV support agent.<br/><br/>Ask me anything about our service — pricing, channels, devices, setup, and more!",
  isHtml: true,
};

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.answer;
    }
  }
  return "I'm not sure about that — but our team on WhatsApp can answer instantly! Click the button below to chat with us. 💬";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;

    const reply = getReply(text);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: reply, isHtml: true },
    ]);
    setInput("");
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          style={{ maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="bg-brand-red px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="2" width="4" height="7" rx="2" fill="white"/>
                  <circle cx="32" cy="2" r="3" fill="white"/>
                  <rect x="10" y="9" width="44" height="36" rx="8" fill="white"/>
                  <rect x="18" y="19" width="10" height="10" rx="3" fill="#e53e3e"/>
                  <rect x="36" y="19" width="10" height="10" rx="3" fill="#e53e3e"/>
                  <circle cx="21" cy="22" r="2" fill="white"/>
                  <circle cx="39" cy="22" r="2" fill="white"/>
                  <rect x="19" y="33" width="26" height="6" rx="3" fill="#e53e3e"/>
                  <rect x="4" y="19" width="6" height="12" rx="3" fill="white"/>
                  <rect x="54" y="19" width="6" height="12" rx="3" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Newton IPTV Support</p>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Always online
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white p-1 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#0f1117] p-4 space-y-3" style={{ minHeight: "300px", maxHeight: "360px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-5 ${
                    m.role === "user"
                      ? "bg-brand-red text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 rounded-bl-sm"
                  }`}
                >
                  {m.isHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: m.content }} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA always visible at bottom of messages */}
            <div className="flex justify-start">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-[#1a1d27] border-t border-white/10 px-3 py-3 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question…"
              className="flex-1 bg-white/10 text-white placeholder-white/30 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-brand-red/50 transition-all"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="bg-brand-red hover:bg-brand-red-hover disabled:opacity-40 text-white rounded-xl px-4 py-2.5 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-brand-red hover:bg-brand-red-hover shadow-xl shadow-brand-red/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Open support chat"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="2" width="4" height="8" rx="2" fill="white"/>
            <circle cx="32" cy="2" r="3" fill="white"/>
            <rect x="10" y="10" width="44" height="36" rx="8" fill="white"/>
            <rect x="18" y="20" width="10" height="10" rx="3" fill="#e53e3e"/>
            <rect x="36" y="20" width="10" height="10" rx="3" fill="#e53e3e"/>
            <circle cx="21" cy="23" r="2" fill="white"/>
            <circle cx="39" cy="23" r="2" fill="white"/>
            <rect x="19" y="34" width="26" height="6" rx="3" fill="#e53e3e"/>
            <rect x="4" y="20" width="6" height="12" rx="3" fill="white"/>
            <rect x="54" y="20" width="6" height="12" rx="3" fill="white"/>
          </svg>
        )}
      </button>
    </>
  );
}
