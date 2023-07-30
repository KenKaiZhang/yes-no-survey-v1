type Survey = {
  question: string;
  items: SurveyItem[];
};

type SurveyItem = {
  name: string;
  image: any;
  details: string;
};

export type { Survey, SurveyItem };
