/** @type {import('next').NextConfig} */
const nextConfig = {
    // Only ignore build errors in development for faster iteration
    // In production, fix all errors before deployment
    eslint: {
      ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    },
    typescript: {
      ignoreBuildErrors: process.env.NODE_ENV === 'development',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
        },
      ],
    },
    experimental: {
      serverActions: {
        allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['localhost:3000'],
      },
    },
    async redirects() {
      return [
        {
          source: '/app',
          destination: '/admin',
          permanent: false,
        },
      ];
    },
    // Compression and optimization
    compress: true,
    poweredByHeader: false,
    // Output standalone for better Docker builds
    output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  };
  
  export default nextConfig;
  