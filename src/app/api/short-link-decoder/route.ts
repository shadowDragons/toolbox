import { NextResponse } from 'next/server';

interface Step {
    url: string;
    status: number;
    location?: string | null;
}

const MAX_REDIRECTS = 10;
const TIMEOUT_MS = 5000;

async function fetchWithTimeout(
    resource: string,
    options: RequestInit & { timeout?: number } = {},
) {
    const { timeout = TIMEOUT_MS, ...rest } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(resource, {
            ...rest,
            signal: controller.signal,
            redirect: 'manual',
        });
        return res;
    } finally {
        clearTimeout(id);
    }
}

function normalizeUrl(input: string): string {
    try {
        if (!input.startsWith('http://') && !input.startsWith('https://')) {
            return `https://${input}`;
        }
        return input;
    } catch {
        return input;
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
        }

        let currentUrl = normalizeUrl(url);
        const steps: Step[] = [];

        for (let i = 0; i < MAX_REDIRECTS; i += 1) {
            // Prefer HEAD to avoid downloading bodies; fallback to GET if not allowed
            let res: Response;
            try {
                res = await fetchWithTimeout(currentUrl, { method: 'HEAD' });
            } catch {
                res = await fetchWithTimeout(currentUrl, { method: 'GET' });
            }

            const { status } = res;
            const location = res.headers.get('location');
            steps.push({ url: currentUrl, status, location });

            // If status is redirect (3xx) and has Location, follow it
            if (status >= 300 && status < 400 && location) {
                try {
                    const nextUrl = new URL(location, currentUrl).toString();
                    currentUrl = nextUrl;
                    continue; // Next hop
                } catch {
                    break; // invalid location, stop
                }
            }

            // Not a redirect -> reached final
            break;
        }

        const finalStep = steps[steps.length - 1];
        const target_url = finalStep?.url ?? currentUrl;

        return NextResponse.json({ target_url, steps });
    } catch (e) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
