import { NextResponse } from 'next/server';

const mockChineseToEnglish: { [key: string]: string } = {
    你好: 'Hello',
    世界: 'World',
    如何使用: 'How to use',
    翻译: 'Translate',
};

const mockEnglishToChinese: { [key: string]: string } = {
    Hello: '你好',
    World: '世界',
    'How to use': '如何使用',
    Translate: '翻译',
};

const mockTranslate = (text: string, from: string, to: string) => {
    if (from === 'zh' && to === 'en') {
        return text
            .split(' ')
            .map((word) => mockChineseToEnglish[word] || word)
            .join(' ');
    }
    if (from === 'en' && to === 'zh') {
        return text
            .split(' ')
            .map((word) => mockEnglishToChinese[word] || word)
            .join('');
    }
    return text; // 如果语言对不匹配,返回原文
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!text || !from || !to) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const translatedText = mockTranslate(text, from, to);
    return NextResponse.json({ translatedText });
}
