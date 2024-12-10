import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/app/_components/shadcn/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/app/_components/shadcn/dropdown-menu';
import { RadioGroup, RadioGroupItem } from '@/app/_components/shadcn/radio-group';
import { Link } from '@/i18n/routing';

export function LanguageSwitcher() {
    const locale = useLocale();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="tw-w-[180px]">
                <div className="tw-px-3 tw-py-2">
                    <RadioGroup defaultValue={locale} className="tw-gap-2">
                        <div className="tw-flex tw-items-center tw-space-x-2">
                            <RadioGroupItem value="en" id="en" />
                            <Link href="/" locale="en" className="tw-flex-1">
                                English
                            </Link>
                        </div>
                        <div className="tw-flex tw-items-center tw-space-x-2">
                            <RadioGroupItem value="zh" id="zh" />
                            <Link href="/" locale="zh" className="tw-flex-1">
                                中文
                            </Link>
                        </div>
                    </RadioGroup>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
