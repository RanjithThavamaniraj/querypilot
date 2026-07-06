"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/site/logo";

const navigation = [
  { label: "Learning", href: "#learning-paths" },
  { label: "Labs", href: "#features" },
  { label: "AI", href: "#ai" },
  { label: "Tools", href: "#tools" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

const socials = [
  {
    name: "GitHub",
    path: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
  },
  {
    name: "X",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  },
  {
    name: "Discord",
    path: "M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.26 20.26 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.03c.49-.66.93-1.37 1.3-2.1a12.9 12.9 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.16 0c.17.13.33.26.5.38-.65.39-1.34.71-2.05.98.38.73.81 1.44 1.3 2.1a19.84 19.84 0 0 0 6.07-3.03 20.2 20.2 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z",
  },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let endedTimeout: ReturnType<typeof setTimeout> | null = null;

    const fade = (toOpacity: number) => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      const fromOpacity = parseFloat(video.style.opacity) || 0;
      const duration = 500;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const opacity = fromOpacity + (toOpacity - fromOpacity) * progress;
        video.style.opacity = String(opacity);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          frameRef.current = null;
        }
      };

      frameRef.current = requestAnimationFrame(step);
    };

    video.style.opacity = "0";

    let hasFadedIn = false;
    const handleFirstFrame = () => {
      if (hasFadedIn) return;
      hasFadedIn = true;
      fade(1);
    };

    const handleTimeUpdate = () => {
      if (
        video.duration - video.currentTime <= 0.55 &&
        !fadingOutRef.current
      ) {
        fadingOutRef.current = true;
        fade(0);
      }
    };

    const handleEnded = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      video.style.opacity = "0";
      endedTimeout = setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadingOutRef.current = false;
        fade(1);
      }, 100);
    };

    video.addEventListener("loadeddata", handleFirstFrame);
    video.addEventListener("playing", handleFirstFrame);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleFirstFrame);
      video.removeEventListener("playing", handleFirstFrame);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      if (endedTimeout !== null) {
        clearTimeout(endedTimeout);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full translate-y-[17%] object-cover"
      />

      <header className="relative z-20 px-6 py-6">
        <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <Link href="/" aria-label="QueryPilot home">
            <Logo tone="dark" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-white">
              Sign In
            </Link>
            <Link
              href="#"
              className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
        <h1
          className="mb-8 text-5xl tracking-tight whitespace-nowrap text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-instrument), serif" }}
        >
          Built for the curious
        </h1>

        <div className="w-full max-w-xl space-y-4">
          <form className="liquid-glass flex items-center gap-3 rounded-full py-2 pr-2 pl-6">
            <label className="sr-only" htmlFor="early-access-email">
              Email address
            </label>
            <input
              id="early-access-email"
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="rounded-full bg-white p-3 text-black"
            >
              <ArrowRight className="size-5" />
            </button>
          </form>
          <p className="px-4 text-sm leading-relaxed text-white">
            Stay updated as QueryPilot takes shape. Join the early-access list and be first to
            know when learning paths, labs, and tools launch.
          </p>
        </div>

        <Link
          href="#"
          className="liquid-glass mt-8 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          Manifesto
        </Link>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {socials.map((social) => (
          <a
            key={social.name}
            href="#"
            aria-label={social.name}
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
