import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RiAdminLine } from "react-icons/ri";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  className?: string;
}

export const ModalAdmin: React.FC<Props> = ({ className }) => {
  const [input, setInput] = useState("");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleAdmin = async (status: string) => {
    if (input.trim() === "") return;

     if (!validateEmail(input)) {
      toast.error('Введите корректный email');
      return;
    }
    const confirms = confirm(
      `Вы действительно хотите ${status === "admin" ? "добавить" : "забрать"} админа?`
    );
    if (!confirms) return;

    try {
      const resp = await axios.put("/api/admin", { email: input, status });

      if (resp.status === 200) {
        toast.success(resp.data.message);
        setInput("");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.warn(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-[7px] bg-[#92b2b5] hover:bg-[#92b2b5]/70 [&_svg]:size-[20px] p-2">
        <RiAdminLine />
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogTitle className="text-center">Добавить админа</DialogTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Email Пользователя"
            className="py-6 px-[10px] border-[2px] border-solid border-gray-500 rounded-[10px] bg-white text-base font-medium"
            type="email"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center gap-5">
            <Button
              className="w-full mt-5"
              onClick={() => handleAdmin("admin")}
            >
              Добавить
            </Button>
            <Button
              className="w-full mt-5 bg-red-600 hover:bg-red-500"
              onClick={() => handleAdmin("user")}
            >
              Забрать админа
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
