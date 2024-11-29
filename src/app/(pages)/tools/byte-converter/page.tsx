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
                <Card className="tw-max-w-2xl tw-mx-auto tw-mt-8">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <span>API 使用说明</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="tw-mb-4">您也可以通过我们的API以编程方式使用此转换工具：</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            GET /api/byte-converter?input=1024KB
                        </pre>
                        <p className="tw-mt-4">
                            这将返回一个包含所有单位转换结果的JSON对象。输入参数应采用"值
                            单位"的格式 （例如："1024KB"、"1.5MB"、"500B"）。单位大小写不敏感。
                        </p>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 即时工具集. 保留所有权利。</p>
            </footer>
        </div>
    );
}
