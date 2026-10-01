"use client";

import buildInfo from "@/data/build-info.json";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const buildTime = DateTime.fromSeconds(buildInfo.buildTimestamp);

/**
 * Returns the build time on the server and during hydration (so markup matches),
 * then the real current time once mounted on the client.
 */
export function useNow() {
  const [now, setNow] = useState(buildTime);

  useEffect(() => {
    setNow(DateTime.now());
  }, []);

  return now;
}
