/*
 * The middleware checks if the user is logged in via the accessToken stored in cookies.
 * If the accessToken does not exists, then there are two possibilities:
 *  1. User was not logged in
 *  2. accessToken has expired
 * The verification steps are as followed:
 *  1. Get the access code and verify it
 *  2. If access code is not valid go request a new one
 *  3. If new one is not requestable, then go to login
 *  4. If current token is verified or a new token was created, continue
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAccessToken } from "./app/service/tokens";
import { getCookies } from "./app/service/cookies";
import { HttpStatusCodes } from "./app/lib/httpStatusCodes";

const protectedPages = ["/create", "/dashboard"];

export const middleware = async (req: NextRequest) => {
  if (protectedPages.includes(req.nextUrl.pathname)) {
    console.log("TRYING TO ACCESS PROTECTED PAGE.");
    const accessToken = getAccessToken(req);
    const verify = await fetch("http://localhost:3000/api/auth/token/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("ACCESSS TOKEN VERIFICATION: ", verify.status);
    if (verify.status !== HttpStatusCodes.OK) {
      console.log("BAD ACCESS TOKEN, ATTEMPTING TO GET A NEW ONE.");
      const requestNewAccess = await fetch("http://localhost:3000/api/auth/token/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: getCookies(req, "email") }),
      });
      if (requestNewAccess.status !== HttpStatusCodes.CREATED) {
        console.log("REFRESH TOKEN DOES NOT EXIST/INVALID. REDIRECT TO LOGIN.");
        return NextResponse.redirect(new URL("/auth/login?from=" + req.nextUrl.pathname, req.url));
      }
    }
  }
  console.log("ACCESS TOKEN IS VALID.");
  return NextResponse.next();
};
