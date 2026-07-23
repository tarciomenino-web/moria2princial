"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

function CrackOverlay({ opacity }: { opacity: number | MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 260 540"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden
    >
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" fill="none">
        <path d="M120 150 L138 250 L110 330 L150 430" />
        <path d="M138 250 L200 220" />
        <path d="M138 250 L70 300" />
        <path d="M110 330 L60 360" />
        <path d="M110 330 L190 380" />
        <path d="M150 430 L90 470" />
        <path d="M150 430 L210 450" />
        <path d="M120 150 L80 110" />
        <path d="M120 150 L175 120" />
        <path d="M70 300 L40 260" />
        <path d="M200 220 L225 180" />
      </g>
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" fill="none">
        <path d="M138 250 L160 300 L138 340" />
        <path d="M110 330 L130 380" />
        <path d="M150 430 L140 380" />
      </g>
    </motion.svg>
  );
}

export function Iphone({
  tilt = false,
  crack,
  screen,
  className = "",
}: {
  tilt?: boolean;
  crack?: number | MotionValue<number>;
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
        className="relative mx-auto aspect-[26/54] w-[220px] sm:w-[260px]"
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
              {crack !== undefined && <CrackOverlay opacity={crack} />}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
