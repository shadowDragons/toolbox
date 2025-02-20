import { NextResponse } from 'next/server';

async function checkUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.status === 200;
    } catch {
        return false;
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
        }

        let processedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            processedUrl = `https://${url}`;
        }

        // 常见的favicon路径
        const commonPaths = [
            '/favicon.ico',
            '/favicon.png',
            '/apple-touch-icon.png',
            '/apple-touch-icon-precomposed.png',
        ];

        try {
            const domain = new URL(processedUrl).origin;
            const results = await Promise.all(
                commonPaths.map(async (path) => {
                    const iconUrl = `${domain}${path}`;
                    const exists = await checkUrl(iconUrl);
                    return { url: iconUrl, exists };
                }),
            );

            const validIcons = results.filter((result) => result.exists);

            return NextResponse.json({ icons: validIcons });
        } catch {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
