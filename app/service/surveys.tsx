import { HttpStatusCodes } from "../lib/httpStatusCodes";
import { Survey } from "../lib/survey.d";
import { Survey as PrismaSurvey } from "@prisma/client";
import { addFeatures, addFilters } from "../util/urlParams";

export const createSurvey = async (survey: Survey) => {
  const apiUrl: string = "/api/user/survey/create";
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(survey),
  });
  return res.status;
};

export const getAllUserSurveys = async (features: string[] = []) => {
  var apiUrl: URL = new URL("/api/user/survey/get-all", window.location.href);
  features.forEach((feature: string) => {
    apiUrl.searchParams.append("ftr", feature);
  });

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status === HttpStatusCodes.NO_CONTENT) {
    return [];
  }
  const surveys: PrismaSurvey[] = await res.json();
  return surveys;
};

export const getSurvey = async (id: string, filters: string[] = [], features: string[] = []) => {
  var apiUrl: URL = new URL(`/api/survey/get/${id}`, window.location.href);
  addFilters(apiUrl, filters);
  addFeatures(apiUrl, features);
  console.log(apiUrl);
  const res = await fetch(`/api/survey/get/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status !== HttpStatusCodes.OK) {
    return {};
  }
  const survey: PrismaSurvey = await res.json();
  return survey;
};

export const getAllSurveys = async (filters: string[] = [], features: string[] = []) => {
  var apiUrl: URL = new URL("/api/survey/get-all", window.location.href);
  addFilters(apiUrl, filters);
  addFeatures(apiUrl, features);
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status === HttpStatusCodes.NO_CONTENT) {
    return [];
  }
  const surveys: PrismaSurvey[] = await res.json();
  return surveys;
};

export const updateSurveyResponse = async (surveyId: string, data: any) => {
  const payload = {
    surveyId: surveyId,
    itemData: data,
  };
  const res = await fetch("/api/survey/update/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.status;
};

export const searchSurvey = async (search: string) => {
  const apiUrl = `/api/survey/search/${search}`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: { "Content-Type": "application.json" },
  });
  const surveys: PrismaSurvey = await res.json();
  console.log("SURVEYS", surveys);
  return surveys;
};

export const uploadSurveyItemImage = async (image: any) => {
  const apiUrl: string = "/api/s3/upload";

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": image.length,
    },
    body: image,
  });
  const imageUrl = await res.json();
  console.log(imageUrl);
  return imageUrl.imageUrl;
};
