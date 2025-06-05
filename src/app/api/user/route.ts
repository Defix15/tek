import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { put } from '@vercel/blob';

export async function GET() {
  const session = await getUserSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not authenticated." },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        username: true,
        email: true,
        role: true,
        avatar: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getUserSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not authenticated." },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const filename = formData.get("file") as File;

  if (!filename) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  try {
    const blob = await put(`${filename.name}${crypto.randomUUID()}`, filename.stream(), {
      access: "public",
    });

    if (!blob) {
      return NextResponse.json({ error: "Blob not found." }, { status: 404 });
    }

    const avatar = blob.url;

    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        avatar: avatar,
      },
    });

    return NextResponse.json({ message: "User updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
