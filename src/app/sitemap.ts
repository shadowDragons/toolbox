import { MetadataRoute } from 'next';

import { generateSitemap } from '@/libs/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
    return generateSitemap();
}
