import {
    Search,
    Calendar,
    Clock,
    FileText,
    Kanban,
    BarChart,
    Zap,
    Clipboard,
    Calculator,
    Bookmark,
    Mail,
    Paperclip,
    Pen,
    Globe,
    Headphones,
} from 'lucide-react';
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
        name: 'Quick Search',
        description: 'Find anything instantly',
        icon: Search,
        href: '/tools/calculator',
    },
    { name: 'Task Planner', description: 'Organize your day efficiently', icon: Calendar },
    { name: 'Pomodoro Timer', description: 'Boost focus & productivity', icon: Clock },
    { name: 'Kanban Board', description: 'Visualize your workflow', icon: Kanban },
    { name: 'Note Taking', description: 'Capture your thoughts quickly', icon: FileText },
    { name: 'Analytics Dashboard', description: 'Track your productivity', icon: BarChart },
    { name: 'Quick Actions', description: 'Perform common tasks instantly', icon: Zap },
    { name: 'Clipboard Manager', description: 'Manage your copied items', icon: Clipboard },
    { name: 'Calculator', description: 'Perform quick calculations', icon: Calculator },
    { name: 'Bookmark Manager', description: 'Organize your web resources', icon: Bookmark },
    { name: 'Email Templates', description: 'Quickly draft common emails', icon: Mail },
    { name: 'File Converter', description: 'Convert between file formats', icon: Paperclip },
    { name: 'Markdown Editor', description: 'Write and preview markdown', icon: Pen },
    { name: 'Language Translator', description: 'Translate text on the fly', icon: Globe },
    {
        name: 'White Noise Generator',
        description: 'Improve focus with ambient sounds',
        icon: Headphones,
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
