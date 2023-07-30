import React from "react";
import styles from "../styles/CreateSidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface CreateSidebar {
  items: any[];
  open: boolean;
  clickAction: any;
}

const CreateSidebar = (props: CreateSidebar) => {
  const { items, open, clickAction } = props;
  return (
    <div className={styles.bar} style={{ left: open ? "0" : "-100%" }}>
      <div className={styles.items}>
        {items.map((item: any, i: number) => {
          return (
            <li className={styles.item} id={`${i}`} key={i}>
              <h3 className="name" onClick={clickAction}>
                {item.name}
              </h3>
              <FontAwesomeIcon icon={faTrash} />
              <div className={styles.delete} onClick={clickAction} />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default CreateSidebar;
