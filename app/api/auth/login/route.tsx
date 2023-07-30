import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/service/tokens";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  // Check credentials in database
  const requestedUser = await prisma.user.findUnique({
    where: { email: email },
  });

  // Check if email exists
  if (!requestedUser) {
    return new NextResponse(null, {
      status: HttpStatusCodes.NOT_FOUND,
      statusText: "Email is not registered",
    });
  }

  try {
    // Compare found credentials to submitted credentials
    const valid = await bcrypt.compare(password, requestedUser?.password);
    if (valid) {
      const payload = { userId: requestedUser.id };
      const refreshToken = await generateToken(payload, "1d");
      const accessToken = await generateToken(payload, "1h");

      // Setting refreshToken in database
      await prisma.user.update({
        where: {
          id: requestedUser.id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });

      // Setting accessToken in cookie
      const cookiesOptions = {
        httpOnly: true,
        SameSite: "none",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      };

      const response = new NextResponse(null, {
        status: HttpStatusCodes.OK,
        statusText: "Credentials verified and user logged in",
      });

      response.cookies.set("accessToken", accessToken, cookiesOptions);
      response.cookies.set("email", requestedUser.email, cookiesOptions);
      return response;
    } else {
      return new NextResponse(null, {
        status: HttpStatusCodes.CONFLICT,
        statusText: "Invalid credentials provided",
      });
    }
  } catch (err) {
    console.error(err);
  }
};
