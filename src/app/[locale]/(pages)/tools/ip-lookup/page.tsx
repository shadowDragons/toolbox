import { generateToolMetadata } from '@/libs/metadata';

// 将客户端组件移到单独的文件中
import IpLookupClient from './ip-lookup-client';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return generateToolMetadata('/tools/ip-lookup', locale);
}
export default IpLookupClient;
