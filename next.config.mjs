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
                protocol: 'https',
                hostname: 'ik.imagekit.io'
            }
        ]
    }
};

export default nextConfig;
