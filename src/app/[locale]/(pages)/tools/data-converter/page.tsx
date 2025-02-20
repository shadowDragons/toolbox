import { generateToolMetadata } from '@/libs/metadata';

// 将客户端组件移到单独的文件中
import DataConverterClient from './data-converter-client';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return generateToolMetadata('/tools/data-converter', locale);
}
export default DataConverterClient;
