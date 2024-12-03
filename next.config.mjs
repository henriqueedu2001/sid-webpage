/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      ENV: process.env.ENV,
      NEXT_PUBLIC_API_URL_DEVELOPMENT: process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT,
      NEXT_PUBLIC_API_URL_PRODUCTION: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
    },
  };

export default nextConfig;
