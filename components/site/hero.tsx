"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/site/logo";

const navigation = [{ label: "Learning", href: "/learn" }];

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
            <Link
              href="/learn"
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
          <Link
            href="/learn"
            className="liquid-glass mx-auto flex w-fit items-center gap-3 rounded-full py-3 pr-3 pl-6 text-white transition-colors hover:bg-white/5"
          >
            <span className="text-base">Start learning PostgreSQL</span>
            <span className="rounded-full bg-white p-3 text-black" aria-hidden="true">
              <ArrowRight className="size-5" />
            </span>
          </Link>
          <p className="px-4 text-sm leading-relaxed text-white">
            Foundations is live now—beginner architecture, lessons, an exercise, and a checkpoint
            quiz with saved progress. Labs, AI, and tools are still ahead.
          </p>
        </div>
      </div>
    </section>
  );
}
