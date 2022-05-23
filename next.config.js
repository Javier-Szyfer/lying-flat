/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ipfs.io",
      "opensea.mypinata.cloud",
      "cryptocoven.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
