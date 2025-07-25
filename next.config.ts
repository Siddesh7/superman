import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["readdy.ai", "lh3.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    // Exclude vendors and agent directories from webpack build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/vendors/**", "**/agent/**"],
    };
    return config;
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
