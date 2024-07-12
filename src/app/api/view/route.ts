import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const result = await prisma.story_Frames.findMany();
    console.log("Prisma result", result);
    return NextResponse.json(result);
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500, statusText: "An error occurred saving frame" }
    );
  }
}
