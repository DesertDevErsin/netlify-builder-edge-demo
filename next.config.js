/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY
  }
}

module.exports = nextConfig
