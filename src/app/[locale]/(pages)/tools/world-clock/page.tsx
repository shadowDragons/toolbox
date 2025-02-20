import { generateToolMetadata } from '@/libs/metadata';

// 将客户端组件移到单独的文件中
import WorldClockClient from './world-clock-client';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return generateToolMetadata('/tools/world-clock', locale);
}
export default WorldClockClient;
