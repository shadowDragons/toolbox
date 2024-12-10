'use client';

import { RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/shadcn/tabs';
import { Textarea } from '@/app/_components/shadcn/textarea';

export default function DataConverterPage() {
    const t = useTranslations();
    const [jsonInput, setJsonInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [base64Input, setBase64Input] = useState('');
    const [base64Output, setBase64Output] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [urlOutput, setUrlOutput] = useState('');

    const formatJSON = () => {
        try {
            const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
            setJsonOutput(formatted);
        } catch (error) {
            setJsonOutput(t('Tools.dataConverter.invalidJson'));
        }
    };

    const minifyJSON = () => {
        try {
            const minified = JSON.stringify(JSON.parse(jsonInput));
            setJsonOutput(minified);
        } catch (error) {
            setJsonOutput(t('Tools.dataConverter.invalidJson'));
        }
    };

    const encodeBase64 = () => {
        try {
            const encoded = btoa(base64Input);
            setBase64Output(encoded);
        } catch (error) {
            setBase64Output(t('Tools.dataConverter.invalidBase64Input'));
        }
    };

    const decodeBase64 = () => {
        try {
            const decoded = atob(base64Input);
            setBase64Output(decoded);
        } catch (error) {
            setBase64Output(t('Tools.dataConverter.invalidBase64Format'));
        }
    };

    const encodeURL = () => {
        try {
            const encoded = encodeURIComponent(urlInput);
            setUrlOutput(encoded);
        } catch (error) {
            setUrlOutput(t('Tools.dataConverter.invalidUrlInput'));
        }
    };

    const decodeURL = () => {
        try {
            const decoded = decodeURIComponent(urlInput);
            setUrlOutput(decoded);
        } catch (error) {
            setUrlOutput(t('Tools.dataConverter.invalidUrlFormat'));
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('Tools.dataConverter.title')}
                </h1>
                <Card className="tw-max-w-4xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <RefreshCw className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>{t('Tools.dataConverter.title')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="json" className="tw-space-y-4">
                            <TabsList>
                                <TabsTrigger value="json">JSON</TabsTrigger>
                                <TabsTrigger value="base64">Base64</TabsTrigger>
                                <TabsTrigger value="url">URL</TabsTrigger>
                            </TabsList>
                            <TabsContent value="json">
                                <div className="tw-space-y-4">
                                    <Textarea
                                        placeholder={t('Tools.dataConverter.jsonInputPlaceholder')}
                                        value={jsonInput}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            setJsonInput(e.target.value)
                                        }
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={formatJSON}>
                                            {t('Tools.dataConverter.formatJson')}
                                        </Button>
                                        <Button onClick={minifyJSON}>
                                            {t('Tools.dataConverter.minifyJson')}
                                        </Button>
                                    </div>
                                    <Textarea
                                        placeholder={t('Tools.dataConverter.jsonOutputPlaceholder')}
                                        value={jsonOutput}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="base64">
                                <div className="tw-space-y-4">
                                    <Textarea
                                        placeholder={t(
                                            'Tools.dataConverter.base64InputPlaceholder',
                                        )}
                                        value={base64Input}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            setBase64Input(e.target.value)
                                        }
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={encodeBase64}>
                                            {t('Tools.dataConverter.encodeBase64')}
                                        </Button>
                                        <Button onClick={decodeBase64}>
                                            {t('Tools.dataConverter.decodeBase64')}
                                        </Button>
                                    </div>
                                    <Textarea
                                        placeholder={t(
                                            'Tools.dataConverter.base64OutputPlaceholder',
                                        )}
                                        value={base64Output}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="url">
                                <div className="tw-space-y-4">
                                    <Input
                                        placeholder={t('Tools.dataConverter.urlInputPlaceholder')}
                                        value={urlInput}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setUrlInput(e.target.value)
                                        }
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={encodeURL}>
                                            {t('Tools.dataConverter.encodeUrl')}
                                        </Button>
                                        <Button onClick={decodeURL}>
                                            {t('Tools.dataConverter.decodeUrl')}
                                        </Button>
                                    </div>
                                    <Input
                                        placeholder={t('Tools.dataConverter.urlOutputPlaceholder')}
                                        value={urlOutput}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                {/* API使用说明:
                - 端点: GET /api/data-converter
                - 参数: 
                    action: formatJSON | minifyJSON | encodeBase64 | decodeBase64 | encodeURL | decodeURL
                    input: 需要转换的数据（需要URL编码）
                - 示例: 
                    GET /api/data-converter?action=formatJSON&input={"key":"value"}
                    GET /api/data-converter?action=encodeBase64&input=Hello%20World
                - 响应格式:
                    {
                        "result": "转换后的结果"
                    }
                */}
            </div>
        </div>
    );
}
