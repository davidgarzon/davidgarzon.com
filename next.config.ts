import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/advisory",
        destination: "https://kenvalabs.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
