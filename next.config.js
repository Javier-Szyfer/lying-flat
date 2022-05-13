/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "opensea.mypinata.cloud"],
  },
};

module.exports = nextConfig;
