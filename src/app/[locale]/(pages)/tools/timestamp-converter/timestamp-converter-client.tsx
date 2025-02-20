'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/shadcn/tabs';

type Unit = 'seconds' | 'milliseconds';
type ConvertType = 'toTimestamp' | 'fromTimestamp';

export default function TimestampConverterClient() {
    const t = useTranslations('Tools.timestampConverter');
    const [currentTimestamp, setCurrentTimestamp] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isRunning, setIsRunning] = useState(true);
    const [unit, setUnit] = useState<Unit>('seconds');
    const [convertType, setConvertType] = useState<ConvertType>('toTimestamp');
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [timestampInput, setTimestampInput] = useState('');
    const [convertResult, setConvertResult] = useState('');

    // 更新当前时间戳和日期时间
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            const updateTime = () => {
                const now = new Date();
                // 更新时间戳
                const timestamp =
                    unit === 'seconds' ? Math.floor(now.getTime() / 1000) : now.getTime();
                setCurrentTimestamp(timestamp.toString());

                // 更新日期时间，使用 Intl.DateTimeFormat 来支持本地化
                const dateFormatter = new Intl.DateTimeFormat(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZoneName: 'short',
                });
                setCurrentDateTime(dateFormatter.format(now));
            };
            updateTime();
            timer = setInterval(updateTime, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, unit]);

    // 处理单位切换
    const handleUnitChange = (newUnit: Unit) => {
        setUnit(newUnit);
        if (convertType === 'fromTimestamp' && timestampInput) {
            handleConvert(timestampInput, newUnit);
        }
    };

    // 处理转换
    const handleConvert = (value: string, currentUnit: Unit = unit) => {
        if (!value) {
            setConvertResult('');
            return;
        }

        try {
            if (convertType === 'toTimestamp') {
                const date = new Date(value);
                if (isNaN(date.getTime())) {
                    setConvertResult('');
                    return;
                }
                const timestamp =
                    currentUnit === 'seconds' ? Math.floor(date.getTime() / 1000) : date.getTime();
                setConvertResult(timestamp.toString());
            } else {
                const timestamp = parseInt(value);
                if (isNaN(timestamp)) {
                    setConvertResult('');
                    return;
                }
                const date = new Date(currentUnit === 'seconds' ? timestamp * 1000 : timestamp);
                setConvertResult(date.toISOString().slice(0, 19).replace('T', ' '));
            }
        } catch {
            setConvertResult('');
        }
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
                            {/* 当前时间区域 */}
                            <div className="tw-space-y-4">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <h2 className="tw-text-lg tw-font-semibold">
                                        {t('currentTime')}
                                    </h2>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsRunning(!isRunning)}
                                    >
                                        {isRunning ? t('stop') : t('start')}
                                    </Button>
                                </div>
                                <div className="tw-space-y-2">
                                    {/* 当前日期时间 */}
                                    <div className="tw-flex tw-gap-4">
                                        <Input
                                            value={currentDateTime}
                                            readOnly
                                            className="tw-font-mono"
                                        />
                                    </div>
                                    {/* 当前时间戳 */}
                                    <div className="tw-flex tw-gap-4">
                                        <Input
                                            value={currentTimestamp}
                                            readOnly
                                            className="tw-font-mono"
                                        />
                                        <Select
                                            value={unit}
                                            onValueChange={(v) => handleUnitChange(v as Unit)}
                                        >
                                            <SelectTrigger className="tw-w-[180px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="seconds">
                                                    {t('units.seconds')}
                                                </SelectItem>
                                                <SelectItem value="milliseconds">
                                                    {t('units.milliseconds')}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* 转换工具 */}
                            <Tabs
                                defaultValue="toTimestamp"
                                onValueChange={(v) => setConvertType(v as ConvertType)}
                            >
                                <TabsList className="tw-grid tw-w-full tw-grid-cols-2">
                                    <TabsTrigger value="toTimestamp">
                                        {t('convertTypes.toTimestamp')}
                                    </TabsTrigger>
                                    <TabsTrigger value="fromTimestamp">
                                        {t('convertTypes.fromTimestamp')}
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="toTimestamp" className="tw-space-y-4">
                                    <Input
                                        placeholder={t('dateTimePlaceholder')}
                                        value={dateTimeInput}
                                        onChange={(e) => {
                                            setDateTimeInput(e.target.value);
                                            handleConvert(e.target.value);
                                        }}
                                        className="tw-font-mono"
                                    />
                                </TabsContent>

                                <TabsContent value="fromTimestamp" className="tw-space-y-4">
                                    <Input
                                        placeholder={t('timestampPlaceholder')}
                                        value={timestampInput}
                                        onChange={(e) => {
                                            setTimestampInput(e.target.value);
                                            handleConvert(e.target.value);
                                        }}
                                        className="tw-font-mono"
                                    />
                                </TabsContent>

                                {convertResult && (
                                    <div className="tw-mt-4 tw-space-y-2">
                                        <h3 className="tw-font-medium">{t('convertResult')}</h3>
                                        <Input
                                            value={convertResult}
                                            readOnly
                                            className="tw-font-mono"
                                        />
                                    </div>
                                )}
                            </Tabs>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
