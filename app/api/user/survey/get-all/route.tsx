import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { getCookies } from "@/app/service/cookies";
import { PrismaSurvey } from "@/app/lib/prisma.d";
import { getParams } from "@/app/service/params";

export const GET = async (req: NextRequest) => {
  const filters: { [key: string]: boolean } = {};
  const features: { [key: string]: boolean } = {};
  getParams(req, "flr").map((flr) => {
    filters[flr] = true;
  });
  getParams(req, "ftr").map((ftr) => {
    features[ftr] = true;
  });

  const email: string = getCookies(req, "email");

  const user: any = await prisma.user.findUnique({
    where: { email: email },
    include: { surveys: { select: features } },
  });

  if (!user) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: "User with email not found",
    });
  }

  if (!user.surveys || user.surveys.length === 0) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NO_CONTENT,
      statusText: "This user has no surveys",
    });
  }

  const surveys: PrismaSurvey[] = user.surveys;
  return NextResponse.json(surveys, { status: HttpStatusCodes.OK });
};
