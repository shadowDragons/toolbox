declare module 'lunar-javascript' {
    export class Lunar {
        static fromDate(date: Date): Lunar;
        static fromYmd(year: number, month: number, day: number): Lunar;
        getYear(): number;
        getMonth(): number;
        getDay(): number;
        getYearZodiac(): string;
        getYearInChinese(): string;
        getMonthInChinese(): string;
        getDayInChinese(): string;
        isLeap(): boolean;
        setLeapMonth(isLeap: boolean): void;
        getSolar(): Solar;
    }

    export class Solar {
        static fromYmd(year: number, month: number, day: number): Solar;
        toYmd(): string;
        getWeek(): number;
        getLunar(): Lunar;
    }
}
