import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { getCookies } from "@/app/service/cookies";
import { SurveyItem } from "@/app/lib/survey.d";
import formidable from "formidable";
import { IncomingMessage } from "http";

export const POST = async (req: NextRequest) => {
  const email: string = getCookies(req, "email");
  const surveyData = await req.json();
  console.log(surveyData);
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: "Email not found in database",
    });
  }

  const newSurvey = await prisma.survey.create({
    data: {
      owner: { connect: { id: user.id } },
      question: surveyData.question,
      public: true,
    },
  });

  const surveyItems: SurveyItem[] = await Promise.all(
    surveyData.items.map(async (item: any) => {
      return await prisma.surveyItem.create({
        data: {
          survey: { connect: { id: newSurvey.id } },
          name: item.name,
          image: item.image ? item.image : "",
          details: item.details ? item.details : "",
        },
      });
    })
  );

  await prisma.survey.update({
    where: { id: newSurvey.id },
    data: {
      surveyItems: {
        set: surveyItems.map((item) => ({
          id: item.id,
        })),
      },
    },
  });

  return new NextResponse(null, {
    status: HttpStatusCodes.OK,
    statusText: "New survey added",
  });
};
