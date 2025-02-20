'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/shadcn/tabs';

interface IpInfo {
    ip: string;
    address: string;
    latitude: string;
    longitude: string;
    isp: string;
    timezone: string;
}

export default function IpLookupClient() {
    const t = useTranslations('Tools.ipLookup');
    const [ipAddress, setIpAddress] = useState('');
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLookup = async (type: 'local' | 'specific') => {
        try {
            setLoading(true);
            setError('');
            setIpInfo(null);

            let url = '/api/ip-lookup';
            if (type === 'specific' && ipAddress) {
                url += `?ip=${encodeURIComponent(ipAddress)}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t('lookupFailed'));
            }

            setIpInfo({
                ip: data.ip,
                address: data.address,
                latitude: data.latitude,
                longitude: data.longitude,
                isp: data.isp,
                timezone: data.timezone,
            });
        } catch (err) {
            setError(t('lookupFailed'));
            console.error('IP lookup error:', err);
        } finally {
            setLoading(false);
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
                            <Tabs defaultValue="local" className="tw-w-full">
                                <TabsList className="tw-grid tw-w-full tw-grid-cols-2">
                                    <TabsTrigger
                                        value="local"
                                        onClick={() => handleLookup('local')}
                                    >
                                        {t('queryTypes.local')}
                                    </TabsTrigger>
                                    <TabsTrigger value="specific">
                                        {t('queryTypes.specific')}
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="local" className="tw-space-y-4">
                                    {/* 本地IP结果显示区域 */}
                                    {ipInfo && (
                                        <div className="tw-space-y-4">
                                            <h2 className="tw-text-lg tw-font-semibold">
                                                {t('result.title')}
                                            </h2>
                                            <div className="tw-space-y-2">
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.ip')}
                                                    </span>
                                                    <span className="tw-font-mono">
                                                        {ipInfo.ip}
                                                    </span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.address')}
                                                    </span>
                                                    <span>{ipInfo.address}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.latitude')}
                                                    </span>
                                                    <span>{ipInfo.latitude}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.longitude')}
                                                    </span>
                                                    <span>{ipInfo.longitude}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.isp')}
                                                    </span>
                                                    <span>{ipInfo.isp}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.timezone')}
                                                    </span>
                                                    <span>{ipInfo.timezone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="specific" className="tw-space-y-4">
                                    <div className="tw-flex tw-gap-4">
                                        <Input
                                            placeholder={t('inputPlaceholder')}
                                            value={ipAddress}
                                            onChange={(e) => setIpAddress(e.target.value)}
                                            className="tw-flex-1"
                                        />
                                        <Button
                                            onClick={() => handleLookup('specific')}
                                            disabled={loading || !ipAddress}
                                        >
                                            {loading ? '...' : t('lookup')}
                                        </Button>
                                    </div>

                                    {/* 查询结果显示区域 */}
                                    {ipInfo && (
                                        <div className="tw-space-y-4">
                                            <h2 className="tw-text-lg tw-font-semibold">
                                                {t('result.title')}
                                            </h2>
                                            <div className="tw-space-y-2">
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.ip')}
                                                    </span>
                                                    <span className="tw-font-mono">
                                                        {ipInfo.ip}
                                                    </span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.address')}
                                                    </span>
                                                    <span>{ipInfo.address}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.latitude')}
                                                    </span>
                                                    <span>{ipInfo.latitude}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.longitude')}
                                                    </span>
                                                    <span>{ipInfo.longitude}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.isp')}
                                                    </span>
                                                    <span>{ipInfo.isp}</span>
                                                </div>
                                                <div className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-gray-100 tw-rounded-lg">
                                                    <span className="tw-text-gray-600">
                                                        {t('result.timezone')}
                                                    </span>
                                                    <span>{ipInfo.timezone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>

                            {error && <p className="tw-text-red-500">{error}</p>}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
