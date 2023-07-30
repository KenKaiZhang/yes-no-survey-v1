import { NextRequest } from "next/server";
import { getParams } from "../service/params";
import url from "url";

export const getFilters = (req: NextRequest) => {
  const filters: { [key: string]: true } = {};
  getParams(req, "flr").map((flr) => {
    filters[flr] = true;
  });
  return filters;
};

export const getFeatures = (req: NextRequest) => {
  const features: { [key: string]: true } = {};
  getParams(req, "ftr").map((ftr) => {
    features[ftr] = true;
  });
  return features;
};

export const getParam = (req: NextRequest) => {
  const parsedUrl = url.parse(req.url, true);
  const param = parsedUrl.pathname.split("/").pop();
  return decodeURIComponent(param);
};

export const addFilters = (url: URL, filters: string[]) => {
  filters.forEach((filter: string) => {
    url.searchParams.append("flr", filter);
  });
};

export const addFeatures = (url: URL, features: string[]) => {
  features.forEach((feature: string) => {
    url.searchParams.append("ftr", feature);
  });
};
