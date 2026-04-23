/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: 'http://192.168.3.3:3000',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.3.3',
        port: '3000',
        pathname: '/**',
      },
    ],
    unoptimized: true, 
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: '*' },
      ],
    },
  ],
}

export default nextConfig;