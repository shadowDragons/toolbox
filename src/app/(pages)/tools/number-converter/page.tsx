'use client';

import { Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Label } from '@/app/_components/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/app/_components/shadcn/radio-group';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/_components/shadcn/table';

const BASES = [2, 8, 10, 16, 32, 36, 58, 62];
const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const convertBase = (num: string, fromBase: number, toBase: number): string => {
    const decimal = parseInt(num, fromBase);
    if (isNaN(decimal)) return 'Invalid input';
    if (toBase === 10) return decimal.toString();

    let result = '';
    let quotient = decimal;
    while (quotient > 0) {
        result = DIGITS[quotient % toBase] + result;
        quotient = Math.floor(quotient / toBase);
    }
    return result || '0';
};

export default function NumberConverterPage() {
    const [inputBase, setInputBase] = useState(10);
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        handleConvert();
    }, [inputBase, inputValue]);

    const handleConvert = () => {
        const newResults: { [key: number]: string } = {};
        BASES.forEach((base) => {
            newResults[base] = convertBase(inputValue, inputBase, base);
        });
        setResults(newResults);
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    进制转换工具
                </h1>
                <Card className="tw-max-w-4xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Calculator className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>数字进制转换</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <RadioGroup
                                defaultValue={inputBase.toString()}
                                onValueChange={(value) => setInputBase(parseInt(value))}
                                className="tw-flex tw-flex-wrap tw-gap-4"
                            >
                                {BASES.map((base) => (
                                    <div
                                        key={base}
                                        className="tw-flex tw-items-center tw-space-x-2"
                                    >
                                        <RadioGroupItem
                                            value={base.toString()}
                                            id={`base-${base}`}
                                        />
                                        <Label htmlFor={`base-${base}`}>{base}进制</Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            <div className="tw-space-y-2">
                                <Label htmlFor="input">输入数值</Label>
                                <Input
                                    id="input"
                                    placeholder="输入要转换的数值"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>进制</TableHead>
                                        <TableHead>结果</TableHead>
                                        <TableHead>解释</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {BASES.map((base) => (
                                        <TableRow key={base}>
                                            <TableCell>{base}</TableCell>
                                            <TableCell>{results[base] || ''}</TableCell>
                                            <TableCell>
                                                {base === 2 && '二进制'}
                                                {base === 8 && '八进制'}
                                                {base === 10 && '十进制'}
                                                {base === 16 && '十六进制'}
                                                {base === 32 && '数字 + 大写字母, 不包含 ILOU 字符'}
                                                {base === 36 && '数字 + 小写字母'}
                                                {base === 58 &&
                                                    '数字 + 大小写字母, 不包含 0OIl 字符'}
                                                {base === 62 && '数字 + 大小写字母'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
                <Card className="tw-max-w-4xl tw-mx-auto tw-mt-8">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <span>API Usage</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="tw-mb-4">
                            You can also use this number base converter programmatically via our
                            API:
                        </p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            GET /api/number-converter?input=1010:2
                        </pre>
                        <p className="tw-mt-4">
                            This will return a JSON object with conversions to all bases. The input
                            parameter should be in the format "number:fromBase".
                        </p>
                        <p className="tw-mt-4">Example response:</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            {`{
    "2": "1010",
    "8": "12",
    "10": "10",
    "16": "a",
    "32": "a",
    "36": "a",
    "58": "a",
    "62": "a"
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
