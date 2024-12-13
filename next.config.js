const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  basePath: isProd ? '/sky24' : '',
  assetPrefix: isProd ? '/sky24' : '',
};

module.exports = nextConfig;