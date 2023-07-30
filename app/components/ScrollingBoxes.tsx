import styles from "app/styles/ScrollingBoxes.module.css";
import React from "react";

const ScrollingBoxes = () => {
  const boxPerRow: number = 4;
  const totalBoxes: number[] = Array.from(Array(boxPerRow * 3).keys());
  return (
    <div className={styles.boxesWrapper}>
      <div className={styles.boxes}>
        <span style={{ gridTemplateColumns: "1fr ".repeat(boxPerRow) }}>
          {totalBoxes.map((box: number, i: number) => {
            return <div className={styles.box} key={i} />;
          })}
        </span>
        <span style={{ gridTemplateColumns: "1fr ".repeat(boxPerRow) }}>
          {totalBoxes.map((box: number, i: number) => {
            return <div className={styles.box} key={i} />;
          })}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBoxes;
