"use client";

import { useEffect, useState } from "react";

function readScrollState() {
  if (typeof window === "undefined") {
    return { hasScrolled: false, isAtTop: true };
  }

  const isAtTop = window.scrollY === 0;
  return { hasScrolled: !isAtTop, isAtTop };
}

export function useScrollGate() {
  const [{ hasScrolled, isAtTop }, setScrollState] = useState(readScrollState);

  useEffect(() => {
    const syncScrollState = () => {
      setScrollState(readScrollState());
    };

    syncScrollState();
    const rafId = window.requestAnimationFrame(syncScrollState);
    const timeoutId = window.setTimeout(syncScrollState, 0);

    window.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("pageshow", syncScrollState);
    return () => {
      window.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("pageshow", syncScrollState);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return { hasScrolled, isAtTop };
}
