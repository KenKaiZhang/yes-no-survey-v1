"use client";
import { useRouter, useParams } from "next/navigation";
import styles from "../../styles/answer.module.css";
import { useContext, useEffect, useState } from "react";
import { PrismaSurvey, PrismaSurveyItem } from "@/app/lib/prisma.d";
import { getSurvey, updateSurveyResponse } from "@/app/service/surveys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import capitalizeString from "@/app/util/capitalizeString";
import SurveyItem from "@/app/answer/components/SurveyItem";
import { MessageData, initialMessage } from "@/app/hooks/MessageContext";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import Message from "@/app/components/Message";

const Answer = () => {
  const id = useParams().id;
  const { message, setMessage } = useContext(MessageData);
  const [survey, setSurvey] = useState<PrismaSurvey | undefined>(undefined);
  const [item, setItem] = useState<PrismaSurveyItem | undefined>(undefined);
  const [index, setIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [respondentInfo, setRespondentInfo] = useState<{
    gender: string | undefined;
    age: string | undefined;
  }>({
    gender: undefined,
    age: undefined,
  });
  const router = useRouter();

  useEffect(() => {
    getSurvey(id).then((res) => {
      setSurvey(res);
      setItem(res.surveyItems[index]);
    });
  }, []);

  useEffect(() => {
    if (message.continue) {
      router.push("/explore");
    }
  }, [message]);

  // Makes sure item changes after index has been set
  useEffect(() => {
    setItem(survey?.surveyItems[index]);
    setLength(survey?.surveyItems.length);
  }, [index]);

  useEffect(() => {
    setDisabled(!(respondentInfo.gender && respondentInfo.age));
  }, [respondentInfo]);

  const handleClick = (e: any) => {
    const id = e.target.id;
    if (id === "yes") {
      setAnswers((answers) => [...answers, 1]);
    } else {
      setAnswers((answers) => [...answers, 0]);
    }

    setIndex(index + 1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const gender = respondentInfo.gender;
    const age = respondentInfo.age;

    const payload = survey?.surveyItems.map((item, index) => {
      return {
        id: item.id,
        answer: answers[index] ? "yes" : "no",
        gender: answers[index] ? `${gender}Yes` : `${gender}No`,
      };
    });

    const status = await updateSurveyResponse(id, payload);
    if (status === HttpStatusCodes.OK) {
      setMessage({
        status: "success",
        message: "Response submitted successfully.",
        continue: false,
      });
    } else {
      setMessage({ status: "error", message: "Response failed to submit.", continue: false });
    }
  };

  const handleRadioChange = (e: any) => {
    setRespondentInfo({ ...respondentInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <Message />
      <div className={styles.content}>
        <div className={styles.surveyItems}>
          {item && (
            <SurveyItem
              key={item.id}
              animate={true}
              name={item.name}
              image={item.image}
              details={item.details}
            />
          )}
          {index === survey?.surveyItems?.length && (
            <div>
              <form name="respondentSurvey" className={styles.results} onSubmit={handleSubmit}>
                <h1>Complete to submit response</h1>
                <div className={styles.gender}>
                  <h2>Gender</h2>
                  {["female", "male", "other"].map((gender) => {
                    return (
                      <label key={gender} className={styles.radioButton}>
                        {capitalizeString(gender)}
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          onChange={handleRadioChange}
                        />
                        <span className={styles.checker}></span>
                      </label>
                    );
                  })}
                </div>
                <div className={styles.age}>
                  <h2>Age</h2>
                  {["-17", "18-24", "25-34", "35-44", "45-54", "55+"].map((ageRange) => {
                    return (
                      <label key={ageRange} className={styles.radioButton}>
                        {ageRange}
                        <input
                          type="radio"
                          name="age"
                          value={ageRange}
                          onChange={handleRadioChange}
                        />
                        <span className={styles.checker}></span>
                      </label>
                    );
                  })}
                </div>
                <input type="submit" className={styles.submit} value="Submit" disabled={disabled} />
              </form>
            </div>
          )}
        </div>
        <div className={styles.progressBar}>
          <div className={styles.filler} style={{ width: `${(index / length) * 100}%` }} />
        </div>
        <div className={styles.actions}>
          <button id="yes" onClick={handleClick} disabled={index === length}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button id="no" onClick={handleClick} disabled={index === length}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
