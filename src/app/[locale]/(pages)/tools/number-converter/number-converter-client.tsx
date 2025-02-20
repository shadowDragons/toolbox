'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Card } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';

type Base = 'binary' | 'octal' | 'decimal' | 'hex' | 'base32' | 'base36' | 'base58' | 'base62';

const BASES: Record<Base, number> = {
    binary: 2,
    octal: 8,
    decimal: 10,
    hex: 16,
    base32: 32,
    base36: 36,
    base58: 58,
    base62: 62,
};

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function convertBase(value: string, fromBase: Base, toBase: Base): string {
    try {
        // 先转换为十进制
        let decimal = 0;
        const fromChars = CHARS.slice(0, BASES[fromBase]);
        for (let i = 0; i < value.length; i++) {
            decimal = decimal * BASES[fromBase] + fromChars.indexOf(value[i].toUpperCase());
        }

        // 再从十进制转换到目标进制
        if (decimal === 0) return '0';
        let result = '';
        const toChars = CHARS.slice(0, BASES[toBase]);
        while (decimal > 0) {
            result = toChars[decimal % BASES[toBase]] + result;
            decimal = Math.floor(decimal / BASES[toBase]);
        }
        return result;
    } catch {
        return '';
    }
}

export default function NumberConverterClient() {
    const t = useTranslations('Tools.numberConverter');
    const [inputValue, setInputValue] = useState('');
    const [fromBase, setFromBase] = useState<Base>('decimal');
    const [results, setResults] = useState<Record<Base, string>>({
        binary: '',
        octal: '',
        decimal: '',
        hex: '',
        base32: '',
        base36: '',
        base58: '',
        base62: '',
    });

    const handleConvert = (value: string, base: Base) => {
        if (!value) {
            setResults({
                binary: '',
                octal: '',
                decimal: '',
                hex: '',
                base32: '',
                base36: '',
                base58: '',
                base62: '',
            });
            return;
        }

        const newResults = {} as Record<Base, string>;
        Object.keys(BASES).forEach((toBase) => {
            newResults[toBase as Base] = convertBase(value, base, toBase as Base);
        });
        setResults(newResults);
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        handleConvert(value, fromBase);
    };

    const handleBaseChange = (base: Base) => {
        setFromBase(base);
        handleConvert(inputValue, base);
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-max-w-3xl tw-mx-auto">
                    <Card className="tw-p-6">
                        <div className="tw-space-y-6">
                            {/* 输入区域 */}
                            <div className="tw-space-y-4">
                                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4">
                                    <div className="tw-flex-1">
                                        <Input
                                            placeholder={t('inputPlaceholder')}
                                            value={inputValue}
                                            onChange={(e) => handleInputChange(e.target.value)}
                                            className="tw-text-lg tw-h-12"
                                            size={40}
                                        />
                                    </div>
                                    <Select
                                        value={fromBase}
                                        onValueChange={(v) => handleBaseChange(v as Base)}
                                    >
                                        <SelectTrigger className="tw-w-full sm:tw-w-[200px] tw-h-12">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(BASES).map((base) => (
                                                <SelectItem key={base} value={base}>
                                                    {t(`bases.${base}`)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* 结果区域 */}
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                {Object.keys(BASES).map((base) => (
                                    <div
                                        key={base}
                                        className="tw-p-4 tw-rounded-lg tw-bg-gray-100 tw-space-y-2"
                                    >
                                        <div className="tw-text-sm tw-font-medium tw-text-gray-500">
                                            {t(`bases.${base}`)}
                                        </div>
                                        <div className="tw-text-lg tw-font-semibold tw-break-all tw-min-h-[2rem]">
                                            {results[base as Base]}
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
