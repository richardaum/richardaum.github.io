"use client";

import { init } from "@amplitude/analytics-browser";
import { useEffect } from "react";

export const Amplitude = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED !== "true") return;
    init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY!, {
      defaultTracking: true,
    });
  }, []);

  return null;
};
