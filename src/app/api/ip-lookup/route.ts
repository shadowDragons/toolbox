import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get('ip');

    const url = `https://webapi-pc.meitu.com/common/ip_location${ip ? `?ip=${ip}` : ''}`;
    console.log('Fetching from:', url);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.code !== 0) {
            throw new Error(`API error: ${data.code}`);
        }

        const ipInfo = data.data[ip || Object.keys(data.data)[0]];

        return NextResponse.json({
            ip: ip || Object.keys(data.data)[0],
            address: `${ipInfo.nation}, ${ipInfo.province}, ${ipInfo.city}`,
            isDomain: 0,
            latitude: ipInfo.latitude,
            longitude: ipInfo.longitude,
            isp: ipInfo.isp,
            timezone: ipInfo.time_zone,
        });
    } catch (error) {
        console.error('IP lookup failed:', error);
        return NextResponse.json({ error: 'IP lookup failed' }, { status: 500 });
    }
}
