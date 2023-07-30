import jwt from "jsonwebtoken";
/* Using the email, to verify is the refreshToken is set which indicates
 * the user is logged in. If refreshToken is set, then a new accessToken
 * is placed into the cookie.
 */

import Cookies from "universal-cookie";
import { NextRequest } from "next/server";

export const generateToken = async (item: any, expiration: string) => {
  return jwt.sign(item, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: expiration });
};

export const getAccessToken = (req: NextRequest) => {
  const cookies = new Cookies(req.cookies);
  return cookies.cookies.get("accessToken")?.value;
};

export const verifyToken = async (token: any) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};
