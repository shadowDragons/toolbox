import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const input = searchParams.get('input');
    const unit = searchParams.get('unit') || 'seconds';

    if (!action || !input) {
        return NextResponse.json({ error: '缺少 action 或 input 参数' }, { status: 400 });
    }

    try {
        let result;
        switch (action) {
            case 'toTimestamp':
                const date = new Date(input);
                if (isNaN(date.getTime())) {
                    throw new Error('无效的日期格式');
                }
                result = Math.floor(date.getTime() / (unit === 'seconds' ? 1000 : 1));
                break;
            case 'fromTimestamp':
                const timestamp = parseInt(input, 10);
                if (isNaN(timestamp)) {
                    throw new Error('无效的时间戳');
                }
                const convertedDate = new Date(timestamp * (unit === 'seconds' ? 1000 : 1));
                result = convertedDate.toISOString().slice(0, 19).replace('T', ' ');
                break;
            default:
                return NextResponse.json({ error: '无效的操作' }, { status: 400 });
        }
        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json({ error: '无效的输入或处理错误' }, { status: 400 });
    }
}
