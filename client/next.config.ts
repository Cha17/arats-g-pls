import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:8080',
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080'
  }
};

export default nextConfig;
