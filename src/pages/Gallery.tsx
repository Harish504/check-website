import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import heroBg from "@/assets/hero-bg.jpg";

import postDiwali from "@/assets/post-diwali.jpg";
import postReviews from "@/assets/post-reviews.jpg";
import postSports from "@/assets/post-sports.jpg";
import postMotherDay from "@/assets/post-mothers-day.jpg";

const categories = ["All", "Festival", "Review Milestone", "Sports", "Offers & Deals", "Events", "Specials", "Products", "News"];

const posts = [
  { img: postDiwali, category: "Festival", signal: "🪔 Festival signal", title: "Diwali Special", desc: "Festive menu promotion timed 5 days before Diwali.", tag: "High priority" },
  { img: postReviews, category: "Review Milestone", signal: "⭐ Review milestone", title: "500 Reviews & Counting", desc: "Wishly detects your review milestone and builds a thank-you post automatically.", tag: "Auto-detected" },
  { img: postSports, category: "Sports", signal: "🏏 Sports signal", title: "IPL Match Night", desc: "IPL, cricket, football, Olympics. Wishly catches every big match.", tag: "Live signal" },
  { img: postMotherDay, category: "Festival", signal: "📅 Occasion signal", title: "Mother's Day Promo", desc: "One of the biggest dining occasions, promoted weeks in advance.", tag: "High priority" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<null | typeof posts[0]>(null);

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 min-h-[560px] lg:min-h-[620px]">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Eyebrow variant="dark">Real posts. Real signals.</Eyebrow>
            <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.04] tracking-tight text-primary-foreground mb-4">
              Every post Wishly builds<br />
              <span className="italic font-normal" style={{background: "linear-gradient(90deg, #F5C842, #FFE566, #D4A017, #FFD700, #F5C842)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradient-shift 3s ease-in-out infinite"}}>has a job to do.</span>
            </h1>
            <p className="text-[16px] text-white/50 max-w-[520px] mx-auto leading-relaxed">
              Browse posts generated across festivals, review milestones, sports nights, deals and more. All built in under 20 seconds.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[12.5px] text-white/40">
              <span>Signal-driven concepts</span>
              <span>Built in under 20 seconds</span>
              <span>Ready for real restaurant moments</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="mt-8 flex justify-center"
          >
            <div className="flex flex-col items-center gap-1 text-[11px] text-white/30">
              <span>scroll for examples</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
                <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="border-y border-orange/10 bg-[hsla(17,82%,45%,0.06)] py-5">
        <div className="container">
          <div className="grid grid-cols-2 gap-5 text-center md:grid-cols-4">
            {[
              { val: "4+", label: "post angles on display" },
              { val: "20 sec", label: "average time to generate" },
              { val: "Real", label: "signals behind every idea" },
              { val: "1 click", label: "to preview a post" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-0.5">
                <span className="font-display text-[22px] font-extrabold leading-none text-orange">{item.val}</span>
                <span className="text-[12px] leading-snug text-mid">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <AnimatedSection className="container py-12">
        <div className="mb-10 text-center">
          <Eyebrow>Browse the gallery</Eyebrow>
          <h2 className="mb-4 text-[clamp(28px,3.5vw,42px)] font-extrabold leading-tight tracking-tight text-ink">
            Real examples,
            <br />
            <span className="text-gradient font-normal italic">built for real moments.</span>
          </h2>
          <p className="mx-auto max-w-[620px] text-[15px] leading-relaxed text-mid">
            Festivals, reviews, sports nights, offers, and more. Every post starts with a reason to show up, not just a pretty design.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border font-body cursor-pointer ${
                activeCategory === cat
                  ? "bg-orange text-white border-orange shadow-[0_4px_16px_hsla(17,82%,45%,0.3)]"
                  : "bg-transparent text-mid border-w-border hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div className="container pb-24">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((post, i) => (
              <motion.div
                key={post.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-w-border/60 bg-card shadow-wishly-sm hover:-translate-y-1.5 transition-all duration-400"
                onClick={() => setLightbox(post)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">{post.signal}</span>
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-orange bg-orange/10 px-2 py-0.5 rounded-full">{post.tag}</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-ink leading-tight">{post.title}</div>
                  <div className="text-[11.5px] text-mid mt-1 leading-relaxed line-clamp-2">{post.desc}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-mid text-[15px]">No posts in this category yet.</div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card rounded-[24px] overflow-hidden max-w-sm w-full shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square">
                <img src={lightbox.img} alt={lightbox.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white flex items-center justify-center text-sm border border-white/10 cursor-pointer"
                >✕</button>
              </div>
              <div className="p-5">
                <div className="text-[10px] font-bold text-orange uppercase tracking-wide mb-1">{lightbox.signal}</div>
                <div className="text-[17px] font-bold text-ink mb-1">{lightbox.title}</div>
                <div className="text-[13px] text-mid leading-relaxed mb-4">{lightbox.desc}</div>
                <div className="flex gap-2">
                  <a href="https://app.wishlyai.in/login" className="flex-1 bg-orange text-white text-center py-3 rounded-xl text-[13px] font-bold no-underline">Build yours free →</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
