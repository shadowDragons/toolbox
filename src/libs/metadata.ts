import type { Metadata } from 'next';

import { getTools, type Tool } from './sitemap';

export function generateToolMetadata(toolPath: string, locale: string): Metadata {
    const tools = getTools();
    const seoInfo = tools.find((tool: Tool) => tool.path === toolPath)?.seo[locale as 'zh' | 'en'];

    return {
        title: seoInfo?.title,
        description: seoInfo?.description,
        openGraph: {
            title: seoInfo?.title,
            description: seoInfo?.description,
            type: 'website',
            locale,
            siteName: 'Byte Tools',
        },
        twitter: {
            card: 'summary_large_image',
            title: seoInfo?.title,
            description: seoInfo?.description,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${locale}${toolPath}`,
        },
    };
}
