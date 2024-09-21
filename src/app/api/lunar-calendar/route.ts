import { Lunar, Solar } from 'lunar-javascript';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const date = searchParams.get('date');

    if (!action || !date) {
        return NextResponse.json({ error: 'Missing action or date parameter' }, { status: 400 });
    }

    try {
        let result;
        if (action === 'solarToLunar') {
            const [year, month, day] = date.split('-').map(Number);
            const solar = Solar.fromYmd(year, month, day);
            const lunar = solar.getLunar();
            result = {
                lunarDate: `${lunar.getYear()}-${lunar.getMonth()}-${lunar.getDay()}`,
                lunarYearInChinese: lunar.getYearInChinese(),
                lunarMonthInChinese: lunar.getMonthInChinese(),
                lunarDayInChinese: lunar.getDayInChinese(),
                zodiac: lunar.getYearZodiac(),
                isLeapMonth: lunar.isLeap(),
            };
        } else if (action === 'lunarToSolar') {
            const [year, month, day] = date.split('-').map(Number);
            const isLeap = searchParams.get('isLeap') === 'true';
            const lunar = Lunar.fromYmd(year, month, day);
            if (isLeap) {
                lunar.setLeapMonth(true);
            }
            const solar = lunar.getSolar();
            result = {
                solarDate: solar.toYmd(),
                weekDay: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ][solar.getWeek()],
            };
        } else {
            throw new Error('Invalid action');
        }
        return NextResponse.json(result);
    } catch {
        return NextResponse.json({ error: 'Invalid date or processing error' }, { status: 400 });
    }
}
