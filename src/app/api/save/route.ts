import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("API request to save, data", body);

    const result = await prisma.story_Frames.create({
      data: body.frame,
    });

    console.log("Prisma result", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500, statusText: "An error occurred saving frame" }
    );
  }
}
