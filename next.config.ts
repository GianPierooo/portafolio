import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify the correct workspace root to silence lockfile warning
  outputFileTracingRoot: require('path').join(__dirname),
};

export default nextConfig;
