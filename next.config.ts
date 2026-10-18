import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — set NEXT_OUTPUT=export in CI
  // Local dev runs normally with full API routes + admin panel
  ...(isStaticExport && {
    output: "export",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
