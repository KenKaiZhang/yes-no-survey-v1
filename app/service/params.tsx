import { NextRequest } from "next/dist/server/web/spec-extension/request";

export const getParams = (req: NextRequest, param: string) => {
  const urlParams: string[] = req.url.split("?");
  if (urlParams.length > 1) {
    const searchParams: URLSearchParams = new URLSearchParams(urlParams[1]);
    return searchParams.getAll(param);
  }
  return [];
};
