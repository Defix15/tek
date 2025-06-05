import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RxAvatar } from "react-icons/rx";
import { UserProps } from "./header";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  className?: string;
  user: UserProps;
}

export const ModalUser: React.FC<Props> = ({ className, user }) => {
  const [avatar, setAvatar] = useState<string>(user?.avatar);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setAvatar(URL.createObjectURL(selectedFile));
      try {

        const data = new FormData();
        data.append("file", selectedFile);

        const resp = await axios.patch("/api/user", data);

        if(resp.status === 200) {
          toast.success('Аватар обновлен');
        }

      } catch (error) {
        toast.error("Произошла ошибка");
        console.warn(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2">
        {avatar ? (
          <img
            className="w-[36px] h-[36px] rounded-full object-cover"
            src={avatar}
            alt="avatar"
          />
        ) : (
          <span className="flex items-center justify-center min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] bg-[#ffffff] rounded-full">
            <RxAvatar size={30} />
          </span>
        )}

        <p className="font-semibold text-base first-letter:uppercase">
          {user?.username}
        </p>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogTitle className="text-center">Профиль</DialogTitle>

        <label
          htmlFor="file"
          className="cursor-pointer w-fit flex items-center justify-center mx-auto"
        >
          {avatar ? (
            <img
              className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] rounded-full object-cover"
              src={avatar}
              alt="avatar"
            />
          ) : (
            <span className="flex items-center justify-center min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] bg-[#e7e7e7] rounded-full">
              <RxAvatar size={70} />
            </span>
          )}
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <p className="text-center text-xl text-[#000000] font-semibold">
          {user?.username}
        </p>
        <p className="text-center text-base text-[#000000] font-medium">
          {user?.email}
        </p>
      </DialogContent>
    </Dialog>
  );
};
