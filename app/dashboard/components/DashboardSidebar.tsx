import React, { useState } from "react";
import styles from "../styles/DashboardSidebar.module.css";
import { faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export interface DashboardSidebarProps {
  surveys: any[];
  current: string;
  open: boolean;
  toggler: any;
  clickAction: any;
}

const DashboardSidebar = (props: DashboardSidebarProps) => {
  const { surveys, current, open, toggler, clickAction } = props;

  const [search, setSearch] = useState<string | undefined>(undefined);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.bar} style={{ left: open ? "0" : "-25rem" }}>
      <div className={`${styles.searchBarWrapper} ${search ? styles.focus : ""}`}>
        <div className={styles.searchIcon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          className={styles.searchBar}
          id="search"
          type="text"
          placeholder="Search survey ..."
          onChange={handleSearch}
        />
      </div>
      <div className={styles.surveyList}>
        {surveys.length !== 0 ? (
          surveys.map((survey, i) => {
            return (
              <li key={i}>
                <button
                  id={survey.id}
                  className={survey.id === current ? styles.activeSurvey : ""}
                  onClick={clickAction}
                >
                  <h2>{survey.question}</h2>
                </button>
              </li>
            );
          })
        ) : (
          <h2>You have no surveys</h2>
        )}
      </div>
      <div className={styles.createButtonWrapper}>
        <div className={styles.createButton}>
          <Link href="/create">{"Create a new survey"}</Link>
        </div>
      </div>
      <div className={styles.toggleButton} onClick={toggler}>
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ transform: open ? "rotate(-180deg)" : "" }}
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
