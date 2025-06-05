"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Container } from "./container";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { ModalAdmin } from "./modalAdmin";
import { ModalUser } from "./modalUser";
import { useUserFetch } from "../api/user";

interface Props {
  className?: string;
}

export interface UserProps {
  id: string;
  email: string;
  username: string;
  avatar: string;
  role: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const route = useRouter();
  const { data: session, status } = useSession();

  const { user } = useUserFetch();

  const handleOut = () => {
    const comfirm = confirm("Вы действительно хотите выйти?");
    if (!comfirm) return;

    signOut({ callbackUrl: "/" });
  };

  return (
    <div className={cn("bg-[#e3e3e3] p-5 rounded-[12px] m-2", className)}>
      <Container>
        <div className="flex items-center justify-between">
          <Link
            href="/main"
            className="flex items-center gap-2"
          >
            <span className="font-semibold text-2xl">SCloud</span>
          </Link>

          {status === "loading" ? (
            <Skeleton className="w-[150px] h-[36px] bg-[#c6c6c6]" />
          ) : !session ? (
            <div className="flex items-center gap-2">
              <Button onClick={() => route.push("/login")}>Войти</Button>
              <Button onClick={() => route.push("/register")}>
                Регистрация
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              {user && <ModalUser user={user} />}
              {user?.role === "admin" && <ModalAdmin />}
              <Button
                onClick={handleOut}
                className="bg-red-600 hover:bg-red-500"
              >
                Выйти
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
