'use client'
import { Container } from './container';
import React from 'react';
import { cn } from '@/lib/utils';
import { CardTask } from './cardTask';
import { TaskAdds } from './home';

interface Props {
    className?: string;
    tasks: TaskAdds[];
    loading: boolean;
    updateStatusTasks: (taskId: string, newStatus: string) => void;
    deleteTasks: (taskId: string) => void;
    updateTitleTasks: (taskId: string, newTitle: string) => void;

} 

export const Tasks: React.FC<Props> = (
    { 
        className, 
        tasks, 
        loading, 
        updateStatusTasks, 
        deleteTasks, 
        updateTitleTasks 
    }
    ) => {

    const activeTasks = tasks.filter((task) => task.status === 'ACTIVE');
    const inProgressTasks = tasks.filter((task) => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter((task) => task.status === 'COMPLETED');

    return (
        <div className={cn('mt-10', className)}>
            <Container>
                <div className='grid grid-cols-1 gap-3 lg:grid-cols-3'>

                    <CardTask 
                        name='Активные' 
                        tasks={activeTasks} 
                        loading={loading} 
                        updateStatusTasks={updateStatusTasks} 
                        deleteTasks={deleteTasks} 
                        updateTitleTasks={updateTitleTasks}
                    />

                    <CardTask 
                        name='В работе' 
                        tasks={inProgressTasks} 
                        loading={loading} 
                        updateStatusTasks={updateStatusTasks} 
                        deleteTasks={deleteTasks} 
                        updateTitleTasks={updateTitleTasks}
                    />

                    <CardTask 
                        name='Завершенные' 
                        tasks={completedTasks} 
                        loading={loading} 
                        updateStatusTasks={updateStatusTasks} 
                        deleteTasks={deleteTasks}
                        updateTitleTasks={updateTitleTasks}
                    />

                </div>
            </Container>
        </div>
    );
};
