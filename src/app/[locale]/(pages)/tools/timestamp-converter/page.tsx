'use client';

import { Clock, Play, Pause, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';
import { Label } from '@/app/_components/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/app/_components/shadcn/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';

export default function TimestampConverterPage() {
    const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [outputValue, setOutputValue] = useState<string>('');
    const [conversionType, setConversionType] = useState<'toTimestamp' | 'fromTimestamp'>(
        'toTimestamp',
    );
    const [timestampUnit, setTimestampUnit] = useState<'seconds' | 'milliseconds'>('seconds');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setCurrentTimestamp(
                    Math.floor(Date.now() / (timestampUnit === 'seconds' ? 1000 : 1)),
                );
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, timestampUnit]);

    const toggleRunning = () => setIsRunning(!isRunning);

    const refreshTimestamp = () => {
        setCurrentTimestamp(Math.floor(Date.now() / (timestampUnit === 'seconds' ? 1000 : 1)));
    };

    const convertToTimestamp = (dateString: string): number => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }
        return Math.floor(date.getTime() / (timestampUnit === 'seconds' ? 1000 : 1));
    };

    const convertFromTimestamp = (timestamp: number): string => {
        const date = new Date(timestamp * (timestampUnit === 'seconds' ? 1000 : 1));
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const handleConvert = () => {
        setError('');
        setOutputValue('');

        try {
            if (conversionType === 'toTimestamp') {
                const timestamp = convertToTimestamp(inputValue);
                setOutputValue(timestamp.toString());
            } else {
                const timestamp = parseInt(inputValue, 10);
                if (isNaN(timestamp)) {
                    throw new Error('Invalid timestamp');
                }
                const dateTime = convertFromTimestamp(timestamp);
                setOutputValue(dateTime);
            }
        } catch (err) {
            setError('Invalid input. Please check your format and try again.');
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    增强型时间戳转换工具
                </h1>
                <Card className="tw-max-w-2xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Clock className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>时间戳转换</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="tw-text-lg tw-font-semibold">当前Unix时间戳:</div>
                                <div className="tw-text-xl tw-font-bold tw-text-blue-600">
                                    {currentTimestamp}
                                </div>
                            </div>
                            <div className="tw-flex tw-space-x-2">
                                <Button onClick={toggleRunning} variant="outline">
                                    {isRunning ? (
                                        <Pause className="tw-h-4 tw-w-4 tw-mr-2" />
                                    ) : (
                                        <Play className="tw-h-4 tw-w-4 tw-mr-2" />
                                    )}
                                    {isRunning ? '停止' : '开始'}
                                </Button>
                                <Button onClick={refreshTimestamp} variant="outline">
                                    <RefreshCw className="tw-h-4 tw-w-4 tw-mr-2" />
                                    刷新
                                </Button>
                            </div>
                            <Select
                                value={timestampUnit}
                                onValueChange={(value: 'seconds' | 'milliseconds') =>
                                    setTimestampUnit(value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="选择时间戳单位" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="seconds">秒</SelectItem>
                                    <SelectItem value="milliseconds">毫秒</SelectItem>
                                </SelectContent>
                            </Select>
                            <RadioGroup
                                value={conversionType}
                                onValueChange={(value: 'toTimestamp' | 'fromTimestamp') =>
                                    setConversionType(value)
                                }
                                className="tw-flex tw-flex-col tw-space-y-1"
                            >
                                <div className="tw-flex tw-items-center tw-space-x-2">
                                    <RadioGroupItem value="toTimestamp" id="toTimestamp" />
                                    <Label htmlFor="toTimestamp">日期时间 → 时间戳</Label>
                                </div>
                                <div className="tw-flex tw-items-center tw-space-x-2">
                                    <RadioGroupItem value="fromTimestamp" id="fromTimestamp" />
                                    <Label htmlFor="fromTimestamp">时间戳 → 日期时间</Label>
                                </div>
                            </RadioGroup>
                            <div className="tw-space-y-2">
                                <Label htmlFor="input">
                                    {conversionType === 'toTimestamp'
                                        ? '输入日期时间 (YYYY-MM-DD HH:MM:SS)'
                                        : '输入时间戳'}
                                </Label>
                                <Input
                                    id="input"
                                    placeholder={
                                        conversionType === 'toTimestamp'
                                            ? '2023-05-20 15:30:00'
                                            : '1684590600'
                                    }
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleConvert} className="tw-w-full">
                                转换
                            </Button>
                            {error && <p className="tw-text-red-500">{error}</p>}
                            {outputValue && (
                                <div className="tw-space-y-2">
                                    <Label htmlFor="output">转换结果</Label>
                                    <Input id="output" value={outputValue} readOnly />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                {/* API使用说明 Card 移除，改为注释形式记录 */}
                {/* 
                API 使用说明:
                - 端点: GET /api/timestamp-converter
                - 参数: 
                    - action: toTimestamp 或 fromTimestamp
                    - input: 日期时间字符串(YYYY-MM-DD HH:MM:SS)或时间戳
                    - unit: seconds 或 milliseconds (可选，默认 seconds)
                - 示例: 
                    /api/timestamp-converter?action=toTimestamp&input=2023-05-20 15:30:00&unit=seconds
                    /api/timestamp-converter?action=fromTimestamp&input=1684590600&unit=seconds
                - 返回: JSON对象，包含转换结果 { "result": 1684590600 }
                */}
            </div>
        </div>
    );
}
