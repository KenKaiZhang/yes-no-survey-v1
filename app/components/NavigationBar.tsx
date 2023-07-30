import React from "react";
import Link from "next/link";
import styles from "app/styles/NavigationBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faHome, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  return (
    <div className={styles.navigationBar}>
      <Link href="/create" className={styles.button}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
      <Link href="/explore" className={styles.button}>
        <FontAwesomeIcon icon={faCompass} />
      </Link>
      <Link href="/dashboard" className={styles.button}>
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <Link href="/" className={styles.button}>
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </div>
  );
};

export default NavigationBar;
