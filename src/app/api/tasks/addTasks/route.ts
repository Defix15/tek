import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, title } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        if (!title) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                authorId: userId
            },
        });

        return NextResponse.json({ message: "Task created successfully.", task });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}