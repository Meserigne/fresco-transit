import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["node:sqlite"],
  async redirects() {
    return [
      {
        source: "/connexion",
        destination: "https://fresco-transit-manager.onrender.com/connexion",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
