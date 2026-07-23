"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Iphone } from "./Iphone";

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 1 = trincado, 0 = restaurado
  const crack = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const screenGlow = useTransform(scrollYProgress, [0.2, 0.7], [0.15, 1]);
  const labelBeforeOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0]);
  const labelAfterOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0.15, 0.65], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="wine-aurora absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              Transformação
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
              Devolvemos a <span className="gold-text">vida</span> ao seu aparelho.
            </h2>
            <p className="mt-5 max-w-md text-cream/60">
              Do dano mais grave ao funcionamento perfeito. Role e acompanhe o reparo
              acontecer em tempo real.
            </p>

            <div className="mt-8 max-w-xs">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div className="gold-gradient h-full" style={{ width: progressWidth }} />
              </div>
              <div className="mt-3 flex justify-between text-xs uppercase tracking-widest">
                <motion.span style={{ opacity: labelBeforeOpacity }} className="text-cream/50">
                  Quebrado
                </motion.span>
                <motion.span style={{ opacity: labelAfterOpacity }} className="text-gold-400">
                  Como novo
                </motion.span>
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <Iphone
              crack={crack}
              screen={
                <motion.div
                  style={{ opacity: screenGlow }}
                  className="h-full w-full rounded-[26px] bg-[radial-gradient(circle_at_50%_35%,rgba(217,180,90,0.35),transparent_60%)]"
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
