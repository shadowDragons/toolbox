import { generateToolMetadata } from '@/libs/metadata';

import ShortLinkDecoderClient from './short-link-decoder-client';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return generateToolMetadata('/tools/short-link-decoder', locale);
}

export default ShortLinkDecoderClient;

