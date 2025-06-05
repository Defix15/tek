import { cn } from '@/lib/utils';
import React from 'react';
import { Task } from './task';
import { TaskAdds } from './home';
import { Skeleton } from '../ui/skeleton';

interface Props {
    className?: string;
    name: string;
    tasks: TaskAdds[];
    loading: boolean;
    updateStatusTasks: (taskId: string, newStatus: string) => void;
    deleteTasks: (taskId: string) => void;
    updateTitleTasks: (taskId: string, newTitle: string) => void
} 

export const CardTask: React.FC<Props> = (
    { 
        className, 
        name, 
        tasks, 
        loading, 
        updateStatusTasks, 
        deleteTasks,
        updateTitleTasks
    }) => {
    
    return (
        <div className={cn('bg-[#ededed] p-3 rounded-[10px]', className)}>
                <h2 className='text-lg font-bold'>{name}</h2>

                <div className='mt-[10px] flex flex-col gap-[10px] h-[400px] lg:h-[685px] overflow-y-auto scrollbar'>
                     {!loading && tasks.length === 0 ? 
                        <p className='text-sm text-gray-500'>Нет задач</p>
                     :
                        (loading ? (
                            Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className='h-[109px]' />)
                        ) : (
                            tasks.map((task: TaskAdds) => 
                            <Task 
                                key={task.id} 
                                task={task} 
                                updateStatusTasks={updateStatusTasks}
                                deleteTasks={deleteTasks}  
                                updateTitleTasks={updateTitleTasks}
                            />
                        )
                        ))
                    }
                </div>
        </div>
    );
};