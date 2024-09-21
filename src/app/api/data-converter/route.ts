import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const input = searchParams.get('input');

    if (!action || !input) {
        return NextResponse.json({ error: 'Missing action or input parameter' }, { status: 400 });
    }

    try {
        let result;
        switch (action) {
            case 'formatJSON':
                result = JSON.stringify(JSON.parse(input), null, 2);
                break;
            case 'minifyJSON':
                result = JSON.stringify(JSON.parse(input));
                break;
            case 'encodeBase64':
                result = Buffer.from(input).toString('base64');
                break;
            case 'decodeBase64':
                result = Buffer.from(input, 'base64').toString('utf-8');
                break;
            case 'encodeURL':
                result = encodeURIComponent(input);
                break;
            case 'decodeURL':
                result = decodeURIComponent(input);
                break;
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
        return NextResponse.json({ result });
    } catch {
        return NextResponse.json({ error: 'Invalid input or processing error' }, { status: 400 });
    }
}
