import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uniqjobs.co.in",
        pathname: "/blog_images/**",
      },
    ],
  },
  reactCompiler: true,
  
};

// https://uniqjobs.co.in/blog_images/blogFirst.webp

export default nextConfig;

