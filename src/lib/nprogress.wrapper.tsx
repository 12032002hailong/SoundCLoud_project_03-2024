'use client';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgressWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ThemeRegistry>
            {children}
            <ProgressBar
                height="4px"
                color="#fffd00"
                options={{ showSpinner: true }}
                shallowRouting
            />
        </ThemeRegistry>
    );
};

export default NProgressWrapper;