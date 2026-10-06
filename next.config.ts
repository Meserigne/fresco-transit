import type { NextConfig } from "next";

const managerOrigin = "https://fresco-transit-manager.onrender.com";

const nextConfig: NextConfig = {
  serverExternalPackages: ["node:sqlite"],
  async redirects() {
    return [
      {
        source: "/connexion",
        destination: "/espace/connexion",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/espace", destination: `${managerOrigin}/espace` },
        { source: "/espace/:path*", destination: `${managerOrigin}/espace/:path*` },
      ],
    };
  },
};

export default nextConfig;
