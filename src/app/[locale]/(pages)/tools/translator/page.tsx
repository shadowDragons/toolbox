'use client';

import { ArrowRightLeft, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/shadcn/select';
import { Textarea } from '@/app/_components/shadcn/textarea';

export default function TranslatorPage() {
    const t = useTranslations();
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [fromLang, setFromLang] = useState('zh');
    const [toLang, setToLang] = useState('en');

    const handleTranslate = async () => {
        if (inputText.trim() === '') {
            setOutputText(t('Tools.translator.emptyInput'));
            return;
        }

        const response = await fetch('/api/translator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                from: fromLang,
                to: toLang,
            }),
        });

        if (!response.ok) {
            setOutputText(t('Tools.translator.translateFailed'));
            return;
        }

        const data = await response.json();
        setOutputText(data.translatedText);
    };

    const switchLanguages = () => {
        setFromLang(toLang);
        setToLang(fromLang);
        setInputText(outputText);
        setOutputText(inputText);
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('Tools.translator.title')}
                </h1>
                <Card className="tw-max-w-3xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Languages className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>{t('Tools.translator.name')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-items-center tw-justify-between tw-space-x-4">
                                <Select value={fromLang} onValueChange={setFromLang}>
                                    <SelectTrigger className="tw-w-[180px]">
                                        <SelectValue
                                            placeholder={t('Tools.translator.selectSource')}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zh">
                                            {t('Tools.translator.languages.chinese')}
                                        </SelectItem>
                                        <SelectItem value="en">
                                            {t('Tools.translator.languages.english')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" onClick={switchLanguages}>
                                    <ArrowRightLeft className="tw-h-4 tw-w-4" />
                                </Button>
                                <Select value={toLang} onValueChange={setToLang}>
                                    <SelectTrigger className="tw-w-[180px]">
                                        <SelectValue
                                            placeholder={t('Tools.translator.selectTarget')}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zh">
                                            {t('Tools.translator.languages.chinese')}
                                        </SelectItem>
                                        <SelectItem value="en">
                                            {t('Tools.translator.languages.english')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Textarea
                                placeholder={t('Tools.translator.inputPlaceholder')}
                                value={inputText}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setInputText(e.target.value)
                                }
                                rows={5}
                            />
                            <Button onClick={handleTranslate} className="tw-w-full">
                                {t('Tools.translator.translate')}
                            </Button>
                            <Textarea
                                placeholder={t('Tools.translator.translateResult')}
                                value={outputText}
                                readOnly
                                rows={5}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
