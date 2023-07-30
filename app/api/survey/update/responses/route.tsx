import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { PrismaSurvey } from "@/app/lib/prisma.d";

export const POST = async (req: NextRequest) => {
  const { surveyId, itemData } = await req.json();

  const updatedSurvey: PrismaSurvey = await prisma.survey.update({
    where: { id: surveyId },
    data: {
      surveyItems: {
        updateMany: itemData.map((item) => {
          return {
            where: { id: item.id },
            data: {
              [item.answer]: { increment: 1 },
              [item.gender]: { increment: 1 },
            },
          };
        }),
      },
    },
  });

  if (!updatedSurvey) {
    return new NextResponse(null, {
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      statusText: "Issue updating item. Check given survey ID and payload.",
    });
  }
  return new NextResponse(null, { status: HttpStatusCodes.OK });
};
