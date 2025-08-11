'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';

interface Step {
    url: string;
    status: number;
    location?: string | null;
}

export default function ShortLinkDecoderClient() {
    const t = useTranslations('Tools.shortLinkDecoder');
    const [inputUrl, setInputUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [steps, setSteps] = useState<Step[]>([]);
    const [finalUrl, setFinalUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleDecode = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            setCopied(false);
            setSteps([]);
            setFinalUrl('');

            if (!inputUrl.trim()) {
                setError(t('errors.emptyUrl'));
                return;
            }

            const resp = await fetch(`/api/short-link-decoder?url=${encodeURIComponent(inputUrl)}`);
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error(data.error || t('errors.resolveFailed'));
            }
            setSteps(data.steps || []);
            setFinalUrl(data.target_url || '');
        } catch (e) {
            setError(t('errors.resolveFailed'));
        } finally {
            setLoading(false);
        }
    }, [inputUrl, t]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(finalUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {}
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-max-w-3xl tw-mx-auto">
                    <Card className="tw-p-6 tw-space-y-4">
                        <div className="tw-flex tw-gap-4">
                            <Input
                                placeholder={t('placeholder')}
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                className="tw-flex-1"
                            />
                            <Button onClick={handleDecode} disabled={loading}>
                                {loading ? t('checking') : t('decode')}
                            </Button>
                        </div>

                        {error && <p className="tw-text-red-500">{error}</p>}

                        {steps.length > 0 && (
                            <div className="tw-space-y-2">
                                <h2 className="tw-text-lg tw-font-semibold">
                                    {t('redirectChain')}
                                </h2>
                                <div className="tw-space-y-2">
                                    {steps.map((s, idx) => (
                                        <div
                                            key={`${s.url}-${idx}`}
                                            className="tw-p-3 tw-bg-gray-100 tw-rounded-lg"
                                        >
                                            <div className="tw-text-sm tw-text-gray-600">
                                                #{idx + 1} • {s.status}
                                            </div>
                                            <div className="tw-font-mono tw-break-all">{s.url}</div>
                                            {s.location && (
                                                <div className="tw-text-xs tw-text-gray-500 tw-break-all">
                                                    → {s.location}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {finalUrl && (
                            <div className="tw-space-y-2">
                                <h2 className="tw-text-lg tw-font-semibold">{t('finalUrl')}</h2>
                                <div className="tw-flex tw-gap-2 tw-items-center">
                                    <div className="tw-flex-1 tw-p-3 tw-bg-gray-100 tw-rounded-lg tw-font-mono tw-break-all">
                                        {finalUrl}
                                    </div>
                                    <Button onClick={copy}>
                                        {copied ? t('copied') : t('copyFinalUrl')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
