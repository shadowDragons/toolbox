'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/shadcn/tabs';
import { Textarea } from '@/app/_components/shadcn/textarea';

export default function DataConverterClient() {
    const t = useTranslations('Tools.dataConverter');
    const [jsonInput, setJsonInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [base64Input, setBase64Input] = useState('');
    const [base64Output, setBase64Output] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [urlOutput, setUrlOutput] = useState('');
    const [error, setError] = useState('');

    // JSON 处理函数
    const formatJSON = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch {
            setError(t('invalidJson'));
        }
    };

    const minifyJSON = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed));
            setError('');
        } catch {
            setError(t('invalidJson'));
        }
    };

    // Base64 处理函数
    const encodeBase64 = () => {
        try {
            if (!base64Input) {
                setError(t('invalidBase64Input'));
                return;
            }
            const encoded = btoa(base64Input);
            setBase64Output(encoded);
            setError('');
        } catch {
            setError(t('invalidBase64Format'));
        }
    };

    const decodeBase64 = () => {
        try {
            if (!base64Input) {
                setError(t('invalidBase64Input'));
                return;
            }
            const decoded = atob(base64Input);
            setBase64Output(decoded);
            setError('');
        } catch {
            setError(t('invalidBase64Format'));
        }
    };

    // URL 处理函数
    const encodeURL = () => {
        try {
            if (!urlInput) {
                setError(t('invalidUrlInput'));
                return;
            }
            const encoded = encodeURIComponent(urlInput);
            setUrlOutput(encoded);
            setError('');
        } catch {
            setError(t('invalidUrlFormat'));
        }
    };

    const decodeURL = () => {
        try {
            if (!urlInput) {
                setError(t('invalidUrlInput'));
                return;
            }
            const decoded = decodeURIComponent(urlInput);
            setUrlOutput(decoded);
            setError('');
        } catch {
            setError(t('invalidUrlFormat'));
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-max-w-4xl tw-mx-auto">
                    <Card className="tw-p-6">
                        <Tabs defaultValue="JSON" className="tw-w-full">
                            <TabsList className="tw-grid tw-w-full tw-grid-cols-3">
                                <TabsTrigger value="JSON">JSON</TabsTrigger>
                                <TabsTrigger value="Base64">Base64</TabsTrigger>
                                <TabsTrigger value="URL">URL</TabsTrigger>
                            </TabsList>

                            {/* JSON Tab */}
                            <TabsContent value="JSON" className="tw-space-y-4">
                                <Textarea
                                    placeholder={t('jsonInputPlaceholder')}
                                    value={jsonInput}
                                    onChange={(e) => setJsonInput(e.target.value)}
                                    rows={10}
                                />
                                <div className="tw-flex tw-gap-2">
                                    <Button onClick={formatJSON}>{t('formatJson')}</Button>
                                    <Button onClick={minifyJSON}>{t('minifyJson')}</Button>
                                </div>
                                <Textarea
                                    placeholder={t('jsonOutputPlaceholder')}
                                    value={jsonOutput}
                                    readOnly
                                    rows={10}
                                />
                            </TabsContent>

                            {/* Base64 Tab */}
                            <TabsContent value="Base64" className="tw-space-y-4">
                                <Textarea
                                    placeholder={t('base64InputPlaceholder')}
                                    value={base64Input}
                                    onChange={(e) => setBase64Input(e.target.value)}
                                    rows={10}
                                />
                                <div className="tw-flex tw-gap-2">
                                    <Button onClick={encodeBase64}>{t('encodeBase64')}</Button>
                                    <Button onClick={decodeBase64}>{t('decodeBase64')}</Button>
                                </div>
                                <Textarea
                                    placeholder={t('base64OutputPlaceholder')}
                                    value={base64Output}
                                    readOnly
                                    rows={10}
                                />
                            </TabsContent>

                            {/* URL Tab */}
                            <TabsContent value="URL" className="tw-space-y-4">
                                <Textarea
                                    placeholder={t('urlInputPlaceholder')}
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    rows={10}
                                />
                                <div className="tw-flex tw-gap-2">
                                    <Button onClick={encodeURL}>{t('encodeUrl')}</Button>
                                    <Button onClick={decodeURL}>{t('decodeUrl')}</Button>
                                </div>
                                <Textarea
                                    placeholder={t('urlOutputPlaceholder')}
                                    value={urlOutput}
                                    readOnly
                                    rows={10}
                                />
                            </TabsContent>
                        </Tabs>

                        {error && <p className="tw-text-red-500 tw-mt-4">{error}</p>}
                    </Card>
                </div>
            </div>
        </div>
    );
}
