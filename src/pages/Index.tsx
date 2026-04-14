import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import WorkflowAnimation from "@/components/WorkflowAnimation";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import postDiwali from "@/assets/post-diwali.jpg";
import postReviews from "@/assets/post-reviews.jpg";
import postSports from "@/assets/post-sports.jpg";
import catFestival from "@/assets/cat-festival.jpg";
import catQuotes from "@/assets/cat-quotes.jpg";
import catOffers from "@/assets/cat-offers.jpg";
import catEvents from "@/assets/cat-events.jpg";
import catServices from "@/assets/cat-services.jpg";
import catNews from "@/assets/cat-news.jpg";
import catProducts from "@/assets/cat-products.jpg";
import catSpecials from "@/assets/cat-specials.jpg";
import diwaliPost from "@/assets/diwali-post-hero.jpg";

const signals = [
  {
    icon: "🪔", val: "Diwali is 5 days away",
    sub: "Searches spike 3× during Diwali. Post early, win the orders",
    headline: "Diwali Special at", offer: "Festive Menu · Book Your Table",
    caption: "Celebrate the festival of lights with a feast to remember. Our Diwali special menu is available for a limited time only. Order now before it sells out.",
  },
  {
    icon: "⭐", val: "You're approaching 1,000 Google reviews",
    sub: "Turn this milestone into a thank-you promotion",
    headline: "1,000 Reasons to Visit", offer: "10% Off This Weekend",
    caption: "We're almost at 1,000 Google reviews. Thank you. To celebrate, enjoy 10% off your next visit this Saturday or Sunday.",
  },
  {
    icon: "🍹", val: "Friday is 2 days away",
    sub: "Weekend promotions drive 40% more Friday bookings",
    headline: "Friday Night at", offer: "2-for-1 Cocktails Tonight",
    caption: "Friday nights are better with great drinks and great company. Join us tonight, 2-for-1 cocktails until 8pm.",
  },
];

const contentCategories = [
  { emoji: "🎉", name: "Festival Greetings", desc: "Diwali, Christmas, Eid. Timed to arrive before the day.", img: catFestival },
  { emoji: "💬", name: "Quotes", desc: "Turn your best reviews into shareable posts.", img: catQuotes },
  { emoji: "🏷️", name: "Offers & Deals", desc: "Discount nights, happy hour, combo deals.", highlight: true, img: catOffers },
  { emoji: "📆", name: "Events", desc: "Live music, wine tastings, private dining.", img: catEvents },
  { emoji: "⚡", name: "Services", desc: "Private dining, catering, delivery, takeaway.", img: catServices },
  { emoji: "📰", name: "News", desc: "New hours, seasonal menu, awards, team news.", img: catNews },
  { emoji: "🍽️", name: "My Products", desc: "Spotlight hero dishes, seasonal features.", img: catProducts },
  { emoji: "⭐", name: "Specials", desc: "Sunday roast, daily specials, brunch.", img: catSpecials },
];

const hiwSteps = [
  { title: "Connect once", body: "A guided wizard tailors Wishly to your restaurant: business type, service format, cuisine, branding, and location. Done once, never again." },
  { title: "Wishly spots the opportunity", body: "When you log in, Wishly shows contextual suggestions based on your review milestones, upcoming festivals, and occasions." },
  { title: "Your post is built and ready", body: "Select your copy, download the image, and post it yourself. Or schedule it with Buffer, Later, or any tool you already use." },
];

const getBase = () => import.meta.env.BASE_URL;

const heroStates = [
  { img: diwaliPost,                                       download: "diwali-post.jpg",      filename: "wishly-diwali-post.jpg" },
  { img: () => `${getBase()}hero-regen-1.jpg`,             download: "hero-download-1.jpg",  filename: "wishly-post-v2.jpg" },
  { img: () => `${getBase()}hero-regen-2.jpg`,             download: "hero-download-2.jpg",  filename: "wishly-post-v3.jpg" },
];

const Index = () => {
  const [demoName, setDemoName] = useState("");
  const [demoState, setDemoState] = useState<"idle" | "loading" | "done">("done");
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [currentSignal, setCurrentSignal] = useState(signals[0]);
  const [regenCount, setRegenCount] = useState(0);
  const [regenLoading, setRegenLoading] = useState(false);
  const [showRegenPopup, setShowRegenPopup] = useState(false);
  const [activeStep, setActiveStep] = useState(0);


  const handleRegen = () => {
    if (regenCount === 0) {
      setRegenLoading(true);
      setTimeout(() => {
        setRegenLoading(false);
        setRegenCount(1);
      }, 5000);
    } else if (regenCount === 1) {
      setShowRegenPopup(true);
    }
  };

  const handlePopupDismiss = () => {
    setShowRegenPopup(false);
    setRegenLoading(true);
    setTimeout(() => {
      setRegenLoading(false);
      setRegenCount(2);
    }, 3000);
  };

  // Credits bar
  const [showBar, setShowBar] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const fixSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !barDismissed) setShowBar(true); },
      { threshold: 0.2 }
    );
    if (fixSectionRef.current) observer.observe(fixSectionRef.current);
    return () => observer.disconnect();
  }, [barDismissed]);

  useEffect(() => {
    if (!showBar) return;
    if (timeLeft <= 0) { setShowBar(false); setBarDismissed(true); return; }
    const t = setInterval(() => setTimeLeft(p => {
      if (p <= 1) { setShowBar(false); setBarDismissed(true); }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [showBar, timeLeft]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const runDemo = useCallback(() => {
    if (demoState === "loading") return;
    const signal = signals[Math.floor(Math.random() * signals.length)];
    setCurrentSignal(signal);
    setDemoState("loading");
    setTimeout(() => setDemoState("done"), 1400);
  }, [demoState]);

  const name = demoName.trim() || "Your Restaurant";

  return (
    <div className="min-h-screen">
      {/* Full-screen regen popup */}
      {showRegenPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-6"
          style={{ background: "rgba(6,3,1,0.85)", backdropFilter: "blur(14px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-[420px] rounded-3xl border border-orange/20 bg-[hsla(22,30%,6%,0.99)] p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          >
            <button
              onClick={handlePopupDismiss}
              className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-[9px] text-white/30 hover:text-white/60 transition-colors"
            >✕</button>

            <div className="mb-1 text-[36px]">🔥</div>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-orange">While you were browsing…</div>
            <h3 className="mb-3 text-[20px] font-extrabold leading-tight text-primary-foreground">
              Your competitor just posted.<br />
              <span className="text-gradient font-normal italic">You haven't.</span>
            </h3>
            <p className="mb-5 text-[13px] leading-relaxed text-white/45">
              Restaurants that post 4× a week see 2× the bookings. Every silent day is a table you gave away for free.
            </p>
            <a
              href="https://app.wishlyai.in/login"
              className="mb-3 block w-full rounded-full bg-orange py-3.5 text-[14px] font-extrabold text-white no-underline shadow-[0_6px_30px_hsla(17,82%,45%,0.5)] hover:bg-orange-dark transition-all"
            >
              Start posting for free. 60 seconds →
            </a>
            <div className="text-[11px] text-white/20">Only 8 beta spots left · No credit card needed</div>
          </motion.div>
        </motion.div>
      )}

      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
        {/* Base dark overlay */}
        <div className="absolute inset-0" style={{background: "linear-gradient(110deg, hsla(22,40%,4%,0.95) 0%, hsla(22,30%,5%,0.80) 42%, hsla(20,25%,4%,0.90) 100%)"}} />
        {/* Heavy vignette bottom-left to kill the noisy food plate behind text */}
        <div className="absolute bottom-0 left-0 w-[55%] h-[50%] bg-gradient-to-tr from-[hsla(20,30%,3%,0.9)] to-transparent pointer-events-none" />

        <div className="container relative pt-0 pb-0 flex items-center min-h-screen overflow-x-hidden">
          <div className="grid lg:grid-cols-[1fr_1.08fr] gap-8 lg:gap-14 items-center w-full py-16 lg:py-24">

            {/* ── Left ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow variant="dark">Trusted by 100+ restaurants</Eyebrow>
              <div className="flex items-center gap-0 mb-5 mt-1">
                {["Signal", "Generate", "Post"].map((label, i) => (
                  <div key={label} className="flex items-center gap-0">
                    <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/50 hover:text-orange transition-colors cursor-default">{label}</span>
                    {i < 2 && <span className="mx-2.5 text-orange/40 font-light text-[14px]">·</span>}
                  </div>
                ))}
              </div>
              <h1 className="text-[clamp(40px,5vw,70px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-primary-foreground mb-4">
                Your restaurant<br />is full of stories.<br />
                <span className="italic font-normal" style={{background: "linear-gradient(90deg, #F5C842, #FFE566, #D4A017, #FFD700, #F5C842)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradient-shift 3s ease-in-out infinite"}}>Tell them daily.</span>
              </h1>

              <p className="text-[15px] text-white/55 leading-relaxed mb-7 max-w-[400px]">
                Stop staring at a blank screen. Wishly shows you what to post and builds it in seconds.
              </p>

              <div className="flex gap-3 flex-wrap items-center mb-4">
                <a href="https://app.wishlyai.in/login" className="bg-orange text-primary-foreground px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-[14px] sm:text-[15px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.45)] hover:bg-orange-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_hsla(17,82%,45%,0.55)] animate-glow">
                  Start free 7-day trial
                </a>
                <Link to="/demo" className="border-2 border-white/40 text-white/90 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-[14px] sm:text-[15px] font-semibold no-underline hover:border-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm hover:bg-white/[0.06]">
                  Book a demo
                </Link>
              </div>

              <p className="text-[12px] text-white/45 tracking-wide">No credit card &nbsp;·&nbsp; 7 days free &nbsp;·&nbsp; Cancel anytime</p>
            </motion.div>

            {/* ── Right: Widget ── */}
            <motion.div
              className="relative hidden sm:block"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Warm amber glow behind widget */}
              <div className="absolute -inset-0 sm:-inset-6 bg-[radial-gradient(ellipse,hsla(28,90%,25%,0.18)_0%,transparent_70%)] pointer-events-none rounded-[40px]" />
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_48px_120px_rgba(0,0,0,0.8)] border border-[hsla(28,40%,30%,0.2)]" style={{background: "hsla(24,28%,7%,0.94)", backdropFilter: "blur(32px)"}}>

                {/* Titlebar */}
                <div className="px-4 py-2 flex items-center justify-between border-b border-white/[0.05]" style={{background: "hsla(0,0%,100%,0.02)"}}>
                  <div className="flex gap-1">
                    <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
                    <div className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" />
                    <div className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
                  </div>
                  <span className="text-[10px] text-white/20 font-medium tracking-wide">app.wishlyai.in · dashboard</span>
                  <div className="w-[40px]" />
                </div>

                <div className="p-3.5">
                  {/* Signal card */}
                  <div className="bg-orange/10 border border-orange/20 rounded-2xl p-3 mb-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange/20 flex items-center justify-center text-[18px] flex-shrink-0">
                      {currentSignal.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-orange mb-0.5">Signal detected</div>
                      <div className="text-[13px] font-semibold text-primary-foreground leading-tight truncate">{currentSignal.val}</div>
                      <div className="text-[11px] text-white/35 leading-tight truncate">{currentSignal.sub}</div>
                    </div>
                    <span className="bg-orange text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap tracking-wide uppercase flex-shrink-0">High priority</span>
                  </div>

                  {/* Post image */}
                  {demoState === "loading" ? (
                    <div className="flex items-center justify-center gap-2.5 py-16 text-white/30 text-[13px]">
                      <div className="w-4 h-4 border-2 border-white/10 border-t-orange rounded-full animate-spin-slow" />
                      Building your promotion...
                    </div>
                  ) : (
                    <motion.div key={currentSignal.val} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                      <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                        <div className="relative w-full h-[250px] overflow-hidden">
                          {regenLoading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[hsla(24,28%,7%,0.97)]">
                              <div className="relative w-10 h-10">
                                <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                                <div className="absolute inset-0 rounded-full border-2 border-t-orange animate-spin" />
                              </div>
                              <div className="text-[12px] text-white/40 font-medium">Generating new variation...</div>
                            </div>
                          ) : (
                            <>
                              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,181,107,0.2),_transparent_48%),linear-gradient(180deg,rgba(58,28,13,0.95),rgba(18,10,7,0.98))] transition-opacity duration-300 ${heroImageLoaded ? "opacity-0" : "opacity-100"}`} />
                              <motion.img
                                key={regenCount}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                src={typeof heroStates[regenCount].img === "function" ? (heroStates[regenCount].img as () => string)() : heroStates[regenCount].img as string}
                                alt="Generated post"
                                loading="eager"
                                onLoad={() => setHeroImageLoaded(true)}
                                className="w-full h-full object-cover object-center"
                              />
                            </>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                          {!regenLoading && <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-sm text-[8.5px] font-bold tracking-[0.1em] uppercase text-white/55 px-2.5 py-1 rounded-full border border-white/[0.08]">Wishly Generated</div>}
                        </div>

                        <div className="p-3.5 border-t border-white/[0.04]" style={{background: "hsla(0,0%,100%,0.02)"}}>
                          <div className="flex items-center gap-2">
                            {regenCount < 2 ? (
                              <motion.button
                                onClick={handleRegen}
                                animate={!regenLoading ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                disabled={regenLoading}
                                className={`flex-1 py-3 rounded-xl text-[13px] font-bold text-center transition-all ${regenLoading ? "bg-white/[0.06] text-white/30 cursor-not-allowed" : "bg-orange text-white shadow-[0_4px_20px_hsla(17,82%,45%,0.35)]"}`}
                              >
                                {regenLoading ? (
                                  <span className="flex items-center justify-center gap-1.5">
                                    <span className="inline-block w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                                    Generating...
                                  </span>
                                ) : "↺ Regenerate"}
                              </motion.button>
                            ) : (
                              <div className="flex-1 py-3 rounded-xl text-[13px] font-bold text-center bg-white/[0.04] text-white/20 cursor-not-allowed border border-white/[0.06]">↺ Regenerate</div>
                            )}
                            <a
                              href={`${getBase()}${heroStates[regenCount].download}`}
                              download={heroStates[regenCount].filename}
                              className="flex-1 border-2 border-white/[0.15] text-white/60 py-3 rounded-xl text-[13px] font-semibold text-center bg-transparent hover:border-white/30 hover:text-white/80 transition-all no-underline"
                            >↓ Download</a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── THE POWER OF POSTING ─── */}
      <section className="py-20 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>The power of posting consistently</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,50px)] font-bold tracking-tight text-ink leading-[1.06] mb-4">
              Restaurants that post consistently<br />win more tables.
            </h2>
            <p className="text-[15px] text-mid max-w-[480px] mx-auto leading-relaxed">
              The data is clear. Restaurants that show up consistently on social media outperform silent ones by every measurable metric.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                stat: "3×",
                label: "More Tables Booked",
                sub: "Restaurants that post 4× a week see 3× more direct reservations vs silent accounts.",
                color: "orange",
                icon: "🍽️",
              },
              {
                stat: "45%",
                label: "Higher Engagement",
                sub: "Promotional posts with a specific offer get 45% more saves, shares, and clicks than generic food photos.",
                color: "green",
                icon: "📈",
              },
              {
                stat: "2.5×",
                label: "Better Click Rate",
                sub: "Posts built around festivals and occasions outperform generic food photos 2.5× on click-through rate.",
                color: "gold",
                icon: "🎯",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction="scale">
                <div className="bg-card rounded-2xl p-8 border border-w-border/60 shadow-wishly-card card-lift group text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-[3px] ${
                    item.color === "orange" ? "bg-orange" :
                    item.color === "green" ? "bg-green" : "bg-gold"
                  }`} />
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <div className={`font-display text-[54px] font-extrabold tracking-tight leading-none mb-2 ${
                    item.color === "orange" ? "text-orange" :
                    item.color === "green" ? "text-green" : "text-gold"
                  }`}>{item.stat}</div>
                  <div className="text-[16px] font-bold text-ink mb-3">{item.label}</div>
                  <div className="text-[13.5px] text-mid leading-relaxed">{item.sub}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <div className="inline-flex items-center gap-6 md:gap-14 flex-wrap justify-center glass rounded-2xl py-5 px-8 shadow-wishly-sm border border-white/50">
              {[
                { num: "100+", label: "Promotion types" },
                { num: "8", label: "Content categories" },
                { num: "9+", label: "Smart signals" },
                { num: "<20s", label: "Post ready in" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="font-display text-[22px] sm:text-[28px] font-extrabold text-ink tracking-tight leading-none group-hover:text-orange transition-colors duration-300">{stat.num}</div>
                  <div className="text-[11px] text-w-muted mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── WORKFLOW ANIMATION ─── */}
      <WorkflowAnimation />

      {/* ─── THE PROBLEM: Dark section with background ─── */}
      <section className="relative py-24 overflow-hidden noise-overlay">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 section-dark opacity-[0.92]" />
        <div className="container relative">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow variant="dark">You already know this</Eyebrow>
            <h2 className="text-[clamp(30px,4.2vw,52px)] font-bold tracking-tight text-primary-foreground leading-[1.06] mb-4">
              Three moments every restaurant<br />owner has lived through
            </h2>
            <p className="text-[15.5px] text-white/40 max-w-[540px] mx-auto leading-relaxed">
              This isn't a marketing problem. It's a system problem. And you're not alone in it.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {[
              { num: "01", title: "It's 10pm after a long service. You open Instagram. The last post was three weeks ago.", body: "You meant to post something for the weekend. You had an idea. You just never had the time.", quote: '"I know I should be posting more. I just never have the time to think about what to say."', active: true },
              { num: "02", title: "A big festival is days away. You haven't promoted anything.", body: "You knew it was coming. Every year the same scramble: Diwali, Christmas, Mother's Day.", quote: '"We had one of our best holiday nights. I just wish I\'d started promoting it earlier."', active: false },
              { num: "03", title: "A customer leaves a glowing 5-star review. Nobody sees it.", body: "Your best marketing is already being written for free by your happiest customers.", quote: '"We have 700 Google reviews. I know they\'d work brilliantly as posts."', active: false },
            ].map((card, i) => (
              <AnimatedSection key={i} delay={i * 0.15} direction="scale">
                <div className="glass-dark glass-shine rounded-2xl p-7 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_hsla(17,82%,45%,0.2),0_0_80px_hsla(17,82%,45%,0.08)] hover:border-orange/20 h-full flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange to-gold" />
                  <div className={`font-display text-[48px] font-extrabold tracking-tight leading-none mb-4 ${card.active ? "text-orange/25" : "text-white/[0.05]"}`}>{card.num}</div>
                  <div className="text-[15px] font-bold text-primary-foreground mb-2 leading-tight">{card.title}</div>
                  <div className="text-[13.5px] text-white/40 leading-relaxed">{card.body}</div>
                  <div className="mt-4 p-3 bg-white/[0.03] rounded-lg border-l-2 border-orange/60 text-xs text-white/55 leading-relaxed italic">{card.quote}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <div ref={fixSectionRef}><AnimatedSection className="container py-24">
        <div className="text-center mb-12">
          <Eyebrow>The fix</Eyebrow>
          <h2 className="text-[clamp(30px,4.2vw,52px)] font-bold tracking-tight text-ink leading-[1.06] mb-4">
            Wishly understands your business.<br />Then posts <span className="text-gradient italic font-normal">exactly</span> the right thing.
          </h2>
          <p className="text-[15.5px] text-mid max-w-[560px] mx-auto leading-relaxed">
            Once set up, Wishly reads your business data and surfaces what to post and when to post it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="flex flex-col">
            {hiwSteps.map((step, i) => (
              <motion.div
                key={i}
                className={`flex gap-5 py-7 border-b border-w-border last:border-b-0 cursor-pointer transition-all duration-300 ${activeStep === i ? "scale-[1.01]" : "opacity-60 hover:opacity-80"}`}
                onClick={() => setActiveStep(i)}
                whileHover={{ x: 4 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-extrabold flex-shrink-0 transition-all duration-300 ${
                  activeStep === i
                    ? "bg-orange text-primary-foreground shadow-[0_4px_20px_hsla(17,82%,45%,0.3)]"
                    : "bg-background border-[1.5px] border-w-border text-mid"
                }`}>
                  {i + 1}
                </div>
                <div>
                  <div className={`text-[17px] font-bold mb-1 transition-colors ${activeStep === i ? "text-orange" : "text-ink"}`}>{step.title}</div>
                  <div className="text-[14px] text-mid leading-relaxed">{step.body}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-dark rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
            <div className="bg-white/[0.03] p-3 px-4 flex items-center justify-between border-b border-white/[0.06]">
              <div className="flex gap-[5px]">
                <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
                <div className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" />
                <div className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[10.5px] text-white/25 font-medium">app.wishlyai.in · dashboard</span>
              <div className="w-[52px]" />
            </div>
            <motion.div key={activeStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-5">
              {activeStep === 0 && (
                <>
                  <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-3.5">Connected business</div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3.5 flex items-center gap-3 mb-2.5">
                    <div className="w-[38px] h-[38px] bg-orange/15 rounded-[9px] flex items-center justify-center text-lg flex-shrink-0">🍽️</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-primary-foreground">Paradise Biriyani</div>
                      <div className="text-xs text-white/40">Hyderabad · Indian · Biriyani & Kebabs</div>
                    </div>
                    <div className="bg-green/15 text-green text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-green/20">✓ Connected</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                      <div className="text-[10px] text-white/25 font-semibold uppercase tracking-wide mb-1">Google Reviews</div>
                      <div className="text-xl font-extrabold font-display text-primary-foreground">944</div>
                      <div className="text-[11px] text-green font-semibold">★ 4.9 avg</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                      <div className="text-[10px] text-white/25 font-semibold uppercase tracking-wide mb-1">Monthly Views</div>
                      <div className="text-xl font-extrabold font-display text-primary-foreground">12.4k</div>
                      <div className="text-[11px] text-orange font-semibold">↑ 18% this month</div>
                    </div>
                  </div>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-3.5">Recommended For You</div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-orange/10 border border-orange/20 rounded-xl p-3 flex items-center gap-2.5">
                      <span className="text-lg">📅</span>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-orange">Mother's Day · 18 days away</div>
                        <div className="text-[11.5px] text-white/40">Biggest dining occasion. Promote now</div>
                      </div>
                      <span className="bg-orange text-primary-foreground text-[9.5px] font-bold px-2 py-0.5 rounded-full">High priority</span>
                    </div>
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 flex items-center gap-2.5">
                      <span className="text-lg">⭐</span>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-primary-foreground">950+ reviews milestone</div>
                        <div className="text-[11.5px] text-white/40">Thank your customers</div>
                      </div>
                      <span className="bg-gold/15 text-gold text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-gold/20">Opportunity</span>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 flex items-center gap-2.5 opacity-50">
                      <span className="text-lg">🍹</span>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-primary-foreground">Friday is 3 days away</div>
                        <div className="text-[11.5px] text-white/40">Weekend promo opportunity</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-3.5">Image ready · Mother's Day</div>
                  <div className="bg-gradient-to-br from-[#1A0F05] to-[#2D1808] rounded-xl p-5 text-center mb-2.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(17,82%,45%,0.15)_0%,transparent_50%)]" />
                    <div className="relative">
                      <div className="font-display text-[17px] font-extrabold text-primary-foreground leading-tight mb-1.5">Mother's Day<br />at Paradise Biriyani</div>
                      <div className="text-[10px] font-bold tracking-[0.08em] uppercase text-orange bg-orange/15 border border-orange/30 px-2.5 py-0.5 rounded-full inline-block">3-Course Menu · May 11 Only</div>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">"Treat mum to something she'll never forget. Tables are filling fast."</p>
                  <button className="w-full bg-orange text-primary-foreground border-none py-2.5 rounded-xl text-[13px] font-bold font-body cursor-pointer hover:bg-orange-dark transition-colors">↓ Download image</button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </AnimatedSection></div>

      {/* ─── POST EXAMPLES ─── */}
      <section className="py-24 bg-gradient-to-b from-background via-accent/60 to-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>What Wishly builds for you</Eyebrow>
            <h2 className="text-[clamp(30px,4.2vw,52px)] font-bold tracking-tight text-ink leading-[1.06] mb-4">Every post has a job to do.</h2>
            <p className="text-[15.5px] text-mid max-w-[560px] mx-auto leading-relaxed">Not ambient food photography. Promotions with a specific occasion, a real offer, and a call-to-action.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              { img: postDiwali, signal: "🪔 festival signal", sigColor: "bg-[#FFF3E0] text-[#E65100]", title: "Diwali: Reserve Now", cap: "Celebrate the festival of lights with our special Diwali menu. Tables are filling fast. Reserve yours today.", imgPos: "top" },
              { img: postReviews, signal: "⭐ review milestone", sigColor: "bg-gold-light text-gold", title: "500 Reviews & Counting", cap: "When you hit a review milestone, Wishly turns it into a promotion, automatically. Thank your customers and drive them back.", imgPos: "30%" },
              { img: postSports, signal: "🏏 sports signal", sigColor: "bg-[#E8F5E9] text-[#2E7D32]", title: "IPL Match Night Special", cap: "IPL, cricket, football, Olympics. Wishly detects every big match and builds your promotion before the crowd arrives.", imgPos: "top" },
            ].map((post, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction="scale" className="h-full">
                <div className="bg-card rounded-2xl overflow-hidden shadow-wishly-card card-lift group border border-w-border/60 flex flex-col h-full">
                  <div className="w-full aspect-square overflow-hidden flex-shrink-0">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: post.imgPos }} loading="lazy" />
                  </div>
                  <div className="p-5 pb-6 flex flex-col flex-1">
                    <div className={`inline-flex items-center gap-[5px] text-[9.5px] font-bold tracking-[0.07em] uppercase px-2.5 py-1 rounded-full mb-2.5 ${post.sigColor}`}>{post.signal}</div>
                    <div className="text-[15px] font-bold text-ink mb-1.5">{post.title}</div>
                    <div className="text-[13px] text-mid leading-relaxed line-clamp-2">{post.cap}</div>
                    <div className="flex items-center gap-1.5 text-[11px] mt-auto pt-4 px-3 py-2 bg-orange-light/60 rounded-lg text-orange font-semibold">
                      <Sparkles size={11} /> 4 copy variations · pick what feels right
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BROWSE CONTENT CATEGORIES ─── */}
      <section className="py-20 bg-gradient-to-b from-accent/40 to-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>Browse by category</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,50px)] font-bold tracking-tight text-ink leading-[1.06] mb-4">
              100+ promotion types.<br />Every occasion covered.
            </h2>
            <p className="text-[15px] text-mid max-w-[480px] mx-auto leading-relaxed">
              Wishly has a ready-made post for every signal — from festivals to sports nights, reviews to daily specials.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {contentCategories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 0.07} direction="scale">
                <div className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer card-lift">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {cat.highlight && (
                    <div className="absolute top-3 right-3 bg-orange text-white text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full">Popular</div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-lg mb-0.5">{cat.emoji}</div>
                    <div className="text-[13px] font-bold text-white leading-tight">{cat.name}</div>
                    <div className="text-[11px] text-white/55 leading-tight mt-0.5 hidden sm:block">{cat.desc}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <a
              href="https://app.wishlyai.in/login"
              className="inline-flex items-center gap-2 border-2 border-orange/30 text-orange px-8 py-3.5 rounded-full text-[14px] font-semibold no-underline hover:bg-orange hover:text-white transition-all duration-300"
            >
              Browse all categories <ArrowRight size={15} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── WHY CHOOSE WISHLY ─── */}
      <section className="py-20 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>Why choose Wishly</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,50px)] font-bold tracking-tight text-ink leading-[1.06] mb-4">
              Built for restaurants,<br />not marketing agencies.
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "⚡", title: "Ready in seconds", desc: "No design skills, no Canva, no brief. Pick a signal, customise your post, download." },
              { icon: "🗓️", title: "Occasion-aware", desc: "Wishly knows what to post before you do — festivals, milestones, sports nights, weekly specials." },
              { icon: "🎨", title: "On-brand always", desc: "Your logo, colours, and menu are baked into every post automatically. Zero manual setup." },
              { icon: "📲", title: "Share-ready format", desc: "Every image is sized perfectly for WhatsApp, Instagram, and Facebook — no cropping needed." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1} direction="scale">
                <div className="bg-card rounded-2xl p-7 border border-w-border/60 shadow-wishly-card card-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-orange-light flex items-center justify-center text-2xl mb-5">{item.icon}</div>
                  <div className="text-[16px] font-bold text-ink mb-2">{item.title}</div>
                  <div className="text-[13.5px] text-mid leading-relaxed">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OLD WAY vs WISHLY: comparison section ─── */}
      <section className="relative py-24 overflow-hidden noise-overlay">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 section-dark opacity-[0.96]" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-4">
              <Eyebrow variant="dark">The math that matters</Eyebrow>
            </div>
            <h2 className="text-[clamp(28px,3.8vw,48px)] font-extrabold text-primary-foreground tracking-tight leading-[1.06] mb-8 text-center">
              A marketing team costs <span className="text-orange line-through decoration-orange/60">₹25,000+/month.</span><br />
              Wishly costs less than one boosted post.
            </h2>
            <div className="flex justify-center mb-14">
              <Link to="/pricing" className="border border-white/20 text-white/70 px-7 py-3 rounded-full text-[14px] font-semibold no-underline hover:border-white/40 hover:text-white transition-all duration-300 backdrop-blur-sm hover:bg-white/[0.05]">
                See pricing plans →
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1} direction="left">
              <div className="glass-dark rounded-2xl p-8 h-full border border-white/[0.08] relative overflow-hidden">
                <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/30 mb-5">The Old Way</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-[42px] font-extrabold text-orange/70 line-through decoration-2 leading-none">₹25,000+</span>
                </div>
                <p className="text-[13px] text-white/35 mb-6">per month for a marketing team</p>
                <ul className="flex flex-col gap-3">
                  {['Waiting days for a single "Special of the Day" post', "Expensive food shoots that go out of date fast", 'Missed trends because your designer was "busy"', "No system. Festivals, reviews, sports all slip by unnoticed"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/50 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="right">
              <div className="rounded-2xl p-8 h-full border border-orange/20 relative overflow-hidden bg-gradient-to-br from-orange/[0.08] to-transparent">
                <div className="absolute inset-0 bg-gradient-to-br from-orange/[0.04] to-transparent" />
                <div className="relative">
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-orange mb-5">With Wishly AI</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display text-[42px] font-extrabold text-gradient leading-none">₹1,999/-</span>
                  </div>
                  <p className="text-[13px] text-orange/50 mb-6">Starts at per month</p>
                  <ul className="flex flex-col gap-3">
                    {["Generate mouth-watering posts in clicks", "High-quality, social media ready food visuals", "9+ smart signals: festivals, sports, reviews and more", "100% brand consistency across your menu"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/60 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── BETA FOUNDER ─── */}
      <AnimatedSection className="container py-24">
        <div className="relative rounded-[32px] overflow-hidden">
          <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsla(33,28%,4%,0.96)] to-[hsla(33,28%,4%,0.82)]" />
          <div className="relative grid lg:grid-cols-2 items-stretch">
            <div className="p-6 sm:p-10 lg:p-16">
              <Eyebrow variant="dark">Now in beta</Eyebrow>
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold text-primary-foreground tracking-tight leading-[1.06] mb-5">
                Be one of our<br />first 100 restaurants.
              </h2>
              <p className="text-sm text-white/40 leading-relaxed max-w-[400px] mb-8">
                We're in beta and working closely with our first restaurants. You get full access free for 7 days, direct input into what we build next, and a founder rate locked in permanently.
              </p>
              <div className="flex flex-col gap-3">
                <a href="https://app.wishlyai.in/login" className="inline-block text-center bg-orange text-primary-foreground px-8 py-4 rounded-full text-[15px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark transition-all w-fit animate-glow">
                  Claim your free 7-day trial
                </a>
                <Link to="/demo" className="text-[13px] text-white/40 no-underline hover:text-white/60 transition-colors flex items-center gap-1.5 w-fit">
                  Want to see it first? Book a free demo <ArrowRight size={13} />
                </Link>
              </div>
            </div>
            <div className="border-l border-white/[0.06] p-14 lg:p-16 hidden lg:block">
              <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/25 mb-6">What early access includes</div>
              <div className="flex flex-col gap-5">
                {[
                  { title: "2× credits on us", desc: "Double credits for your first month, no strings attached." },
                  { title: "Free food mockups", desc: "Professional-grade food visuals for your menu, on us." },
                  { title: "Free menu revamp", desc: "We redesign your menu layout as part of onboarding." },
                  { title: "First access to video generation", desc: "You'll be first when we launch AI video posts." },
                  { title: "Price locked in forever", desc: "Your founder rate never increases, ever." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-orange/15 border border-orange/30 flex items-center justify-center text-orange text-[12px] font-bold flex-shrink-0">✓</div>
                    <div>
                      <div className="text-[13.5px] font-semibold text-primary-foreground mb-0.5">{item.title}</div>
                      <div className="text-[12px] text-white/35 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 p-4 glass-dark rounded-xl">
                <div className="text-[11px] text-white/30 mb-2">Beta spots remaining</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange to-gold rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-xs font-bold text-primary-foreground whitespace-nowrap">8 of 100 left</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* ─── FINAL CTA ─── */}
      <section className="relative py-24 overflow-hidden noise-overlay">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(circle,hsla(17,82%,45%,0.15)_0%,transparent_55%)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-float" />
        <div className="container relative text-center">
          <AnimatedSection>
            <Eyebrow variant="dark">7-day free trial</Eyebrow>
            <h2 className="text-[clamp(34px,5.2vw,64px)] font-extrabold text-primary-foreground tracking-tight leading-[1.04] mb-6">
              Your restaurant deserves<br />to be <span className="text-gradient italic font-normal">found.</span>
            </h2>
            <p className="text-[16px] text-white/40 mb-10 max-w-[520px] mx-auto leading-relaxed">
              Start posting daily in the next 10 minutes. Secure your spot, no charge during your 7-day trial.
            </p>
            <div className="flex justify-center gap-4 flex-wrap mb-6">
              <a href="https://app.wishlyai.in/login" className="bg-orange text-primary-foreground px-10 py-4.5 rounded-full text-[16px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.5)] hover:bg-orange-dark hover:-translate-y-0.5 transition-all duration-300 animate-glow">
                Start free 7-day trial
              </a>
              <Link to="/demo" className="border border-white/15 text-white/60 px-8 py-4.5 rounded-full text-[16px] font-semibold no-underline hover:border-white/40 hover:text-primary-foreground transition-all duration-300 backdrop-blur-sm hover:bg-white/[0.05]">
                Book a 15-min demo
              </Link>
            </div>
            <p className="text-xs text-white/20">No contracts · Cancel anytime · 7-day money-back guarantee</p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      {/* ─── STICKY CREDITS BAR ─── */}
      {showBar && !barDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 shadow-[0_-8px_40px_rgba(0,0,0,0.25)]"
          style={{ background: "linear-gradient(90deg, hsla(22,40%,6%,0.98) 0%, hsla(20,30%,8%,0.98) 100%)", backdropFilter: "blur(20px)", borderTop: "1px solid hsla(17,82%,45%,0.2)" }}
        >
          {/* Left: lamp + text */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="text-[13px] sm:text-[14px] font-bold text-primary-foreground leading-tight">
                We're giving you <span className="text-orange">60 free credits</span> to get started
              </p>
              <p className="text-[11px] sm:text-[11.5px] text-white/40 mt-0.5 hidden sm:block">No credit card needed. Claim before the offer expires</p>
            </div>
          </div>

          {/* Center: timer */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] text-white/35 uppercase tracking-wide font-semibold">Expires in</span>
            <div className="flex items-center gap-1">
              <span className="bg-orange/15 border border-orange/30 text-orange font-extrabold text-[18px] font-display px-3 py-1 rounded-lg tabular-nums">{mins}</span>
              <span className="text-orange font-bold text-lg">:</span>
              <span className="bg-orange/15 border border-orange/30 text-orange font-extrabold text-[18px] font-display px-3 py-1 rounded-lg tabular-nums">{secs}</span>
            </div>
          </div>

          {/* Right: CTA + close */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://app.wishlyai.in/login"
              className="bg-orange text-white px-6 py-2.5 rounded-full text-[13.5px] font-bold no-underline shadow-[0_4px_20px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark transition-all"
            >
              Claim now →
            </a>
            <button
              onClick={() => { setShowBar(false); setBarDismissed(true); }}
              className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
