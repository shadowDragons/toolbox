'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';
import { Textarea } from '@/app/_components/shadcn/textarea';

type Language = 'chinese' | 'english';

export default function TranslatorClient() {
    const t = useTranslations('Tools.translator');
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState<Language>('chinese');
    const [targetLanguage, setTargetLanguage] = useState<Language>('english');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTranslate = async () => {
        if (!sourceText.trim()) {
            setError(t('emptyInput'));
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch('/api/translator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: sourceText,
                    from: sourceLanguage === 'chinese' ? 'zh' : 'en',
                    to: targetLanguage === 'chinese' ? 'zh' : 'en',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t('translateFailed'));
            }

            setTranslatedText(data.translatedText);
        } catch (err) {
            setError(t('translateFailed'));
            console.error('Translation error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSwapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-max-w-4xl tw-mx-auto">
                    <Card className="tw-p-6">
                        <div className="tw-space-y-6">
                            {/* 语言选择区域 */}
                            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-4">
                                <Select
                                    value={sourceLanguage}
                                    onValueChange={(v) => setSourceLanguage(v as Language)}
                                >
                                    <SelectTrigger className="tw-w-full sm:tw-w-[200px]">
                                        <SelectValue placeholder={t('selectSource')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="chinese">
                                            {t('languages.chinese')}
                                        </SelectItem>
                                        <SelectItem value="english">
                                            {t('languages.english')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="outline"
                                    onClick={handleSwapLanguages}
                                    className="tw-px-8"
                                >
                                    ⇄
                                </Button>

                                <Select
                                    value={targetLanguage}
                                    onValueChange={(v) => setTargetLanguage(v as Language)}
                                >
                                    <SelectTrigger className="tw-w-full sm:tw-w-[200px]">
                                        <SelectValue placeholder={t('selectTarget')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="chinese">
                                            {t('languages.chinese')}
                                        </SelectItem>
                                        <SelectItem value="english">
                                            {t('languages.english')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* 输入区域 */}
                            <div className="tw-space-y-4">
                                <Textarea
                                    placeholder={t('inputPlaceholder')}
                                    value={sourceText}
                                    onChange={(e) => setSourceText(e.target.value)}
                                    rows={6}
                                    className="tw-text-lg"
                                />
                                <div className="tw-flex tw-justify-center">
                                    <Button
                                        onClick={handleTranslate}
                                        disabled={loading}
                                        className="tw-w-full sm:tw-w-auto tw-px-8"
                                    >
                                        {loading ? '...' : t('translate')}
                                    </Button>
                                </div>
                            </div>

                            {/* 结果区域 */}
                            {(translatedText || error) && (
                                <div className="tw-space-y-2">
                                    <h2 className="tw-text-lg tw-font-semibold">
                                        {t('translateResult')}
                                    </h2>
                                    {error ? (
                                        <p className="tw-text-red-500">{error}</p>
                                    ) : (
                                        <Textarea
                                            value={translatedText}
                                            readOnly
                                            rows={6}
                                            className="tw-text-lg"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
