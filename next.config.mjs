/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "moim-s3.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
