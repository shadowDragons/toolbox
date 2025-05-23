import { NextResponse } from 'next/server';

const TRANSLATE_API_URL = 'https://api-free.deepl.com/v2/translate';
const { DEEPL_AUTH_KEY } = process.env;

export async function POST(request: Request) {
    const { text, to } = await request.json();

    if (!text || !to) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const response = await fetch(TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: [text],
            target_lang: to,
        }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Translation API error' }, { status: response.status });
    }

    const data = await response.json();
    const translatedText = data.translations[0].text;

    return NextResponse.json({ translatedText });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!text || !from || !to) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const response = await fetch(TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
            source_lang: from,
            target_lang: to,
        }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Translation API error' }, { status: response.status });
    }

    const data = await response.json();
    const translatedText = data.translations[0].text;

    return NextResponse.json({ translatedText });
}
