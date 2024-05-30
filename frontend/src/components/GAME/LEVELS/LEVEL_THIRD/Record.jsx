import { useSelector } from "react-redux";

import styles from "./Record.module.css";

const Record = ({ id, onShowModal }) => {
  const records = useSelector((state) => state.gameLevelThird.records);
  const record = records.find((item) => item._id === id);

  return (
    <button className={styles.record}>
      <div onClick={onShowModal} id={id} className={styles.wrap}></div>
      <div className={styles.inner_record}>
        <h3>
          <span>{record.value}</span>
        </h3>
      </div>
    </button>
  );
};

export default Record;
