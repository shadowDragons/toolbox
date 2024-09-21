'use client';

import { Database } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Label } from '@/app/_components/shadcn/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export default function ByteConverterPage() {
    const [inputValue, setInputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('B');
    const [outputUnit, setOutputUnit] = useState('KB');
    const [result, setResult] = useState('');

    const convertBytes = () => {
        const input = parseFloat(inputValue);
        if (isNaN(input)) {
            setResult('Please enter a valid number');
            return;
        }

        const inputIndex = units.indexOf(inputUnit);
        const outputIndex = units.indexOf(outputUnit);
        const difference = outputIndex - inputIndex;

        const convertedValue = input * 1024 ** -difference;
        setResult(`${convertedValue.toFixed(6)} ${outputUnit}`);
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
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
                            <div className="tw-space-y-2">
                                <Label htmlFor="inputValue">Input Value</Label>
                                <Input
                                    id="inputValue"
                                    type="number"
                                    placeholder="Enter value"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            <div className="tw-space-y-2">
                                <Label htmlFor="inputUnit">Input Unit</Label>
                                <Select value={inputUnit} onValueChange={setInputUnit}>
                                    <SelectTrigger id="inputUnit">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {units.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
                            <div className="tw-space-y-2">
                                <Label htmlFor="outputUnit">Output Unit</Label>
                                <Select value={outputUnit} onValueChange={setOutputUnit}>
                                    <SelectTrigger id="outputUnit">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {units.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="tw-space-y-2">
                                <Label htmlFor="result">Result</Label>
                                <Input id="result" value={result} readOnly />
                            </div>
                        </div>
                        <Button onClick={convertBytes} className="tw-w-full">
                            Convert
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
