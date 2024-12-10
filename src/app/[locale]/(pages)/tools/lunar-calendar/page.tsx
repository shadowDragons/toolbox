'use client';

import { Calendar, ArrowRightLeft } from 'lucide-react';
import { Lunar } from 'lunar-javascript';
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

export default function LunarSolarCalendarPage() {
    const [solarDate, setSolarDate] = useState('');
    const [lunarYear, setLunarYear] = useState('');
    const [lunarMonth, setLunarMonth] = useState('');
    const [lunarDay, setLunarDay] = useState('');
    const [isLeapMonth, setIsLeapMonth] = useState(false);
    const [result, setResult] = useState('');
    const [conversionType, setConversionType] = useState('solarToLunar');

    const convertDate = () => {
        try {
            if (conversionType === 'solarToLunar') {
                const date = new Date(solarDate);
                if (isNaN(date.getTime())) {
                    throw new Error('Invalid date');
                }

                const lunar = Lunar.fromDate(date);
                const year = lunar.getYear();
                const month = lunar.getMonth();
                const day = lunar.getDay();
                const zodiac = lunar.getYearZodiac();
                const lunarYear = lunar.getYearInChinese();
                const lunarMonth = lunar.getMonthInChinese();
                const lunarDay = lunar.getDayInChinese();
                const isLeap = lunar.isLeap() ? '（闰月）' : '';

                setResult(
                    `农历 ${lunarYear}年${lunarMonth}月${lunarDay}${isLeap} (${year}年${month}月${day}日) - 生肖：${zodiac}`,
                );
            } else {
                const lunar = Lunar.fromYmd(
                    parseInt(lunarYear),
                    parseInt(lunarMonth),
                    parseInt(lunarDay),
                );
                if (isLeapMonth) {
                    lunar.setLeapMonth(true);
                }
                const solar = lunar.getSolar();
                const solarDate = solar.toYmd();
                const weekDay = ['日', '一', '二', '三', '四', '五', '六'][solar.getWeek()];

                setResult(`公历 ${solarDate} 星期${weekDay}`);
            }
        } catch (error) {
            setResult('请输入有效的日期');
        }
    };

    const renderInputFields = () => {
        if (conversionType === 'solarToLunar') {
            return (
                <div className="tw-space-y-2">
                    <Label htmlFor="solarDate">公历日期</Label>
                    <Input
                        id="solarDate"
                        type="date"
                        value={solarDate}
                        onChange={(e) => setSolarDate(e.target.value)}
                    />
                </div>
            );
        }
        return (
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                <div className="tw-space-y-2">
                    <Label htmlFor="lunarYear">农历年</Label>
                    <Input
                        id="lunarYear"
                        type="number"
                        placeholder="年"
                        value={lunarYear}
                        onChange={(e) => setLunarYear(e.target.value)}
                    />
                </div>
                <div className="tw-space-y-2">
                    <Label htmlFor="lunarMonth">农历月</Label>
                    <Input
                        id="lunarMonth"
                        type="number"
                        placeholder="月"
                        min="1"
                        max="12"
                        value={lunarMonth}
                        onChange={(e) => setLunarMonth(e.target.value)}
                    />
                </div>
                <div className="tw-space-y-2">
                    <Label htmlFor="lunarDay">农历日</Label>
                    <Input
                        id="lunarDay"
                        type="number"
                        placeholder="日"
                        min="1"
                        max="30"
                        value={lunarDay}
                        onChange={(e) => setLunarDay(e.target.value)}
                    />
                </div>
                <div className="tw-space-y-2">
                    <Label htmlFor="isLeapMonth">是否闰月</Label>
                    <Select
                        value={isLeapMonth ? 'true' : 'false'}
                        onValueChange={(value) => setIsLeapMonth(value === 'true')}
                    >
                        <SelectTrigger id="isLeapMonth">
                            <SelectValue placeholder="选择是否闰月" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="false">否</SelectItem>
                            <SelectItem value="true">是</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        );
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    农历公历日期转换
                </h1>
                <Card className="tw-max-w-2xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Calendar className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>日期转换工具</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-items-center tw-justify-center tw-space-x-2">
                                <span
                                    className={
                                        conversionType === 'solarToLunar' ? 'tw-font-bold' : ''
                                    }
                                >
                                    公历
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setConversionType((prev) =>
                                            prev === 'solarToLunar'
                                                ? 'lunarToSolar'
                                                : 'solarToLunar',
                                        )
                                    }
                                >
                                    <ArrowRightLeft className="tw-h-4 tw-w-4" />
                                </Button>
                                <span
                                    className={
                                        conversionType === 'lunarToSolar' ? 'tw-font-bold' : ''
                                    }
                                >
                                    农历
                                </span>
                            </div>
                            {renderInputFields()}
                            <Button onClick={convertDate} className="tw-w-full">
                                转换日期
                            </Button>
                            <div className="tw-space-y-2">
                                <Label htmlFor="result">转换结果</Label>
                                <Input id="result" value={result} readOnly />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* API 使用说明
                    端点和参数:
                    1. 公历转农历:
                       GET /api/lunar-calendar?action=solarToLunar&date=2023-05-01
                       - date: YYYY-MM-DD格式
                       
                    2. 农历转公历:
                       GET /api/lunar-calendar?action=lunarToSolar&date=2023-3-11&isLeap=false
                       - date: YYYY-MM-DD格式
                       - isLeap: 是否闰月(true/false)

                    响应示例:
                    1. 公历转农历响应:
                    {
                        "lunarDate": "2023-3-11",
                        "lunarYearInChinese": "二〇二三",
                        "lunarMonthInChinese": "三",
                        "lunarDayInChinese": "十一",
                        "zodiac": "兔",
                        "isLeapMonth": false
                    }

                    2. 农历转公历响应:
                    {
                        "solarDate": "2023-05-01",
                        "weekDay": "Monday"
                    }
                */}
            </div>
        </div>
    );
}
