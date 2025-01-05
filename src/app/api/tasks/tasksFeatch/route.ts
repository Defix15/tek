import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {

    const session = await getUserSession();

    if (!session) {
        return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    try {
       
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { username: true} }, 
                assignee: { select: { username: true } }
            }
        });

        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}