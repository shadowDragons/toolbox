import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// 定义类型
export interface SeoInfo {
    title: string;
    description: string;
}

export interface ToolSeo {
    zh: SeoInfo;
    en: SeoInfo;
}

export interface Tool {
    name: string;
    path: string;
    seo: ToolSeo;
}

// 工具页面路由配置
const tools: Tool[] = [
    {
        name: '计算器',
        path: '/tools/calculator',
        seo: {
            zh: {
                title: '在线科学计算器 - 免费简单易用 | Byte Tools',
                description:
                    '免费在线科学计算器，支持基础运算和高级数学函数，无需下载，使用方便。支持加减乘除、平方根、三角函数等运算。',
            },
            en: {
                title: 'Online Scientific Calculator - Free & Easy to Use | Byte Tools',
                description:
                    'Free online scientific calculator with basic operations and advanced math functions. Supports addition, subtraction, multiplication, division, square root, trigonometric functions and more.',
            },
        },
    },
    {
        name: '数据转换',
        path: '/tools/data-converter',
        seo: {
            zh: {
                title: '在线数据格式转换工具 - JSON/Base64/URL编解码 | Byte Tools',
                description:
                    '免费在线数据转换工具，支持JSON格式化、Base64编解码、URL编解码，快速方便。',
            },
            en: {
                title: 'Online Data Format Converter - JSON/Base64/URL Encoder/Decoder | Byte Tools',
                description:
                    'Free online data conversion tool for JSON formatting, Base64 encoding/decoding, and URL encoding/decoding.',
            },
        },
    },
    {
        name: '字节转换',
        path: '/tools/byte-converter',
        seo: {
            zh: {
                title: '在线字节单位转换器 - KB/MB/GB转换工具 | Byte Tools',
                description: '免费在线字节单位换算工具，支持KB、MB、GB等单位互转，精确快速。',
            },
            en: {
                title: 'Online Byte Unit Converter - KB/MB/GB Conversion Tool | Byte Tools',
                description:
                    'Free online byte unit converter for KB, MB, GB and other units. Quick and accurate conversions.',
            },
        },
    },
    {
        name: '进制转换',
        path: '/tools/number-converter',
        seo: {
            zh: {
                title: '在线进制转换器 - 二进制/八进制/十进制/十六进制转换 | Byte Tools',
                description:
                    '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制等多种进制互转，简单快捷。',
            },
            en: {
                title: 'Online Number Base Converter - Binary/Octal/Decimal/Hex | Byte Tools',
                description:
                    'Free online number base converter. Convert between binary, octal, decimal, hexadecimal and more number systems.',
            },
        },
    },
    {
        name: '中英翻译',
        path: '/tools/translator',
        seo: {
            zh: {
                title: '在线中英文翻译工具 - 快速准确的翻译服务 | Byte Tools',
                description:
                    '免费在线中英文翻译工具，支持中文到英文、英文到中文的双向翻译，快速准确。',
            },
            en: {
                title: 'Online Chinese-English Translator - Fast & Accurate | Byte Tools',
                description:
                    'Free online Chinese-English translator. Translate between Chinese and English quickly and accurately.',
            },
        },
    },
    {
        name: '时间戳转换',
        path: '/tools/timestamp-converter',
        seo: {
            zh: {
                title: '在线时间戳转换工具 - Unix时间戳与日期时间互转 | Byte Tools',
                description:
                    '免费在线时间戳转换工具，支持Unix时间戳与日期时间格式互转，精确到毫秒，支持多种格式。',
            },
            en: {
                title: 'Online Timestamp Converter - Unix Timestamp to DateTime | Byte Tools',
                description:
                    'Free online timestamp converter. Convert between Unix timestamps and datetime formats with millisecond precision.',
            },
        },
    },
    {
        name: 'IP查询',
        path: '/tools/ip-lookup',
        seo: {
            zh: {
                title: '在线IP地址查询工具 - IP归属地查询系统 | Byte Tools',
                description:
                    '免费在线IP地址查询工具，快速查询IP地址的地理位置、运营商等信息，支持IPv4和IPv6。',
            },
            en: {
                title: 'Online IP Address Lookup Tool - IP Geolocation Finder | Byte Tools',
                description:
                    'Free online IP address lookup tool. Find IP geolocation, ISP information. Supports both IPv4 and IPv6.',
            },
        },
    },
    {
        name: '网站图标提取',
        path: '/tools/favicon-extractor',
        seo: {
            zh: {
                title: '在线网站图标(Favicon)提取工具 - 一键获取网站图标 | Byte Tools',
                description:
                    '免费在线网站图标提取工具，轻松获取任意网站的Favicon图标，支持多种格式。',
            },
            en: {
                title: 'Online Favicon Extractor - Easy Website Icon Download | Byte Tools',
                description:
                    'Free online favicon extractor to download website icons. Supports multiple formats and instant extraction.',
            },
        },
    },
    {
        name: '世界时钟',
        path: '/tools/world-clock',
        seo: {
            zh: {
                title: '在线世界时钟 - 全球时区时间查询工具 | Byte Tools',
                description:
                    '免费在线世界时钟工具，实时显示全球主要城市时间，支持多个时区同时查看。',
            },
            en: {
                title: 'Online World Clock - Global Time Zone Converter | Byte Tools',
                description:
                    'Free online world clock showing current time in major cities. View multiple time zones simultaneously.',
            },
        },
    },
    {
        name: '短链解析',
        path: '/tools/short-link-decoder',
        seo: {
            zh: {
                title: '在线短链解析器 - 还原短链接真实地址 | Byte Tools',
                description:
                    '免费在线短链解析工具，跟踪重定向链，显示每一步跳转并获取最终链接地址。',
            },
            en: {
                title: 'Online Short Link Decoder - Unshorten URLs | Byte Tools',
                description:
                    'Free short link decoder. Follow redirect chain step-by-step and get the final destination URL.',
            },
        },
    },
];

// 导出 tools 数组的副本，避免直接修改
export const getTools = () => [...tools];

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

    // 添加工具页面路由
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
