/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
};

export default nextConfig;
