

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/images/**',
            }
        ]
    },
    sassOptions: {
        prependData: `@import "&/variables.scss";`,
    },

};

export default nextConfig;
