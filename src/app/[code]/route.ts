import { NextResponse } from "next/server";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      notFound();
    }

    // increment click count + update lastClicked
    await prisma.link.update({
      where: { code },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date(),
      },
    });

    // Use redirect() function for proper server-side redirect
    redirect(link.targetUrl);
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error; // Re-throw redirect errors
    }
    console.error("Redirect error:", error);
    notFound();
  }
}
