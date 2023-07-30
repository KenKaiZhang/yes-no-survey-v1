import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { getParam } from "@/app/util/urlParams";

export const GET = async (req: NextRequest) => {
  const indicator = getParam(req);
  console.log(indicator);
  if (!indicator) {
    return new NextResponse(null, {
      status: HttpStatusCodes.INVALID_BODY,
      statusText: "Survey indicator not found in request",
    });
  }

  const surveys = await prisma.survey.findMany({
    where: {
      OR: [{ id: indicator }, { question: indicator }],
    },
    select: {
      id: true,
      question: true,
    },
  });
  if (!surveys || surveys.length === 0) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: `Surveys with ${indicator} not found`,
    });
  }
  return NextResponse.json(surveys, { status: HttpStatusCodes.OK });
};
