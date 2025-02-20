import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// 工具页面路由配置
const tools = [
    {
        name: '计算器',
        path: '/tools/calculator',
    },
    {
        name: '数据转换',
        path: '/tools/data-converter',
    },
    {
        name: '字节转换',
        path: '/tools/byte-converter',
    },
    {
        name: '农历转换',
        path: '/tools/lunar-calendar',
    },
    {
        name: '进制转换',
        path: '/tools/number-converter',
    },
    {
        name: '中英翻译',
        path: '/tools/translator',
    },
    {
        name: '时间戳转换',
        path: '/tools/timestamp-converter',
    },
    {
        name: 'IP查询',
        path: '/tools/ip-lookup',
    },
    {
        name: '网站图标提取',
        path: '/tools/favicon-extractor',
    },
    {
        name: '世界时钟',
        path: '/tools/world-clock',
    },
];

export function generateSitemap(): MetadataRoute.Sitemap {
    // 基础路由
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/zh`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
    ];

    // 添加工具页面路由 (为每个工具添加中英文路由)
    const toolRoutes = tools.flatMap((tool) => [
        {
            url: `${baseUrl}/zh${tool.path}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en${tool.path}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]);

    return [...routes, ...toolRoutes];
}
