'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';

interface FaviconResult {
    url: string;
    exists: boolean;
}

export default function FaviconExtractor() {
    const [url, setUrl] = useState('');
    const [faviconUrls, setFaviconUrls] = useState<FaviconResult[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const checkFaviconExists = async (iconUrl: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/check-favicon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: iconUrl }),
            });
            const data = await response.json();
            return data.exists;
        } catch {
            return false;
        }
    };

    const extractFavicon = async () => {
        try {
            setError('');
            setLoading(true);
            setFaviconUrls([]);

            if (!url) {
                setError('请输入网址');
                return;
            }

            let processedUrl = url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                processedUrl = `https://${url}`;
            }

            // 常见的favicon路径
            const commonPaths = [
                '/favicon.ico',
                '/favicon.png',
                '/apple-touch-icon.png',
                '/apple-touch-icon-precomposed.png',
            ];

            const domain = new URL(processedUrl).origin;
            const results: FaviconResult[] = [];

            // 并行检查所有图标URL
            const checks = commonPaths.map(async (path) => {
                const iconUrl = `${domain}${path}`;
                const exists = await checkFaviconExists(iconUrl);
                if (exists) {
                    results.push({ url: iconUrl, exists });
                }
            });

            await Promise.all(checks);
            setFaviconUrls(results);

            if (results.length === 0) {
                setError('未找到可用的网站图标');
            }
        } catch (err) {
            setError('无效的网址');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    网站图标(Favicon)提取器
                </h1>

                <div className="tw-space-y-6">
                    <Card className="tw-p-6">
                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-gap-4">
                                <Input
                                    className="tw-flex-1"
                                    placeholder="输入网址 (例如: google.com)"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={loading}
                                />
                                <Button onClick={extractFavicon} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />
                                            检查中...
                                        </>
                                    ) : (
                                        '提取图标'
                                    )}
                                </Button>
                            </div>

                            {error && <p className="tw-text-red-500">{error}</p>}
                        </div>
                    </Card>

                    {faviconUrls.length > 0 && (
                        <Card className="tw-p-6">
                            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">可用的图标链接</h2>
                            <div className="tw-space-y-4">
                                {faviconUrls.map((result) => (
                                    <div
                                        key={result.url}
                                        className="tw-flex tw-items-center tw-gap-4 tw-p-2 tw-rounded-lg tw-bg-gray-50"
                                    >
                                        <img
                                            src={result.url}
                                            alt="Favicon"
                                            className="tw-w-6 tw-h-6"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                        <a
                                            href={result.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tw-text-blue-500 hover:tw-underline tw-break-all"
                                        >
                                            {result.url}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
