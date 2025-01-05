import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface Props {
    className?: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    addTaks: (e: React.FormEvent) => void
}

export const AddTask: React.FC<Props> = ({ className, setValue, value, addTaks }) => {
    return (
        <Container>
            <form className={cn('bg-[#ededed] p-5 rounded-[10px] m-2', className)} onSubmit={(e) => addTaks(e)}>

                <Input 
                    placeholder='Добавить задачу' 
                    className="py-6 px-[10px] border-[2px] border-solid border-gray-500 rounded-[10px] bg-white text-base font-medium" 
                    type='text'
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <Button type='submit' className='w-full mt-5 p-6'>Создать задачу</Button>

            </form>
        </Container>
    );
};
