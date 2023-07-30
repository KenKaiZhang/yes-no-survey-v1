"use client";
import { useEffect, useState } from "react";
import styles from "../styles/Collection.module.css";
import Link from "next/link";
import { getAllSurveys } from "../../service/surveys";

export interface CollectionProps {
  title: string;
  feature: string;
  list: boolean;
  size: number;
}

interface itemInfo {
  id: string;
  question: string;
  owner: string;
  list: boolean;
}
const CollectionItem = (props: itemInfo) => {
  const { id, question, owner, list } = props;

  return (
    <Link
      href={`/answer/${id}`}
      className={styles.item}
      style={list ? { gridColumn: "span 2", height: "60px" } : {}}
    >
      <div className={styles.details}>
        <h2>{question}</h2>
        <p>{owner}</p>
      </div>
    </Link>
  );
};

const Collection = (props: CollectionProps) => {
  const { title, feature, list, size } = props;

  const [surveys, setSurveys] = useState<itemInfo[]>([]);

  useEffect(() => {
    // getAllSurveys([], ["question", "id"]).then((res) => {
    //   setSurveys(res);
    // });
    setSurveys([
      {
        question: "This is a test",
        id: "clhl4aqsk0000m39b8mq8qdrs",
        owner: "Ryan Tester",
      },
      {
        question: "Demo Survey",
        id: "clhl4t5ep000cm39bduzcy1ym",
        owner: "Ryan Tester",
      },
      {
        question: "Testing Survey",
        id: "clhl50jva000om39b2t0sxyot",
        owner: "Ryan Tester",
      },
      {
        question: "Testing Survey",
        id: "clhl51kzc001am39bc0yob2to",
        owner: "Ryan Tester",
      },
      {
        question: "Demo 1 for Tyler",
        id: "clhnv3rj60000m3nqmz68jx04",
        owner: "Tyler Demo",
      },
      {
        question: "Demo 2 For Tyler",
        id: "clhvhly4l0000m3j90nwyzhzx",
        owner: "Tyler Demo",
      },
      {
        question: "Tiggie",
        id: "cliu9j87b0000m3etantu7lck",
        owner: "Tyler Demo",
      },
      {
        question: "Image Test",
        id: "cljwhm3ox0009m3wmvzpcy5cv",
        owner: "Tyler Demo",
      },
      {
        question: "Testing Submission",
        id: "cljwht7ho000dm3wm4pxn2m4r",
        owner: "Tyler Demo",
      },
    ]);
  }, []);

  return (
    <div className={styles.collection}>
      <h1>{title}</h1>
      <div className={styles.items}>
        {surveys.map((survey, i) => {
          if (i < size)
            return (
              <CollectionItem
                key={i}
                id={survey.id}
                question={survey.question}
                owner={survey.owner}
                list={list}
              />
            );
        })}
      </div>
    </div>
  );
};

export default Collection;
