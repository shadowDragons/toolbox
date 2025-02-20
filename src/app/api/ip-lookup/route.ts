import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get('ip') || '';

    let url = '';
    if (!ip) {
        url = `http://ip-api.com/json/`;
    } else {
        url = `http://ip-api.com/json/${ip}`;
    }

    console.log('Fetching from:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || data.status !== 'success') {
            throw new Error(`API error: ${data ? data.status : 'No response from API'}`);
        }

        return NextResponse.json({
            ip: data.query,
            address: `${data.country}, ${data.regionName}, ${data.city}`,
            isDomain: 0,
            latitude: data.lat,
            longitude: data.lon,
            isp: data.isp,
            timezone: data.timezone,
        });
    } catch (error: any) {
        console.error('IP lookup failed:', error);
        return NextResponse.json({ error: `IP lookup failed: ${error.message}` }, { status: 500 });
    }
}
