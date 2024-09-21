import { FC, PropsWithChildren, ReactNode } from 'react';

const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <>
        <div className="tw-app-layout">{children}</div>
    </>
);
export default AppLayout;
