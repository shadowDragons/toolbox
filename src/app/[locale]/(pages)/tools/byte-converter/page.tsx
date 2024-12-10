'use client';

import { Database } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export default function ByteConverterPage() {
    const [inputValue, setInputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('B');
    const [results, setResults] = useState<Record<string, string>>({});

    const convertBytes = (value: string, unit: string) => {
        const input = parseFloat(value);
        if (isNaN(input)) {
            setResults({});
            return;
        }

        const inputIndex = units.indexOf(unit);
        const newResults: Record<string, string> = {};

        units.forEach((outputUnit, outputIndex) => {
            const difference = outputIndex - inputIndex;
            const convertedValue = input * 1024 ** -difference;
            newResults[outputUnit] = convertedValue.toFixed(12);
        });

        setResults(newResults);
    };

    const handleInputChange = (value: string, unit: string) => {
        setInputValue(value);
        setInputUnit(unit);
        convertBytes(value, unit);
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    字节数据转换器
                </h1>
                <Card className="tw-max-w-2xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Database className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>字节转换工具</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            {units.map((unit) => (
                                <div key={unit} className="tw-flex tw-items-center tw-space-x-2">
                                    <Input
                                        type="number"
                                        placeholder={`输入 ${unit}`}
                                        value={
                                            unit === inputUnit ? inputValue : results[unit] || ''
                                        }
                                        onChange={(e) => handleInputChange(e.target.value, unit)}
                                        className="tw-flex-grow"
                                    />
                                    <span className="tw-w-12 tw-text-right">{unit}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                {/* API使用说明 Card 移除，改为注释形式记录 */}
                {/* 
                API 使用说明:
                - 端点: GET /api/byte-converter
                - 参数: input=1024KB
                - 格式: 值+单位，如 "1024KB"、"1.5MB"、"500B"
                - 单位大小写不敏感
                - 返回: JSON对象，包含所有单位的转换结果
                */}
            </div>
        </div>
    );
}
