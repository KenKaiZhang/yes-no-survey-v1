import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { getParams } from "@/app/service/params";
import { getFeatures, getFilters } from "@/app/util/urlParams";

export const GET = async (req: NextRequest) => {
  // Get any filters and desired features
  const filters: { [key: string]: true } = getFilters(req);
  const features: { [key: string]: true } = getFeatures(req);

  features["owner"] = true;

  const surveys: any[] = await prisma.survey.findMany({
    where: { public: true },
    select: features,
  });

  if (!surveys) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NO_CONTENT,
      statusText: "No surveys available",
    });
  }

  surveys.forEach((survey) => {
    survey.owner = survey.owner.name;
  });
  console.log(surveys);
  return NextResponse.json(surveys, { status: HttpStatusCodes.OK });
};
