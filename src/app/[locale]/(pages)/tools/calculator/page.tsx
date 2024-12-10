'use client';

import { Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Input } from '@/app/_components/shadcn/input';

export default function CalculatorPage() {
    const [display, setDisplay] = useState('0');
    const [currentValue, setCurrentValue] = useState('');
    const [operator, setOperator] = useState('');
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(`${display}.`);
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
        setCurrentValue('');
        setOperator('');
        setWaitingForOperand(false);
    };

    const inputOperator = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (currentValue === '') {
            setCurrentValue(inputValue.toString());
        } else if (operator) {
            const result = performCalculation(currentValue, inputValue, operator);
            setDisplay(result.toString());
            setCurrentValue(result.toString());
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const performCalculation = (a: string, b: number, op: string) => {
        const x = parseFloat(a);
        switch (op) {
            case '+':
                return x + b;
            case '-':
                return x - b;
            case '*':
                return x * b;
            case '/':
                return x / b;
            default:
                return b;
        }
    };

    const calculateResult = () => {
        if (!operator || waitingForOperand) {
            return;
        }

        const inputValue = parseFloat(display);
        const result = performCalculation(currentValue, inputValue, operator);
        setDisplay(result.toString());
        setCurrentValue('');
        setOperator('');
        setWaitingForOperand(true);
    };

    // Add keyboard event handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Prevent default behavior for calculator keys
            if (event.key.match(/[0-9]|[\+\-\*\/\.\=]|Enter|Backspace|Escape/)) {
                event.preventDefault();
            }

            // Handle number keys and numpad
            if (event.key.match(/[0-9]/)) {
                inputDigit(event.key);
            }
            // Handle operators
            else if (event.key.match(/[\+\-\*\/]/)) {
                inputOperator(event.key);
            }
            // Handle decimal point
            else if (event.key === '.') {
                inputDecimal();
            }
            // Handle equals and enter
            else if (event.key === '=' || event.key === 'Enter') {
                calculateResult();
            }
            // Handle escape for clear
            else if (event.key === 'Escape') {
                clearDisplay();
            }
            // Handle backspace
            else if (event.key === 'Backspace') {
                if (display !== '0' && !waitingForOperand) {
                    setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [display, waitingForOperand]); // Add other dependencies if needed

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    计算器
                </h1>
                <Card className="tw-max-w-md tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Calculator className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>简单计算器</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            className="tw-text-right tw-text-2xl tw-mb-4"
                            value={display}
                            readOnly
                        />
                        <div className="tw-grid tw-grid-cols-4 tw-gap-2">
                            {[
                                '7',
                                '8',
                                '9',
                                '/',
                                '4',
                                '5',
                                '6',
                                '*',
                                '1',
                                '2',
                                '3',
                                '-',
                                '0',
                                '.',
                                '=',
                                '+',
                            ].map((key) => (
                                <Button
                                    key={key}
                                    onClick={() => {
                                        switch (key) {
                                            case '=':
                                                calculateResult();
                                                break;
                                            case '+':
                                            case '-':
                                            case '*':
                                            case '/':
                                                inputOperator(key);
                                                break;
                                            case '.':
                                                inputDecimal();
                                                break;
                                            default:
                                                inputDigit(key);
                                        }
                                    }}
                                    variant={
                                        key === '='
                                            ? 'default'
                                            : ['/', '*', '-', '+'].includes(key)
                                              ? 'secondary'
                                              : 'outline'
                                    }
                                    className={
                                        key === '='
                                            ? 'tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600 tw-font-bold tw-text-xl'
                                            : ''
                                    }
                                >
                                    {key}
                                </Button>
                            ))}
                        </div>
                        <Button
                            onClick={clearDisplay}
                            className="tw-w-full tw-mt-2"
                            variant="destructive"
                        >
                            清除
                        </Button>
                    </CardContent>
                </Card>
                {/* API使用说明 Card 移除，改为注释形式记录 */}
                {/* 
                API 使用说明:
                - 端点: GET /api/calculator
                - 参数: expression=(5+3)*2
                - 格式: URL编码的数学表达式
                - 支持: 加减乘除和括号运算
                - 特殊字符需URL编码 (例如: + 编码为 %2B)
                - 返回: JSON对象 { "result": "计算结果" }
                */}
            </div>
        </div>
    );
}
