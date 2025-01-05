'use client'
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Login() {

  const route = useRouter();

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const resp = await signIn('credentials', { 
                email: formData.email, 
                password: formData.password, 
                redirect: false 
            });

            if(!resp?.ok) {
                toast.error("User authentication failed.");
                return;
            }

            toast.success("User authenticated successfully.");
            route.replace('/');

        } catch (error) {
            console.error("Error registering user:", error);
        }
    }

  return (
    <Container className="mt-[20px]">
        <h1 className="text-2xl font-bold text-center">Вход</h1>
        <form className="flex flex-col gap-[10px] mt-5 max-w-[600px] mx-auto" onSubmit={handleLogin}>
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
                placeholder="Пароль"
                type="password"
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
            />
            <Button className="py-[22px]">Войти</Button>
        </form>
    </Container>
  );
}
