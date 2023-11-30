import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const diarySchema = z.object({
  id: z.string(),
  userid: z.string(),
  title: z.string(),
  diary: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.list) {
    //gets list:boolean , userid: string
    console.log(body);
    const res = await prisma.diaries.findMany({
      where: {
        userid: body.userid.toString(),
      },
      select: {
        id: true,
        title: true,
      },
    });
    console.log(res);

    return NextResponse.json(res, { status: 201 });
  } else {
    const { id, userid, title, diary } = body;

    const validation = diarySchema.safeParse(body);
    console.log("Validation", validation);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const duplicateDiary = await prisma.diaries.findUnique({
      where: {
        id: id,
      },
    });
    console.log(duplicateDiary);
    if (duplicateDiary) {
      const result = await prisma.diaries.update({
        where: {
          id: body.id,
        },
        data: {
          diary: diary,
          title: title,
        },
      });

      return NextResponse.json(result, { status: 201 });
    }

    console.log("req body", body);
    const result = await prisma.diaries.create({
      data: {
        id: body.id,
        userid: userid,
        diary: diary,
        title: title,
      },
    });

    return NextResponse.json(result, { status: 201 });
  }
}

//PUR REQUEST TO UPDATE THE DB VALUES , IF NEEDED UNCOMMMENT
// export async function PUT(request: NextRequest) {
//   const body = await request.json();
//   const { id, userid, title, diary } = body;

//   const validation = diarySchema.safeParse(body);
//   console.log("Validation", validation);

//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, { status: 400 });

//   console.log("req body", body);
//   const result = await prisma.diaries.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       diary: diary,
//       title: title,
//     },
//   });

//   return NextResponse.json(result, { status: 201 });
// }

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return;
  console.log(id);

  const result = await prisma.diaries.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(result, { status: 201 });
}
