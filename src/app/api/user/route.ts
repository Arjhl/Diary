import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const userSchema = z.object({
  email: z.string(),
  id: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email;

  const validation = userSchema.safeParse(body);
  console.log("Validation", validation);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return NextResponse.json(user);
  }
  console.log("req body", body);
  const result = await prisma.user.create({
    data: {
      email: body.email,
      id: body.id,
    },
  });

  return NextResponse.json(result, { status: 201 });
}

export async function GET(request: NextRequest) {
  const result = await prisma.user.findMany();
  return NextResponse.json(result, { status: 201 });
}
