import { NextRequest } from "next/server";
import Cookies from "universal-cookie";

export const getCookies = (req: NextRequest, item: string) => {
  const cookies = new Cookies(req.cookies);
  return cookies.cookies.get(item)?.value;
};
