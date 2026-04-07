"use client";

import { useEffect, useState } from "react";

export function useScrollGate() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsAtTop(window.scrollY === 0);

    const onScroll = () => {
      setHasScrolled(true);
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return { hasScrolled, isAtTop };
}
