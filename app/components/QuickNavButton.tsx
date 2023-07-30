import Link from "next/link";
import styles from "app/styles/QuickNavButton.module.css";

export interface QuickNavButtonProps {
  text: string;
  href: string;
}

const QuickNavButton = (props: QuickNavButtonProps) => {
  const { text, href } = props;
  return (
    <Link href={href}>
      <button id={`${text}-button`} className={styles.button}>
        <h3>{text}</h3>
      </button>
    </Link>
  );
};

export default QuickNavButton;
