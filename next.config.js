/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
