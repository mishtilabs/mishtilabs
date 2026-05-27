import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // We pre-build all imagery into /public/img/*.webp via scripts/build-images.mjs,
    // so next/image runs in unoptimized passthrough mode (the static export
    // doesn't have a runtime optimizer anyway).
    unoptimized: true,
  },
};

export default nextConfig;
