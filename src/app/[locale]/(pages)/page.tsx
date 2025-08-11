import {
    Calculator,
    FileJson,
    HardDrive,
    Binary,
    Languages,
    Clock,
    Network,
    Globe,
    Link as LinkIcon,
    Clock as WorldClock,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/app/_components/shadcn/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/_components/shadcn/card';
import { Link } from '@/i18n/routing';

export default function HomePage() {
    const t = useTranslations();
    const tools = [
        {
            name: t('Tools.calculator.name'),
            description: t('Tools.calculator.description'),
            icon: Calculator,
            href: '/tools/calculator',
        },
        {
            name: t('Tools.dataConverter.title'),
            description: t('Tools.dataConverter.description'),
            icon: FileJson,
            href: '/tools/data-converter',
        },
        {
            name: t('Tools.byteConverter.name'),
            description: t('Tools.byteConverter.description'),
            icon: HardDrive,
            href: '/tools/byte-converter',
        },

        {
            name: t('Tools.numberConverter.name'),
            description: t('Tools.numberConverter.description'),
            icon: Binary,
            href: '/tools/number-converter',
        },
        {
            name: t('Tools.translator.name'),
            description: t('Tools.translator.description'),
            icon: Languages,
            href: '/tools/translator',
        },
        {
            name: t('Tools.timestampConverter.name'),
            description: t('Tools.timestampConverter.description'),
            icon: Clock,
            href: '/tools/timestamp-converter',
        },
        {
            name: t('Tools.ipLookup.name'),
            description: t('Tools.ipLookup.description'),
            icon: Network,
            href: '/tools/ip-lookup',
        },
        {
            name: t('Tools.faviconExtractor.name'),
            description: t('Tools.faviconExtractor.description'),
            href: '/tools/favicon-extractor',
            icon: Globe,
        },
        {
            name: t('Tools.worldClock.name'),
            description: t('Tools.worldClock.description'),
            href: '/tools/world-clock',
            icon: WorldClock,
        },
        {
            name: t('Tools.shortLinkDecoder.name'),
            description: t('Tools.shortLinkDecoder.description'),
            href: '/tools/short-link-decoder',
            icon: LinkIcon,
        },
    ];
    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('HomePage.title')}
                </h1>
                <div className="tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
                    {tools.map((tool) => (
                        <Card key={tool.href}>
                            <CardHeader>
                                <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                                    <tool.icon className="tw-h-6 tw-w-6 tw-text-blue-500" />
                                    <span>{tool.name}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    href={tool.href || '#'}
                                    className={buttonVariants({ className: 'tw-w-full' })}
                                >
                                    {t('Tools.common.useNow')}
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
