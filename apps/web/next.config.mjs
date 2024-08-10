/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'api.mapbox.com',
      },
    ],
  },
}

export default nextConfig
