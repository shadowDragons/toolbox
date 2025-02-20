import { NextResponse } from 'next/server';

async function checkUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.status === 200;
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        const exists = await checkUrl(url);
        return NextResponse.json({ exists });
    } catch (error) {
        return NextResponse.json({ exists: false });
    }
}
