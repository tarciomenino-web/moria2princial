"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "./Particles";

export function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-wine-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <Particles count={30} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(217,180,90,0.25),transparent)] blur-2xl" />
            <Image
              src="/img/logo-moria.png"
              alt="Moriá — Celulares & Assistência Técnica"
              width={620}
              height={449}
              priority
              className="w-64 sm:w-80"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
