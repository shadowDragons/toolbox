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
            setJsonOutput('Invalid JSON');
        }
    };

    const minifyJSON = () => {
        try {
            const minified = JSON.stringify(JSON.parse(jsonInput));
            setJsonOutput(minified);
        } catch (error) {
            setJsonOutput('Invalid JSON');
        }
    };

    const encodeBase64 = () => {
        try {
            const encoded = btoa(base64Input);
            setBase64Output(encoded);
        } catch (error) {
            setBase64Output('Invalid input for Base64 encoding');
        }
    };

    const decodeBase64 = () => {
        try {
            const decoded = atob(base64Input);
            setBase64Output(decoded);
        } catch (error) {
            setBase64Output('Invalid Base64 input');
        }
    };

    const encodeURL = () => {
        try {
            const encoded = encodeURIComponent(urlInput);
            setUrlOutput(encoded);
        } catch (error) {
            setUrlOutput('Invalid input for URL encoding');
        }
    };

    const decodeURL = () => {
        try {
            const decoded = decodeURIComponent(urlInput);
            setUrlOutput(decoded);
        } catch (error) {
            setUrlOutput('Invalid URL encoded input');
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    Data Converter
                </h1>
                <Card className="tw-max-w-4xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <RefreshCw className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>Data Conversion Tools</span>
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
                                        placeholder="Enter JSON here"
                                        value={jsonInput}
                                        onChange={(e) => setJsonInput(e.target.value)}
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={formatJSON}>Format JSON</Button>
                                        <Button onClick={minifyJSON}>Minify JSON</Button>
                                    </div>
                                    <Textarea
                                        placeholder="Formatted/Minified JSON"
                                        value={jsonOutput}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="base64">
                                <div className="tw-space-y-4">
                                    <Textarea
                                        placeholder="Enter text for Base64 encoding/decoding"
                                        value={base64Input}
                                        onChange={(e) => setBase64Input(e.target.value)}
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={encodeBase64}>Encode to Base64</Button>
                                        <Button onClick={decodeBase64}>Decode from Base64</Button>
                                    </div>
                                    <Textarea
                                        placeholder="Encoded/Decoded Base64"
                                        value={base64Output}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="url">
                                <div className="tw-space-y-4">
                                    <Input
                                        placeholder="Enter text for URL encoding/decoding"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                    />
                                    <div className="tw-flex tw-space-x-2">
                                        <Button onClick={encodeURL}>Encode URL</Button>
                                        <Button onClick={decodeURL}>Decode URL</Button>
                                    </div>
                                    <Input
                                        placeholder="Encoded/Decoded URL"
                                        value={urlOutput}
                                        readOnly
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
