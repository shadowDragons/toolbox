import Diff from 'diff';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { oldText, newText } = await request.json();

    if (!oldText || !newText) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const diffResult = Diff.diffWords(oldText, newText);
    return NextResponse.json({ diffResult });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const oldText = searchParams.get('oldText');
    const newText = searchParams.get('newText');

    if (!oldText || !newText) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const diffResult = Diff.diffWords(oldText, newText);
    return NextResponse.json({ diffResult });
}
