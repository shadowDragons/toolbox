'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card } from '@/app/_components/shadcn/card';

const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
];

export default function CalculatorClient() {
    const t = useTranslations('Tools.calculator');
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = (num: string) => {
        if (isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperator = (op: string) => {
        setExpression(`${display} ${op} `);
        setIsNewNumber(true);
    };

    const handleEqual = () => {
        try {
            const finalExpression = expression + display;
            // 替换显示符号为实际运算符
            const evalExpression = finalExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/,/g, '');
            // eslint-disable-next-line no-eval
            const result = eval(evalExpression);
            setDisplay(String(result));
            setExpression('');
            setIsNewNumber(true);
        } catch (error) {
            setDisplay('Error');
            setExpression('');
            setIsNewNumber(true);
        }
    };

    const handleDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(`${display}.`);
            setIsNewNumber(false);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setExpression('');
        setIsNewNumber(true);
    };

    const handleButton = (value: string) => {
        switch (value) {
            case '=':
                handleEqual();
                break;
            case '.':
                handleDecimal();
                break;
            case '÷':
            case '×':
            case '-':
            case '+':
                handleOperator(value);
                break;
            default:
                handleNumber(value);
        }
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    {t('title')}
                </h1>

                <div className="tw-max-w-md tw-mx-auto">
                    <Card className="tw-p-6">
                        <div className="tw-space-y-4">
                            {/* 显示区域 */}
                            <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                                <div className="tw-text-gray-500 tw-text-sm tw-h-6">
                                    {expression}
                                </div>
                                <div className="tw-text-3xl tw-font-bold tw-text-right">
                                    {display}
                                </div>
                            </div>

                            {/* 清除按钮 */}
                            <Button
                                className="tw-w-full tw-bg-red-500 hover:tw-bg-red-600"
                                onClick={handleClear}
                            >
                                {t('clear')}
                            </Button>

                            {/* 数字按钮 */}
                            <div className="tw-grid tw-grid-cols-4 tw-gap-2">
                                {buttons.map((row, rowIndex) =>
                                    row.map((btn, btnIndex) => (
                                        <Button
                                            key={`${rowIndex}-${btnIndex}`}
                                            onClick={() => handleButton(btn)}
                                            variant={
                                                ['÷', '×', '-', '+', '='].includes(btn)
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                            className={
                                                btn === '=' ? 'tw-bg-blue-500 tw-text-white' : ''
                                            }
                                        >
                                            {btn}
                                        </Button>
                                    )),
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
