import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — set NEXT_OUTPUT=export in CI
  // Local dev runs normally with full API routes + admin panel
  ...(isStaticExport && {
    output: "export",
    images: { unoptimized: true },
    // basePath must match your GitHub repo name so assets resolve correctly
    // e.g. repo "portfolio" → site at /portfolio/ → assets at /portfolio/_next/...
    // Set PAGES_BASE_PATH in the workflow, or remove basePath if using a custom domain
    basePath: process.env.PAGES_BASE_PATH || "",
  }),
};

export default nextConfig;
