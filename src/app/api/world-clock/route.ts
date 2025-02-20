import { NextResponse } from 'next/server';

const DEFAULT_TIMEZONES = [
    'Asia/Shanghai',
    'America/New_York',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland',
];

async function getTimeForTimezone(timezone: string) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('zh-CN', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        // 获取时区偏移
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: timezone,
            timeZoneName: 'short',
        });
        const offset = timeString.split(' ')[2]; // 获取如 "GMT+8" 的部分

        return {
            timezone,
            datetime: formatter.format(now).replace(/\//g, '-'),
            offset,
        };
    } catch {
        return null;
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const timezone = searchParams.get('timezone');

        // 如果指定了时区，只返回该时区的时间
        if (timezone) {
            const result = await getTimeForTimezone(timezone);
            if (!result) {
                return NextResponse.json({ error: 'Invalid timezone' }, { status: 400 });
            }
            return NextResponse.json(result);
        }

        // 如果没有指定时区，返回所有默认时区的时间
        const results = await Promise.all(
            DEFAULT_TIMEZONES.map(async (tz) => getTimeForTimezone(tz)),
        );

        const validResults = results.filter(
            (result): result is NonNullable<typeof result> => result !== null,
        );

        if (validResults.length === 0) {
            return NextResponse.json({ error: 'Failed to get times' }, { status: 500 });
        }

        return NextResponse.json({ times: validResults });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
