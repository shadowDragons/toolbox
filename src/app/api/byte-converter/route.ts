import { NextResponse } from 'next/server';

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

function parseInput(input: string): { value: number; unit: string } | null {
    const match = input.match(/^(\d+(?:\.\d+)?)\s*([BKMGTP]B?)$/i);
    if (!match) return null;

    let [, value, unit] = match;
    unit = unit.toUpperCase();
    if (unit.length === 1) unit += 'B';

    return { value: parseFloat(value), unit };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input');

    if (!input) {
        return NextResponse.json({ error: 'Missing input parameter' }, { status: 400 });
    }

    const parsed = parseInput(input);
    if (!parsed) {
        return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    const { value, unit } = parsed;
    const inputIndex = units.indexOf(unit);
    const results: Record<string, string> = {};

    units.forEach((outputUnit, outputIndex) => {
        const difference = outputIndex - inputIndex;
        const convertedValue = value * 1024 ** -difference;
        results[outputUnit] = convertedValue.toFixed(12);
    });

    return NextResponse.json(results);
}
