import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["shadcn-ui"],
  allowedDevOrigins: ["192.168.70.190"],
}

export default nextConfig
