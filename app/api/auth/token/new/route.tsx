import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import prisma from "@/app/lib/prisma";
import { generateToken, verifyToken } from "@/app/service/tokens";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  const requestedUser = await prisma.user.findUnique({
    where: { email: email ? email : "" },
  });
  console.log("GRABBING USER FROM DATABASE.");
  if (!requestedUser) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: "Email is not registered",
    });
  }

  const refreshToken = requestedUser.refreshToken;
  console.log("GRABBED USER's REFRESH TOKEN.");
  if (refreshToken && (await verifyToken(refreshToken))) {
    console.log("REFRESH TOKEN IS VALID.");
    const payload = { userId: requestedUser.id };
    const accessToken = await generateToken(payload, "1h");
    const cookiesOptions = {
      httpOnly: true,
      SameSite: "none",
      secure: process.env.NODE_ENV === "production",
      Path: "/",
    };
    const response = new NextResponse(null, {
      status: HttpStatusCodes.CREATED,
      statusText: "New access token given",
    });
    response.cookies.set("accessToken", accessToken, cookiesOptions);
    console.log("NEW ACCESS TOKEN MADE AND ADDED TO CLIENT COOKIE.");
    return response;
  }
  return new NextResponse(null, {
    status: HttpStatusCodes.CONFLICT,
    statusText: "User is not logged in",
  });
};
