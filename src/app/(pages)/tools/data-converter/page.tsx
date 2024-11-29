'use client';

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/shadcn/tabs';
import { Textarea } from '@/app/_components/shadcn/textarea';

export default function DataConverterPage() {
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
            setJsonOutput('无效的 JSON 格式');
        }
    };

    const minifyJSON = () => {
        try {
            const minified = JSON.stringify(JSON.parse(jsonInput));
            setJsonOutput(minified);
        } catch (error) {
            setJsonOutput('无效的 JSON 格式');
        }
    };

    const encodeBase64 = () => {
        try {
            const encoded = btoa(base64Input);
            setBase64Output(encoded);
        } catch (error) {
            setBase64Output('无效的 Base64 编码输入');
        }
    };

    const decodeBase64 = () => {
        try {
            const decoded = atob(base64Input);
            setBase64Output(decoded);
        } catch (error) {
            setBase64Output('无效的 Base64 格式');
        }
    };

    const encodeURL = () => {
        try {
            const encoded = encodeURIComponent(urlInput);
            setUrlOutput(encoded);
        } catch (error) {
            setUrlOutput('无效的 URL 编码输入');
        }
    };

    const decodeURL = () => {
        try {
            const decoded = decodeURIComponent(urlInput);
            setUrlOutput(decoded);
        } catch (error) {
            setUrlOutput('无效的 URL 编码格式');
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    数据转换工具
                </h1>
                <Card className="tw-max-w-4xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <RefreshCw className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>数据转换工具集</span>
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
                                        placeholder="在此输入 JSON"
                                        value={jsonInput}
                                        onChange={(e) => setJsonInput(e.target.value)}
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={formatJSON}>格式化 JSON</Button>
                                        <Button onClick={minifyJSON}>压缩 JSON</Button>
                                    </div>
                                    <Textarea
                                        placeholder="格式化/压缩后的 JSON"
                                        value={jsonOutput}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="base64">
                                <div className="tw-space-y-4">
                                    <Textarea
                                        placeholder="在此输入要进行 Base64 编码/解码的文本"
                                        value={base64Input}
                                        onChange={(e) => setBase64Input(e.target.value)}
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={encodeBase64}>Base64 编码</Button>
                                        <Button onClick={decodeBase64}>Base64 解码</Button>
                                    </div>
                                    <Textarea
                                        placeholder="编码/解码后的 Base64"
                                        value={base64Output}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="url">
                                <div className="tw-space-y-4">
                                    <Input
                                        placeholder="在此输入要进行 URL 编码/解码的文本"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={encodeURL}>URL 编码</Button>
                                        <Button onClick={decodeURL}>URL 解码</Button>
                                    </div>
                                    <Input
                                        placeholder="编码/解码后的 URL"
                                        value={urlOutput}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <Card className="tw-max-w-4xl tw-mx-auto tw-mt-8">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <span>API 使用说明</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="tw-mb-4">
                            您也可以通过我们的API以编程方式使用此数据转换工具：
                        </p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            {'GET /api/data-converter?action=formatJSON&input={"key":"value"}'}
                        </pre>
                        <p className="tw-mt-4">
                            可用的操作：formatJSON（格式化JSON）, minifyJSON（压缩JSON）,
                            encodeBase64（Base64编码）, decodeBase64（Base64解码）,
                            encodeURL（URL编码）, decodeURL（URL解码）
                        </p>
                        <p className="tw-mt-4">输入参数需要进行 URL 编码。例如：</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            /api/data-converter?action=encodeBase64&input=Hello%20World
                        </pre>
                        <p className="tw-mt-4">响应示例：</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            {`{
    "result": "SGVsbG8gV29ybGQ="
}`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 即时工具集. 保留所有权利。</p>
            </footer>
        </div>
    );
}
