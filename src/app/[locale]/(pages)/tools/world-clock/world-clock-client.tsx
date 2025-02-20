'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';

interface TimeResult {
    timezone: string;
    datetime: string;
    offset: string;
    label: string;
    timestamp: number;
}

interface Timezone {
    value: string;
    labelKey: string;
}

// 常用时区列表
const TIMEZONES: Timezone[] = [
    { value: 'Asia/Shanghai', labelKey: 'china' },
    { value: 'America/New_York', labelKey: 'newYork' },
    { value: 'Europe/London', labelKey: 'london' },
    { value: 'Europe/Paris', labelKey: 'paris' },
    { value: 'Asia/Tokyo', labelKey: 'tokyo' },
    { value: 'Australia/Sydney', labelKey: 'sydney' },
    { value: 'Pacific/Auckland', labelKey: 'auckland' },
];

export default function WorldClockClient() {
    const t = useTranslations('Tools.worldClock');
    const [timeResults, setTimeResults] = useState<TimeResult[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 格式化时间的函数
    const formatDateTime = (timestamp: number, timezone: string) => {
        return new Intl.DateTimeFormat('zh-CN', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        })
            .format(new Date(timestamp))
            .replace(/\//g, '-');
    };

    // 更新所有时区的时间
    const updateTimes = () => {
        const now = Date.now();
        setTimeResults((prev) =>
            prev.map((result) => ({
                ...result,
                datetime: formatDateTime(now, result.timezone),
                timestamp: now,
            })),
        );
    };

    // 从API获取初始时间数据
    const getAllTimes = async () => {
        try {
            setError('');
            setLoading(true);

            const response = await fetch('/api/world-clock');
            const data = await response.json();

            if (data.error) {
                setError(t('errors.fetchError'));
                return;
            }

            const results = data.times.map((time: any) => ({
                timezone: time.timezone,
                label: t(
                    `timezones.${TIMEZONES.find((tz) => tz.value === time.timezone)?.labelKey}`,
                ),
                datetime: time.datetime,
                offset: time.offset,
                timestamp: Date.now(),
            }));

            setTimeResults(results);
        } catch {
            setError(t('errors.fetchError'));
        } finally {
            setLoading(false);
        }
    };

    // 初始化和自动更新
    useEffect(() => {
        getAllTimes();
    }, []); // 只在组件挂载时获取一次API数据

    // 每秒更新时间显示
    useEffect(() => {
        if (timeResults.length > 0) {
            const interval = setInterval(updateTimes, 1000);
            return () => clearInterval(interval);
        }
        return undefined; // 添加默认返回值
    }, [timeResults.length]);

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-space-y-6">
                    <Card className="tw-p-6">
                        <div className="tw-flex tw-justify-between tw-items-center">
                            <h2 className="tw-text-xl tw-font-semibold">{t('timeResults')}</h2>
                            <Button onClick={getAllTimes} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />
                                        {t('checking')}
                                    </>
                                ) : (
                                    t('refresh')
                                )}
                            </Button>
                        </div>

                        {error && <p className="tw-text-red-500 tw-mt-4">{error}</p>}

                        <div className="tw-space-y-4 tw-mt-6">
                            {timeResults.map((result) => (
                                <div
                                    key={result.timezone}
                                    className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-rounded-lg tw-bg-gray-50"
                                >
                                    <div className="tw-space-y-1">
                                        <div className="tw-font-medium">{result.label}</div>
                                        <div className="tw-text-sm tw-text-gray-500">
                                            {t('offset')}: {result.offset}
                                        </div>
                                    </div>
                                    <div className="tw-text-lg tw-font-semibold">
                                        {result.datetime}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
