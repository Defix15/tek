'use client'
import React, { useEffect, useState } from 'react';
import { AddTask } from './addTask';
import { Tasks } from './tasks';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Props {
    className?: string;
} 

export interface TaskAdds {
    id: string;
    title: string;
    status: string;
    authorId: string;
    assigneeId: string;
    author: {
        id: string;
        username: string;
    };
    assignee: {
        id: string;
        username: string;
    }
}

export const Home: React.FC<Props> = ({ className }) => {

    const {data: session}  = useSession();

    const [text, setText] = useState('');

    const [tasks, setTasks] = useState<TaskAdds[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/tasks/tasksFeatch');
                setTasks(response.data.tasks);
            } catch (error) {
                toast.error('Error fetching tasks');
                console.error('Fetch tasks error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const updateStatusTasks = (taskId: string, newStatus: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? 
                { ...task, 
                    status: newStatus, 
                    assigneeId: session?.user.id || '',
                    assignee: {
                        id: session?.user.id || '',
                        username: session?.user.username || ''
                    }
                } 
                : task
            )
        );
    }

    const updateTitleTasks = (taskId: string, newTitle: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
            )
        );
    }

    const deleteTasks = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    const handleAddTasks = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if(text.trim() === '') return;
            if(!session?.user.id) return;

            const optymisticTask: TaskAdds = {
                id: Math.random().toString(),
                title: text,
                status: 'ACTIVE',
                authorId: session?.user.id,
                author: { id: session?.user.id, username: session?.user.username },
                assignee: { id: '', username: '' },
                assigneeId: '',
            };

            setTasks([optymisticTask, ...tasks]);
            setText('');

            const res = await axios.post('/api/tasks/addTasks', { userId: session?.user.id, title: text });

            if(res.status === 200) {
                const taskMain = {
                    ...res.data.task,
                    author: { id: session?.user.id, username: session?.user.username },
                }
                setTasks([taskMain, ...tasks]);
                toast.success('Задача добавлена');
            }  
        } catch(error) {
            toast.error('Error adding task');
            console.log('Error adding task', error);
        }

    };

    return (
      <div className={className}>
         <AddTask value={text} setValue={setText} addTaks={handleAddTasks} />
         <Tasks 
            tasks={tasks} 
            loading={loading} 
            updateStatusTasks={updateStatusTasks}  
            updateTitleTasks={updateTitleTasks}
            deleteTasks={deleteTasks}
        />
      </div>
    );
};
