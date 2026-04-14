import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";

const signalsStarter = [
  "Holidays & festivals (Diwali, Eid, Holi & 40+ more)",
  "Weather conditions (monsoon, heat waves, cold evenings)",
];
const signalsGrowthPlus = [
  "Sports fixtures: IPL, cricket, football and Olympics",
  "Local events & community moments",
  "Trending topics & viral moments",
  "Exam & academic calendars",
  "Local news & neighbourhood milestones",
];
const signalsScalePlus = [
  "Movie & entertainment releases",
  "Business-specific demand patterns (your slow days, peak windows)",
];

const featuresAll = [
  "AI-generated promotional image + caption + CTA",
  "Google Business Profile sync (menu, reviews, photos)",
  "Review-to-post: turn 5-star reviews into social proof",
  "Recommended For You: signal-driven post cards",
  "High-value signal alerts (never miss a big moment)",
  "All aspect ratios: 1:1, 4:5, 9:16, 16:9",
  "Re-engagement nudges if you haven't posted in days",
];
const featuresGrowthPlus = [
  "Priority support (response within a few hours)",
  "Onboarding call: live 30-min setup with the team",
  "Credit usage alerts before you hit the limit",
];
const featuresScalePlus = [
  "Dedicated account manager",
  "Monthly signal strategy review",
];

const plans = [
  {
    name: "Starter",
    price: "₹1,999",
    perDay: "₹66",
    signals: 2,
    signalTagline: "Core timing intelligence",
    credits: "500 credits / mo",
    generations: "~33 posts/month",
    featured: false,
    cta: "Start free, 7 days",
    nudge: "Good for getting started",
    signalList: signalsStarter,
    signalExtra: [],
    signalExtraLabel: "",
    featureExtra: [],
    featureExtraLabel: "",
  },
  {
    name: "Growth",
    price: "₹3,999",
    perDay: "₹133",
    signals: 7,
    signalTagline: "Never miss a revenue moment",
    credits: "1,000 credits / mo",
    generations: "~66 posts/month",
    featured: true,
    badge: "⭐ Most restaurants pick this",
    cta: "Start free, 7 days",
    nudge: "Less than one biryani order a day",
    signalList: signalsStarter,
    signalExtra: signalsGrowthPlus,
    signalExtraLabel: "+ 5 more signals",
    featureExtra: featuresGrowthPlus,
    featureExtraLabel: "+ Growth extras",
  },
  {
    name: "Scale",
    price: "₹7,999",
    perDay: "₹266",
    signals: 9,
    signalTagline: "Full intelligence engine",
    credits: "2,000 credits / mo",
    generations: "~133 posts/month",
    featured: false,
    cta: "Contact us",
    nudge: "For multi-outlet & high-volume",
    signalList: signalsStarter,
    signalExtra: [...signalsGrowthPlus, ...signalsScalePlus],
    signalExtraLabel: "+ 7 more signals",
    featureExtra: [...featuresGrowthPlus, ...featuresScalePlus],
    featureExtraLabel: "+ Growth & Scale extras",
  },
];

const faqItems = [
  { q: "Every festival I miss is revenue I don't get back.", a: "Exactly. Diwali, Eid, Valentine's Day. These moments have a hard deadline. Wishly alerts you weeks in advance and builds the post before you even think of it." },
  { q: "My competitor is already posting daily. Am I falling behind?", a: "Consistency compounds. Every day they post and you don't is another day their name comes up when a customer searches. Wishly levels the playing field in 2 minutes a day." },
  { q: "I posted before and got no results. Why would this be different?", a: "Random posting doesn't work. Wishly posts with a reason: a signal, a moment, a promotion. Posts with context convert. Beautiful photos without strategy don't." },
  { q: "What if I can't use all the credits in a month?", a: "Credits refresh monthly. The goal isn't to use all of them. It's to never run out when a big moment hits. Growth gives you enough headroom for every major occasion plus daily posting." },
  { q: "Does Wishly post for me?", a: "You download and post yourself. You stay in full control of what goes live. Wishly just makes sure you always have something ready in under 2 minutes." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts, no cancellation fees. Cancel from your dashboard in one click." },
];

const comparisonData = [
  { feat: "Monthly cost", buffer: "₹1,200–3,700", hootsuite: "₹16,500", canva: "₹2,500–5,000", freelancer: "₹15,000–25,000+", wishly: "from ₹1,999", wishlyHighlight: true },
  { feat: "Generates images", buffer: false, hootsuite: false, canva: "⚠ Manual", freelancer: true, wishly: true },
  { feat: "Writes captions & CTAs", buffer: false, hootsuite: false, canva: false, freelancer: true, wishly: true },
  { feat: "Indian festival signals", buffer: false, hootsuite: false, canva: false, freelancer: "⚠ If reminded", wishly: true },
  { feat: "Review milestone posts", buffer: false, hootsuite: false, canva: false, freelancer: false, wishly: true },
  { feat: "IPL / sports signals", buffer: false, hootsuite: false, canva: false, freelancer: false, wishly: true },
  { feat: "Your time required", buffer: "5+ hrs/wk", hootsuite: "5+ hrs/wk", canva: "4+ hrs/wk", freelancer: "30–60 min/wk", wishly: "2 min/day", wishlyGreen: true },
];

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 min-h-[560px] lg:min-h-[620px]">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Urgency bar */}
            <div className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Zap size={11} className="fill-orange" />
              Only 8 beta spots remaining at this price
            </div>
            <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-tight text-primary-foreground mb-6">
              Every day you don't post,<br /><span style={{background: "linear-gradient(90deg, #F5C842, #FFE566, #D4A017, #FFD700, #F5C842)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradient-shift 3s ease-in-out infinite"}} className="italic font-normal">a competitor fills your table.</span>
            </h1>
            <div className="flex items-center justify-center gap-6 text-[12.5px] text-white/40">
              <span>✓ 7-day free trial</span>
              <span>✓ No credit card needed</span>
              <span>✓ Cancel anytime</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="mt-8 flex justify-center"
          >
            <div className="flex flex-col items-center gap-1 text-white/30 text-[11px]">
              <span>scroll for plans</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30"><path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Loss aversion strip */}
      <div className="bg-[hsla(17,82%,45%,0.06)] border-y border-orange/10 py-5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
            {[
              { val: "₹25,000+", label: "avg. monthly freelancer cost" },
              { val: "3 weeks", label: "avg. gap between posts" },
              { val: "40+", label: "Indian occasions missed/year" },
              { val: "2 min", label: "time Wishly needs per post" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="font-display font-extrabold text-orange text-[22px] leading-none">{s.val}</span>
                <span className="text-mid text-[12px] leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="container py-14">
        <div className="text-center mb-10">
          <p className="text-[13px] text-mid">The more signals your plan monitors, the fewer revenue moments you miss.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch pt-5">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: plan.featured ? -6 : -3 }}
              transition={{ duration: 0.3 }}
              className={`rounded-[24px] relative flex flex-col ${
                plan.featured
                  ? "shadow-[0_32px_80px_rgba(0,0,0,0.45),0_0_0_1px_hsla(17,82%,45%,0.3)]"
                  : "shadow-wishly-sm"
              }`}
            >
              {/* Top accent bar for featured */}
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange to-gold rounded-t-[24px]" />
              )}

              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-gold text-primary-foreground text-[10px] font-bold tracking-wide uppercase px-4 py-1 rounded-full whitespace-nowrap shadow-wishly-orange z-10">
                  {plan.badge}
                </div>
              )}

              <div className={`rounded-[24px] p-7 flex flex-col gap-4 h-full ${
                plan.featured ? "glass-dark" : "bg-card border border-w-border"
              }`}>
                {/* Name + price */}
                <div>
                  <div className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-2 ${plan.featured ? "text-orange" : "text-w-muted"}`}>{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className={`font-display text-[40px] font-extrabold tracking-tight leading-none ${plan.featured ? "text-gradient" : "text-ink"}`}>{plan.price}</span>
                    <span className={`text-sm font-normal ${plan.featured ? "text-white/40" : "text-mid"}`}>/mo</span>
                  </div>
                  <div className={`text-[12px] font-semibold mb-1 ${plan.featured ? "text-orange/70" : "text-mid"}`}>{plan.perDay}/day · No contract</div>
                  <div className={`text-[11.5px] italic ${plan.featured ? "text-white/35" : "text-w-muted"}`}>{plan.nudge}</div>
                </div>

                {/* Signal hero box */}
                <div className={`rounded-xl p-4 flex items-center justify-between ${
                  plan.featured ? "bg-gradient-to-br from-orange/[0.12] to-transparent border border-orange/20" : "bg-background border border-w-border"
                }`}>
                  <div>
                    <div className={`font-display text-[26px] font-extrabold leading-none ${plan.featured ? "text-gradient" : "text-ink"}`}>{plan.signals} signals</div>
                    <div className={`text-[11.5px] mt-0.5 ${plan.featured ? "text-white/40" : "text-w-muted"}`}>{plan.signalTagline}</div>
                  </div>
                  <div className={`text-right text-[11px] ${plan.featured ? "text-white/40" : "text-w-muted"}`}>
                    <div className={`font-bold text-[14px] ${plan.featured ? "text-primary-foreground" : "text-ink"}`}>{plan.generations}</div>
                    <div>{plan.credits}</div>
                  </div>
                </div>

                <div className={`h-px ${plan.featured ? "bg-white/[0.06]" : "bg-w-border"}`} />

                {/* Signals */}
                <div>
                  <div className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5 ${plan.featured ? "text-white/25" : "text-w-muted"}`}>Signals monitored</div>
                  <div className="flex flex-col gap-2">
                    {plan.signalList.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-[12.5px]">
                        <span className="w-[6px] h-[6px] rounded-full bg-orange mt-[5px] flex-shrink-0" />
                        <span className={plan.featured ? "text-white/65" : "text-mid"}>{s}</span>
                      </div>
                    ))}
                    {plan.signalExtra.length > 0 && (
                      <>
                        <div className="text-[11px] text-orange font-bold pt-1">{plan.signalExtraLabel}</div>
                        {plan.signalExtra.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12.5px]">
                            <span className="w-[6px] h-[6px] rounded-full bg-orange mt-[5px] flex-shrink-0" />
                            <span className={plan.featured ? "text-white/65" : "text-mid"}>{s}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className={`h-px ${plan.featured ? "bg-white/[0.06]" : "bg-w-border"}`} />

                {/* Features */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-1.5 ${plan.featured ? "text-white/25" : "text-w-muted"}`}>Everything included</div>
                  {featuresAll.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12.5px]">
                      <div className="w-[15px] h-[15px] rounded-full bg-green/15 border border-green/25 flex items-center justify-center flex-shrink-0 mt-[2px]">
                        <Check size={7} className="text-green" />
                      </div>
                      <span className={plan.featured ? "text-white/65" : "text-mid"}>{f}</span>
                    </div>
                  ))}
                  {plan.featureExtra.length > 0 && (
                    <>
                      <div className="text-[11px] text-orange font-bold pt-1">{plan.featureExtraLabel}</div>
                      {plan.featureExtra.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12.5px]">
                          <div className="w-[15px] h-[15px] rounded-full bg-green/15 border border-green/25 flex items-center justify-center flex-shrink-0 mt-[2px]">
                            <Check size={7} className="text-green" />
                          </div>
                          <span className={plan.featured ? "text-white/65" : "text-mid"}>{f}</span>
                        </div>
                      ))}
                    </>
                  )}
                  <div className="flex items-start gap-2 text-[12.5px] opacity-45 mt-1">
                    <div className="w-[15px] h-[15px] rounded-full border border-w-border flex items-center justify-center flex-shrink-0 mt-[2px]">
                      <Check size={7} className="text-w-muted" />
                    </div>
                    <span className={plan.featured ? "text-white/40" : "text-w-muted"}>
                      Reels generation <span className="text-[9px] border border-current rounded-full px-1.5 py-px ml-1 opacity-70">Soon</span>
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-2">
                  <a
                    href="https://app.wishlyai.in/login"
                    className={`block w-full text-center py-3.5 rounded-full text-[14px] font-bold no-underline transition-all duration-300 ${
                      plan.featured
                        ? "bg-orange text-primary-foreground shadow-[0_4px_24px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark hover:shadow-[0_8px_32px_hsla(17,82%,45%,0.5)] hover:-translate-y-px"
                        : "border border-w-border text-ink hover:border-orange hover:text-orange"
                    }`}
                  >
                    {plan.cta}
                  </a>
                  {plan.featured && (
                    <p className="text-center text-[11px] text-white/30 mt-2">No credit card · Cancel anytime</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[11.5px] text-w-muted mt-6">1 post = 15 credits · Credits refresh monthly · Growth & Scale unlock Reels at no extra charge when it launches</p>
      </div>

      {/* Social proof strip */}
      <AnimatedSection className="container pb-10">
        <div className="glass rounded-2xl p-6 grid md:grid-cols-3 gap-6 border border-w-border/60">
          {[
            { quote: "Diwali last year we were scrambling. This year Wishly had 6 posts ready 3 weeks early.", name: "Ravi M.", loc: "Hyderabad · Biriyani House" },
            { quote: "We went from posting once a month to every day. Our Google discovery searches went up 34%.", name: "Priya K.", loc: "Mumbai · Café Owner" },
            { quote: "IPL season used to fly by without us capitalising. Not anymore.", name: "Arun S.", loc: "Chennai · Sports Bar" },
          ].map((t, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="text-[13px] text-mid leading-relaxed italic">"{t.quote}"</div>
              <div>
                <div className="text-[12.5px] font-bold text-ink">{t.name}</div>
                <div className="text-[11px] text-w-muted">{t.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ROI Band */}
      <section className="relative py-20 overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 section-dark opacity-95" />
        <div className="container relative">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <Eyebrow variant="dark">The only number that matters</Eyebrow>
                <h2 className="font-display text-[clamp(24px,3vw,38px)] font-extrabold text-primary-foreground tracking-tight leading-tight mb-3">
                  If Wishly brings just <span className="text-gradient italic font-normal">4 extra covers</span> a week, it pays for itself 6× over.
                </h2>
                <p className="text-sm text-white/45 leading-relaxed max-w-[460px] mb-5">At ₹800 average spend per cover, 4 extra covers a week = ₹12,800 in additional monthly revenue. Growth plan costs ₹3,999.</p>
                <a href="https://app.wishlyai.in/login" className="inline-block bg-orange text-primary-foreground px-7 py-3.5 rounded-full text-[14px] font-bold no-underline shadow-wishly-orange hover:bg-orange-dark transition-all animate-glow">
                  Claim your 7-day trial →
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[{ n: "4×", l: "extra covers / week" }, { n: "₹12,800", l: "additional revenue / mo" }, { n: "6×", l: "ROI on Growth plan" }].map((s, i) => (
                  <AnimatedSection key={i} delay={i * 0.1} direction="scale">
                    <div className="glass-dark rounded-2xl p-5 text-center border border-white/[0.06]">
                      <div className="font-display text-[30px] font-extrabold text-gradient tracking-tight leading-none mb-1">{s.n}</div>
                      <div className="text-[10.5px] text-white/35 leading-relaxed">{s.l}</div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison Table */}
      <AnimatedSection className="container py-20">
        <div className="text-center mb-8">
          <Eyebrow>The honest comparison</Eyebrow>
          <h2 className="font-display text-[clamp(24px,3.5vw,40px)] font-bold tracking-tight text-ink">What you're actually spending without Wishly</h2>
        </div>
        <div className="overflow-x-auto glass rounded-2xl shadow-wishly-sm">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="p-3 px-4 text-[10.5px] font-bold tracking-wide uppercase text-w-muted text-left border-b-2 border-w-border w-1/4">What you need</th>
                <th className="p-3 px-4 text-[10.5px] font-bold tracking-wide uppercase text-w-muted text-left border-b-2 border-w-border">Buffer / Later</th>
                <th className="p-3 px-4 text-[10.5px] font-bold tracking-wide uppercase text-w-muted text-left border-b-2 border-w-border">Hootsuite</th>
                <th className="p-3 px-4 text-[10.5px] font-bold tracking-wide uppercase text-w-muted text-left border-b-2 border-w-border">Canva + Buffer</th>
                <th className="p-3 px-4 text-[10.5px] font-bold tracking-wide uppercase text-w-muted text-left border-b-2 border-w-border">Freelancer</th>
                <th className="p-3 px-4 text-[10.5px] font-bold tracking-wide uppercase text-orange text-left border-b-2 border-orange/20 bg-orange-light rounded-tr-2xl">Wishly</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-accent/40 transition-colors">
                  <td className="p-3 px-4 font-semibold text-ink border-b border-w-border">{row.feat}</td>
                  {["buffer", "hootsuite", "canva", "freelancer"].map((key) => {
                    const val = (row as Record<string, unknown>)[key];
                    return (
                      <td key={key} className="p-3 px-4 text-mid border-b border-w-border">
                        {val === true ? <span className="text-green font-bold text-[15px]">✓</span> : val === false ? <span className="text-w-border/60 text-lg">✗</span> : String(val)}
                      </td>
                    );
                  })}
                  <td className={`p-3 px-4 border-b border-orange/10 bg-orange-light/50 font-bold ${row.wishlyGreen ? "text-green" : row.wishlyHighlight ? "text-orange text-[15px]" : "text-ink"}`}>
                    {row.wishly === true ? <span className="text-orange font-bold text-[15px]">✓</span> : String(row.wishly)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection className="container pb-20">
        <div className="text-center mb-10">
          <Eyebrow>Before you decide</Eyebrow>
          <h2 className="font-display text-[clamp(26px,3.5vw,42px)] font-bold tracking-tight text-ink">The questions owners ask us</h2>
        </div>
        <div className="max-w-[720px] mx-auto">
          {faqItems.map((faq, i) => (
            <div key={i} className="border-b border-w-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-ink bg-transparent border-none cursor-pointer font-body"
              >
                <span className="leading-relaxed">{faq.q}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base transition-all duration-300 ${
                  openFaq === i ? "bg-orange text-primary-foreground rotate-45" : "bg-background border border-w-border text-mid"
                }`}>+</span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-mid leading-relaxed pb-5 overflow-hidden">
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Trust bar */}
      <AnimatedSection className="container pb-12">
        <div className="flex justify-center gap-8 flex-wrap">
          {[
            { icon: "🔒", text: "No contracts" },
            { icon: "🎁", text: "7-day free trial" },
            { icon: "⚡", text: "Live in 5 minutes" },
            { icon: "🇮🇳", text: "Built for Indian restaurants" },
            { icon: "🎨", text: "Your branding on every post" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px] font-medium text-mid">
              <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-sm shadow-wishly-sm">{item.icon}</div>
              {item.text}
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <section className="relative py-28 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(17,82%,45%,0.12)_0%,transparent_65%)]" />
        <div className="container relative text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 text-orange text-[12px] font-bold px-4 py-1.5 rounded-full mb-6">
              <Zap size={11} className="fill-orange" /> 8 beta spots left at founder pricing
            </div>
            <h2 className="font-display text-[clamp(30px,4.5vw,54px)] font-extrabold text-primary-foreground tracking-tight leading-[1.08] mb-4">
              Your next Diwali post<br />is already waiting for you.
            </h2>
            <p className="text-base text-white/45 max-w-[480px] mx-auto mb-9 leading-relaxed">Start free. No card needed. See what Wishly builds for your restaurant in the next 10 minutes.</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a href="https://app.wishlyai.in/login" className="bg-orange text-primary-foreground px-10 py-4 rounded-full text-[15px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark hover:-translate-y-px transition-all animate-glow">
                Start free trial →
              </a>
              <Link to="/demo" className="border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-semibold no-underline hover:border-white/50 transition-all backdrop-blur-sm">
                See a live demo first
              </Link>
            </div>
            <p className="text-[12px] text-white/25 mt-5">₹0 for 7 days · then from ₹1,999/mo · cancel anytime</p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
