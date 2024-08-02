/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        styledComponents: {
            ssr: true,
            displayName: false
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io'
            },
            {
                protocol: 'https',
                hostname: 'www.toyota.astra.co.id'
            },
            {
                protocol: "https",
                hostname: "**",
            }
        ]
    }
};

export default nextConfig;
