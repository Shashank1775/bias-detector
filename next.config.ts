import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next lint` only checks app/, components/, lib/ etc. by default; include blocks/ too.
  eslint: { dirs: ["app", "blocks", "components", "lib"] },
};

export default nextConfig;
