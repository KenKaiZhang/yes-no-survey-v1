import styles from "../styles/SurveyItem.module.css";

export interface SurveyItemProps {
  animate: boolean;
  name: string;
  image: any;
  details: string | null;
}

const SurveyItem = (props: SurveyItemProps) => {
  const { animate, name, image, details } = props;
  return (
    <div id="item" className={`${styles.item} ${animate ? styles.reveal : ""}`}>
      <div className={styles.name}>{name}</div>
      {image && (
        <div className={styles.image}>
          <img src={image} />
        </div>
      )}
      <div className={styles.details}>{details}</div>
    </div>
  );
};

export default SurveyItem;
