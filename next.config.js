/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['44.206.53.75', 'imagen-bild.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
