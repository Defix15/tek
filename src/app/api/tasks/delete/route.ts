import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
        const session = await getUserSession();
    
        const body = await request.json();
        const { idTask } = body;
    
        if(!idTask) {
            return NextResponse.json({ error: "Task not found." }, { status: 404 });
        }
    
        if (!session) {
            return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
        }

    try {

        const task = await prisma.task.delete({
            where: {
                id: idTask
            }
        });

        return NextResponse.json({ message: "Task deleted successfully.", task }, { status: 200 });

    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}