'use client';

import { Calculator } from 'lucide-react';
import { useState } from 'react';

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

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    Calculator
                </h1>
                <Card className="tw-max-w-md tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <Calculator className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>Simple Calculator</span>
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
                            Clear
                        </Button>
                    </CardContent>
                </Card>
                <Card className="tw-max-w-md tw-mx-auto tw-mt-8">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <span>API Usage</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="tw-mb-4">
                            You can also use this calculator programmatically via our API:
                        </p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            GET https://instanttools.com/api/calculator?expression=(5%2B3)*2
                        </pre>
                        <p className="tw-mt-4">
                            This will return a JSON object with the result. The expression parameter
                            can include complex calculations with parentheses and multiple
                            operators. Use URL encoding for special characters (e.g., '+' becomes
                            '%2B').
                        </p>
                        <p className="tw-mt-4">Example response:</p>
                        <pre className="tw-bg-gray-100 tw-p-4 tw-rounded-md tw-overflow-x-auto">
                            {`{
    "result": "16"
}`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
