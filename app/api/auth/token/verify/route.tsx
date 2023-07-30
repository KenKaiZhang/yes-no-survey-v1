import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { verifyToken } from "@/app/service/tokens";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: "Access token not found in request header",
    });
  }

  const accessToken = authHeader.split(" ")[1];
  console.log("ACCESS TOKEN RECEIVED: ", accessToken);
  const verified = await verifyToken(accessToken);
  if (!verified) {
    console.log("ACCESS TOKEN NOT VALID.");
    return new NextResponse(null, {
      status: HttpStatusCodes.UNAUTHORIZED,
      statusText: "Invalid JWT token",
    });
  }
  console.log("ACCESS TOKEN IS VALID.");
  return new NextResponse(null, {
    status: HttpStatusCodes.OK,
    statusText: "JWT token verified and valid",
  });
};
