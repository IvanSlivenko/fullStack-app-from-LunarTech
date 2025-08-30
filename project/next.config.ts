import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com", // Amazon covers
      },
      {
        protocol: "https",
        hostname: "books.google.com", // Google Books
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org", // OpenLibrary
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Random images
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Placeholder.com
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // ik.imagekit.io
        port: ""
      },
    ],
  },
};

export default nextConfig;
