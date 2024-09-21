import { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <div className="tw-app-layout">{children}</div>
        </>
    );
}
