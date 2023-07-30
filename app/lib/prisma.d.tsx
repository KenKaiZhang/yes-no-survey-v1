import { User, Survey, SurveyItem, Respondent } from "@prisma/client";

interface PrismaUser extends User {
  surveys?: Survey[];
}

interface PrismaSurvey extends Survey {
  user?: User;
  surveyItems?: SurveyItem[];
}

interface PrismaSurveyItem extends SurveyItem {
  respondents?: Respondent[];
}

export type { PrismaUser, PrismaSurvey, PrismaSurveyItem };
