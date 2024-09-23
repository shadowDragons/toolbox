import { isNaN, parseInt } from 'lodash';
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input');
    const fromBase = parseInt(searchParams.get('fromBase') || '10');

    if (!input || isNaN(fromBase)) {
        return NextResponse.json({ error: 'Missing or invalid input parameters' }, { status: 400 });
    }

    const results: Record<number, string> = {};
    BASES.forEach((base) => {
        results[base] = convertBase(input, fromBase, base);
    });

    return NextResponse.json(results);
}
