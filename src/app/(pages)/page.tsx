import { Search, Calendar, Clock, FileText, Kanban } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/app/_components/shadcn/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/_components/shadcn/card';

const tools = [
    {
        name: '计算器',
        description: 'Find anything instantly',
        icon: Search,
        href: '/tools/calculator',
    },
    {
        name: '数据转换',
        description: 'Organize your day efficiently',
        icon: Calendar,
        href: '/tools/data-converter',
    },
    {
        name: '文本对比',
        description: 'Boost focus & productivity',
        icon: Clock,
        href: '/tools/text-diff',
    },
    {
        name: '字节转换',
        description: 'Visualize your workflow',
        icon: Kanban,
        href: '/tools/byte-converter',
    },
    {
        name: '农历转换',
        description: 'Capture your thoughts quickly',
        icon: FileText,
        href: '/tools/lunar-calendar',
    },
    {
        name: '进制转换',
        description: 'Capture your thoughts quickly',
        icon: FileText,
        href: '/tools/number-converter',
    },
];

export default function HomePage() {
    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    Instant Efficiency Tools
                </h1>
                <div className="tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
                    {tools.map((tool, index) => (
                        <Card key={index}>
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
                                <Button className="tw-w-full" asChild>
                                    <Link href={tool.href || '#'}>Use Now</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
