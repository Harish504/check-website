import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vasakiAmbience from "@/assets/vaisakhi-ambience.jpg";
import vasakiProduct from "@/assets/vaisakhi-product.jpg";
import vasakiOutput from "@/assets/vaisakhi-output.jpg";

/* ─── timing constants (ms) ─── */
const T = {
  SIGNAL_INTERVAL: 700,
  CURSOR_MOVE: 1800,
  CLICK: 600,
  BOX2_OPEN: 700,
  FIELD_DELAY: 800,
  TYPE_SPEED: 55,
  AMBIENCE_AFTER_CTA: 1200,
  AMBIENCE_LOAD: 2200,
  AMBIENCE_NEXT_HOVER: 1400,
  PRODUCT_LOAD: 2200,
  PRODUCT_NEXT_HOVER: 1400,
  GENERATE_HOVER: 1000,
  GENERATE_CLICK: 600,
  BOX3_OPEN: 800,
  LOOP_PAUSE: 6000,
};

const SIGNALS = [
  { icon: "🎉", title: "Vaisakhi – 2 days away", sub: "Festival traffic spikes. Promote your festive menu now.", badge: "High priority", badgeColor: "bg-orange text-white", isTarget: true },
  { icon: "🏏", title: "India vs Australia match", sub: "Cricket crowd means full tables. Build a match-night promo.", badge: "Live signal", badgeColor: "bg-green text-white", isTarget: false },
  { icon: "🌧️", title: "Heavy rain forecast Friday", sub: "Comfort food and delivery promos perform 2× on rain days.", badge: null, badgeColor: "", isTarget: false },
  { icon: "⭐", title: "950 reviews milestone", sub: "Turn your best reviews into social proof posts.", badge: null, badgeColor: "", isTarget: false },
  { icon: "🎬", title: "Movie release this weekend", sub: "Movie nights drive dining out – tie in your offer.", badge: null, badgeColor: "", isTarget: false },
];

const PRIMARY_TEXT   = "Happy Vaisakhi! Celebrate with Us";
const SECONDARY_TEXT = "Enjoy our festive menu designed for Vaisakhi";
const CTA_TEXT       = "Book your table now";

function useTypewriter(target: string, active: boolean, speed = T.TYPE_SPEED) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayed(target.slice(0, i));
      if (i >= target.length) { clearInterval(intervalRef.current!); setDone(true); }
    }, speed);
    return () => clearInterval(intervalRef.current!);
  }, [active, target, speed]);

  return { displayed, done };
}

function MouseCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      animate={{ left: x, top: y }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        width="22" height="22" viewBox="0 0 22 22" fill="none"
        animate={{ scale: clicking ? 0.8 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <path d="M4 2L18 11L11 12.5L8.5 19L4 2Z" fill="white" stroke="#1a1a1a" strokeWidth="1.2" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  );
}

// ── The 4 "pages" shown inside Box 2, one at a time ──
type Box2Page = "form" | "ambience" | "product" | "generate";

type Phase =
  | "idle"
  | "signals"
  | "cursor-to-signal"
  | "clicking-signal"
  | "box2"
  | "typing-primary"
  | "typing-secondary"
  | "typing-cta"
  | "ambience-loading"
  | "ambience-shown"
  | "cursor-to-ambience-next"
  | "product-loading"
  | "product-shown"
  | "cursor-to-generate"
  | "generating"
  | "box3"
  | "done";

function phaseToBox2Page(phase: Phase): Box2Page {
  if (["box2","typing-primary","typing-secondary","typing-cta"].includes(phase)) return "form";
  if (["ambience-loading","ambience-shown","cursor-to-ambience-next"].includes(phase)) return "ambience";
  if (["product-loading","product-shown"].includes(phase)) return "product";
  return "generate";
}

const pageVariants = {
  enter:  { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -24 },
};

export default function WorkflowAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [signalsShown, setSignalsShown] = useState(0);
  const [box2Visible, setBox2Visible] = useState(false);
  const [box3Visible, setBox3Visible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 60, y: 60 });
  const [clicking, setClicking] = useState(false);

  const typePrimary   = useTypewriter(PRIMARY_TEXT,   phase !== "idle" && phase !== "signals" && phase !== "cursor-to-signal" && phase !== "clicking-signal" && phase !== "box2");
  const typeSecondary = useTypewriter(SECONDARY_TEXT, ["typing-secondary","typing-cta","ambience-loading","ambience-shown","cursor-to-ambience-next","product-loading","product-shown","cursor-to-generate","generating","box3","done"].includes(phase));
  const typeCta       = useTypewriter(CTA_TEXT,       ["typing-cta","ambience-loading","ambience-shown","cursor-to-ambience-next","product-loading","product-shown","cursor-to-generate","generating","box3","done"].includes(phase));

  const box2Page: Box2Page = box2Visible ? phaseToBox2Page(phase) : "form";

  const doClick = (cb: () => void, duration = T.CLICK) => {
    setClicking(true);
    setTimeout(() => { setClicking(false); cb(); }, duration);
  };

  // ── auto-start
  useEffect(() => {
    const t = setTimeout(() => setPhase("signals"), 600);
    return () => clearTimeout(t);
  }, []);

  // ── signals loading one by one
  useEffect(() => {
    if (phase !== "signals") return;
    if (signalsShown >= SIGNALS.length) {
      const t = setTimeout(() => setPhase("cursor-to-signal"), T.CURSOR_MOVE);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSignalsShown(s => s + 1), T.SIGNAL_INTERVAL);
    return () => clearTimeout(t);
  }, [phase, signalsShown]);

  // ── cursor moves to Vaisakhi row
  useEffect(() => {
    if (phase !== "cursor-to-signal") return;
    setCursorPos({ x: 196, y: 116 });
    const t = setTimeout(() => setPhase("clicking-signal"), 650);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "clicking-signal") return;
    doClick(() => { setBox2Visible(true); setTimeout(() => setPhase("box2"), T.BOX2_OPEN); });
  }, [phase]);

  useEffect(() => {
    if (phase !== "box2") return;
    const t = setTimeout(() => setPhase("typing-primary"), 400);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing-primary" || !typePrimary.done) return;
    const t = setTimeout(() => setPhase("typing-secondary"), T.FIELD_DELAY);
    return () => clearTimeout(t);
  }, [phase, typePrimary.done]);

  useEffect(() => {
    if (phase !== "typing-secondary" || !typeSecondary.done) return;
    const t = setTimeout(() => setPhase("typing-cta"), T.FIELD_DELAY);
    return () => clearTimeout(t);
  }, [phase, typeSecondary.done]);

  useEffect(() => {
    if (phase !== "typing-cta" || !typeCta.done) return;
    const t = setTimeout(() => setPhase("ambience-loading"), T.AMBIENCE_AFTER_CTA);
    return () => clearTimeout(t);
  }, [phase, typeCta.done]);

  useEffect(() => {
    if (phase !== "ambience-loading") return;
    const t = setTimeout(() => setPhase("ambience-shown"), T.AMBIENCE_LOAD);
    return () => clearTimeout(t);
  }, [phase]);

  // cursor to Next button inside box2 ambience page
  useEffect(() => {
    if (phase !== "ambience-shown") return;
    const t = setTimeout(() => {
      setCursorPos({ x: 240, y: 290 });
      setPhase("cursor-to-ambience-next");
    }, T.AMBIENCE_NEXT_HOVER);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "cursor-to-ambience-next") return;
    doClick(() => setPhase("product-loading"));
  }, [phase]);

  useEffect(() => {
    if (phase !== "product-loading") return;
    const t = setTimeout(() => setPhase("product-shown"), T.PRODUCT_LOAD);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "product-shown") return;
    const t = setTimeout(() => {
      setCursorPos({ x: 240, y: 290 });
      setPhase("cursor-to-generate");
    }, T.PRODUCT_NEXT_HOVER);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "cursor-to-generate") return;
    doClick(() => setPhase("generating"), T.GENERATE_CLICK);
  }, [phase]);

  useEffect(() => {
    if (phase !== "generating") return;
    const t = setTimeout(() => { setBox3Visible(true); setPhase("box3"); }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "box3") return;
    const t = setTimeout(() => {
      setPhase("done");
      setTimeout(() => {
        setSignalsShown(0);
        setBox2Visible(false);
        setBox3Visible(false);
        setCursorPos({ x: 60, y: 60 });
        setPhase("signals");
      }, T.LOOP_PAUSE);
    }, 600);
    return () => clearTimeout(t);
  }, [phase]);

  const showCursorOnBox1 = ["cursor-to-signal","clicking-signal"].includes(phase) && !box2Visible;

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(33,28%,6%) 0%, hsl(25,22%,10%) 50%, hsl(20,18%,8%) 100%)" }}>
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, hsla(17,82%,45%,0.07) 0%, transparent 65%)" }} />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange/25 bg-orange/10 text-orange text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            See it in action
          </div>
          <h2 className="text-[clamp(26px,3.8vw,46px)] font-bold tracking-tight text-primary-foreground leading-[1.06] mb-4">
            From signal to post{" "}
            <span style={{ background: "linear-gradient(90deg,#F5C842,#FFD700,#F5C842)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradient-shift 3s ease-in-out infinite" }} className="italic font-normal">
              in under 30 seconds.
            </span>
          </h2>
          <p className="text-[14px] text-white/40 max-w-[460px] mx-auto leading-relaxed">
            Wishly detects what to post, writes your copy, and generates the image — all you do is download.
          </p>
        </div>

        {/* Step labels */}
        <div className="flex items-center justify-center gap-0 mb-8 max-w-3xl mx-auto">
          {[
            { n: "1", label: "Pick Your Signal" },
            { n: "2", label: "Set Your Options" },
            { n: "3", label: "Download Result" },
          ].map((s, i) => {
            const active = i === 0 || (i === 1 && box2Visible) || (i === 2 && box3Visible);
            return (
              <div key={s.n} className="flex items-center gap-0 flex-1">
                <div className={`flex items-center gap-2 flex-1 justify-center transition-all duration-500 ${active ? "opacity-100" : "opacity-30"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-extrabold transition-all duration-500 ${active ? "bg-orange text-white" : "bg-white/10 text-white/30"}`}>{s.n}</div>
                  <span className="text-[12px] font-semibold text-white/70 hidden sm:block">{s.label}</span>
                </div>
                {i < 2 && <div className="w-8 h-[1px] bg-white/15 flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Three boxes */}
        <div className="grid lg:grid-cols-3 gap-4 max-w-5xl mx-auto items-stretch">

          {/* ── BOX 1: Smart Signals ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] h-[600px] flex flex-col"
            style={{ background: "hsla(24,28%,7%,0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06]" style={{ background: "hsla(0,0%,100%,0.025)" }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[9px] text-white/20 font-medium tracking-wide">Wishly · Signals</span>
              <div className="w-12" />
            </div>

            <div className="p-4 flex-1 overflow-hidden flex flex-col">
              <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/30 mb-3 flex-shrink-0">Recommended for Paradise Biriyani</div>
              <div className="flex flex-col gap-2 overflow-hidden">
                {SIGNALS.map((sig, i) => (
                  <AnimatePresence key={sig.title}>
                    {signalsShown > i && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
                          sig.isTarget && ["cursor-to-signal","clicking-signal"].includes(phase)
                            ? "bg-orange/15 border-orange/30"
                            : "bg-white/[0.03] border-white/[0.06]"
                        }`}
                      >
                        <span className="text-base flex-shrink-0">{sig.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-[11.5px] font-bold leading-tight truncate ${sig.isTarget ? "text-orange" : "text-primary-foreground"}`}>{sig.title}</div>
                          <div className="text-[10px] text-white/35 leading-tight truncate mt-0.5">{sig.sub}</div>
                        </div>
                        {sig.badge && (
                          <span className={`text-[8.5px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0 ${sig.badgeColor}`}>{sig.badge}</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            {showCursorOnBox1 && (
              <MouseCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
            )}
          </motion.div>

          {/* ── BOX 2: Content Builder (fixed height, internal pages) ── */}
          <AnimatePresence>
            {box2Visible ? (
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden border border-white/[0.08] h-[600px] flex flex-col"
                style={{ background: "hsla(24,28%,7%,0.95)", backdropFilter: "blur(20px)" }}
              >
                {/* titlebar */}
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06] flex-shrink-0" style={{ background: "hsla(0,0%,100%,0.025)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="text-[9px] text-white/20 font-medium tracking-wide">Wishly · Builder</span>
                  {/* mini breadcrumb */}
                  <div className="flex items-center gap-1">
                    {(["form","ambience","product","generate"] as Box2Page[]).map((p, i) => (
                      <div key={p} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${box2Page === p ? "bg-orange" : "bg-white/15"}`} />
                    ))}
                  </div>
                </div>

                {/* Page content — fixed height, swaps with AnimatePresence */}
                <div className="relative flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* PAGE: form */}
                    {box2Page === "form" && (
                      <motion.div
                        key="form"
                        variants={pageVariants} initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 p-4 flex flex-col gap-3"
                      >
                        {/* Signal pill */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange/10 border border-orange/20 flex-shrink-0">
                          <span className="text-sm">🎉</span>
                          <div>
                            <div className="text-[9px] font-bold text-orange uppercase tracking-wide">Selected signal</div>
                            <div className="text-[10.5px] text-white/60">Vaisakhi – 2 days away</div>
                          </div>
                        </div>
                        {[
                          { label: "Primary Text",   value: typePrimary.displayed,   active: phase === "typing-primary",   done: typePrimary.done },
                          { label: "Secondary Text", value: typeSecondary.displayed, active: phase === "typing-secondary", done: typeSecondary.done },
                          { label: "CTA",            value: typeCta.displayed,       active: phase === "typing-cta",       done: typeCta.done },
                        ].map((field) => (
                          <div key={field.label} className="flex-shrink-0">
                            <div className="text-[8.5px] font-bold tracking-[0.12em] uppercase text-white/30 mb-1">{field.label}</div>
                            <div className={`px-3 py-2.5 rounded-xl border text-[11.5px] min-h-[36px] flex items-center justify-between transition-all duration-300 ${
                              field.active ? "border-orange/50 bg-orange/5" :
                              field.done   ? "border-green/30 bg-green/5"  :
                              "border-white/[0.08] bg-white/[0.03]"
                            }`}>
                              <span className={field.value ? "text-primary-foreground" : "text-white/20"}>
                                {field.value || "—"}
                                {field.active && <span className="inline-block w-[1.5px] h-[12px] bg-orange ml-0.5 animate-pulse align-middle" />}
                              </span>
                              {field.done && <span className="text-green text-[10px]">✓</span>}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* PAGE: ambience */}
                    {box2Page === "ambience" && (
                      <motion.div
                        key="ambience"
                        variants={pageVariants} initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 p-4 flex flex-col gap-3"
                      >
                        <div className="flex-shrink-0">
                          <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/30 mb-0.5">Step 2 of 3</div>
                          <div className="text-[13px] font-bold text-primary-foreground">Picking the best ambience for this…</div>
                        </div>

                        {/* Image area */}
                        <div className="flex-1 rounded-xl overflow-hidden border border-white/[0.08] relative" style={{ minHeight: 0, flex: 1 }}>
                          {phase === "ambience-loading" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/[0.02]">
                              <div className="w-6 h-6 border-2 border-white/10 border-t-orange rounded-full animate-spin" />
                              <span className="text-[10px] text-white/30">Selecting ambience…</span>
                            </div>
                          ) : (
                            <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              src={vasakiAmbience}
                              alt="Ambience"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {phase !== "ambience-loading" && (
                            <div className="absolute top-2 right-2 bg-green/20 border border-green/30 text-green text-[8px] font-bold px-1.5 py-0.5 rounded-full">✓ Selected</div>
                          )}
                        </div>

                        {/* Next button */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-full py-2.5 rounded-xl text-[12px] font-bold text-center transition-all duration-300 ${
                            phase === "ambience-loading"
                              ? "bg-white/[0.05] text-white/25 border border-white/[0.06]"
                              : "bg-orange text-white shadow-[0_4px_16px_hsla(17,82%,45%,0.35)]"
                          }`}>
                            {phase === "ambience-loading" ? "Selecting…" : "Next — Pick product image →"}
                          </div>
                          {["ambience-shown","cursor-to-ambience-next"].includes(phase) && (
                            <MouseCursor x={180} y={-4} clicking={phase === "cursor-to-ambience-next" && clicking} />
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* PAGE: product */}
                    {box2Page === "product" && (
                      <motion.div
                        key="product"
                        variants={pageVariants} initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 p-4 flex flex-col gap-3"
                      >
                        <div className="flex-shrink-0">
                          <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/30 mb-0.5">Step 3 of 3</div>
                          <div className="text-[13px] font-bold text-primary-foreground">Picking the product image…</div>
                        </div>

                        <div className="flex-1 rounded-xl overflow-hidden border border-white/[0.08] relative" style={{ minHeight: 0, flex: 1 }}>
                          {phase === "product-loading" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/[0.02]">
                              <div className="w-6 h-6 border-2 border-white/10 border-t-orange rounded-full animate-spin" />
                              <span className="text-[10px] text-white/30">Selecting product…</span>
                            </div>
                          ) : (
                            <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              src={vasakiProduct}
                              alt="Product"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {phase !== "product-loading" && (
                            <div className="absolute top-2 right-2 bg-green/20 border border-green/30 text-green text-[8px] font-bold px-1.5 py-0.5 rounded-full">✓ Selected</div>
                          )}
                        </div>

                        {/* Next → generate */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-full py-2.5 rounded-xl text-[12px] font-bold text-center transition-all duration-300 ${
                            phase === "product-loading"
                              ? "bg-white/[0.05] text-white/25 border border-white/[0.06]"
                              : "bg-orange text-white shadow-[0_4px_16px_hsla(17,82%,45%,0.35)]"
                          }`}>
                            {phase === "product-loading" ? "Selecting…" : "Next — Generate image →"}
                          </div>
                          {["product-shown","cursor-to-generate"].includes(phase) && (
                            <MouseCursor x={180} y={-4} clicking={phase === "cursor-to-generate" && clicking} />
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* PAGE: generate */}
                    {box2Page === "generate" && (
                      <motion.div
                        key="generate"
                        variants={pageVariants} initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 p-4 flex flex-col gap-3"
                      >
                        {/* Summary pills */}
                        <div className="flex-shrink-0">
                          <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/30 mb-2">Ready to generate</div>
                          <div className="flex flex-col gap-1.5">
                            {[
                              { label: "Text", value: PRIMARY_TEXT },
                              { label: "Ambience", value: "Restaurant interior selected" },
                              { label: "Product", value: "Biryani dish selected" },
                            ].map(item => (
                              <div key={item.label} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                <span className="text-green text-[10px]">✓</span>
                                <span className="text-[9px] text-white/30 uppercase tracking-wide font-bold w-14 flex-shrink-0">{item.label}</span>
                                <span className="text-[10.5px] text-white/55 truncate">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-2">✨</div>
                            <div className="text-[11px] text-white/30">All set. Click generate to build your post.</div>
                          </div>
                        </div>

                        {/* Generate button */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-full py-3 rounded-xl text-[13px] font-extrabold text-center transition-all duration-300 ${
                            phase === "generating" || phase === "box3" || phase === "done"
                              ? "bg-orange/50 text-white/60"
                              : "bg-orange text-white shadow-[0_4px_20px_hsla(17,82%,45%,0.45)]"
                          }`}>
                            {phase === "generating" ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Generating your post…
                              </span>
                            ) : "Generate Image →"}
                          </div>
                          {phase === "cursor-to-generate" && (
                            <MouseCursor x={180} y={4} clicking={clicking} />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* placeholder while box2 not yet open */
              <motion.div
                key="box2-placeholder"
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-2xl border border-dashed border-white/[0.08] flex items-center justify-center"
                style={{ height: 600 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 opacity-20">✏️</div>
                  <div className="text-[11px] text-white/15 font-medium">Set Your Options</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── BOX 3: Output ── */}
          <AnimatePresence>
            {box3Visible ? (
              <motion.div
                key="box3"
                initial={{ opacity: 0, x: 30, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl overflow-hidden border border-white/[0.08] h-[600px] flex flex-col"
                style={{ background: "hsla(24,28%,7%,0.95)", backdropFilter: "blur(20px)" }}
              >
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06]" style={{ background: "hsla(0,0%,100%,0.025)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="text-[9px] text-white/20 font-medium tracking-wide">Wishly · Result</span>
                  <span className="text-[9px] font-bold text-green">✓ Generated</span>
                </div>

                <div className="p-4 flex-1 flex flex-col min-h-0">
                  <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/30 mb-1 flex-shrink-0">Your post is ready</div>
                  <div className="text-[13px] font-bold text-primary-foreground mb-3 flex-shrink-0">Happy Vaisakhi! Celebrate with Us</div>

                  {/* Output image — fully visible, max height capped */}
                  <div className="w-full rounded-xl overflow-hidden border border-white/[0.08] mb-3 flex-shrink-0" style={{ maxHeight: 280 }}>
                    <img src={vasakiOutput} alt="Generated post" className="w-full h-full object-contain" style={{ maxHeight: 280 }} />
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-col gap-1.5 mb-3 flex-shrink-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-white/25 w-12 flex-shrink-0">Caption</span>
                      <span className="text-[10px] text-white/50 italic truncate">"Celebrate Vaisakhi with our festive menu — limited seats!"</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-white/25 w-12 flex-shrink-0">Platform</span>
                      <span className="text-[10px] text-white/50">Instagram Reels · Stories · Feed</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-white/25 w-12 flex-shrink-0">Signal</span>
                      <span className="text-[10px] text-orange font-semibold">🎉 Vaisakhi, festival trigger</span>
                    </div>
                  </div>

                  {/* Actions pinned to bottom */}
                  <div className="flex gap-2 flex-shrink-0">
                    <motion.div
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-1 py-2.5 rounded-xl bg-orange text-white text-[11px] font-extrabold text-center shadow-[0_4px_16px_hsla(17,82%,45%,0.4)] cursor-pointer"
                    >
                      ↺ Regenerate
                    </motion.div>
                    <div className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/50 text-[11px] font-semibold text-center cursor-pointer">
                      ↓ Download
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="box3-placeholder"
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-2xl border border-dashed border-white/[0.08] flex items-center justify-center"
                style={{ height: 600 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 opacity-20">📥</div>
                  <div className="text-[11px] text-white/15 font-medium">Download Result</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
