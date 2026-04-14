import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Demo from "./pages/Demo";
import Terms from "./pages/Terms";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const videos = ["Nlkvuq-IVFI", "jeuonRcuA8s"];

const VideoPopup = () => {
  const [show, setShow] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const interactionCount = useRef(0);
  const fired = useRef(false);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const fire = () => {
      if (fired.current) return;
      interactionCount.current += 1;
      if (interactionCount.current >= 14) {
        fired.current = true;
        setShow(true);
      }
    };

    const onScroll = () => {
      if (scrollTimer) return;
      fire();
      scrollTimer = setTimeout(() => { scrollTimer = null; }, 600);
    };

    window.addEventListener("click", fire);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("click", fire);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{ background: "rgba(4,2,1,0.92)", backdropFilter: "blur(18px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[560px] rounded-3xl border border-orange/20 bg-[hsla(22,30%,5%,0.99)] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >✕</button>

            <div className="px-7 pt-7 pb-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange mb-3">
                🎬 Dropping this week
              </div>
              <h3 className="text-[22px] font-extrabold leading-tight text-primary-foreground mb-1">
                AI video. Under 5 minutes.
                <br />
                <span style={{ background: "linear-gradient(90deg, hsl(155,60%,72%), hsl(160,55%,55%), hsl(145,50%,78%), hsl(155,60%,72%))", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-normal italic">
                  Zero prompting required.
                </span>
              </h3>
              <p className="text-[13px] text-white/45 leading-relaxed">
                Paid users get early access the moment it launches. Free users wait.
              </p>
            </div>

            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                key={videos[videoIndex]}
                src={`https://www.youtube.com/embed/${videos[videoIndex]}?autoplay=1&rel=0&modestbranding=1&color=white`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div className="px-7 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setVideoIndex(i)}
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-all duration-300 cursor-pointer border ${
                      videoIndex === i
                        ? "bg-orange border-orange text-white"
                        : "bg-transparent border-white/20 text-white/40 hover:border-white/40 hover:text-white/60"
                    }`}
                  >{i + 1}</button>
                ))}
                <motion.button
                  onClick={() => videoIndex < videos.length - 1 && setVideoIndex(videoIndex + 1)}
                  animate={videoIndex < videos.length - 1 ? { x: [0, 4, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  disabled={videoIndex >= videos.length - 1}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    videoIndex < videos.length - 1
                      ? "border-white/20 bg-white/[0.06] text-white/70 hover:text-white hover:border-white/40 cursor-pointer"
                      : "border-white/[0.06] bg-transparent text-white/15 cursor-not-allowed"
                  }`}
                >→</motion.button>
              </div>
              <motion.a
                href="https://app.wishlyai.in/login"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full bg-orange px-5 py-2.5 text-[13px] font-extrabold text-white no-underline shadow-[0_4px_24px_hsla(17,82%,45%,0.45)] hover:bg-orange-dark"
              >
                Get early access →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <VideoPopup />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
