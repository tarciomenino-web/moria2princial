"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Iphone({
  tilt = false,
  screen,
  className = "",
}: {
  tilt?: boolean;
  screen?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  });

  function handleMove(e: React.MouseEvent) {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative mx-auto aspect-[26/54] w-[190px] md:w-[240px] lg:w-[260px]"
      >
        {/* halo de luz atrás */}
        <div className="absolute -inset-10 -z-10 rounded-[60px] bg-[radial-gradient(closest-side,rgba(155,39,64,0.55),transparent)] blur-2xl" />

        {/* corpo */}
        <div className="absolute inset-0 rounded-[38px] bg-gradient-to-b from-[#2a2a2e] via-[#141416] to-[#050506] p-[3px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
          {/* borda metálica */}
          <div className="h-full w-full rounded-[36px] bg-gradient-to-br from-[#3a3a3f] to-[#0c0c0e] p-[2px]">
            {/* tela */}
            <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-gradient-to-b from-[#0a0a0c] to-[#000] ">
              {/* reflexo */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.10)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.05)_100%)]" />
              {/* dynamic island */}
              <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              {/* conteúdo da tela */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                {screen}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
