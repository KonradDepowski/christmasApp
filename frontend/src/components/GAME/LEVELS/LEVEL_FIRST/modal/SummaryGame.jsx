import styles from "./SummaryGame.module.css";

const SummaryGame = ({ onCheckResult }) => {
  return (
    <div className={styles.wrap}>
      <button onClick={onCheckResult} className={styles.btn}>
        Check
      </button>
    </div>
  );
};

export default SummaryGame;
