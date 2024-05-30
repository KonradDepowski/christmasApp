import { useSelector } from "react-redux";

import styles from "./Letter.module.css";

const Letter = ({ id, classes, onShowModal }) => {
  const letters = useSelector((state) => state.gameLevelSecond.letters);
  const letter = letters.find((item) => item._id === id);

  return (
    <button
      onClick={onShowModal}
      id={id}
      className={`${styles.letter} ${classes}`}
    >
      <div className={styles.wrap} id={id}></div>
      <h2>Dear Santa</h2>
      <div className={styles.text}>
        {letter.value !== "" ? (
          <p className={styles.value}>{letter.value}</p>
        ) : (
          <>
            <p className={styles.line_first}></p>
            <p className={styles.line_second}></p>
            <p className={styles.line_third}></p>
          </>
        )}
      </div>
    </button>
  );
};

export default Letter;
