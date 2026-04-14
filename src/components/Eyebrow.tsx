import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  variant?: "light" | "dark";
}

const Eyebrow = ({ children, variant = "light" }: EyebrowProps) => {
  const isLight = variant === "light";
  return (
    <div className={`inline-flex items-center gap-[7px] text-[11px] font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full mb-6 ${
      isLight
        ? "bg-orange-light text-orange"
        : "bg-white/[0.08] text-white/60 border border-white/[0.1]"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-blink ${isLight ? "bg-orange" : "bg-orange"}`} />
      {children}
    </div>
  );
};

export default Eyebrow;
