import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const buildNextConfig = (phase: string): NextConfig => {
  const config: NextConfig = {
    output: phase === PHASE_PRODUCTION_BUILD ? "export" : undefined,
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.ctfassets.net",
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com",
        },
      ],
    },
  };
  return config;
};

const config = (phase: string) => withNextIntl(buildNextConfig(phase));

export default config;
