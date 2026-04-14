import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import wishlyLogo from "@/assets/wishly-logo.png";

const Footer = () => {
  return (
    <footer className="section-dark py-16 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,hsla(17,82%,45%,0.08)_0%,transparent_70%)] -left-20 -bottom-20 pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,hsla(41,68%,38%,0.06)_0%,transparent_70%)] right-20 top-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={wishlyLogo} alt="" className="h-14 w-14 object-contain -my-2" />
              <span className="font-display text-xl font-extrabold text-primary-foreground tracking-tight leading-none">Wishly</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[300px]">
              WishlyAI enables individuals and businesses to quickly generate share-ready festival, personal, and business visuals for WhatsApp and social media.
            </p>
          </div>

          {/* Business */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-primary-foreground mb-4">Business</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Offers & Deals</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Business News</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Services</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Trending News</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">My Product</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Business Special</a>
            </div>
          </div>

          {/* Personal */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-primary-foreground mb-4">Personal</div>
            <div className="flex flex-col gap-2.5">
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Festival Greeting</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Quotes</a>
              <a href="https://app.wishlyai.in/" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors">Wishes</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-primary-foreground mb-4">Contact</div>
            <div className="flex flex-col gap-3">
              <a href="mailto:wishlyai@aipluslabs.com" className="text-[13px] text-white/50 no-underline hover:text-orange transition-colors flex items-center gap-2">
                <span className="text-orange">✉</span> wishlyai@aipluslabs.com
              </a>
              <div className="flex items-center gap-3 mt-1">
                {[
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-orange hover:text-primary-foreground transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accent line */}
        <div className="h-[3px] rounded-full bg-gradient-to-r from-orange via-orange to-green w-full mb-6" />

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs text-white/40">
              © 2026 <span className="font-bold text-primary-foreground">Wishly<span className="text-orange">AI</span></span>. Powered by <span className="font-bold text-primary-foreground">AI PLUS LABS</span>
            </div>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <a href="https://app.wishlyai.in/login" className="text-[12px] text-white/40 no-underline hover:text-orange transition-colors">Sign In</a>
            <a href="https://app.wishlyai.in/login" className="text-[12px] text-white/40 no-underline hover:text-orange transition-colors">Sign Up</a>
            <a href="https://app.wishlyai.in/" className="text-[12px] text-white/40 no-underline hover:text-orange transition-colors">Create Design</a>
            <Link to="/terms" className="text-[12px] text-white/40 no-underline hover:text-orange transition-colors">Terms & Conditions</Link>
            <Link to="/demo" className="text-[12px] text-white/40 no-underline hover:text-orange transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
