import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { LanguageSwitcher } from '@/app/_components/LanguageSwitcher';
import { routing } from '@/i18n/routing';

import './styles/index.css';

export const metadata: Metadata = {
    title: '字节在线工具站',
    description:
        '在线工具、开发人员工具、代码格式化、压缩、加密、解密,时间转换、翻译、计算器、ip查询，数字单位转换',
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
                    <div className="tw-fixed tw-top-4 tw-right-4 tw-z-50">
                        <LanguageSwitcher />
                    </div>
                    {children}
                </NextIntlClientProvider>
                <GoogleAnalytics gaId="G-NTCMHQ9ZNB" />
            </body>
        </html>
    );
}
