/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    NEXT_PUBLIC_TELP: process.env.NEXT_PUBLIC_TELP,
  },
};

export default nextConfig;
