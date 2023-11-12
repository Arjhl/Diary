import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const diarySchema = z.object({
  user_id: z.string(),
  title: z.string(),
  diary: z.string(),
});

export async function POST(request: NextRequest) {}

export async function GET(request: NextRequest) {}
