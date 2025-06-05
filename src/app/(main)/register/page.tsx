'use client'
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import {  useRouter } from "next/navigation";

export default function Register() {

     const { status } = useSession();
      const route = useRouter();
    
      useEffect(() => {
        if (status === "authenticated") {
          route.replace("/main");
        }
      }, [status, route]);


    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
       e.preventDefault();

       try {

        await axios.post("/api/register", formData);

        const resp = await signIn('credentials', { 
            email: formData.email, 
            password: formData.password, 
            redirect: false 
        });

        if(!resp?.ok) {
            toast.error(resp?.error);
            return;
        } 

        toast.success("User registered successfully.");
        route.replace('/main');

       } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Error registering user");
       }
    };

  return (
    <Container className="mt-[20px]">
        <h1 className="text-2xl font-bold text-center">Регистрация</h1>
        <form className="flex flex-col gap-[10px] mt-5 max-w-[600px] mx-auto" onSubmit={handleRegister}>
            <Input 
                className="py-6 px-[10px] border-[2px] border-solid border-gray-500 rounded-[10px] bg-white text-base font-medium" 
                placeholder="Email"
                type="email"
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
            />
            <Input 
                className="py-6 px-[10px] border-[2px] border-solid border-gray-500 rounded-[10px] bg-white text-base font-medium" 
                placeholder="Имя"
                type="text"
                name="username"
                required 
                value={formData.username}
                onChange={handleChange}
            />
            <Input 
                className="py-6 px-[10px] border-[2px] border-solid border-gray-500 rounded-[10px] bg-white text-base font-medium" 
                placeholder="Пароль"
                type="password"
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
            />
            <Button type="submit" className="py-[22px]">Войти</Button>
        </form>
    </Container>
  );
}
