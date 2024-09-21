'use client';

import { FileText } from 'lucide-react';
import { useState } from 'react';

import Diff from 'react-diff-viewer-continued';

import { Button } from '@/app/_components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/shadcn/card';
import { Textarea } from '@/app/_components/shadcn/textarea';

export default function TextDiffPage() {
    const [oldText, setOldText] = useState('');
    const [newText, setNewText] = useState('');
    const [diffResult, setDiffResult] = useState<React.ReactNode | null>(null);

    const compareDiff = () => {
        setDiffResult(
            <Diff
                oldValue={oldText}
                newValue={newText}
                splitView
                renderContent={highlightSyntax}
                useDarkTheme={false}
            />,
        );
    };

    const highlightSyntax = (str: string) => {
        return (
            <pre style={{ display: 'inline' }}>
                <code>{str}</code>
            </pre>
        );
    };

    return (
        <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
            <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-900 tw-mb-8">
                    Text Difference Comparison
                </h1>
                <Card className="tw-max-w-4xl tw-mx-auto">
                    <CardHeader>
                        <CardTitle className="tw-flex tw-items-center tw-space-x-2">
                            <FileText className="tw-h-6 tw-w-6 tw-text-blue-500" />
                            <span>Text Diff Tool</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
                            <div>
                                <label
                                    htmlFor="oldText"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                                >
                                    Original Text
                                </label>
                                <Textarea
                                    id="oldText"
                                    placeholder="Enter original text here"
                                    value={oldText}
                                    onChange={(e) => setOldText(e.target.value)}
                                    rows={10}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="newText"
                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                                >
                                    New Text
                                </label>
                                <Textarea
                                    id="newText"
                                    placeholder="Enter new text here"
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    rows={10}
                                />
                            </div>
                        </div>
                        <Button onClick={compareDiff} className="tw-w-full">
                            Compare Texts
                        </Button>
                        {diffResult && (
                            <div className="tw-mt-4 tw-border tw-rounded-md tw-overflow-x-auto">
                                {diffResult}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <footer className="tw-mt-12 tw-text-center tw-text-sm tw-text-gray-500">
                <p>&copy; 2023 InstantTools. All rights reserved.</p>
            </footer>
        </div>
    );
}
