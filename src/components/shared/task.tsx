import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { TaskAdds } from "./home";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { IoIosArrowForward } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

interface Props {
  className?: string;
  task: TaskAdds;
  updateStatusTasks: (taskId: string, newStatus: string) => void;
  deleteTasks: (taskId: string) => void;
  updateTitleTasks: (taskId: string, newTitle: string) => void;
}

export const Task: React.FC<Props> = ({
  className,
  task,
  updateStatusTasks,
  deleteTasks,
  updateTitleTasks,
}) => {
  const { data: session } = useSession();

  const [openEdit, setOpenEdit] = useState(false);
  const [editValue, setEditValue] = useState(task?.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [assignee, setAssignee] = useState(task?.assignee);

  useEffect(() => {
    if (task?.assignee) {
      setAssignee(task?.assignee);
    }
  }, [task?.assignee]);

  useEffect(() => {
    if (openEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openEdit]);

  const handleNewStatusTask = async (taks: TaskAdds, status: string) => {
    try {
      updateStatusTasks(taks.id, status);
      await axios.put("/api/tasks/status", {
        userId: session?.user.id,
        newStatus: status,
        idTask: taks,
      });
    } catch (error) {
      toast.error("Не удалось взять задачу");
      console.error("Error adding task", error);
    }
  };

  const handleEditTasks = async (id: string, title: string) => {
    if (session?.user.id !== task?.authorId && session?.user.role !== "admin") return;

    if (title.trim() === "" || title === task?.title) return;

    try {
      updateTitleTasks(id, title);

      const res = await axios.put("/api/tasks/editTasks", {
        idTask: id,
        title: title,
      });

      if (res.status === 200) {
        toast.success("Задача обновлена");
        setOpenEdit(false);
      }
    } catch (error) {
      toast.error("Не удалось обновить задачу");
      console.error("Error updating task", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (session?.user.id !== task?.authorId && session?.user.role !== "admin") return;

    const now = confirm("Вы действительно хотите удалить задачу?");

    if (!now) return;

    try {
      deleteTasks(id);
      const res = await axios.delete("/api/tasks/delete", {
        data: { idTask: id },
      });

      if (res.status === 200) {
        toast.success("Задача удалена");
      }
    } catch (error) {
      toast.error("Не удалось удалить задачу");
      console.error("Error deleting task", error);
    }
  };

  return (
    <div
      className={cn(
        "relative p-5 bg-white border-[2px] border-gray-200 rounded-[10px] shadow-lg",
        className
      )}
    >
      <h2 className="text-base font-bold flex items-center gap-1">
        {task?.author?.avatar ? (
          <img
            className="w-[36px] h-[36px] rounded-full object-cover"
            src={task?.author?.avatar}
            alt="avatar"
          />
        ) : (
          <span className="flex items-center justify-center min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] bg-[#ffffff] rounded-full">
            <RxAvatar size={30} />
          </span>
        )}
        <div className="text-base font-bold flex items-center break-all">
          <div className="flex items-center justify-center gap-1">
            {task?.author?.username}
            {task?.author?.role === "admin" && (
              <span
                title="Задача создана администратором"
                className="cursor-pointer text-black bg-[#ffd448] rounded-[5px] px-2"
              >
                {task?.author?.role}
              </span>
            )}
          </div>
          {assignee && assignee?.username && (
            <>
              <IoIosArrowForward />
              <span className="text-gray-500 flex items-center justify-center gap-1">
                {assignee?.avatar ? (
                  <img
                    className="w-[36px] h-[36px] rounded-full object-cover"
                    src={assignee?.avatar}
                    alt="avatar"
                  />
                ) : (
                  <span className="flex items-center justify-center min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] bg-[#ffffff] rounded-full">
                    <RxAvatar size={30} />
                  </span>
                )
              }
                {assignee?.username}
                {assignee?.role === "admin" && (
                  <span
                    title="Задача взята администратором"
                    className="cursor-pointer text-black bg-[#ffd448] rounded-[5px] px-2"
                  >
                    {assignee?.role}
                  </span>
                )}
              </span>
            </>
          )}
        </div>
      </h2>

      <div className="mt-[5px] flex items-center justify-between gap-3 break-all">
        <div className="text-lg leading-2">
          {!openEdit && task?.title}
          {openEdit && (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleEditTasks(task?.id, editValue)}
            />
          )}
        </div>
        {task?.status === "ACTIVE" && (
          <Button onClick={() => handleNewStatusTask(task, "IN_PROGRESS")}>
            Взять
          </Button>
        )}

        {task?.status === "IN_PROGRESS" &&
          session?.user.id === task?.assigneeId && (
            <div className="flex flex-col gap-2">
              <Button onClick={() => handleNewStatusTask(task, "COMPLETED")}>
                Завершить
              </Button>
              <Button onClick={() => handleNewStatusTask(task, "ACTIVE")}>
                Отменить
              </Button>
            </div>
          )}

        {task?.status === "COMPLETED" && <Button disabled>Завершено</Button>}
      </div>

      {(session?.user.id === task?.authorId || session?.user.role === "admin") && (
        <div className="absolute top-1 right-5 flex items-center gap-3">
          <Button
            variant="link"
            className="p-0 block w-fit bg-0 border-0 hover:bg-0"
            onClick={() => setOpenEdit((prev) => !prev)}
          >
            <FaPen />
          </Button>
          <Button
            variant="link"
            className="p-0 block w-fit bg-0 border-0 hover:bg-0"
            onClick={() => handleDeleteTask(task?.id)}
          >
            <MdDelete />
          </Button>
        </div>
      )}
    </div>
  );
};
