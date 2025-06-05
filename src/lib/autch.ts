import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcryptjs";
import  { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      role: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    role: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const values = {
          email: credentials?.email,
        }

        const fintUser = await prisma.user.findUnique({
          where: values,
        })

        if(!fintUser) {
          return null;
        }

        const isPasswordValid = await compare(credentials?.password, fintUser?.password);

        if(!isPasswordValid) {
          return null;
        }

        return {
          id: String(fintUser.id),
          username: fintUser.username,
          email: fintUser.email,
          role: fintUser.role
        }

      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {

      if (!token.email) {
        return token;
      }

      const user = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};