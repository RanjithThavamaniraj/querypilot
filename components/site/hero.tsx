"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll: the artwork breathes from 100% to 103% as the visitor leaves the scene
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  // Pointer: a very gentle parallax, capped at 5px
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 40, damping: 18, mass: 0.6 });
  const parallaxY = useSpring(pointerY, { stiffness: 40, damping: 18, mass: 0.6 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * -10);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -6);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className="relative h-svh min-h-[620px] overflow-hidden bg-[#0e0b11]"
    >
      {/* The artwork is the hero — full bleed, slightly overscanned so parallax never reveals edges */}
      <motion.div
        className="absolute -inset-3 will-change-transform"
        style={reduceMotion ? undefined : { scale: scrollScale, x: parallaxX, y: parallaxY }}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <Image
          src="/hero-workspace.png"
          alt="An engineer at a dual-monitor PostgreSQL workstation in a quiet Tokyo apartment at sunset, Mount Fuji and the city skyline beyond the window"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[74%_center] lg:object-center"
        />
      </motion.div>

      {/* Cinematic treatment — no UI, only light */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* left scrim: typography light-well, fades before the window begins */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0e0b11]/80 from-8% via-[#0e0b11]/35 via-38% to-transparent to-58% lg:block" />
        {/* mobile / tablet: the type sits low, over a bottom scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b11]/95 from-8% via-[#0e0b11]/65 via-32% to-transparent to-62% lg:hidden" />
        {/* soft vignette + atmospheric haze */}
        <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_42%,transparent_58%,rgba(10,8,12,0.42)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0e0b11]/45 to-transparent" />
      </div>

      {/* Typography, set into the negative space of the scene */}
      <div className="relative mx-auto flex h-full w-full max-w-[96rem] items-end px-6 pb-[12svh] sm:px-10 lg:items-center lg:px-16 lg:pb-0">
        <motion.div
          className="max-w-[600px] lg:-mt-[6svh]"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h1 className="font-display text-[2.75rem] leading-[1.06] font-bold tracking-[-0.025em] text-white [text-shadow:0_2px_24px_rgba(10,8,12,0.55)] sm:text-6xl lg:text-[4rem]">
            The <span className="text-[#ef9265]">PostgreSQL</span>
            <br />
            Engineer&rsquo;s Cockpit.
          </h1>
          <p className="mt-6 max-w-[440px] text-base leading-relaxed text-white/72 [text-shadow:0_1px_12px_rgba(10,8,12,0.6)] sm:text-[1.0625rem]">
            Learn PostgreSQL through interactive labs, AI-powered guidance, production-ready
            workflows, and professional DBA tools—all from a single platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
