import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import teamImg from "@/assets/about-team.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 min-h-[560px] lg:min-h-[620px]">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsla(17,82%,45%,0.12)_0%,transparent_72%)] animate-float pointer-events-none" />

        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/15 px-4 py-1.5 text-[12px] font-bold text-orange backdrop-blur-sm mb-6">
              Built for the real world of restaurant marketing
            </div>
            <h1 className="text-[clamp(32px,4.3vw,56px)] font-extrabold leading-[1.05] tracking-tight text-primary-foreground mb-4">
              Your restaurant runs daily.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #B9FFE9, #7FE0C0, #C5FFE9, #7FE0C0, #B9FFE9)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 3s ease-in-out infinite",
                }}
                className="font-normal italic"
              >
                Your marketing should too.
              </span>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[12.5px] text-white/40">
              <span>✓ Built for independents</span>
              <span>✓ No design team required</span>
              <span>✓ Ready in 2 minutes</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="mt-8 flex justify-center"
          >
            <div className="flex flex-col items-center gap-1 text-[11px] text-white/30">
              <span>scroll for our story</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
                <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story strip */}
      <div className="border-y border-orange/10 bg-[hsla(17,82%,45%,0.06)] py-5">
        <div className="container">
          <div className="grid grid-cols-2 gap-5 text-center md:grid-cols-4">
            {[
              { val: "100+", label: "owner conversations" },
              { val: "2 min", label: "to build a post" },
              { val: "Zero", label: "design tools to learn" },
              { val: "1 goal", label: "help owners stay visible" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="font-display text-[22px] font-extrabold leading-none text-orange">{s.val}</span>
                <span className="text-[12px] leading-snug text-mid">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story section */}
      <AnimatedSection className="container py-14">
        <div className="mb-12 text-center">
          <Eyebrow>Where this started</Eyebrow>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-tight text-ink leading-tight mb-4">
            The problem wasn't effort.
            <br />
            It was the system around it.
          </h2>
          <p className="mx-auto max-w-[620px] text-[15px] leading-relaxed text-mid">
            Restaurant owners already know they should market more consistently. The gap was never awareness. It was having a tool built for the way restaurants actually run.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <div className="space-y-4 text-[15.5px] text-mid leading-relaxed">
              <p>Every restaurant owner we spoke to said the same thing: they know they should be posting more. They want to. They just never have the time, ideas, or energy left after a full service.</p>
              <p>The tools available either needed a marketing degree or cost more than a week's margin. So nothing got done.</p>
              <p>Wishly started with a simple premise: what if your marketing ran itself? Open the app, pick what to promote, done in under 2 minutes.</p>
            </div>

            <blockquote className="mt-8 border-l-4 border-orange pl-5">
              <p className="text-[16px] italic text-ink/70 leading-relaxed">
                "They weren't failing at marketing because they didn't care. No one had built them a system that worked with the reality of running a restaurant."
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[24px] overflow-hidden shadow-wishly">
              <img src={teamImg} alt="Wishly team" className="w-full h-[240px] sm:h-[320px] lg:h-[360px] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏪", label: "Built for independents", sub: "Not agencies. Not chains." },
                { icon: "⚡", label: "Speed first", sub: "Every feature saves time." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-w-border bg-card p-5">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-[13.5px] font-bold text-ink">{item.label}</div>
                  <div className="text-[12px] text-mid mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 section-dark opacity-95" />
        <div className="container relative">
          <AnimatedSection className="mb-14 text-center">
            <Eyebrow variant="dark">How we think</Eyebrow>
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-tight text-primary-foreground leading-tight">
              Three things that guide everything.
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                num: "01",
                icon: "⏱️",
                name: "Owner's time is sacred",
                desc: "Every feature we ship gets tested against one question: does this add to the owner's workload or remove from it?",
              },
              {
                num: "02",
                icon: "🎯",
                name: "Promotion over decoration",
                desc: "Beautiful food photography that doesn't drive bookings is decoration. Every post has a specific offer and CTA.",
              },
              {
                num: "03",
                icon: "🤝",
                name: "Honest at every stage",
                desc: "We're in beta. We're learning. We'll tell you what we can and can't do. No overselling, no fake reviews.",
              },
            ].map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction="scale">
                <div className="group relative glass-dark rounded-2xl p-7 hover:-translate-y-1.5 transition-all duration-400 overflow-hidden">
                  <div className="absolute top-4 right-5 text-[42px] font-black text-white/[0.04] select-none leading-none">{v.num}</div>
                  <div className="text-[28px] mb-4">{v.icon}</div>
                  <div className="text-[15px] font-bold text-primary-foreground mb-2">{v.name}</div>
                  <div className="text-[13px] text-white/45 leading-relaxed">{v.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Beta commitment */}
      <AnimatedSection className="container py-24">
        <div className="relative rounded-[32px] overflow-hidden">
          <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsla(22,30%,6%,0.97)] to-[hsla(22,30%,6%,0.88)]" />
          <div className="relative p-6 sm:p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Eyebrow variant="dark">We're in beta. And that's intentional.</Eyebrow>
                <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold text-primary-foreground tracking-tight leading-tight mb-4">
                  Our first 100 restaurants aren't just customers.{" "}
                  <span className="text-gradient italic font-normal">They're co-builders.</span>
                </h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8">
                  We keep the cohort small so we can work closely with every restaurant. That means a direct line to us, real influence over what we build, and a founder rate that's yours permanently.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a href="https://app.wishlyai.in/login" className="bg-orange text-primary-foreground px-8 py-4 rounded-full text-[15px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark transition-all">
                    Claim your free 7-day trial
                  </a>
                  <Link to="/demo" className="border border-white/20 text-white/60 px-7 py-4 rounded-full text-[15px] font-semibold no-underline hover:border-white/40 transition-all backdrop-blur-sm flex items-center gap-1.5">
                    Book a demo <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🎁", t: "7 days free", d: "Full access. No card. Cancel anytime." },
                  { icon: "🔒", t: "Founder pricing locked", d: "Your rate never increases." },
                  { icon: "📞", t: "Onboarding call", d: "We build your first post together." },
                  { icon: "💬", t: "Direct line to us", d: "Your feedback shapes what we build." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
                  >
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="text-[13.5px] font-semibold text-primary-foreground mb-0.5">{item.t}</div>
                    <div className="text-[11.5px] text-white/35 leading-relaxed">{item.d}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default About;
