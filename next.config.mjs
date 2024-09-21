/** @type {import('next').NextConfig} */
const nextConfig = {
    // 启用react严格模式(可选)
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        cpus: 8,
    },
    eslint: {
        ignoreDuringBuilds: true, // 在构建过程中忽略 ESLint 错误
    },
};

export default nextConfig;
