'use client'
import { SessionProvider } from "next-auth/react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SessionProvider
                refetchInterval={0} 
                refetchOnWindowFocus={false} 
            >
                {children}
            </SessionProvider>
        </>
    );
};