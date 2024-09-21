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
                    Byte Data Converter
                </h1>
                <Card className="tw-max-w-2xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Database className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>Byte Conversion Tool</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            {units.map((unit) => (
                                <div key={unit} className="tw-flex tw-items-center tw-space-x-2">
                                    <Input
                                        type="number"
                                        placeholder={`Enter ${unit}`}
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
                            <span>API Usage</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="tw-mb-4">
                            You can also use this converter programmatically via our API:
                        </p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            GET /api/byte-converter?input=1024KB
                        </pre>
                        <p className="tw-mt-4">
                            This will return a JSON object with conversions to all units. The input
                            parameter should be in the format "value unit" (e.g., "1024KB", "1.5MB",
                            "500B"). The unit is case-insensitive.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
