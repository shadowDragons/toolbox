'use client';

import { Calculator } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations();
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
                    {t('Tools.numberConverter.title')}
                </h1>
                <Card className="tw-max-w-4xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Calculator className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>{t('Tools.numberConverter.name')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <RadioGroup
                                defaultValue={inputBase.toString()}
                                onValueChange={(value) => setInputBase(parseInt(value, 10))}
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
                                        <Label htmlFor={`base-${base}`}>
                                            {base}
                                            {t('Tools.numberConverter.base')}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            <div className="tw-space-y-2">
                                <Label htmlFor="input">
                                    {t('Tools.numberConverter.inputValue')}
                                </Label>
                                <Input
                                    id="input"
                                    placeholder={t('Tools.numberConverter.inputPlaceholder')}
                                    value={inputValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setInputValue(e.target.value)
                                    }
                                />
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('Tools.numberConverter.base')}</TableHead>
                                        <TableHead>{t('Tools.numberConverter.result')}</TableHead>
                                        <TableHead>
                                            {t('Tools.numberConverter.explanation')}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {BASES.map((base) => (
                                        <TableRow key={base}>
                                            <TableCell>{base}</TableCell>
                                            <TableCell>{results[base] || ''}</TableCell>
                                            <TableCell>
                                                {base === 2 &&
                                                    t('Tools.numberConverter.bases.binary')}
                                                {base === 8 &&
                                                    t('Tools.numberConverter.bases.octal')}
                                                {base === 10 &&
                                                    t('Tools.numberConverter.bases.decimal')}
                                                {base === 16 &&
                                                    t('Tools.numberConverter.bases.hex')}
                                                {base === 32 &&
                                                    t('Tools.numberConverter.bases.base32')}
                                                {base === 36 &&
                                                    t('Tools.numberConverter.bases.base36')}
                                                {base === 58 &&
                                                    t('Tools.numberConverter.bases.base58')}
                                                {base === 62 &&
                                                    t('Tools.numberConverter.bases.base62')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
