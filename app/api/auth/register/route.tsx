import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import prisma from "@/app/lib/prisma";
import { encryptData } from "@/app/service/data";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const payload = await request.json();
  const emailExists: number = await prisma.user.count({
    where: { email: payload.email },
  });

  if (emailExists) {
    return new NextResponse(null, {
      status: HttpStatusCodes.CONFLICT,
      statusText: "Email already registered",
    });
  }

  payload.password = await encryptData(payload.password);
  await prisma.user.create({
    data: payload,
  });

  return new NextResponse(null, {
    status: HttpStatusCodes.CREATED,
    statusText: "Email successfully registered",
  });
};
