'use client';

import { ArrowRightLeft, Languages } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';
import { Textarea } from '@/app/_components/shadcn/textarea';

export default function TranslatorPage() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [fromLang, setFromLang] = useState('zh');
    const [toLang, setToLang] = useState('en');

    const handleTranslate = async () => {
        if (inputText.trim() === '') {
            setOutputText('请输入要翻译的文本');
            return;
        }

        const response = await fetch('/api/translator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                from: fromLang,
                to: toLang,
            }),
        });

        if (!response.ok) {
            setOutputText('翻译失败，请重试');
            return;
        }

        const data = await response.json();
        setOutputText(data.translatedText);
    };

    const switchLanguages = () => {
        setFromLang(toLang);
        setToLang(fromLang);
        setInputText(outputText);
        setOutputText(inputText);
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    中英互译工具
                </h1>
                <Card className="tw-max-w-3xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Languages className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>中英互译</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-items-center tw-justify-between tw-space-x-4">
                                <Select value={fromLang} onValueChange={setFromLang}>
                                    <SelectTrigger className="tw-w-[180px]">
                                        <SelectValue placeholder="选择源语言" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zh">中文</SelectItem>
                                        <SelectItem value="en">英文</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" onClick={switchLanguages}>
                                    <ArrowRightLeft className="tw-h-4 tw-w-4" />
                                </Button>
                                <Select value={toLang} onValueChange={setToLang}>
                                    <SelectTrigger className="tw-w-[180px]">
                                        <SelectValue placeholder="选择目标语言" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zh">中文</SelectItem>
                                        <SelectItem value="en">英文</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Textarea
                                placeholder="请输入要翻译的文本"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                rows={5}
                            />
                            <Button onClick={handleTranslate} className="tw-w-full">
                                翻译
                            </Button>
                            <Textarea placeholder="翻译结果" value={outputText} readOnly rows={5} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="tw-max-w-3xl tw-mx-auto tw-mt-8">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <span>API Usage</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="tw-mb-4">
                            You can also use this translator programmatically via our API:
                        </p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            POST /api/translator
                        </pre>
                        <p className="tw-mt-4">
                            This will return a JSON object with the translated text. The request
                            body should be a JSON object with the text to translate, and the from
                            and to parameters should be the source and target languages,
                            respectively.
                        </p>
                        <p className="tw-mt-4">Example request:</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            {`{
  "text": "你好",
  "from": "zh",
  "to": "en"
}`}
                        </pre>
                        <p className="tw-mt-4">Example response:</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            {`{
  "translatedText": "Hello"
}`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
