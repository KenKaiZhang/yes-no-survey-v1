"use client";

import styles from "../styles/dashboard.module.css";

import { useEffect, useState } from "react";
import { getAllUserSurveys, getSurvey } from "../service/surveys";
import SurveyItemDetails from "./components/SurveyItemDetails";
import useToggle from "../hooks/useToggle";
import DashboardSidebar from "./components/DashboardSidebar";
import { PrismaSurvey } from "../lib/prisma.d";

const Dashboard = () => {
  const [surveys, setSurveys] = useState<PrismaSurvey[]>([]);
  const [currentSurvey, setCurrentSurvey] = useState<PrismaSurvey | undefined>(undefined);
  const [isOpen, toggler] = useToggle(true);

  // Get all surveys [{question: string, id: string}]
  useEffect(() => {
    const getUserSurveys = async () => {
      const userSurveys = await getAllUserSurveys(["id", "question"]);
      setSurveys(userSurveys);
    };
    getUserSurveys();
  }, []);

  useEffect(() => {
    const getSurveyData = async () => {
      const survey = await getSurvey(surveys[0].id);
      setCurrentSurvey(survey);
    };
    if (surveys.length) {
      getSurveyData();
    }
  }, [surveys]);

  const sidebarClick = (e: any) => {
    const surveyID: string = e.currentTarget.id;
    getSurvey(surveyID).then((res) => setCurrentSurvey(res));
  };

  const dashboardPayload: { question: string; id: string }[] = surveys.map((survey) => {
    return {
      question: survey.question,
      id: survey.id,
    };
  });

  return (
    <div className={styles.page}>
      <DashboardSidebar
        surveys={dashboardPayload}
        current={currentSurvey ? currentSurvey.id : ""}
        open={isOpen ? true : false}
        toggler={toggler}
        clickAction={sidebarClick}
      />
      <div className={styles.content} style={{ paddingLeft: isOpen ? "32em" : "8rem" }}>
        {currentSurvey && (
          <div className={styles.surveyItems} id={currentSurvey.surveyItems?.length}>
            {currentSurvey?.surveyItems.map((item, i) => {
              return <SurveyItemDetails key={item.id} surveyData={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
