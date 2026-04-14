import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import postFriday from "@/assets/post-friday.jpg";
import postDownload from "@/assets/post-download.jpg";

const steps = [
  {
    num: "01",
    title: "Type your restaurant name.",
    titleEm: "We do the rest.",
    body: "Search your restaurant and Wishly instantly pulls your name, address, photos, menu, and reviews straight from your Google Business listing. No manual setup. No uploading.",
    details: [
      "Name, address, and category auto-filled",
      "Menu, photos, and reviews pulled instantly",
      "Live and ready in under 60 seconds",
    ],
  },
  {
    num: "02",
    title: "Wishly recommends",
    titleEm: "what to post.",
    body: "Every time you open the app, Wishly surfaces what is worth posting today based on your calendar, your city, your reviews, and your own business patterns.",
    details: [
      "Holidays, festivals, and Indian occasions",
      "Sports fixtures, movies, and local events",
      "Weather signals, trending topics, and your slow days",
    ],
  },
  {
    num: "03",
    title: "Pick your copy.",
    titleEm: "Generate your image.",
    body: "Wishly recommends the best primary text, secondary text, and CTA for your post, then picks the best layout for the platform before your image is generated.",
    details: [
      "Wishly recommends the best ambience and product for the occasion",
      "Wishly suggests the best primary, secondary and CTA",
      "Posts generated for every platform: feed, stories, reels and more",
    ],
  },
  {
    num: "04",
    title: "Download, post,",
    titleEm: "done.",
    body: "Pick your copy variation, review the image, and download it. Post to Instagram, Facebook, or WhatsApp.",
    details: [
      "High-res image, ready to post",
      "Schedule with Buffer, Later, or Hootsuite",
      "You always have final say",
    ],
  },
];

const signalCards = [
  {
    icon: "📅",
    name: "Holidays & Occasions",
    desc: "Mother's Day, Valentine's, Christmas - flagged weeks in advance.",
    example: '-> "Mother\'s Day is 18 days away."',
  },
  {
    icon: "⭐",
    name: "Your Google Reviews",
    desc: "Review milestones turned into shareable social proof posts.",
    example: '-> "You just hit 500 reviews."',
  },
  {
    icon: "🍹",
    name: "Weekend & Weekly",
    desc: "Friday promos, weekend specials, and Monday motivation.",
    example: '-> "Friday is 2 days away."',
  },
  {
    icon: "🍽️",
    name: "Your Menu & Specials",
    desc: "Seasonal dishes and new additions built around your actual menu.",
    example: '-> "Truffle risotto has not been promoted."',
  },
  {
    icon: "📍",
    name: "Local Events",
    desc: "Concerts and sports fixtures near your location.",
    example: '-> "Big match this Saturday."',
  },
  {
    icon: "📈",
    name: "Your Post History",
    desc: "Learns what works best for you.",
    example: '-> "Friday posts get 3x engagement."',
  },
];

const faqItems = [
  {
    q: "I set up Instagram, posted a few times, and just stopped. What's different?",
    a: "Wishly removes the creative work entirely. You open the app, pick what to promote, and it's ready in under 2 minutes.",
  },
  {
    q: "I post when I remember - usually when things go quiet. Does that hurt me?",
    a: "Yes. Instagram's algorithm rewards consistency. Wishly keeps you posting on rhythm without thinking about it.",
  },
  {
    q: "Our food photography is beautiful but doesn't drive bookings.",
    a: "Beautiful photos without promotional strategy do not convert. Wishly adds the headline, offer, and CTA that drives action.",
  },
  {
    q: "We're already posting consistently. What does Wishly add?",
    a: "Time. Wishly cuts content creation to under 20 minutes a week, plus proactive holiday planning and surfaced opportunities.",
  },
  {
    q: "Does Wishly post to my social media for me?",
    a: "No - you download and post yourself, or use Buffer or Later. You stay in control.",
  },
  {
    q: "I already use Canva and ChatGPT. Why pay for Wishly?",
    a: "Canva and ChatGPT are blank canvases. Wishly is connected to your actual business and replaces daily decision fatigue.",
  },
];

const autoFillFields = [
  {
    label: "Primary text",
    value: "Friday Night Specials",
    helper: "Best recommended primary text",
    toneClass: "text-orange bg-orange/10 border-orange/20",
  },
  {
    label: "Secondary text",
    value: "2 for 1 Cocktails",
    helper: "Best recommended secondary text",
    toneClass: "text-white/70 bg-white/[0.04] border-white/[0.08]",
  },
  {
    label: "CTA",
    value: "Book a Table",
    helper: "Best recommended CTA",
    toneClass: "text-green bg-green/10 border-green/20",
  },
];

const formatOptions = [
  { ratio: "1:1", label: "Square", channels: "Instagram, Facebook, X" },
  { ratio: "4:5", label: "Portrait", channels: "Meta Feed, Pinterest" },
  { ratio: "9:16", label: "Story", channels: "Reels, Stories, TikTok", recommended: true },
  { ratio: "16:9", label: "Landscape", channels: "YouTube, LinkedIn, Web" },
];

const previewSignals = [
  {
    icon: "🪔",
    label: "Diwali - 5 days away",
    sub: "Searches spike 3x - post early and win the orders",
    color: "bg-orange/10 border-orange/25",
    textColor: "text-orange",
    badge: "High priority",
  },
  {
    icon: "🏏",
    label: "IPL Final - Tomorrow",
    sub: "Cricket crowd means full tables. Build a match-night promo.",
    color: "bg-[#E8F5E9]/10 border-green/20",
    textColor: "text-green",
    badge: "Live signal",
  },
  {
    icon: "🌧️",
    label: "Heavy rain forecast Friday",
    sub: "Comfort food and delivery promos perform 2x on rain days",
    color: "bg-white/[0.04] border-white/[0.08]",
    textColor: "text-white/70",
    badge: null,
  },
  {
    icon: "⭐",
    label: "950 reviews milestone",
    sub: "Turn your best reviews into social proof posts",
    color: "bg-white/[0.04] border-white/[0.08]",
    textColor: "text-white/70",
    badge: null,
  },
  {
    icon: "🎬",
    label: "Movie release Friday",
    sub: "Movie nights drive dining out - tie in your offer",
    color: "bg-white/[0.04] border-white/[0.08]",
    textColor: "text-white/70",
    badge: null,
  },
  {
    icon: "📍",
    label: "Tech fest this weekend",
    sub: "200+ expected nearby footfall - capture the crowd",
    color: "bg-white/[0.04] border-white/[0.08]",
    textColor: "text-white/70",
    badge: null,
  },
  {
    icon: "🍽️",
    label: "Slow Tuesdays - your pattern",
    sub: "Your data shows Tuesday needs a mid-week offer push",
    color: "bg-white/[0.04] border-white/[0.08]",
    textColor: "text-white/60",
    badge: null,
  },
];

const listingPhotos = [
  {
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop&q=80",
    label: "Biryani",
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop&q=80",
    label: "Interior",
  },
  {
    url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop&q=80",
    label: "Kebab",
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&q=80",
    label: "Ambience",
  },
  {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop&q=80",
    label: "Seating",
  },
  {
    url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop&q=80",
    label: "Dessert",
  },
  {
    url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop&q=80",
    label: "Chef",
  },
  {
    url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=200&h=200&fit=crop&q=80",
    label: "Entrance",
  },
];

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToStep = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = Math.max(104, window.innerHeight * 0.42);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    window.requestAnimationFrame(() => {
      scrollToStep(hash);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-12 min-h-[560px] lg:min-h-[620px]">
        <img src={sectionBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Eyebrow variant="dark">How Wishly works</Eyebrow>
            <h1 className="mb-6 text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-tight text-primary-foreground">
              Four steps. Daily results.
              <br />
              <span className="text-gradient font-normal italic">Zero extra hours.</span>
            </h1>
            <div className="flex items-center justify-center gap-6 text-[12.5px] text-white/40">
              <span>✓ Connect once</span>
              <span>✓ Posts ready in 2 minutes</span>
              <span>✓ No design skills needed</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="mt-8 flex justify-center"
          >
            <div className="flex flex-col items-center gap-1 text-white/30 text-[11px]">
              <span>scroll to see the steps</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="bg-[hsla(17,82%,45%,0.06)] border-y border-orange/10 py-5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
            {[
              { val: "01", label: "Connect your restaurant" },
              { val: "02", label: "See what to post" },
              { val: "03", label: "Generate the image" },
              { val: "04", label: "Download and publish" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-0.5">
                <span className="font-display font-extrabold text-orange text-[22px] leading-none">{item.val}</span>
                <span className="text-mid text-[12px] leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-24">
        {steps.map((step, i) => (
          <AnimatedSection key={i} direction={i % 2 === 0 ? "left" : "right"}>
            {i > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center py-2"
              >
                <div className="h-10 w-[2px] bg-gradient-to-b from-transparent to-orange/40 rounded-full" />
                <div className="relative my-0.5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange/30 bg-background shadow-[0_0_0_6px_hsla(17,82%,45%,0.06)]">
                  <span className="font-display text-[18px] font-black tracking-tight text-orange/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="h-10 w-[2px] bg-gradient-to-b from-orange/40 to-transparent rounded-full" />
              </motion.div>
            )}
            <div
              id={i === 0 ? "step-1-row" : i === 1 ? "step-2-row" : i === 2 ? "step-3-row" : undefined}
              className="grid items-center gap-6 lg:gap-12 py-8 lg:py-10 scroll-mt-32 lg:grid-cols-2"
            >
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="mb-3 flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-orange">
                  Step {step.num}
                  <span className="h-px w-10 bg-gradient-to-r from-orange to-transparent" />
                </div>
                <h2 className="mb-4 text-[clamp(26px,3.5vw,40px)] font-extrabold leading-tight tracking-tight text-ink">
                  {step.title}
                  <br />
                  <span className="text-gradient font-normal italic">{step.titleEm}</span>
                </h2>
                <p className="mb-6 text-[15px] leading-relaxed text-mid">{step.body}</p>
                <div className="flex flex-col gap-3">
                  {step.details.map((detail, index) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2.5 text-[13.5px] text-ink"
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-green/20 bg-green/10 text-[10px] font-bold text-green">
                        ✓
                      </span>
                      {detail}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <div className={`glass-dark rounded-[24px] shadow-[0_24px_64px_rgba(0,0,0,0.3)] ${i === 0 ? "p-4" : i === 1 ? "p-4" : i === 2 ? "p-4" : "p-5"}`}>
                  {i === 0 && (
                    <>
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                        Find your restaurant
                      </div>
                      <div className="mb-2.5 flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 py-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="flex-shrink-0 text-white/30"
                        >
                          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                          <path
                            d="M10 10l2.5 2.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="flex-1 text-[13px] font-medium text-primary-foreground">
                          Paradise Biriyani
                        </span>
                        <span className="h-4 w-1.5 rounded-full bg-orange animate-pulse" />
                      </div>

                      <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-orange/25 bg-orange/10 p-2.5">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange/20 text-base">
                          🍽️
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-bold leading-tight text-primary-foreground">
                            Paradise Biriyani
                          </div>
                          <div className="mt-0.5 text-[11px] text-white/45">
                            Kondapur, Hyderabad · Indian · Biriyani & Kebabs
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-green">★ 4.9</span>
                            <span className="text-[10px] text-white/30">944 reviews</span>
                            <span className="rounded-full border border-green/20 bg-green/15 px-1.5 py-px text-[10px] font-semibold text-green">
                              ✓ Verified
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-lg bg-orange px-2.5 py-1 text-[10px] font-bold text-primary-foreground">
                          Select →
                        </div>
                      </div>

                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                        Photos pulled from your listing
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {listingPhotos.map((img) => (
                          <div key={img.label} className="group relative aspect-square overflow-hidden rounded-md">
                            <img
                              src={img.url}
                              alt={img.label}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <span className="absolute bottom-1 left-1.5 text-[7px] font-semibold text-white/70">
                              {img.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {i === 1 && (
                    <>
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                        Recommended for Paradise Biriyani
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {previewSignals.map((item) => (
                          <div
                            key={item.label}
                            className={`${item.color} flex items-center gap-2 rounded-xl border px-2.5 py-2`}
                          >
                            <span className="flex-shrink-0 text-base">{item.icon}</span>
                            <div className="min-w-0 flex-1">
                              <div className={`text-[11.5px] font-bold leading-tight ${item.textColor}`}>
                                {item.label}
                              </div>
                              <div className="mt-0.5 text-[10.5px] leading-snug text-white/35">
                                {item.sub}
                              </div>
                            </div>
                            {item.badge && (
                              <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-orange px-2 py-0.5 text-[9px] font-bold text-primary-foreground">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {i === 2 && (
                    <>
                      {/* Signal context pill */}
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full border border-orange/30 bg-orange/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-orange">
                          🍹 Friday Night Promotion
                        </span>
                        <span className="rounded-full bg-green/15 px-2 py-0.5 text-[9px] font-semibold text-green">
                          ✓ AI recommended
                        </span>
                      </div>

                      {/* Image preview + format selector side by side */}
                      <div className="mb-3 flex gap-3">
                        {/* Image preview */}
                        <div className="relative w-[95px] flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.1]">
                          <img
                            src={postFriday}
                            alt="Generated post"
                            className="h-full w-full object-cover object-[center_16%]"
                            style={{ aspectRatio: "4/5" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Format picker */}
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white/30">Format</div>
                          {formatOptions.map((option) => (
                            <div
                              key={option.ratio}
                              className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 transition-all ${
                                option.recommended
                                  ? "border-orange/40 bg-orange/10"
                                  : "border-white/[0.06] bg-white/[0.02]"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 rounded border ${
                                  option.recommended ? "border-orange/50 bg-orange/20" : "border-white/15 bg-white/[0.06]"
                                }`}
                                style={{
                                  width: option.ratio === "16:9" ? "14px" : option.ratio === "9:16" ? "6px" : "9px",
                                  height: option.ratio === "16:9" ? "8px" : option.ratio === "9:16" ? "12px" : option.ratio === "4:5" ? "11px" : "9px",
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <div className={`text-[9px] font-bold leading-none ${option.recommended ? "text-orange" : "text-primary-foreground"}`}>
                                  {option.ratio} {option.label}
                                </div>
                                <div className="mt-0.5 text-[7px] leading-none text-white/35">{option.channels}</div>
                              </div>
                              {option.recommended && (
                                <span className="text-[7px] font-bold text-orange">★</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Copy fields */}
                      <div className="mb-3 flex flex-col gap-1.5">
                        <div className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white/30">Generated copy</div>
                        {autoFillFields.map((field) => (
                          <div key={field.label} className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                            <div className="w-[60px] flex-shrink-0 text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/30">{field.label}</div>
                            <div className="flex-1 text-[11.5px] font-semibold leading-snug text-primary-foreground">{field.value}</div>
                            <div className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-bold ${field.toneClass}`}>✓</div>
                          </div>
                        ))}
                      </div>

                      <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange py-2.5 text-[12px] font-bold text-primary-foreground shadow-[0_4px_20px_hsla(17,82%,45%,0.35)]">
                        Generate Image
                        <ArrowRight size={12} />
                      </button>
                    </>
                  )}

                  {i === 3 && (
                    <>
                      {/* Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">Your post is ready</div>
                          <div className="mt-0.5 text-[12px] font-semibold text-primary-foreground">Friday Night Specials</div>
                        </div>
                        <span className="rounded-full bg-green/15 px-2.5 py-1 text-[10px] font-bold text-green">✓ Generated</span>
                      </div>

                      {/* Post preview */}
                      <div className="mb-4 flex gap-4">
                        <div className="relative w-[110px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.1]" style={{ aspectRatio: "9/16" }}>
                          <img
                            src={postDownload}
                            alt="Generated post"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Post details */}
                        <div className="flex flex-1 flex-col justify-between py-0.5">
                          <div className="flex flex-col gap-2">
                            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                              <div className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white/30">Caption</div>
                              <div className="text-[10.5px] leading-snug text-primary-foreground">"Friday Night Specials. 2 for 1 Cocktails. Book your table now."</div>
                            </div>
                            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                              <div className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white/30">Platform</div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-semibold text-primary-foreground">Instagram Reels · Stories · Feed</span>
                              </div>
                            </div>
                            <div className="rounded-xl border border-orange/20 bg-orange/8 px-3 py-2">
                              <div className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-orange/70">Signal</div>
                              <div className="text-[10px] font-semibold text-orange">🍹 Friday Night, weekly trigger</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-orange py-2.5 text-[12px] font-bold text-primary-foreground shadow-[0_4px_20px_hsla(17,82%,45%,0.35)]"
                        >
                          ↺ Regenerate
                        </motion.button>
                        <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/[0.1] bg-transparent py-2.5 text-[12px] font-semibold text-white/70">
                          ↓ Download
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <section className="relative overflow-hidden py-24">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="section-dark absolute inset-0 opacity-95" />
        <div className="container relative">
          <AnimatedSection className="mb-12 text-center">
            <Eyebrow variant="dark">What Wishly reads</Eyebrow>
            <h2 className="mb-3 font-display text-[clamp(26px,3.5vw,40px)] font-bold tracking-tight text-primary-foreground">
              What powers your next post.
            </h2>
            <p className="mx-auto max-w-[520px] text-[14.5px] text-white/40">
              Wishly reads your business context to generate relevant recommendations.
            </p>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-3">
            {signalCards.map((signal, index) => (
              <AnimatedSection key={signal.name} delay={index * 0.08} direction="scale">
                <div className="glass-dark rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-3 text-[24px]">{signal.icon}</div>
                  <div className="mb-1 text-sm font-bold text-primary-foreground">{signal.name}</div>
                  <div className="text-[12.5px] leading-relaxed text-white/40">{signal.desc}</div>
                  <div className="mt-3 rounded-lg border border-orange/15 bg-orange/10 px-2.5 py-1.5 text-[11.5px] italic text-orange">
                    {signal.example}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="container py-24">
        <div className="mb-10 text-center">
          <Eyebrow>Questions we hear</Eyebrow>
          <h2 className="font-display text-[clamp(28px,4vw,46px)] font-bold tracking-tight text-ink">
            Sound familiar?
          </h2>
        </div>
        <div className="mx-auto max-w-[720px]">
          {faqItems.map((faq, index) => (
            <div key={faq.q} className="border-b border-w-border">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left font-body text-[15px] font-semibold text-ink"
              >
                <span className="leading-relaxed">{faq.q}</span>
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-base transition-all duration-300 ${
                    openFaq === index
                      ? "rotate-45 bg-orange text-primary-foreground"
                      : "border border-w-border bg-background text-mid"
                  }`}
                >
                  +
                </span>
              </button>
              {openFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pb-5 text-sm leading-relaxed text-mid"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <section className="relative overflow-hidden py-32">
        <img src={sectionBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative text-center">
          <AnimatedSection>
            <Eyebrow variant="dark">7-day free trial</Eyebrow>
            <h2 className="mb-4 text-[clamp(30px,4.5vw,54px)] font-extrabold leading-[1.08] tracking-tight text-primary-foreground">
              See what Wishly builds
              <br />
              for <span className="text-gradient font-normal italic">your</span> restaurant.
            </h2>
            <p className="mx-auto mb-9 max-w-[480px] text-[15px] leading-relaxed text-white/45">
              Start a free trial and we'll build your first post together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://app.wishlyai.in/login"
                className="animate-glow rounded-full bg-orange px-10 py-4 text-[15px] font-bold text-primary-foreground no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.4)] transition-all hover:bg-orange-dark"
              >
                Start free trial
              </a>
              <Link
                to="/demo"
                className="rounded-full border border-white/20 px-8 py-4 text-[15px] font-semibold text-white/70 no-underline backdrop-blur-sm transition-all hover:border-white/50"
              >
                Book a demo
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
