import React from "react";
import styles from "../styles/SurveyItemDetails.module.css";
import { PrismaSurveyItem } from "../../lib/prisma.d";

interface Breakdown {
  surveyData: PrismaSurveyItem;
  yes: boolean;
}

const Breakdown = (props: Breakdown) => {
  const { surveyData, yes } = props;
  return (
    <div className={styles.breakdown}>
      <h2>
        {yes ? "Yes" : "No"}: {yes ? surveyData.yes : surveyData.no}
      </h2>
      <ul>
        <li>Male: {yes ? surveyData.maleYes : surveyData.maleNo}</li>
        <li>Female: {yes ? surveyData.femaleYes : surveyData.femaleNo}</li>
        <li>Other: {yes ? surveyData.otherYes : surveyData.otherNo}</li>
      </ul>
    </div>
  );
};

export interface SurveyItemsDetailsProps {
  surveyData: PrismaSurveyItem;
}

const SurveyItemDetails = (props: SurveyItemsDetailsProps) => {
  const { surveyData } = props;

  return (
    <div className={styles.surveyItem}>
      <div className={styles.preview}>
        <div className={styles.name}>{surveyData.name}</div>
        <div className={styles.image}>
          <img src={surveyData.image ? surveyData.image : ""} alt="" />
        </div>
        <div className={styles.details}>{surveyData.details}</div>
      </div>
      <div className={styles.results}>
        {[true, false].map((yes, i) => {
          return <Breakdown key={i} surveyData={surveyData} yes={yes} />;
        })}
      </div>
    </div>
  );
};

export default SurveyItemDetails;
