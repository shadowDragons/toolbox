import { Search, Calendar, FileText, Kanban } from 'lucide-react';
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
        description: '简单方便的科学计算器',
        icon: Search,
        href: '/tools/calculator',
    },
    {
        name: '数据转换',
        description: '支持JSON、Base64和URL编解码',
        icon: Calendar,
        href: '/tools/data-converter',
    },
    {
        name: '字节转换',
        description: 'KB、MB、GB等单位快速转换',
        icon: Kanban,
        href: '/tools/byte-converter',
    },
    {
        name: '农历转换',
        description: '公历与农历日期互转工具',
        icon: FileText,
        href: '/tools/lunar-calendar',
    },
    {
        name: '进制转换',
        description: '二进制、八进制、十进制、十六进制转换',
        icon: FileText,
        href: '/tools/number-converter',
    },
    {
        name: '中英翻译',
        description: '中英文本快速互译工具',
        icon: FileText,
        href: '/tools/translator',
    },
    {
        name: '时间戳转换',
        description: '时间戳与日期时间格式互转',
        icon: FileText,
        href: '/tools/timestamp-converter',
    },
    {
        name: 'IP查询',
        description: 'IP地址归属地查询工具',
        icon: FileText,
        href: '/tools/ip-lookup',
    },
];

export default function HomePage() {
    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    字节在线工具站
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
