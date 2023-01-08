/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  images: {
    domains: ["gamedaim.com"],
  },
}

module.exports = nextConfig
