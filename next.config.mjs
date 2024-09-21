/** @type {import('next').NextConfig} */
const nextConfig = {
    // 启用react严格模式(可选)
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        cpus: 8,
    },
};

export default nextConfig;
