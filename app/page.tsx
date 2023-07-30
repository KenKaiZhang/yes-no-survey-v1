import ScrollingBoxes from "./components/ScrollingBoxes";
import QuickNavButton from "./components/QuickNavButton";
import styles from "./styles/page.module.css";

const Home = () => {
  return (
    <div className={styles.page}>
      <div className="pageBackground">
        <ScrollingBoxes />
      </div>
      <div className={styles.content}>
        <div className={styles.introText}>
          <h1>Welcome to YesNo</h1>
          <h3>The simplest way to get opinions</h3>
        </div>
        <div className={styles.quickNavButtons}>
          <QuickNavButton href="/explore" text="Explore" />
          <QuickNavButton href="/create" text="Create" />
        </div>
      </div>
    </div>
  );
};

export default Home;
