"use client";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCheck, faExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Message.module.css";
import capitalizeString from "../util/capitalizeString";
import { MessageData } from "../hooks/MessageContext";

const Message = () => {
  const { message, setMessage } = useContext(MessageData);
  var warning: boolean = false;
  var icon: IconDefinition;

  if (message.status == "") return null;

  const handleButtonClick = (e: any) => {
    const id = e.target.id;
    setMessage({
      status: "",
      message: "",
      continue: id === "continue" || message.status === "success",
    });
  };

  switch (message.status) {
    case "error":
      icon = faXmark;
      break;
    case "warning":
      icon = faExclamation;
      warning = true;
      break;
    default:
      icon = faCheck;
      break;
  }

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.message}>
        <div className={styles.info}>
          <div className={styles.visual}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={icon} />
            </div>
          </div>
          <div className={styles.status}>
            <h2>{capitalizeString(message.status)}</h2>
            <p>{message.message}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          {warning && (
            <button id="continue" onClick={handleButtonClick}>
              Continue
            </button>
          )}
          <button onClick={handleButtonClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
