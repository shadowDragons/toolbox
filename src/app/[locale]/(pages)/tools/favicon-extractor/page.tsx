'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';

interface FaviconResult {
    url: string;
    exists: boolean;
}

export default function FaviconExtractor() {
    const t = useTranslations('Tools.faviconExtractor');
    const [url, setUrl] = useState('');
    const [faviconUrls, setFaviconUrls] = useState<FaviconResult[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const extractFavicon = async () => {
        try {
            setError('');
            setLoading(true);
            setFaviconUrls([]);

            if (!url) {
                setError(t('errors.emptyUrl'));
                return;
            }

            const response = await fetch(`/api/favicon-extractor?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (data.error) {
                setError(t('errors.invalidUrl'));
                return;
            }

            setFaviconUrls(data.icons);

            if (data.icons.length === 0) {
                setError(t('errors.noFavicon'));
            }
        } catch {
            setError(t('errors.invalidUrl'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-space-y-6">
                    <Card className="tw-p-6">
                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-gap-4">
                                <Input
                                    className="tw-flex-1"
                                    placeholder={t('placeholder')}
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={loading}
                                />
                                <Button onClick={extractFavicon} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />
                                            {t('checking')}
                                        </>
                                    ) : (
                                        t('extract')
                                    )}
                                </Button>
                            </div>

                            {error && <p className="tw-text-red-500">{error}</p>}
                        </div>
                    </Card>

                    {faviconUrls.length > 0 && (
                        <Card className="tw-p-6">
                            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
                                {t('availableIcons')}
                            </h2>
                            <div className="tw-space-y-4">
                                {faviconUrls.map((result) => (
                                    <div
                                        key={result.url}
                                        className="tw-flex tw-items-center tw-gap-4 tw-p-2 tw-rounded-lg tw-bg-gray-50"
                                    >
                                        <img
                                            src={result.url}
                                            alt={t('faviconAlt')}
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
