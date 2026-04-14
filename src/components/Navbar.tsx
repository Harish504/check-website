import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import wishlyLogo from "@/assets/wishly-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/gallery", label: "Gallery" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "glass shadow-wishly-sm h-[60px]"
        : "bg-transparent h-[72px]"
    }`}>
      <div className="container h-full flex items-center justify-between">
        <Link to="/" className="no-underline flex items-center gap-2">
          <img src={wishlyLogo} alt="" className="h-14 w-14 object-contain -my-2" />
          <span className={`font-display text-[20px] font-extrabold tracking-tight leading-none ${scrolled ? "text-ink" : "text-primary-foreground"}`}>Wishly</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13.5px] font-medium no-underline transition-all duration-300 ${
                (link.to === "/" ? location.pathname === "/" : location.pathname === link.to)
                  ? "text-orange font-semibold"
                  : scrolled
                    ? "text-mid hover:text-ink"
                    : "text-white/70 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.wishlyai.in/login"
            className={`text-[13.5px] font-medium no-underline transition-colors ${
              scrolled ? "text-mid hover:text-ink" : "text-white/70 hover:text-primary-foreground"
            }`}
          >
            Log in
          </a>
          <a
            href="https://app.wishlyai.in/login"
            className="bg-orange text-primary-foreground px-5 py-2.5 rounded-full text-[13.5px] font-semibold no-underline shadow-wishly-orange hover:bg-orange-dark transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_hsla(17,82%,45%,0.3)]"
          >
            Start Free Trial
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden ${scrolled ? "text-ink" : "text-primary-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 glass p-6 flex flex-col gap-4 md:hidden shadow-wishly z-50">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`text-[15px] font-medium no-underline ${
                (link.to === "/" ? location.pathname === "/" : location.pathname === link.to) ? "text-orange font-semibold" : "text-mid"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <a href="https://app.wishlyai.in/login" className="text-[14px] text-mid no-underline">
              Log in
            </a>
            <a
              href="https://app.wishlyai.in/login"
              className="bg-orange text-primary-foreground px-5 py-3 rounded-full text-[14px] font-semibold no-underline shadow-wishly-orange text-center"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
