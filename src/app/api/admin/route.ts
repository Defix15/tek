import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "User not authenticated." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { email, status } = body;

  if (!email || !status) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const checkEmail = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
      select: {
        role: true,
      }
    });

    if (!checkEmail) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (checkEmail.role === status) {
      return NextResponse.json(
        { message: `Пользователь уже имеет роль ${status}.` },
        { status: 200 }
      );
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: status === "user" ? "user" : "admin",
      },
    });

    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
