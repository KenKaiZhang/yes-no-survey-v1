"use client";
import { PrismaSurvey } from "@/app/lib/prisma.d";
import styles from "../styles/SearchResults.module.css";
import { useEffect, useState } from "react";
import { searchSurvey } from "@/app/service/surveys";
import Link from "next/link";

export interface SearchResultsProps {
  search: string;
}

const SearchResults = (props: SearchResultsProps) => {
  const { search } = props;
  const [results, setResults] = useState<PrismaSurvey[] | undefined>(undefined);

  useEffect(() => {
    searchSurvey(search)
      .then((res) => {
        setResults(res);
      })
      .catch((err) => {
        setResults(undefined);
      });
  }, []);

  return (
    <div className={styles.content}>
      {results && results.length > 0 ? (
        results.map((res) => {
          return (
            <Link key={res.id} className={styles.result} href={`/answer/${res.id}`}>
              {res.question}
            </Link>
          );
        })
      ) : (
        <li id="no results">No matches found</li>
      )}
    </div>
  );
};

export default SearchResults;
