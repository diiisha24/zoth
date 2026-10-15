import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a second build or dev server run beside `next dev` without both
  // writing to the same .next folder (for example NEXT_DIST_DIR=.next-preview).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
};

export default nextConfig;
