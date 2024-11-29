import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import './styles/index.css';

export const metadata: Metadata = {
    title: '字节在线工具站',
    description:
        '在线工具、开发人员工具、代码格式化、压缩、加密、解密,时间转换、翻译、计算器、ip查询，数字单位转换',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body>{children}</body>
        <GoogleAnalytics gaId="G-NTCMHQ9ZNB" />
    </html>
);

export default RootLayout;
