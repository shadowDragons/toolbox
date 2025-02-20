'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'] as const;
type Unit = (typeof UNITS)[number];

const convertToBytes = (value: number, fromUnit: Unit): number => {
    const powers: Record<Unit, number> = {
        B: 0,
        KB: 1,
        MB: 2,
        GB: 3,
        TB: 4,
        PB: 5,
    };
    return value * 1024 ** powers[fromUnit];
};

const convertFromBytes = (bytes: number, toUnit: Unit): number => {
    const powers: Record<Unit, number> = {
        B: 0,
        KB: 1,
        MB: 2,
        GB: 3,
        TB: 4,
        PB: 5,
    };
    return bytes / 1024 ** powers[toUnit];
};

export default function ByteConverterClient() {
    const t = useTranslations('Tools.byteConverter');
    const [inputValue, setInputValue] = useState('');
    const [inputUnit, setInputUnit] = useState<Unit>('MB');
    const [results, setResults] = useState<Record<Unit, string>>({
        B: '0',
        KB: '0',
        MB: '0',
        GB: '0',
        TB: '0',
        PB: '0',
    });

    const handleConvert = () => {
        const numValue = parseFloat(inputValue);
        if (isNaN(numValue)) {
            return;
        }

        const bytes = convertToBytes(numValue, inputUnit);
        const newResults = {} as Record<Unit, string>;

        UNITS.forEach((unit) => {
            const converted = convertFromBytes(bytes, unit);
            newResults[unit] = converted.toLocaleString(undefined, {
                maximumFractionDigits: 6,
            });
        });

        setResults(newResults);
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (value === '') {
            setResults({
                B: '0',
                KB: '0',
                MB: '0',
                GB: '0',
                TB: '0',
                PB: '0',
            });
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-max-w-2xl tw-mx-auto">
                    <Card className="tw-p-6">
                        <div className="tw-space-y-6">
                            {/* 输入区域 */}
                            <div className="tw-flex tw-gap-4">
                                <Input
                                    type="number"
                                    placeholder={t('inputPlaceholder')}
                                    value={inputValue}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    className="tw-flex-1"
                                />
                                <Select
                                    value={inputUnit}
                                    onValueChange={(v) => setInputUnit(v as Unit)}
                                >
                                    <SelectTrigger className="tw-w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {UNITS.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleConvert}>→</Button>
                            </div>

                            {/* 结果区域 */}
                            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                                {UNITS.map((unit) => (
                                    <div
                                        key={unit}
                                        className="tw-p-3 tw-rounded-lg tw-bg-gray-100 tw-space-y-1"
                                    >
                                        <div className="tw-text-sm tw-font-medium tw-text-gray-500">
                                            {unit}
                                        </div>
                                        <div className="tw-text-lg tw-font-semibold">
                                            {results[unit]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
