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
                {/* API使用说明 Card 移除，改为注释形式记录 */}
                {/* 
                API 使用说明:
                - 端点: POST /api/translator
                - 请求体 (JSON): 
                    - text: 要翻译的文本
                    - from: 源语言代码 (zh/en)
                    - to: 目标语言代码 (zh/en)
                - 示例请求: 
                    {
                        "text": "你好",
                        "from": "zh",
                        "to": "en"
                    }
                - 示例响应:
                    {
                        "translatedText": "Hello"
                    }
                */}
            </div>
        </div>
    );
}
