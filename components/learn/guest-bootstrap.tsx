"use client";

import { useEffect } from "react";

import { ensureGuestAction } from "@/lib/learn/actions";

export function GuestBootstrap() {
  useEffect(() => {
    void ensureGuestAction();
  }, []);

  return null;
}
