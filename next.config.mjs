import withExportImages from "next-export-optimize-images";
import createNextIntlPlugin from "next-intl/plugin";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

const withNextIntl = createNextIntlPlugin();

const buildNextConfig = (phase) => {
  /** @type {import('next').NextConfig} */
  const config = {
    output: phase === PHASE_PRODUCTION_BUILD ? "export" : undefined,
    images: {
      loader: "akamai",
      path: "/",
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
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(graphql|gql)/,
        exclude: /node_modules/,
        loader: "raw-loader",
      });

      config.module.rules.push({
        test: /\.pdf$/,
        type: "asset/resource",
      });

      return config;
    },
  };
  return config;
};

const config = (phase) => {
  const config = withNextIntl(buildNextConfig(phase));
  const previousConfig = phase === PHASE_PRODUCTION_BUILD ? withExportImages(config) : config;
  return previousConfig;
};

export default config;
