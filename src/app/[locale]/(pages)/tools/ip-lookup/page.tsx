'use client';

import { Globe, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Label } from '@/app/_components/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/app/_components/shadcn/radio-group';

interface IPInfo {
    rs: number;
    code: number;
    address: string;
    ip: string;
    isDomain: number;
}

export default function IPLookupPage() {
    const t = useTranslations();
    const [queryType, setQueryType] = useState<'local' | 'specific'>('local');
    const [ipAddress, setIpAddress] = useState('');
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLookup = async () => {
        setError('');
        setIpInfo(null);
        setIsLoading(true);

        try {
            const type = queryType === 'local' ? '0' : '1';
            const url = `/api/ip-lookup?type=${type}${queryType === 'specific' ? `&ip=${ipAddress}` : ''}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: IPInfo = await response.json();
            setIpInfo(data);
        } catch (err) {
            setError('查询失败,请稍后再试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('Tools.ipLookup.title')}
                </h1>
                <Card className="tw-max-w-2xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Globe className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>{t('Tools.ipLookup.name')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <RadioGroup
                                value={queryType}
                                onValueChange={(value: 'local' | 'specific') => setQueryType(value)}
                                className="tw-flex tw-flex-col tw-space-y-1"
                            >
                                <div className="tw-flex tw-items-center tw-space-x-2">
                                    <RadioGroupItem value="local" id="local" />
                                    <Label htmlFor="local">
                                        {t('Tools.ipLookup.queryTypes.local')}
                                    </Label>
                                </div>
                                <div className="tw-flex tw-items-center tw-space-x-2">
                                    <RadioGroupItem value="specific" id="specific" />
                                    <Label htmlFor="specific">
                                        {t('Tools.ipLookup.queryTypes.specific')}
                                    </Label>
                                </div>
                            </RadioGroup>

                            {queryType === 'specific' && (
                                <div className="tw-space-y-2">
                                    <Label htmlFor="ipAddress">IP地址</Label>
                                    <Input
                                        id="ipAddress"
                                        placeholder={t('Tools.ipLookup.inputPlaceholder')}
                                        value={ipAddress}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setIpAddress(e.target.value)
                                        }
                                    />
                                </div>
                            )}

                            <Button
                                onClick={handleLookup}
                                className="tw-w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Search className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />
                                ) : (
                                    <Search className="tw-mr-2 tw-h-4 tw-w-4" />
                                )}
                                {t('Tools.ipLookup.lookup')}
                            </Button>

                            {error && (
                                <p className="tw-text-red-500">
                                    {t('Tools.ipLookup.lookupFailed')}
                                </p>
                            )}

                            {ipInfo && (
                                <div className="tw-bg-white tw-p-4 tw-rounded-md tw-border">
                                    <h3 className="tw-text-lg tw-font-semibold tw-mb-2">
                                        {t('Tools.ipLookup.result.title')}
                                    </h3>
                                    <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                                        <div>
                                            <p className="tw-text-sm tw-font-medium tw-text-gray-500">
                                                {t('Tools.ipLookup.result.ip')}
                                            </p>
                                            <p>{ipInfo.ip}</p>
                                        </div>
                                        <div>
                                            <p className="tw-text-sm tw-font-medium tw-text-gray-500">
                                                {t('Tools.ipLookup.result.location')}
                                            </p>
                                            <p>{ipInfo.address}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
