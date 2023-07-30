import React from "react";
import styles from "../styles/CreateActions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faRotateLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

export interface CreateActionsProp {
  submitAction: any;
  resetAction: any;
  deleteAction: any;
}

const CreateActions = (props: CreateActionsProp) => {
  const { submitAction, resetAction, deleteAction } = props;
  return (
    <div className={styles.actions}>
      <div>
        <div className={styles.action}>
          <button id="submit" onClick={submitAction}>
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
        <div className={styles.action}>
          <button id="reset" onClick={resetAction}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        </div>
        <div className={styles.action}>
          <button id="delete" onClick={deleteAction}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateActions;
