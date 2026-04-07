import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import withExportImages from "next-export-optimize-images";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const buildNextConfig = (phase: string): NextConfig => {
  const config: NextConfig = {
    output: phase === PHASE_PRODUCTION_BUILD ? "export" : undefined,
    images: {
      loader: "akamai",
      path: "/",
      qualities: [100, 75],
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

const config = (phase: string) => {
  const nextConfig = withNextIntl(buildNextConfig(phase));
  return withExportImages(nextConfig);
};

export default config;
