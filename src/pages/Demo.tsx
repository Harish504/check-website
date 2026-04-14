import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import sectionBg from "@/assets/section-bg.jpg";

const Demo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", restaurant: "", type: "", instagram: "", notes: "" });

  const handleSubmit = () => {
    if (!form.fname || !form.email || !form.restaurant) {
      alert("Please fill in your name, email, and restaurant name.");
      return;
    }
    if (!form.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,hsla(17,82%,45%,0.1)_0%,transparent_70%)] top-[20%] left-[5%] animate-float pointer-events-none" />

        <div className="container relative pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Eyebrow variant="dark">Free 15-minute demo</Eyebrow>
              <h1 className="text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.06] tracking-tight text-primary-foreground mb-5">
                See Wishly build a post for <span className="text-gradient italic font-normal">your</span> restaurant. Live.
              </h1>
              <p className="text-base text-white/50 leading-relaxed mb-10">
                No slides. No sales pitch. We connect to your Google Business profile and build your first real Wishly post in front of you. Takes 15 minutes.
              </p>

              <div className="flex flex-col mb-10">
                {[
                  { num: "01", title: "We connect your Google Business profile", desc: "Live, in the call. You see exactly what Wishly reads." },
                  { num: "02", title: "Wishly detects a real signal", desc: "An upcoming holiday, a review milestone, a promo opportunity." },
                  { num: "03", title: "Your first post gets built, live", desc: "Watch the image, caption, headline, and CTA generate in ~11 seconds." },
                  { num: "04", title: "You ask whatever you want", desc: "No prepared script. Just your questions, answered honestly." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 py-5 border-b border-white/[0.06] last:border-b-0">
                    <div className="font-display text-xl font-extrabold text-white/10 leading-none flex-shrink-0 w-8">{item.num}</div>
                    <div>
                      <div className="text-sm font-bold text-primary-foreground mb-0.5">{item.title}</div>
                      <div className="text-[13px] text-white/40 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {["No commitment. Genuinely just a demo.", "No slides, no pitch deck", "15 minutes. We respect your time.", "Or start the trial, no demo needed"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-white/40">
                    <span className="text-orange font-bold text-xs flex-shrink-0">✓</span>
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="glass-dark rounded-[24px] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] lg:sticky lg:top-[90px]">
                {!submitted ? (
                  <>
                    <div className="font-display text-xl font-bold text-primary-foreground tracking-tight mb-1">Book your free demo</div>
                    <p className="text-[13px] text-white/35 mb-6 leading-relaxed">We'll confirm a time within a few hours.</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">First name</label>
                        <input className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-primary-foreground bg-white/[0.04] outline-none focus:border-orange transition-colors placeholder:text-white/20" placeholder="Maria" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">Last name</label>
                        <input className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-primary-foreground bg-white/[0.04] outline-none focus:border-orange transition-colors placeholder:text-white/20" placeholder="Santos" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">Email address</label>
                      <input type="email" className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-primary-foreground bg-white/[0.04] outline-none focus:border-orange transition-colors placeholder:text-white/20" placeholder="maria@therestaurant.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="mb-4">
                      <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">Restaurant name</label>
                      <input className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-primary-foreground bg-white/[0.04] outline-none focus:border-orange transition-colors placeholder:text-white/20" placeholder="The Corner Table" value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} />
                    </div>

                    <div className="mb-4">
                      <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">Type of restaurant</label>
                      <select className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-white/60 bg-[#1a1410] outline-none focus:border-orange transition-colors cursor-pointer appearance-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                        <option value="" disabled className="bg-[#1a1410] text-white/40">Select your type</option>
                        <option className="bg-[#1a1410] text-white">Fine dining</option>
                        <option className="bg-[#1a1410] text-white">Casual dining</option>
                        <option className="bg-[#1a1410] text-white">Café or bakery</option>
                        <option className="bg-[#1a1410] text-white">Fast casual</option>
                        <option className="bg-[#1a1410] text-white">Bar or pub</option>
                        <option className="bg-[#1a1410] text-white">Food truck</option>
                        <option className="bg-[#1a1410] text-white">Other</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">Instagram handle (optional)</label>
                      <input className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-primary-foreground bg-white/[0.04] outline-none focus:border-orange transition-colors placeholder:text-white/20" placeholder="@therestaurant" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
                    </div>

                    <div className="mb-4">
                      <label className="block text-[12.5px] font-semibold text-white/60 mb-1.5">Anything specific? (optional)</label>
                      <textarea className="w-full border border-white/[0.1] rounded-xl px-3.5 py-[11px] text-sm font-body text-primary-foreground bg-white/[0.04] outline-none focus:border-orange transition-colors resize-y min-h-[80px] leading-relaxed placeholder:text-white/20" placeholder="e.g. Mother's Day promotion, review milestone post..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full bg-orange text-primary-foreground border-none py-4 rounded-full text-[15px] font-bold cursor-pointer font-body shadow-[0_4px_30px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark hover:-translate-y-px transition-all mt-2"
                    >
                      Book my free demo →
                    </button>
                    <p className="text-[11.5px] text-white/25 text-center mt-3 leading-relaxed">No commitment, no credit card, no pressure.</p>

                    <div className="flex items-center gap-3 my-5">
                      <span className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-[11.5px] text-white/25 whitespace-nowrap">or just start for free</span>
                      <span className="flex-1 h-px bg-white/[0.06]" />
                    </div>
                    <a href="https://app.wishlyai.in/login" className="block w-full text-center border border-white/[0.1] text-white/60 py-3 rounded-full text-sm font-semibold no-underline hover:border-white/20 transition-all">
                      Start free 7-day trial, no demo needed
                    </a>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-5xl mb-4">✅</motion.div>
                    <div className="font-display text-[22px] font-bold text-primary-foreground mb-2">You're booked in.</div>
                    <p className="text-sm text-white/45 leading-relaxed">
                      We'll send a confirmation to your email within a few hours. Looking forward to showing you what Wishly builds for your restaurant.
                    </p>
                    <p className="text-[13px] text-white/30 mt-5">
                      In the meantime,{" "}
                      <a href="https://app.wishlyai.in/login" className="text-orange font-semibold no-underline">
                        start your free trial
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
