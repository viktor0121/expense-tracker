import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface BgMotionCardProps {
  index: number;
  activeIndex: number | null;
  setActiveIndex: (activeIndex: number | null) => void;
  children: React.ReactNode;
}

export function BgMotionCard({ index, activeIndex, setActiveIndex, children }: BgMotionCardProps) {
  return (
    <div
      className="group relative block h-full w-full p-1.5"
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <AnimatePresence>
        {activeIndex === index && (
          <motion.span
            className="absolute inset-0 block h-full w-full rounded-2xl bg-accent"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
