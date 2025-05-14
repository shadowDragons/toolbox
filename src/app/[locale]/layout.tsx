import { GoogleAnalytics } from '@next/third-parties/google';
import { Github } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { LanguageSwitcher } from '@/app/_components/LanguageSwitcher';
import { Button } from '@/app/_components/shadcn/button';

import { routing } from '@/i18n/routing';

import './styles/index.css';

export const metadata: Metadata = {
    title: 'Byte Online Tools | 字节在线工具站',
    description:
        'Online tools, developer tools, code formatting, compression, encryption, decryption, time conversion, translation, calculator, IP lookup, digital unit conversion | 在线工具、开发人员工具、代码格式化、压缩、加密、解密、时间转换、翻译、计算器、IP查询、数字单位转换',
    openGraph: {
        type: 'website',
        locale: 'en-US',
        url: 'https://online.tool.vin',
        title: 'Byte Online Tools',
        description:
            'Online tools, developer tools, code formatting, compression, encryption, decryption, time conversion, translation, calculator, IP lookup, digital unit conversion | 在线工具、开发人员工具、代码格式化、压缩、加密、解密、时间转换、翻译、计算器、IP查询、数字单位转换',
        siteName: 'Byte Online Tools',
        images: '/og-image.png',
    },
};

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <div className="tw-fixed tw-top-4 tw-right-4 tw-z-50 tw-flex tw-items-center tw-gap-2">
                        <LanguageSwitcher />
                        <a
                            href="https://github.com/shadowDragons/tools"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" size="icon" aria-label="GitHub">
                                <Github className="tw-h-4 tw-w-4" />
                            </Button>
                        </a>
                    </div>
                    {children}
                </NextIntlClientProvider>
                <GoogleAnalytics gaId="G-NTCMHQ9ZNB" />
            </body>
        </html>
    );
}
