import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
     const session = await getUserSession();
        
            const body = await request.json();
            const { idTask, title } = body;
        
            if(!idTask) {
                return NextResponse.json({ error: "Task not found." }, { status: 404 });
            }
        
            if (!session) {
                return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
            }
    
    try {

        const task = await prisma.task.update({
            where: {
                id: idTask
            },
            data: {
                title
            }
        });

        return NextResponse.json({ message: "Task updated successfully.", task }, { status: 200 });

    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}