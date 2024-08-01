/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: "p.kakaocdn.net",
      },
      {
        protocol: "https",
        port: "",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
