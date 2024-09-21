import { NextResponse } from 'next/server';

function evaluateExpression(expression: string): number {
    // Remove all spaces from the expression
    expression = expression.replace(/\s/g, '');

    // Function to perform a single calculation
    function calculate(a: number, b: number, op: string): number {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                throw new Error('Invalid operator');
        }
    }

    // Function to evaluate expressions within parentheses
    function evaluateParentheses(originalExpr: string): number {
        let expr = originalExpr;
        while (expr.includes('(')) {
            expr = expr.replace(/\(([^()]+)\)/g, (_, subExpr) =>
                evaluateParentheses(subExpr).toString(),
            );
        }
        return evaluateWithoutParentheses(expr);
    }

    // Function to evaluate expressions without parentheses
    function evaluateWithoutParentheses(expr: string): number {
        const operators = ['*', '/', '+', '-'];
        for (const op of operators) {
            const regex = new RegExp(`(-?\\d+\\.?\\d*)(\\${op})(-?\\d+\\.?\\d*)`);
            while (expr.includes(op)) {
                expr = expr.replace(regex, (_, a, operator, b) =>
                    calculate(parseFloat(a), parseFloat(b), operator).toString(),
                );
            }
        }
        return parseFloat(expr);
    }

    return evaluateParentheses(expression);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const expression = searchParams.get('expression');

    if (!expression) {
        return NextResponse.json({ error: 'Missing expression parameter' }, { status: 400 });
    }

    try {
        const result = evaluateExpression(expression);
        return NextResponse.json({ result: result.toString() });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid expression' }, { status: 400 });
    }
}
