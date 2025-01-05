import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';

interface Props {
    className?: string;
} 

export const Footer: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('bg-[#e3e3e3] p-5 rounded-[12px] mt-[20px] mx-2 mb-2', className)}>
            <Container>
                <div className='flex items-center justify-between'>
                    <p>ИП &quot;ООО&quot; &quot;ЧатГПТ&quot;</p>
                </div>
            </Container>
        </div>
    );
};
