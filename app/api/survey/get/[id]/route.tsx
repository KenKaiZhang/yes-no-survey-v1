import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { getFeatures, getFilters, getParam } from "@/app/util/urlParams";

export const GET = async (req: NextRequest) => {
  const id = getParam(req);
  const filters: { [key: string]: true } = getFilters(req);
  const features: { [key: string]: true } = getFeatures(req);

  if (!id) {
    return new NextResponse(null, {
      status: HttpStatusCodes.INVALID_BODY,
      statusText: "Survey id not found in request",
    });
  }
  features["surveyItems"] = true;

  const survey = await prisma.survey.findUnique({
    where: { id: id },
    select: features,
  });

  if (!survey) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: `Survey with ${id} not found`,
    });
  }

  console.log("Survey: ", survey);
  return NextResponse.json(survey, { status: HttpStatusCodes.OK });
};
